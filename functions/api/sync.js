// Cloudflare Pages Functions - /api/sync
// ระบบซิงค์ข้อมูลส่วนกลาง สสมน.น่าน ร่วมกับ Cloudflare D1 Database

// ฟังก์ชันสร้างตารางฐานข้อมูลอัตโนมัติหากยังไม่มี (Self-Healing Table Creator)
async function ensureTables(db) {
  const tableQueries = [
    `CREATE TABLE IF NOT EXISTS members (
      id TEXT PRIMARY KEY,
      firstname TEXT,
      lastname TEXT,
      title TEXT,
      citizenId TEXT,
      schoolId TEXT,
      position TEXT,
      phone TEXT,
      prepayBalance REAL,
      status TEXT,
      beneficiaryTitle TEXT,
      beneficiaryFirstName TEXT,
      beneficiaryLastName TEXT,
      beneficiaryPhone TEXT,
      beneficiaryRelation TEXT,
      documents TEXT,
      ledger TEXT,
      gender TEXT,
      address TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS death_cases (
      id TEXT PRIMARY KEY,
      memberId TEXT,
      reportedDate TEXT,
      referenceDateText TEXT,
      referenceMemberCount INTEGER,
      grossPayout REAL,
      operatingFee REAL,
      netPayout REAL,
      payoutStatus TEXT,
      payoutDate TEXT,
      payoutSlip TEXT,
      payoutNotes TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS school_profiles (
      schoolId TEXT PRIMARY KEY,
      address TEXT,
      moo TEXT,
      tumbon TEXT,
      amphoe TEXT,
      phone TEXT,
      fax TEXT,
      director TEXT,
      directorPhone TEXT,
      coordinator TEXT,
      coordinatorPhone TEXT,
      directorCount INTEGER,
      deputyCount INTEGER,
      teacherCount INTEGER,
      otherCount INTEGER,
      pensionersCount INTEGER,
      activeMembersCount INTEGER,
      retiredTransferredMembersCount INTEGER,
      studentsJune INTEGER,
      studentsNovember INTEGER
    );`,
    `CREATE TABLE IF NOT EXISTS school_passwords (
      schoolId TEXT PRIMARY KEY,
      password TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS certifications (
      key TEXT PRIMARY KEY,
      certData TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      title TEXT,
      desc TEXT,
      category TEXT,
      format TEXT,
      size TEXT,
      year TEXT,
      link TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS announcements (
      id TEXT PRIMARY KEY,
      title TEXT,
      content TEXT,
      type TEXT,
      date TEXT,
      deceasedName TEXT,
      schoolName TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS central_config (
      key TEXT PRIMARY KEY,
      value TEXT
    );`
  ];

  const prepared = tableQueries.map(q => db.prepare(q));
  await db.batch(prepared);

  // Self-Healing Column Creator for ledger and documents in case table existed
  try {
    const tableInfo = await db.prepare("PRAGMA table_info(members)").all();
    const columns = tableInfo.results.map(r => r.name);
    
    if (!columns.includes("documents")) {
      await db.prepare("ALTER TABLE members ADD COLUMN documents TEXT").run();
    }
    if (!columns.includes("ledger")) {
      await db.prepare("ALTER TABLE members ADD COLUMN ledger TEXT").run();
    }
    if (!columns.includes("gender")) {
      await db.prepare("ALTER TABLE members ADD COLUMN gender TEXT").run();
    }
    if (!columns.includes("address")) {
      await db.prepare("ALTER TABLE members ADD COLUMN address TEXT").run();
    }
  } catch (err) {
    console.error("Migration error (ledger/documents/gender/address columns):", err.message);
  }

  // Self-Healing Column Creator for documents table in case it existed
  try {
    const tableInfo = await db.prepare("PRAGMA table_info(documents)").all();
    const columns = tableInfo.results.map(r => r.name);
    
    if (!columns.includes("title")) {
      await db.prepare("ALTER TABLE documents ADD COLUMN title TEXT").run();
    }
    if (!columns.includes("desc")) {
      await db.prepare("ALTER TABLE documents ADD COLUMN desc TEXT").run();
    }
    if (!columns.includes("format")) {
      await db.prepare("ALTER TABLE documents ADD COLUMN format TEXT").run();
    }
    if (!columns.includes("size")) {
      await db.prepare("ALTER TABLE documents ADD COLUMN size TEXT").run();
    }
    if (!columns.includes("link")) {
      await db.prepare("ALTER TABLE documents ADD COLUMN link TEXT").run();
    }
  } catch (err) {
    console.error("Migration error (documents table columns):", err.message);
  }
}

// 1. GET Request: ดึงข้อมูลล่าสุดจาก Cloudflare D1 ส่งให้ Client
export async function onRequestGet(context) {
  const db = context.env.DB;
  if (!db) {
    return new Response(JSON.stringify({ error: "D1 Database binding 'DB' not found." }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }

  try {
    // ตรวจสอบและเตรียมโครงสร้างตาราง
    await ensureTables(db);

    // ดึงข้อมูลพร้อมกัน (Parallel query)
    const [
      membersRes,
      deathsRes,
      profilesRes,
      passwordsRes,
      certsRes,
      docsRes,
      announcementsRes,
      configRes
    ] = await Promise.all([
      db.prepare("SELECT * FROM members").all(),
      db.prepare("SELECT * FROM death_cases").all(),
      db.prepare("SELECT * FROM school_profiles").all(),
      db.prepare("SELECT * FROM school_passwords").all(),
      db.prepare("SELECT * FROM certifications").all(),
      db.prepare("SELECT * FROM documents").all(),
      db.prepare("SELECT * FROM announcements").all(),
      db.prepare("SELECT * FROM central_config").all()
    ]);

    // แปลงโครงสร้างแถวให้อยู่ในฟอร์มของ appState (Object mappings)
    const schoolProfiles = {};
    profilesRes.results.forEach(p => {
      schoolProfiles[p.schoolId] = {
        address: p.address,
        moo: p.moo,
        tumbon: p.tumbon,
        amphoe: p.amphoe,
        phone: p.phone,
        fax: p.fax,
        director: p.director,
        directorPhone: p.directorPhone,
        coordinator: p.coordinator,
        coordinatorPhone: p.coordinatorPhone,
        directorCount: p.directorCount,
        deputyCount: p.deputyCount,
        teacherCount: p.teacherCount,
        otherCount: p.otherCount,
        pensionersCount: p.pensionersCount,
        activeMembersCount: p.activeMembersCount,
        retiredTransferredMembersCount: p.retiredTransferredMembersCount,
        studentsJune: p.studentsJune,
        studentsNovember: p.studentsNovember
      };
    });

    const schoolPasswords = {};
    passwordsRes.results.forEach(p => {
      schoolPasswords[p.schoolId] = p.password;
    });

    const certifications = {};
    certsRes.results.forEach(c => {
      try {
        certifications[c.key] = JSON.parse(c.certData);
      } catch(e) {
        certifications[c.key] = {};
      }
    });

    const centralConfig = {};
    configRes.results.forEach(c => {
      centralConfig[c.key] = c.value;
    });

    // ประกอบร่าง JSON Payload และแปลงข้อมูลคอลัมน์ JSON และโครงสร้างทายาท
    const payload = {
      members: (membersRes.results || []).map(m => {
        try {
          m.documents = m.documents ? JSON.parse(m.documents) : {};
        } catch (e) {
          m.documents = {};
        }
        try {
          m.ledger = m.ledger ? JSON.parse(m.ledger) : [];
        } catch (e) {
          m.ledger = [];
        }
        // สร้างออบเจ็กต์ทายาทให้สอดคล้องกันเพื่อป้องกันการเปิดระบบเข้ามาแล้วไม่พบ
        m.beneficiary = {
          title: m.beneficiaryTitle || "นาย",
          name: ((m.beneficiaryFirstName || "") + " " + (m.beneficiaryLastName || "")).trim() || "-",
          phone: m.beneficiaryPhone || "-",
          relation: m.beneficiaryRelation || "-"
        };
        // สร้างตัวแปรเสริมเพื่อความเข้ากันได้
        m.firstName = m.firstname;
        m.lastName = m.lastname;
        return m;
      }),
      deathCases: deathsRes.results || [],
      schoolProfiles,
      schoolPasswords,
      documents: (docsRes.results || []).map(doc => ({
        id: doc.id,
        title: doc.title || doc.name || "",
        desc: doc.desc || "",
        category: doc.category || "",
        format: doc.format || "PDF",
        size: doc.size || doc.fileSize || "",
        year: doc.year ? parseInt(doc.year) : 2569,
        link: doc.link || doc.url || ""
      })),
      announcements: announcementsRes.results || [],
      centralBankBalance: centralConfig.centralBankBalance !== undefined ? parseFloat(centralConfig.centralBankBalance) : 250000,
      centralBankUpdateDate: centralConfig.centralBankUpdateDate || "2026-06-01",
      centralOperatingFee: centralConfig.centralOperatingFee !== undefined ? parseFloat(centralConfig.centralOperatingFee) : 0
    };

    return new Response(JSON.stringify(payload), {
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message, stack: err.stack }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }
}

// 2. POST Request: รับข้อมูลการปรับปรุงจาก Client เข้าบันทึกลง D1 Database
export async function onRequestPost(context) {
  const db = context.env.DB;
  if (!db) {
    return new Response(JSON.stringify({ error: "D1 Database binding 'DB' not found." }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }

  try {
    // เตรียมโครงสร้างตาราง
    await ensureTables(db);

    const data = await context.request.json();
    const statements = [];

    // --- 1. Members Sync ---
    statements.push(db.prepare("DELETE FROM members"));
    if (data.members && data.members.length > 0) {
      data.members.forEach(m => {
        statements.push(db.prepare(`
          INSERT INTO members (
            id, firstname, lastname, title, citizenId, schoolId, position, phone, prepayBalance, status,
            beneficiaryTitle, beneficiaryFirstName, beneficiaryLastName, beneficiaryPhone, beneficiaryRelation,
            documents, ledger, gender, address
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          m.id, m.firstname || m.firstName || "", m.lastname || m.lastName || "", m.title || "นาย",
          m.citizenId || "", m.schoolId || "", m.position || "ครู", m.phone || "", m.prepayBalance || 0, m.status || "active",
          m.beneficiaryTitle || (m.beneficiary ? m.beneficiary.title : "นาย"),
          m.beneficiaryFirstName || (m.beneficiary ? (m.beneficiary.name ? m.beneficiary.name.split(" ")[0] : "-") : "-"),
          m.beneficiaryLastName || (m.beneficiary ? (m.beneficiary.name ? m.beneficiary.name.split(" ").slice(1).join(" ") : "") : ""),
          m.beneficiaryPhone || (m.beneficiary ? m.beneficiary.phone : "-"),
          m.beneficiaryRelation || (m.beneficiary ? m.beneficiary.relation : "-"),
          JSON.stringify(m.documents || {}),
          JSON.stringify(m.ledger || []),
          m.gender || "ชาย",
          m.address || ""
        ));
      });
    }

    // --- 2. Death Cases Sync ---
    statements.push(db.prepare("DELETE FROM death_cases"));
    if (data.deathCases && data.deathCases.length > 0) {
      data.deathCases.forEach(d => {
        statements.push(db.prepare(`
          INSERT INTO death_cases (
            id, memberId, reportedDate, referenceDateText, referenceMemberCount, grossPayout, operatingFee, netPayout,
            payoutStatus, payoutDate, payoutSlip, payoutNotes
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          d.id, d.memberId || "", d.reportedDate || "", d.referenceDateText || "", d.referenceMemberCount || 0,
          d.grossPayout || 0, d.operatingFee || 0, d.netPayout || 0, d.payoutStatus || "pending",
          d.payoutDate || "", d.payoutSlip || "", d.payoutNotes || ""
        ));
      });
    }

    // --- 3. School Profiles Sync ---
    statements.push(db.prepare("DELETE FROM school_profiles"));
    if (data.schoolProfiles) {
      Object.keys(data.schoolProfiles).forEach(schoolId => {
        const p = data.schoolProfiles[schoolId];
        statements.push(db.prepare(`
          INSERT INTO school_profiles (
            schoolId, address, moo, tumbon, amphoe, phone, fax, director, directorPhone, coordinator, coordinatorPhone,
            directorCount, deputyCount, teacherCount, otherCount, pensionersCount, activeMembersCount, retiredTransferredMembersCount,
            studentsJune, studentsNovember
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          schoolId, p.address || "", p.moo || "", p.tumbon || "", p.amphoe || "", p.phone || "", p.fax || "",
          p.director || "", p.directorPhone || "", p.coordinator || "", p.coordinatorPhone || "",
          p.directorCount || 0, p.deputyCount || 0, p.teacherCount || 0, p.otherCount || 0,
          p.pensionersCount || 0, p.activeMembersCount || 0, p.retiredTransferredMembersCount || 0,
          p.studentsJune || 0, p.studentsNovember || 0
        ));
      });
    }

    // --- 4. School Passwords Sync ---
    statements.push(db.prepare("DELETE FROM school_passwords"));
    if (data.schoolPasswords) {
      Object.keys(data.schoolPasswords).forEach(schoolId => {
        statements.push(db.prepare("INSERT INTO school_passwords (schoolId, password) VALUES (?, ?)")
          .bind(schoolId, data.schoolPasswords[schoolId]));
      });
    }

    // --- 5. Certifications Sync ---
    statements.push(db.prepare("DELETE FROM certifications"));
    if (data.certifications) {
      Object.keys(data.certifications).forEach(key => {
        statements.push(db.prepare("INSERT INTO certifications (key, certData) VALUES (?, ?)")
          .bind(key, JSON.stringify(data.certifications[key])));
      });
    }

    // --- 6. Documents Sync ---
    statements.push(db.prepare("DELETE FROM documents"));
    if (data.documents && data.documents.length > 0) {
      data.documents.forEach(doc => {
        statements.push(db.prepare(`
          INSERT INTO documents (id, title, desc, category, format, size, year, link)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          doc.id, doc.title || doc.name || "", doc.desc || "", doc.category || "",
          doc.format || "PDF", doc.size || doc.fileSize || "", String(doc.year || ""), doc.link || doc.url || ""
        ));
      });
    }

    // --- 7. Announcements Sync ---
    statements.push(db.prepare("DELETE FROM announcements"));
    if (data.announcements && data.announcements.length > 0) {
      data.announcements.forEach(a => {
        statements.push(db.prepare(`
          INSERT INTO announcements (id, title, content, type, date, deceasedName, schoolName)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).bind(
          a.id, a.title || "", a.content || "", a.type || "ข่าวประชาสัมพันธ์ทั่วไป", a.date || "",
          a.deceasedName || "", a.schoolName || ""
        ));
      });
    }

    // --- 8. Central Config Sync ---
    statements.push(db.prepare("DELETE FROM central_config"));
    if (data.centralBankBalance !== undefined) {
      statements.push(db.prepare("INSERT INTO central_config (key, value) VALUES (?, ?)")
        .bind("centralBankBalance", String(data.centralBankBalance)));
    }
    if (data.centralBankUpdateDate !== undefined) {
      statements.push(db.prepare("INSERT INTO central_config (key, value) VALUES (?, ?)")
        .bind("centralBankUpdateDate", String(data.centralBankUpdateDate)));
    }
    if (data.centralOperatingFee !== undefined) {
      statements.push(db.prepare("INSERT INTO central_config (key, value) VALUES (?, ?)")
        .bind("centralOperatingFee", String(data.centralOperatingFee)));
    }

    // รันคิวรีทั้งหมดเป็นก้อนเดียวใน Transaction
    await db.batch(statements);

    return new Response(JSON.stringify({ success: true, message: "Sync with Cloudflare D1 Database complete." }), {
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message, stack: err.stack }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }
}
