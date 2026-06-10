/* 
  สสมน.น่าน // ระบบบริหารจัดการสมาชิกและกองทุนฌาปนกิจสงเคราะห์
  Core Business Logic & JavaScript Controller
*/

// ==================== 1. CONSTANTS & STATIC DATA CONFIGURATION ====================
// ข้อมูลสังกัดสถานศึกษา 32 โรงเรียน + 1 หน่วยข้าราชการบำนาญ (รวม 33 สังกัด)
const SCHOOLS = [
  { id: "01", name: "โรงเรียนสตรีศรีน่าน", totalPersonnel: { director: 1, deputy: 4, teacher: 132, other: 18 } },
  { id: "02", name: "โรงเรียนศรีสวัสดิ์วิทยาคารจังหวัดน่าน", totalPersonnel: { director: 1, deputy: 4, teacher: 128, other: 22 } },
  { id: "03", name: "โรงเรียนปัว", totalPersonnel: { director: 1, deputy: 4, teacher: 110, other: 15 } },
  { id: "04", name: "โรงเรียนท่าวังผาพิทยาคม", totalPersonnel: { director: 1, deputy: 3, teacher: 85, other: 12 } },
  { id: "05", name: "โรงเรียนสา", totalPersonnel: { director: 1, deputy: 2, teacher: 74, other: 11 } },
  { id: "06", name: "โรงเรียนนาน้อย", totalPersonnel: { director: 1, deputy: 2, teacher: 58, other: 9 } },
  { id: "07", name: "โรงเรียนเชียงกลาง \"ประชาพัฒนา\"", totalPersonnel: { director: 1, deputy: 2, teacher: 65, other: 10 } },
  { id: "08", name: "โรงเรียนบ่อเกลือ", totalPersonnel: { director: 1, deputy: 1, teacher: 32, other: 4 } },
  { id: "09", name: "โรงเรียนมัธยมป่ากลาง", totalPersonnel: { director: 1, deputy: 1, teacher: 33, other: 5 } },
  { id: "10", name: "โรงเรียนทุ่งช้าง", totalPersonnel: { director: 1, deputy: 2, teacher: 45, other: 7 } },
  { id: "11", name: "โรงเรียนแม่จริม", totalPersonnel: { director: 1, deputy: 1, teacher: 38, other: 5 } },
  { id: "12", name: "โรงเรียนนันทบุรีวิทยาในพระบรมราชานุเคราะห์", totalPersonnel: { director: 1, deputy: 2, teacher: 30, other: 5 } },
  { id: "13", name: "โรงเรียนสันติสุขพิทยาคม", totalPersonnel: { director: 1, deputy: 2, teacher: 42, other: 6 } },
  { id: "14", name: "โรงเรียนบ้านหลวง", totalPersonnel: { director: 1, deputy: 1, teacher: 34, other: 5 } },
  { id: "15", name: "โรงเรียนนาหมื่นพิทยาคม", totalPersonnel: { director: 1, deputy: 1, teacher: 25, other: 4 } },
  { id: "16", name: "โรงเรียนมัธยมพระราชทานเฉลิมพระเกียรติ", totalPersonnel: { director: 1, deputy: 1, teacher: 28, other: 8 } },
  { id: "17", name: "โรงเรียนไตรเขตประชาสามัคคีรัชมังคลาภิเษก", totalPersonnel: { director: 1, deputy: 1, teacher: 18, other: 2 } },
  { id: "18", name: "โรงเรียนน่านนคร", totalPersonnel: { director: 1, deputy: 2, teacher: 40, other: 6 } },
  { id: "19", name: "โรงเรียนบ่อสวกวิทยาคาร", totalPersonnel: { director: 1, deputy: 1, teacher: 27, other: 4 } },
  { id: "20", name: "โรงเรียนเมืองแงง", totalPersonnel: { director: 1, deputy: 1, teacher: 26, other: 4 } },
  { id: "21", name: "โรงเรียนพระธาตุพิทยาคม", totalPersonnel: { director: 1, deputy: 1, teacher: 24, other: 3 } },
  { id: "22", name: "โรงเรียนศรัทธาศิลาเพชรรังสรรค์", totalPersonnel: { director: 1, deputy: 1, teacher: 22, other: 3 } },
  { id: "23", name: "โรงเรียนเมืองยมวิทยาคาร", totalPersonnel: { director: 1, deputy: 1, teacher: 20, other: 3 } },
  { id: "24", name: "โรงเรียนหนองบัวพิทยาคม", totalPersonnel: { director: 1, deputy: 1, teacher: 25, other: 4 } },
  { id: "25", name: "โรงเรียนสาธุกิจประชาสรรค์รัชมังคลาภิเษก", totalPersonnel: { director: 1, deputy: 1, teacher: 35, other: 6 } },
  { id: "26", name: "โรงเรียนสารทิศพิทยาคม", totalPersonnel: { director: 1, deputy: 1, teacher: 15, other: 2 } },
  { id: "27", name: "โรงเรียนเมืองลีประชาสามัคคี", totalPersonnel: { director: 1, deputy: 1, teacher: 18, other: 2 } },
  { id: "28", name: "โรงเรียนน่านประชาอุทิศ", totalPersonnel: { director: 1, deputy: 1, teacher: 25, other: 4 } },
  { id: "29", name: "โรงเรียนศรีนครน่าน", totalPersonnel: { director: 1, deputy: 1, teacher: 28, other: 4 } },
  { id: "30", name: "โรงเรียนสารธรรมวิทยาคาร", totalPersonnel: { director: 1, deputy: 1, teacher: 23, other: 3 } },
  { id: "31", name: "โรงเรียนน่านปัญญานุกูล", totalPersonnel: { director: 1, deputy: 2, teacher: 35, other: 8 } },
  { id: "32", name: "โรงเรียนราชประชานุเคราะห์ที่ 56", totalPersonnel: { director: 1, deputy: 3, teacher: 55, other: 12 } },
  { id: "33", name: "หน่วยข้าราชการบำนาญ", totalPersonnel: { director: 1, deputy: 0, teacher: 10, other: 5 } }
];

// ดึงข้อมูลจำนวนครูและบุคลากรแยกตามตำแหน่ง (คืนค่า dynamic ถ้ามี หรือคืนค่า static ถ้าไม่มี)
function getSchoolPersonnel(schoolId) {
  const sch = SCHOOLS.find(s => s.id === schoolId);
  const profile = appState.schoolProfiles ? appState.schoolProfiles[schoolId] : null;
  if (profile && profile.directorCount !== undefined) {
    return {
      director: parseInt(profile.directorCount) || 0,
      deputy: parseInt(profile.deputyCount) || 0,
      teacher: parseInt(profile.teacherCount) || 0,
      govTeacher: parseInt(profile.govTeacherCount) || 0,
      tempTeacher: parseInt(profile.tempTeacherCount) || 0,
      adminStaff: parseInt(profile.adminStaffCount) || 0,
      other: parseInt(profile.otherCount) || 0,
      maid: parseInt(profile.maidCount) || 0,
      service: parseInt(profile.serviceCount) || 0
    };
  }
  return sch ? { 
    ...sch.totalPersonnel,
    govTeacher: 0,
    tempTeacher: 0,
    adminStaff: 0,
    maid: 0,
    service: 0
  } : { director: 0, deputy: 0, teacher: 0, govTeacher: 0, tempTeacher: 0, adminStaff: 0, other: 0, maid: 0, service: 0 };
}

const DEFAULT_SCHOOL_PROFILES = {
  "01": { address: "148/1", moo: "1", tumbon: "ในเวียง", amphoe: "เมืองน่าน", phone: "054-710321", fax: "054-710322", director: "นายสมชาย แสนน่าน", directorPhone: "089-123-4567", coordinator: "นางสิริรัตน์ จิตใจดี", coordinatorPhone: "081-2345678" },
  "02": { address: "8", moo: "5", tumbon: "ดู่ใต้", amphoe: "เมืองน่าน", phone: "054-771569", fax: "054-771570", director: "นายพิจิตร แก้วมณี", directorPhone: "089-234-5678", coordinator: "นายสมคิด ทองรุ่ง", coordinatorPhone: "089-7654321" },
  "03": { address: "109", moo: "3", tumbon: "ปัว", amphoe: "ปัว", phone: "054-791244", fax: "054-791245", director: "นายเกรียงไกร สูงศักดิ์", directorPhone: "089-345-6789", coordinator: "นางเพ็ญศรี สุขเกษม", coordinatorPhone: "082-3456789" },
  "04": { address: "44", moo: "2", tumbon: "ท่าวังผา", amphoe: "ท่าวังผา", phone: "054-751101", fax: "054-751102", director: "นายเดชา แก้วหลวง", directorPhone: "089-456-7890", coordinator: "นายวิศรุต สว่างเวียง", coordinatorPhone: "084-5678901" },
  "05": { address: "201", moo: "4", tumbon: "กลางเวียง", amphoe: "สา", phone: "054-781522", fax: "054-781523", director: "นายประสิทธิ์ ศรีวิชัย", directorPhone: "089-678-9012", coordinator: "นายวุฒิชัย ยอดรัก", coordinatorPhone: "086-7890123" },
  "06": { address: "55", moo: "8", tumbon: "ศรีสะเกษ", amphoe: "นาน้อย", phone: "054-789098", fax: "054-789099", director: "นายอำนวย นาน้อย", directorPhone: "089-789-0123", coordinator: "นางสาวสมพร แสนขุนเขา", coordinatorPhone: "087-8901234" },
  "07": { address: "12", moo: "1", tumbon: "เชียงกลาง", amphoe: "เชียงกลาง", phone: "054-797115", fax: "054-797116", director: "นายสมเกียรติ ยศกลาง", directorPhone: "089-567-8901", coordinator: "นางมณีวรรณ เมืองน่าน", coordinatorPhone: "085-6789012" },
  "08": { address: "88", moo: "1", tumbon: "บ่อเกลือใต้", amphoe: "บ่อเกลือ", phone: "054-778088", fax: "054-778089", director: "นายเฉลิม ขุนบ่อ", directorPhone: "089-123-9876", coordinator: "นางสาวศิริพร ใจงาม", coordinatorPhone: "081-9876543" },
  "09": { address: "47", moo: "7", tumbon: "ป่ากลาง", amphoe: "ปัว", phone: "054-791047", fax: "054-791048", director: "นายวัชระ ป่ากลาง", directorPhone: "089-333-4444", coordinator: "นางสาวสุดา แก้วหวาน", coordinatorPhone: "084-3456789" },
  "10": { address: "69", moo: "2", tumbon: "ทุ่งช้าง", amphoe: "ทุ่งช้าง", phone: "054-795167", fax: "054-795003", director: "ว่าที่ร้อยโทวิญญู ศรีบุญเรือง", directorPhone: "097-2151119", coordinator: "นางสาวอนุสรา ศรีทาเกิด", coordinatorPhone: "064-3346214" },
  "11": { address: "15", moo: "1", tumbon: "แหนด", amphoe: "แม่จริม", phone: "054-769015", fax: "054-769016", director: "นายบุญยืน ขุนเขา", directorPhone: "089-901-2345", coordinator: "นางสาวพิกุล แก้วมณี", coordinatorPhone: "089-0123456" },
  "12": { address: "180", moo: "6", tumbon: "ในเวียง", amphoe: "เมืองน่าน", phone: "054-710180", fax: "054-710181", director: "พระครูนันทบุรีวิทยา", directorPhone: "089-777-8888", coordinator: "นายสมเกียรติ ยศหลวง", coordinatorPhone: "088-3456789" },
  "13": { address: "99", moo: "3", tumbon: "ป่าแลวหลวง", amphoe: "สันติสุข", phone: "054-775199", fax: "054-775198", director: "นายสุรพล แสนคำ", directorPhone: "089-890-1234", coordinator: "นายธีระ จิตภักดี", coordinatorPhone: "088-9012345" },
  "14": { address: "100", moo: "1", tumbon: "บ้านหลวง", amphoe: "บ้านหลวง", phone: "054-776100", fax: "054-776101", director: "นายวิทยา ป่าข่อย", directorPhone: "089-901-9876", coordinator: "นายเกรียงศักดิ์ สมใจ", coordinatorPhone: "089-9876543" },
  "15": { address: "88", moo: "1", tumbon: "นาหมื่น", amphoe: "นาหมื่น", phone: "054-785088", fax: "054-785089", director: "นายกิติกร ยอดรัก", directorPhone: "089-888-9999", coordinator: "นางวิลาวรรณ สมใจ", coordinatorPhone: "089-345-6789" },
  "16": { address: "1", moo: "10", tumbon: "ห้วยโก๋น", amphoe: "เฉลิมพระเกียรติ", phone: "054-799001", fax: "054-799002", director: "นายสมบูรณ์ ชายแดน", directorPhone: "089-234-9876", coordinator: "นายอภิชาติ สุขดี", coordinatorPhone: "082-9876543" },
  "17": { address: "33", moo: "9", tumbon: "ไตรเขต", amphoe: "สองแคว", phone: "054-793033", fax: "054-793034", director: "นายธีระศักดิ์ ยศกลาง", directorPhone: "089-555-6666", coordinator: "นางสาวสมบูรณ์ ดินดี", coordinatorPhone: "086-3456789" },
  "18": { address: "99", moo: "1", tumbon: "ดู่ใต้", amphoe: "เมืองน่าน", phone: "054-771100", fax: "054-771101", director: "นายประมวล แสนเมือง", directorPhone: "089-777-1111", coordinator: "นางสาวดวงใจ ปัญญาใจ", coordinatorPhone: "086-111-2222" },
  "19": { address: "66", moo: "3", tumbon: "บ่อสวก", amphoe: "เมืองน่าน", phone: "054-710066", fax: "054-710067", director: "นายไพโรจน์ สุวรรณ", directorPhone: "089-890-9876", coordinator: "นางสาวกัญญา พงษ์ดี", coordinatorPhone: "088-9876543" },
  "20": { address: "40", moo: "4", tumbon: "เจดีย์ชัย", amphoe: "ปัว", phone: "054-791040", fax: "054-791041", director: "นายณรงค์ ศิริวงค์", directorPhone: "089-345-9876", coordinator: "นางรพีพร แก้วใจ", coordinatorPhone: "083-9876543" },
  "21": { address: "77", moo: "3", tumbon: "พระธาตุ", amphoe: "เชียงกลาง", phone: "054-797077", fax: "054-797078", director: "นายประวิตร ยศแงง", directorPhone: "089-456-9876", coordinator: "นายรุ่งโรจน์ จิตงาม", coordinatorPhone: "084-9876543" },
  "22": { address: "9", moo: "6", tumbon: "ศิลาเพชร", amphoe: "ปัว", phone: "054-791009", fax: "054-791010", director: "นายพีระพันธ์ เพชรหลวง", directorPhone: "089-567-9876", coordinator: "นางสาวจันทรา ศิลา", coordinatorPhone: "085-9876543" },
  "23": { address: "2", moo: "1", tumbon: "เมืองยม", amphoe: "ท่าวังผา", phone: "054-751002", fax: "054-751003", director: "นายสุรพล แสนคำ", directorPhone: "089-444-5555", coordinator: "นายอนุรักษ์ โพธิ์ดี", coordinatorPhone: "085-3456789" },
  "24": { address: "14", moo: "2", tumbon: "หนองบัว", amphoe: "ท่าวังผา", phone: "054-751014", fax: "054-751015", director: "นายธเนศ บัวหลวง", directorPhone: "089-678-9876", coordinator: "นายประพันธ์ ใจมั่น", coordinatorPhone: "086-9876543" },
  "25": { address: "89", moo: "2", tumbon: "ศรีษะเกษ", amphoe: "นาน้อย", phone: "054-789089", fax: "054-789090", director: "นายทนงศักดิ์ แสนขุนเขา", directorPhone: "089-012-9876", coordinator: "นายเจตน์ จิตใจดี", coordinatorPhone: "081-3456789" },
  "26": { address: "15", moo: "2", tumbon: "ศิลาเพชร", amphoe: "ปัว", phone: "054-791111", fax: "054-791112", director: "นายสุวรรณ จิตใจดี", directorPhone: "089-111-3333", coordinator: "นางสาวศิริลักษณ์ ใจงาม", coordinatorPhone: "082-111-2222" },
  "27": { address: "12", moo: "3", tumbon: "เมืองลี", amphoe: "นาหมื่น", phone: "054-785012", fax: "054-785013", director: "นายเกรียติศักดิ์ เมืองลี", directorPhone: "089-222-4444", coordinator: "นายสมควร แสนปัญญา", coordinatorPhone: "083-222-3333" },
  "28": { address: "12", moo: "4", tumbon: "สองแคว", amphoe: "สองแคว", phone: "054-793012", fax: "054-793013", director: "นายอิทธิพล สองแคว", directorPhone: "089-111-2222", coordinator: "นางสาวรจนา ใจงาม", coordinatorPhone: "082-3456789" },
  "29": { address: "150", moo: "2", tumbon: "แสนทอง", amphoe: "ท่าวังผา", phone: "054-751150", fax: "054-751151", director: "นายประเสริฐ ดีจริง", directorPhone: "089-555-7777", coordinator: "นางสาวพิกุล แสนเมือง", coordinatorPhone: "086-555-6666" },
  "30": { address: "15", moo: "3", tumbon: "สะเนียน", amphoe: "เมืองน่าน", phone: "054-710015", fax: "054-710016", director: "นายบุญเลิศ ขุนเขา", directorPhone: "089-999-0000", coordinator: "นายรุ่งโรจน์ แสนแฮ", coordinatorPhone: "080-3456789" },
  "31": { address: "555", moo: "1", tumbon: "ดู่ใต้", amphoe: "เมืองน่าน", phone: "054-771555", fax: "054-771556", director: "นายสมพร ดีจริง", directorPhone: "089-200-3000", coordinator: "นางภัทรา ใจมั่น", coordinatorPhone: "082-4567890" },
  "32": { address: "2", moo: "5", tumbon: "กลางเวียง", amphoe: "สา", phone: "054-781002", fax: "054-781003", director: "นายอเนก บุญยิ่ง", directorPhone: "089-300-4000", coordinator: "นายวีระชัย ยอดรัก", coordinatorPhone: "083-4567890" },
  "33": { address: "หน่วยข้าราชการบำนาญ", moo: "-", tumbon: "ในเวียง", amphoe: "เมืองน่าน", phone: "089-999-9999", fax: "-", director: "ประธานข้าราชการบำนาญ", directorPhone: "089-999-9999", coordinator: "ผู้ประสานงานบำนาญ สสมน.น่าน", coordinatorPhone: "089-999-9999" }
};

const CURRENT_BE_YEAR_SHORT = "69"; // 2569

// ==================== 2. STATE MANAGEMENT ====================
let appState = {
  activeRole: "province",     
  activeSchoolId: "01",       
  activeTab: "dashboard",     
  members: [],                
  deathCases: [],             
  schoolInvoices: [],         
  transferLogs: [],           
  schoolProfiles: {},         // ข้อมูลพื้นฐาน 33 สังกัด
  certifications: {},         // สถานะการยืนยันตรวจสอบประจำครึ่งปี
  documents: [],              // คลังเอกสาร
  schoolPasswords: {},        // รหัสผ่านเข้าใช้งานระดับโรงเรียน (33 สังกัด)
  simulatedReviewWindow: false, // สำหรับสลับสิทธิ์การจำลองวันครึ่งปี 30 มิ.ย. และ 30 ธ.ค.
  announcements: [],          // ประกาศแบบกำหนดเอง (Custom Announcements)
  centralBankBalance: 250000, // ยอดเงินในบัญชีส่วนกลาง
  centralBankUpdateDate: "2026-06-01", // วันที่อัปเดตยอดบัญชีส่วนกลางล่าสุด
  centralOperatingFee: 0      // ยอดหักเงินค่าดำเนินการสะสมร้อยละ 5
};

// บันทึกและดึงข้อมูลจาก LocalStorage
function saveStateToLocalStorage() {
  if (appState.members) {
    appState.members.forEach(m => {
      // Sync camelCase and lowercase name keys
      if (m.firstname) m.firstName = m.firstname;
      if (m.lastname) m.lastName = m.lastname;
      if (m.firstName && !m.firstname) m.firstname = m.firstName;
      if (m.lastName && !m.lastname) m.lastname = m.lastName;
      
      // Sync beneficiary properties: always overwrite flat properties from the nested beneficiary object if it exists
      if (m.beneficiary) {
        m.beneficiaryTitle = m.beneficiary.title || "นาย";
        const parts = (m.beneficiary.name || "").trim().split(/\s+/);
        m.beneficiaryFirstName = parts[0] || "-";
        m.beneficiaryLastName = parts.slice(1).join(" ") || "";
        m.beneficiaryPhone = m.beneficiary.phone || "-";
        m.beneficiaryRelation = m.beneficiary.relation || "-";
      } else if (m.beneficiaryFirstName) {
        m.beneficiary = {
          title: m.beneficiaryTitle || "นาย",
          name: (m.beneficiaryFirstName + " " + (m.beneficiaryLastName || "")).trim(),
          phone: m.beneficiaryPhone || "-",
          relation: m.beneficiaryRelation || "-"
        };
      }
    });
  }
  localStorage.setItem("สสมน_NAN_MEMBERS", JSON.stringify(appState.members));
  localStorage.setItem("สสมน_NAN_DEATHS", JSON.stringify(appState.deathCases));
  localStorage.setItem("สสมน_NAN_INVOICES", JSON.stringify(appState.schoolInvoices));
  localStorage.setItem("สสมน_NAN_TRANSFERS", JSON.stringify(appState.transferLogs));
  localStorage.setItem("สสมน_NAN_PROFILES", JSON.stringify(appState.schoolProfiles));
  localStorage.setItem("สสมน_NAN_CERTS", JSON.stringify(appState.certifications));
  localStorage.setItem("สสมน_NAN_DOCS", JSON.stringify(appState.documents));
  localStorage.setItem("สสมน_NAN_SCHOOL_PASSWORDS", JSON.stringify(appState.schoolPasswords));
  localStorage.setItem("สสมน_NAN_ANNOUNCEMENTS", JSON.stringify(appState.announcements || []));
  localStorage.setItem("สสมน_NAN_CENTRAL_BANK_BALANCE", appState.centralBankBalance.toString());
  localStorage.setItem("สสมน_NAN_CENTRAL_BANK_UPDATE_DATE", appState.centralBankUpdateDate);
  localStorage.setItem("สสมน_NAN_CENTRAL_OPERATING_FEE", (appState.centralOperatingFee || 0).toString());
  localStorage.setItem("สสมน_NAN_COMMITTEE_PASSWORD", appState.committeePassword || "committee1234");

  // บันทึกสถานะโหมดทดสอบระบบและการสำรองข้อมูลเดิม
  localStorage.setItem("สสมน_NAN_HAS_DEMO_DATA", appState.hasDemoData ? "true" : "false");
  if (appState.preDemoSchoolProfiles) {
    localStorage.setItem("สสมน_NAN_PRE_DEMO_PROFILES", JSON.stringify(appState.preDemoSchoolProfiles));
  } else {
    localStorage.removeItem("สสมน_NAN_PRE_DEMO_PROFILES");
  }
  if (appState.preDemoCentralBankBalance !== undefined) {
    localStorage.setItem("สสมน_NAN_PRE_DEMO_BANK_BALANCE", appState.preDemoCentralBankBalance.toString());
  } else {
    localStorage.removeItem("สสมน_NAN_PRE_DEMO_BANK_BALANCE");
  }
  if (appState.preDemoCentralBankUpdateDate !== undefined) {
    localStorage.setItem("สสมน_NAN_PRE_DEMO_BANK_UPDATE_DATE", appState.preDemoCentralBankUpdateDate);
  } else {
    localStorage.removeItem("สสมน_NAN_PRE_DEMO_BANK_UPDATE_DATE");
  }
  if (appState.preDemoCentralOperatingFee !== undefined) {
    localStorage.setItem("สสมน_NAN_PRE_DEMO_OPERATING_FEE", appState.preDemoCentralOperatingFee.toString());
  } else {
    localStorage.removeItem("สสมน_NAN_PRE_DEMO_OPERATING_FEE");
  }
  if (appState.preDemoMembers) {
    localStorage.setItem("สสมน_NAN_PRE_DEMO_MEMBERS", JSON.stringify(appState.preDemoMembers));
  } else {
    localStorage.removeItem("สสมน_NAN_PRE_DEMO_MEMBERS");
  }
  if (appState.preDemoDeathCases) {
    localStorage.setItem("สสมน_NAN_PRE_DEMO_DEATHS", JSON.stringify(appState.preDemoDeathCases));
  } else {
    localStorage.removeItem("สสมน_NAN_PRE_DEMO_DEATHS");
  }
  if (appState.preDemoSchoolInvoices) {
    localStorage.setItem("สสมน_NAN_PRE_DEMO_INVOICES", JSON.stringify(appState.preDemoSchoolInvoices));
  } else {
    localStorage.removeItem("สสมน_NAN_PRE_DEMO_INVOICES");
  }
  if (appState.preDemoTransferLogs) {
    localStorage.setItem("สสมน_NAN_PRE_DEMO_TRANSFERS", JSON.stringify(appState.preDemoTransferLogs));
  } else {
    localStorage.removeItem("สสมน_NAN_PRE_DEMO_TRANSFERS");
  }

  // ยิงซิงค์ไปยัง Cloudflare D1 Database ในเบื้องหลัง
  syncStateToCloudflare();
}

function loadStateFromLocalStorage() {
  const cachedMembers = localStorage.getItem("สสมน_NAN_MEMBERS");
  const cachedDeaths = localStorage.getItem("สสมน_NAN_DEATHS");
  const cachedInvoices = localStorage.getItem("สสมน_NAN_INVOICES");
  const cachedTransfers = localStorage.getItem("สสมน_NAN_TRANSFERS");
  const cachedProfiles = localStorage.getItem("สสมน_NAN_PROFILES");
  const cachedCerts = localStorage.getItem("สสมน_NAN_CERTS");
  const cachedDocs = localStorage.getItem("สสมน_NAN_DOCS");
  const cachedPasswords = localStorage.getItem("สสมน_NAN_SCHOOL_PASSWORDS");
  const cachedAnnouncements = localStorage.getItem("สสมน_NAN_ANNOUNCEMENTS");
  const cachedBankBalance = localStorage.getItem("สสมน_NAN_CENTRAL_BANK_BALANCE");
  const cachedBankUpdateDate = localStorage.getItem("สสมน_NAN_CENTRAL_BANK_UPDATE_DATE");

  if (cachedMembers) {
    appState.members = JSON.parse(cachedMembers);
    appState.members.forEach(m => {
      // Self-Healing Migration
      if (m.firstName && !m.firstname) m.firstname = m.firstName;
      if (m.firstname && !m.firstName) m.firstName = m.firstname;
      if (m.lastName && !m.lastname) m.lastname = m.lastName;
      if (m.lastname && !m.lastName) m.lastName = m.lastname;
      
      if (m.beneficiary) {
        if (!m.beneficiaryTitle) m.beneficiaryTitle = m.beneficiary.title || "นาย";
        if (!m.beneficiaryFirstName || m.beneficiaryFirstName === "-") {
          const parts = (m.beneficiary.name || "").split(" ");
          m.beneficiaryFirstName = parts[0] || "-";
          m.beneficiaryLastName = parts.slice(1).join(" ") || "";
        }
        if (!m.beneficiaryPhone) m.beneficiaryPhone = m.beneficiary.phone || "-";
        if (!m.beneficiaryRelation) m.beneficiaryRelation = m.beneficiary.relation || "-";
      } else if (m.beneficiaryFirstName) {
        m.beneficiary = {
          title: m.beneficiaryTitle || "นาย",
          name: (m.beneficiaryFirstName + " " + (m.beneficiaryLastName || "")).trim(),
          phone: m.beneficiaryPhone || "-",
          relation: m.beneficiaryRelation || "-"
        };
      }
    });
  }
  if (cachedDeaths) appState.deathCases = JSON.parse(cachedDeaths);
  if (cachedInvoices) appState.schoolInvoices = JSON.parse(cachedInvoices);
  if (cachedTransfers) appState.transferLogs = JSON.parse(cachedTransfers).filter(l => l.type !== "system");
  
  if (cachedProfiles) {
    appState.schoolProfiles = JSON.parse(cachedProfiles);
  } else {
    appState.schoolProfiles = { ...DEFAULT_SCHOOL_PROFILES };
  }
  
  if (cachedCerts) {
    appState.certifications = JSON.parse(cachedCerts);
  } else {
    appState.certifications = {};
  }

  if (cachedDocs) {
    appState.documents = JSON.parse(cachedDocs);
  } else {
    appState.documents = [ ...DEFAULT_DOCUMENTS ];
  }

  if (cachedPasswords) {
    appState.schoolPasswords = JSON.parse(cachedPasswords);
  } else {
    appState.schoolPasswords = {};
    // Set default password 'school1234' for all schools
    SCHOOLS.forEach(s => {
      appState.schoolPasswords[s.id] = "school1234";
    });
  }

  const cachedCommitteePassword = localStorage.getItem("สสมน_NAN_COMMITTEE_PASSWORD");
  appState.committeePassword = cachedCommitteePassword || "committee1234";

  if (cachedAnnouncements) {
    appState.announcements = JSON.parse(cachedAnnouncements);
  } else {
    appState.announcements = [];
  }

  if (cachedBankBalance) {
    appState.centralBankBalance = parseFloat(cachedBankBalance);
  } else {
    appState.centralBankBalance = 250000;
  }

  if (cachedBankUpdateDate) {
    appState.centralBankUpdateDate = cachedBankUpdateDate;
  } else {
    appState.centralBankUpdateDate = "2026-06-01";
  }

  const cachedOperatingFee = localStorage.getItem("สสมน_NAN_CENTRAL_OPERATING_FEE");
  if (cachedOperatingFee) {
    appState.centralOperatingFee = parseFloat(cachedOperatingFee);
  } else {
    appState.centralOperatingFee = 0;
  }

  // โหลดสถานะโหมดทดสอบระบบและการสำรองข้อมูลเดิม
  const cachedHasDemo = localStorage.getItem("สสมน_NAN_HAS_DEMO_DATA");
  if (cachedHasDemo) appState.hasDemoData = (cachedHasDemo === "true");

  const cachedPreDemoProfiles = localStorage.getItem("สสมน_NAN_PRE_DEMO_PROFILES");
  if (cachedPreDemoProfiles) appState.preDemoSchoolProfiles = JSON.parse(cachedPreDemoProfiles);

  const cachedPreDemoBank = localStorage.getItem("สสมน_NAN_PRE_DEMO_BANK_BALANCE");
  if (cachedPreDemoBank) appState.preDemoCentralBankBalance = parseFloat(cachedPreDemoBank);

  const cachedPreDemoUpdateDate = localStorage.getItem("สสมน_NAN_PRE_DEMO_BANK_UPDATE_DATE");
  if (cachedPreDemoUpdateDate) appState.preDemoCentralBankUpdateDate = cachedPreDemoUpdateDate;

  const cachedPreDemoFee = localStorage.getItem("สสมน_NAN_PRE_DEMO_OPERATING_FEE");
  if (cachedPreDemoFee) appState.preDemoCentralOperatingFee = parseFloat(cachedPreDemoFee);

  const cachedPreDemoMembers = localStorage.getItem("สสมน_NAN_PRE_DEMO_MEMBERS");
  if (cachedPreDemoMembers) appState.preDemoMembers = JSON.parse(cachedPreDemoMembers);

  const cachedPreDemoDeaths = localStorage.getItem("สสมน_NAN_PRE_DEMO_DEATHS");
  if (cachedPreDemoDeaths) appState.preDemoDeathCases = JSON.parse(cachedPreDemoDeaths);

  const cachedPreDemoInvoices = localStorage.getItem("สสมน_NAN_PRE_DEMO_INVOICES");
  if (cachedPreDemoInvoices) appState.preDemoSchoolInvoices = JSON.parse(cachedPreDemoInvoices);

  const cachedPreDemoTransfers = localStorage.getItem("สสมน_NAN_PRE_DEMO_TRANSFERS");
  if (cachedPreDemoTransfers) appState.preDemoTransferLogs = JSON.parse(cachedPreDemoTransfers);

  if (typeof updateDemoButtonsVisibility === "function") {
    updateDemoButtonsVisibility();
  }
}

// ฟังก์ชันซิงค์ข้อมูลฝั่ง Client ขึ้นฐานข้อมูล Cloudflare D1
async function syncStateToCloudflare() {
  const syncBtnStatus = document.querySelector(".footer-system-status");
  try {
    if (syncBtnStatus) {
      syncBtnStatus.innerHTML = '<span class="status-dot" style="background:#fbbf24;"></span><span>ระบบคลาวด์: กำลังซิงค์...</span>';
    }

    const response = await fetch("/api/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        members: appState.members,
        deathCases: appState.deathCases,
        schoolProfiles: appState.schoolProfiles,
        schoolPasswords: appState.schoolPasswords,
        certifications: appState.certifications,
        documents: appState.documents,
        announcements: appState.announcements,
        centralBankBalance: appState.centralBankBalance,
        centralBankUpdateDate: appState.centralBankUpdateDate,
        centralOperatingFee: appState.centralOperatingFee,
        committeePassword: appState.committeePassword || "committee1234"
      })
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    if (syncBtnStatus) {
      syncBtnStatus.innerHTML = '<span class="status-dot" style="background:var(--color-accent-teal);"></span><span>ระบบคลาวด์: ซิงค์สำเร็จ</span>';
    }
  } catch (err) {
    console.warn("Cloudflare D1 Sync error (offline / dev mode):", err.message);
    if (syncBtnStatus) {
      syncBtnStatus.innerHTML = '<span class="status-dot" style="background:#9ca3af;"></span><span>ระบบจำลอง (LocalStorage): พร้อมใช้</span>';
    }
  }
}

// ฟังก์ชันดึงข้อมูลจากฐานข้อมูล Cloudflare D1 บนคลาวด์มาเขียนทับสเตท (Stale-While-Revalidate)
async function loadStateFromCloudflare() {
  const syncBtnStatus = document.querySelector(".footer-system-status");
  try {
    if (syncBtnStatus) {
      syncBtnStatus.innerHTML = '<span class="status-dot" style="background:#fbbf24;"></span><span>ระบบคลาวด์: กำลังโหลด...</span>';
    }

    const response = await fetch("/api/sync");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    
    const hasCloudProfiles = data.schoolProfiles && Object.keys(data.schoolProfiles).length > 0;
    if (hasCloudProfiles) {
      data.members.forEach(m => {
        // กู้คืนโครงสร้างชื่อคู่ขนาน
        if (m.firstName && !m.firstname) m.firstname = m.firstName;
        if (m.firstname && !m.firstName) m.firstName = m.firstname;
        if (m.lastName && !m.lastname) m.lastname = m.lastName;
        if (m.lastname && !m.lastName) m.lastName = m.lastname;

        // กู้คืนโครงสร้างทายาทและผู้รับผลประโยชน์
        if (m.beneficiary) {
          if (!m.beneficiaryTitle) m.beneficiaryTitle = m.beneficiary.title || "นาย";
          if (!m.beneficiaryFirstName || m.beneficiaryFirstName === "-") {
            const parts = (m.beneficiary.name || "").split(" ");
            m.beneficiaryFirstName = parts[0] || "-";
            m.beneficiaryLastName = parts.slice(1).join(" ") || "";
          }
          if (!m.beneficiaryPhone) m.beneficiaryPhone = m.beneficiary.phone || "-";
          if (!m.beneficiaryRelation) m.beneficiaryRelation = m.beneficiary.relation || "-";
        } else if (m.beneficiaryFirstName) {
          m.beneficiary = {
            title: m.beneficiaryTitle || "นาย",
            name: (m.beneficiaryFirstName + " " + (m.beneficiaryLastName || "")).trim(),
            phone: m.beneficiaryPhone || "-",
            relation: m.beneficiaryRelation || "-"
          };
        }

        // ดีซีเรียลไลซ์เอกสารประกอบและสมุดคู่ฝากกรณีส่งแบบสตริง
        if (typeof m.documents === "string") {
          try {
            m.documents = JSON.parse(m.documents);
          } catch(e) {
            m.documents = {};
          }
        }
        if (typeof m.ledger === "string") {
          try {
            m.ledger = JSON.parse(m.ledger);
          } catch(e) {
            m.ledger = [];
          }
        }
      });
      appState.members = data.members;
      appState.deathCases = data.deathCases || [];
      appState.schoolProfiles = data.schoolProfiles || {};
      appState.schoolPasswords = data.schoolPasswords || {};
      appState.certifications = data.certifications || {};
      if (data.documents && data.documents.length > 0) {
        appState.documents = data.documents;
      } else {
        // หากข้อมูลบนคลาวด์ว่างเปล่า ให้กู้คืนจาก LocalStorage หรือ DEFAULT_DOCUMENTS เพื่อป้องกันปัญหายอดดาวน์โหลดหาย
        const cachedDocs = localStorage.getItem("สสมน_NAN_DOCS");
        let docsLoaded = false;
        if (cachedDocs) {
          try {
            const parsedDocs = JSON.parse(cachedDocs);
            if (parsedDocs && parsedDocs.length > 0) {
              appState.documents = parsedDocs;
              docsLoaded = true;
            }
          } catch(e) {}
        }
        if (!docsLoaded) {
          appState.documents = [ ...DEFAULT_DOCUMENTS ];
        }
        // ซิงค์ยอดเงินกลับขึ้นคลาวด์เพื่อเป็นการ Seeding อัตโนมัติ
        setTimeout(() => {
          syncStateToCloudflare();
        }, 1000);
      }
      appState.announcements = data.announcements || [];
      appState.centralBankBalance = data.centralBankBalance || 250000;
      appState.centralBankUpdateDate = data.centralBankUpdateDate || "2026-06-01";
      appState.centralOperatingFee = data.centralOperatingFee || 0;
      appState.committeePassword = data.committeePassword || "committee1234";
      
      // บันทึกทับ LocalStorage เพื่อเป็นระบบสำรองการทำงานแบบออฟไลน์
      localStorage.setItem("สสมน_NAN_MEMBERS", JSON.stringify(appState.members));
      localStorage.setItem("สสมน_NAN_DEATHS", JSON.stringify(appState.deathCases));
      localStorage.setItem("สสมน_NAN_PROFILES", JSON.stringify(appState.schoolProfiles));
      localStorage.setItem("สสมน_NAN_CERTS", JSON.stringify(appState.certifications));
      localStorage.setItem("สสมน_NAN_DOCS", JSON.stringify(appState.documents));
      localStorage.setItem("สสมน_NAN_SCHOOL_PASSWORDS", JSON.stringify(appState.schoolPasswords));
      localStorage.setItem("สสมน_NAN_ANNOUNCEMENTS", JSON.stringify(appState.announcements));
      localStorage.setItem("สสมน_NAN_CENTRAL_BANK_BALANCE", appState.centralBankBalance.toString());
      localStorage.setItem("สสมน_NAN_CENTRAL_BANK_UPDATE_DATE", appState.centralBankUpdateDate);
      localStorage.setItem("สสมน_NAN_CENTRAL_OPERATING_FEE", appState.centralOperatingFee.toString());
      localStorage.setItem("สสมน_NAN_COMMITTEE_PASSWORD", appState.committeePassword);

      // ประมวลผลและตรวจสอบกำลังคน/สถิติต่างๆ
      ensureSchoolProfilesStats();
      calculateStats();
      
      // สั่งรีเรนเดอร์ตารางและคอมโพเนนต์ต่างๆ ทั้งหมดใหม่
      initSchoolProfileForm();
      checkBiAnnualCertificationStatus();
      renderSchoolsDirectory();
      renderDocumentsGrid();
      renderAnnouncementsBoard();
      renderCremationPayoutsTable();
      renderLiquidityAnalyzer();
      renderMembersDirectory();
      renderSchoolRankingsTable();
      populateReportDeathDropdowns();

      if (typeof updateDemoButtonsVisibility === "function") {
        updateDemoButtonsVisibility();
      }
    }

    if (syncBtnStatus) {
      syncBtnStatus.innerHTML = '<span class="status-dot" style="background:var(--color-accent-teal);"></span><span>ระบบคลาวด์: ซิงค์ล่าสุดเรียบร้อย</span>';
    }
  } catch (err) {
    console.warn("Cloudflare D1 Load error (offline / dev mode):", err.message);
    if (syncBtnStatus) {
      syncBtnStatus.innerHTML = '<span class="status-dot" style="background:#9ca3af;"></span><span>ระบบจำลอง (LocalStorage): พร้อมใช้</span>';
    }
  }
}

// โครงสร้างประวัติสมุดแรกเข้า
const INITIAL_LEDGER_ENTRY = (amount, description) => ({
  date: new Date().toISOString().replace('T', ' ').substring(0, 16),
  type: amount >= 0 ? "deposit" : "charge",
  amount: parseFloat(amount),
  description: description,
  balanceAfter: parseFloat(amount)
});

// ฟังก์ชันเปิด/ปิดกล่องกรอกคำนำหน้าแบบระบุเอง
window.toggleTitleOtherInput = function(type) {
  const select = document.getElementById(type === 'member' ? 'member-title' : 'member-beneficiary-title');
  const otherBlock = document.getElementById(type === 'member' ? 'block-member-title-other' : 'block-beneficiary-title-other');
  const otherInput = document.getElementById(type === 'member' ? 'member-title-other' : 'member-beneficiary-title-other');
  
  if (select && select.value === 'อื่น ๆ') {
    otherBlock.style.display = 'block';
    if (otherInput) otherInput.required = true;
  } else {
    if (otherBlock) otherBlock.style.display = 'none';
    if (otherInput) {
      otherInput.required = false;
      otherInput.value = '';
    }
  }
};

// ฟังก์ชันสลับเงื่อนไขค่าสมัครและการสะสมเงินล่วงหน้าเมื่อเลือกประเภทการเป็นสมาชิก
window.toggleMemberStatusOptions = function() {
  const statusOption = document.getElementById("member-status-option")?.value || "new";
  const prepayLabel = document.querySelector("label[for='member-prepay-balance']");
  const prepayInput = document.getElementById("member-prepay-balance");
  const feeLabel = document.getElementById("lbl-member-fee-paid");

  if (statusOption === "existing") {
    // เป็นสมาชิกอยู่แล้ว (ย้าย/กู้คืน)
    if (prepayLabel) prepayLabel.innerHTML = 'จำนวนเงินสะสมล่วงหน้าเดิมที่เคยชำระไว้ (บาท) <span style="color:#9ca3af; font-weight:normal;">(ไม่บังคับกรอก)</span>:';
    if (prepayInput) {
      prepayInput.removeAttribute("required");
      prepayInput.setAttribute("min", "0");
      prepayInput.placeholder = "ไม่ระบุจะเริ่มต้นที่ 0 บาท";
      if (prepayInput.value === "90" || prepayInput.value === "150" || prepayInput.value === "") {
        prepayInput.value = "";
      }
    }
    if (feeLabel) feeLabel.textContent = "ได้รับการยกเว้นค่าธรรมเนียมแรกเข้า (เป็นสมาชิกอยู่แล้ว)";
  } else {
    // สมัครสมาชิกใหม่
    if (prepayLabel) prepayLabel.innerHTML = 'เงินสะสมล่วงหน้าเริ่มต้น (บาท) <span class="required">*</span> <span style="color:var(--color-accent-amber); font-weight:500;">(ขั้นต่ำ 90 บาท)</span>:';
    if (prepayInput) {
      prepayInput.setAttribute("required", "true");
      prepayInput.setAttribute("min", "90");
      prepayInput.placeholder = "แนะนำ 150 บาท (ขั้นต่ำ 90 บาท)";
      if (prepayInput.value === "" || parseFloat(prepayInput.value) < 90) {
        prepayInput.value = "90";
      }
    }
    if (feeLabel) feeLabel.textContent = "ชำระค่าธรรมเนียมแรกเข้า 50 บาทเรียบร้อย";
  }
};

// ==================== 3. AUTOMATED MEMBER ID GENERATOR ====================
function generateMemberId(schoolId, position) {
  // ดึงค่า T (ตัวเลขตัวที่ 5) ตามกลุ่มตำแหน่ง
  let positionCode = "3"; // ข้าราชการครูเป็นดีฟอลต์
  if (position) {
    const pos = position.toString().toLowerCase();
    if (pos.includes("ผู้อำนวยการ") || pos.includes("ผอ.") || pos === "director") {
      positionCode = "1";
    } else if (pos.includes("รองผู้อำนวยการ") || pos.includes("รอง ผอ.") || pos.includes("รองผอ") || pos === "deputy") {
      positionCode = "2";
    } else if (pos.includes("ครู") || pos === "teacher") {
      positionCode = "3";
    } else {
      positionCode = "4"; // บุคลากรอื่น ๆ
    }
  }

  const schoolPrefix = CURRENT_BE_YEAR_SHORT + schoolId + positionCode; // YYSS + T (5 หลัก)
  const matchedMembers = appState.members.filter(m => m.id.startsWith(schoolPrefix));
  
  let nextSeq = 1;
  if (matchedMembers.length > 0) {
    const sequences = matchedMembers.map(m => parseInt(m.id.substring(5))); // ลำดับเริ่มจากตัวที่ 6 (Substring index 5)
    const maxSeq = Math.max(...sequences);
    nextSeq = maxSeq + 1;
  }
  
  const seqString = String(nextSeq).padStart(3, "0");
  return schoolPrefix + seqString;
}

// ==================== 4. SYSTEM CALCULATORS & VIEW CONTROLLER ====================
function getMemberRegistrationType(member) {
  if (!member.ledger) return "existing";
  const hasNewFee = member.ledger.some(entry => 
    entry.amount === 50 && 
    (entry.description.includes("จ่ายค่าสมัครชำระแรกเข้าแรกสมัครใหม่") || 
     entry.description.includes("แรกสมัครใหม่") || 
     entry.description.includes("ค่าแรกเข้า"))
  );
  return hasNewFee ? "new" : "existing";
}

function calculateStats() {
  const activeMembers = appState.members.filter(m => m.status === "active");
  const deceasedMembers = appState.members.filter(m => m.status === "deceased");
  const transferredMembers = appState.members.filter(m => m.status === "transferred");
  
  const totalFunds = activeMembers.reduce((sum, m) => sum + parseFloat(m.prepayBalance), 0);
  const arrearsCount = activeMembers.filter(m => parseFloat(m.prepayBalance) < 0).length;
  const currentSchool = SCHOOLS.find(s => s.id === appState.activeSchoolId);

  if (appState.activeRole === "province" || appState.activeRole === "committee") {
    // --- สิทธิ์จังหวัด / คณะกรรมการ ---
    const kpiSchoolDevices = document.getElementById("kpi-school-devices");
    if (kpiSchoolDevices) kpiSchoolDevices.style.display = "none";

    document.getElementById("page-title").textContent = appState.activeRole === "committee" ? "ระบบแดชบอร์ดคณะกรรมการ สสมน." : "ระบบแดชบอร์ดภาพรวมจังหวัด";
    document.getElementById("page-subtitle").textContent = "แสดงสถิติสมาชิก เงินสะสมล่วงหน้า และอัตราการมีส่วนร่วมของบุคลากรทั้งจังหวัดน่าน";
    document.getElementById("btn-action-primary").style.display = "inline-flex";
    document.getElementById("text-action-primary").textContent = "แจ้งสมาชิกเสียชีวิต";
    document.getElementById("btn-action-primary").className = "btn btn-danger btn-icon-text";
    
    document.getElementById("btn-action-primary").querySelector("svg").innerHTML = `
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor"/>
    `;
    
    let totalProvincePersonnel = 0;
    SCHOOLS.forEach(s => {
      if (s.id !== "33") {
        const p = getSchoolPersonnel(s.id);
        totalProvincePersonnel += p.director + p.deputy + p.teacher + (p.govTeacher || 0) + (p.tempTeacher || 0) + (p.adminStaff || 0) + p.other + (p.maid || 0) + (p.service || 0);
      }
    });

    const activePensioners = activeMembers.filter(m => m.schoolId === "33").length;
    totalProvincePersonnel += activePensioners; 

    const provinceMembershipRatio = totalProvincePersonnel > 0 ? Math.round((activeMembers.length / totalProvincePersonnel) * 100) : 0;
    const nonMembersProvince = totalProvincePersonnel - activeMembers.length;

    document.getElementById("stat-active-members").textContent = activeMembers.length.toLocaleString() + " คน";
    document.getElementById("stat-active-members-subtitle").textContent = `กำลังพลรวมวิเคราะห์ ${totalProvincePersonnel.toLocaleString()} คน`;
    document.getElementById("stat-membership-ratio").textContent = provinceMembershipRatio + "%";
    document.getElementById("stat-membership-ratio-subtitle").textContent = `บุคลากรยังไม่สมัคร สสมน. ${nonMembersProvince.toLocaleString()} คน`;
    
    document.getElementById("lbl-funds-title").textContent = "ยอดกองทุนสะสมล่วงหน้ารวม";
    document.getElementById("stat-funds-total").textContent = "฿" + totalFunds.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById("stat-funds-subtitle").textContent = "ยอดสะสมสำรองของสมาชิกทั้งจังหวัด";

    // คำนวณค่าธรรมเนียมการสมัครสมาชิกระดับจังหวัด
    let provinceNewCount = 0;
    let provinceOldCount = 0;
    activeMembers.forEach(m => {
      if (getMemberRegistrationType(m) === "new") {
        provinceNewCount++;
      } else {
        provinceOldCount++;
      }
    });
    const provinceNewFees = provinceNewCount * 50;
    const provinceOldFees = provinceOldCount * 0;
    const provinceTotalFees = provinceNewFees + provinceOldFees;

    const lblNewTotal = document.getElementById("stat-fees-new-total");
    const lblNewCount = document.getElementById("stat-fees-new-count");
    const lblOldTotal = document.getElementById("stat-fees-old-total");
    const lblOldCount = document.getElementById("stat-fees-old-count");
    const lblGrandTotal = document.getElementById("stat-fees-grand-total");
    const lblAllCount = document.getElementById("stat-fees-all-count");

    if (lblNewTotal) lblNewTotal.textContent = "฿" + provinceNewFees.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    if (lblNewCount) lblNewCount.textContent = provinceNewCount.toLocaleString();
    if (lblOldTotal) lblOldTotal.textContent = "฿" + provinceOldFees.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    if (lblOldCount) lblOldCount.textContent = provinceOldCount.toLocaleString();
    if (lblGrandTotal) lblGrandTotal.textContent = "฿" + provinceTotalFees.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    if (lblAllCount) lblAllCount.textContent = (provinceNewCount + provinceOldCount).toLocaleString();

    let totalDeposits = 0;
    let totalCharges = 0;
    activeMembers.forEach(m => {
      if (m.ledger) {
        m.ledger.forEach(item => {
          const amt = parseFloat(item.amount) || 0;
          if (item.type === "deposit" || amt >= 0) {
            totalDeposits += amt;
          } else {
            totalCharges += Math.abs(amt);
          }
        });
      }
    });
    
    document.getElementById("stat-funds-total-deposits").textContent = "฿" + totalDeposits.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById("stat-funds-total-charges").textContent = "฿" + totalCharges.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    // ตั้งค่ากล่องแจ้งเตือน (คดีตายรออนุมัติ + สลิปค้างตรวจ)
    const pendingSlipsCount = appState.schoolInvoices.filter(inv => inv.status === "pending").length;
    const pendingDeathsCount = appState.deathCases.filter(d => d.status === "pending_approval").length;
    
    document.getElementById("lbl-arrears-title").textContent = "เคสเสียชีวิต & สลิปรอตรวจ";
    document.getElementById("stat-alerts-count").textContent = `${pendingDeathsCount} เคส / ${pendingSlipsCount} สลิป`;
    document.getElementById("stat-alerts-subtitle").textContent = `สมาชิกยอดเงินสำรองติดลบมี ${arrearsCount} ราย`;
    document.getElementById("badge-pending-slips").textContent = pendingSlipsCount + pendingDeathsCount;
    document.getElementById("badge-pending-slips").style.display = (pendingSlipsCount + pendingDeathsCount) > 0 ? "flex" : "none";
    
    const kpiPanel = document.getElementById("kpi-alerts-panel");
    if (kpiPanel) {
      if (pendingSlipsCount > 0 || pendingDeathsCount > 0) {
        kpiPanel.style.display = "flex";
        kpiPanel.classList.add("alert-active");
      } else {
        kpiPanel.style.display = "none";
        kpiPanel.classList.remove("alert-active");
      }
    }

    document.getElementById("provincial-school-filter-wrapper").style.display = "block";
    document.getElementById("block-province-death-creation").style.display = "block";
    document.getElementById("block-province-verify-deaths").style.display = "block";
    document.getElementById("block-province-payment-matrix").style.display = "block";
    document.getElementById("block-province-payment-arrears-checker").style.display = "block";
    document.getElementById("block-school-payments-actions").style.display = "none";
    document.getElementById("block-school-death-creation").style.display = "none";
    document.getElementById("widget-provincial-schools-rankings").style.display = "block";
    const schoolCertWidget = document.getElementById("widget-school-bi-annual-certification");
    if (schoolCertWidget) schoolCertWidget.style.display = "none";

    renderProvincialPositionStats(activeMembers, totalProvincePersonnel);
    
  } else {
    // --- สิทธิ์โรงเรียน ---
    document.getElementById("page-title").textContent = `ระบบของ ${currentSchool.name}`;
    document.getElementById("page-subtitle").textContent = `แดชบอร์ดจัดการข้อมูล ติดตามการเงิน และยื่นสลิปค่าสงเคราะห์รายศพสังกัด ${currentSchool.name}`;
    document.getElementById("btn-action-primary").style.display = "inline-flex";
    document.getElementById("text-action-primary").textContent = "เพิ่มสมาชิกใหม่";
    document.getElementById("btn-action-primary").className = "btn btn-primary btn-icon-text";
    
    document.getElementById("btn-action-primary").querySelector("svg").innerHTML = `
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    `;

    const schoolMembers = activeMembers.filter(m => m.schoolId === appState.activeSchoolId);
    const schoolFunds = schoolMembers.reduce((sum, m) => sum + parseFloat(m.prepayBalance), 0);
    const schoolArrears = schoolMembers.filter(m => parseFloat(m.prepayBalance) < 0).length;

    let schoolPersonnelTotal = 0;
    if (appState.activeSchoolId === "33") {
      schoolPersonnelTotal = schoolMembers.length;
    } else {
      const p = getSchoolPersonnel(appState.activeSchoolId);
      schoolPersonnelTotal = p.director + p.deputy + p.teacher + (p.govTeacher || 0) + (p.tempTeacher || 0) + (p.adminStaff || 0) + p.other + (p.maid || 0) + (p.service || 0);
    }

    const schoolMembershipRatio = schoolPersonnelTotal > 0 ? Math.round((schoolMembers.length / schoolPersonnelTotal) * 100) : 0;
    const nonMembersSchool = schoolPersonnelTotal - schoolMembers.length;

    document.getElementById("stat-active-members").textContent = schoolMembers.length.toLocaleString() + " คน";
    document.getElementById("stat-active-members-subtitle").textContent = `กำลังพลทั้งหมดในสังกัด ${schoolPersonnelTotal.toLocaleString()} คน`;
    document.getElementById("stat-membership-ratio").textContent = schoolMembershipRatio + "%";
    document.getElementById("stat-membership-ratio-subtitle").textContent = `บุคลากรยังไม่ได้สมัคร ${nonMembersSchool.toLocaleString()} คน`;
    
    document.getElementById("lbl-funds-title").textContent = "ยอดเงินสะสมล่วงหน้าของสังกัด";
    document.getElementById("stat-funds-total").textContent = "฿" + schoolFunds.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById("stat-funds-subtitle").textContent = `เงินสำรองทำบุญสะสมของ ${currentSchool.name}`;

    // คำนวณค่าธรรมเนียมการสมัครสมาชิกระดับโรงเรียน
    let schoolNewCount = 0;
    let schoolOldCount = 0;
    schoolMembers.forEach(m => {
      if (getMemberRegistrationType(m) === "new") {
        schoolNewCount++;
      } else {
        schoolOldCount++;
      }
    });
    const schoolNewFees = schoolNewCount * 50;
    const schoolOldFees = schoolOldCount * 0;
    const schoolTotalFees = schoolNewFees + schoolOldFees;

    const lblNewTotal = document.getElementById("stat-fees-new-total");
    const lblNewCount = document.getElementById("stat-fees-new-count");
    const lblOldTotal = document.getElementById("stat-fees-old-total");
    const lblOldCount = document.getElementById("stat-fees-old-count");
    const lblGrandTotal = document.getElementById("stat-fees-grand-total");
    const lblAllCount = document.getElementById("stat-fees-all-count");

    if (lblNewTotal) lblNewTotal.textContent = "฿" + schoolNewFees.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    if (lblNewCount) lblNewCount.textContent = schoolNewCount.toLocaleString();
    if (lblOldTotal) lblOldTotal.textContent = "฿" + schoolOldFees.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    if (lblOldCount) lblOldCount.textContent = schoolOldCount.toLocaleString();
    if (lblGrandTotal) lblGrandTotal.textContent = "฿" + schoolTotalFees.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    if (lblAllCount) lblAllCount.textContent = (schoolNewCount + schoolOldCount).toLocaleString();

    let totalDeposits = 0;
    let totalCharges = 0;
    schoolMembers.forEach(m => {
      if (m.ledger) {
        m.ledger.forEach(item => {
          const amt = parseFloat(item.amount) || 0;
          if (item.type === "deposit" || amt >= 0) {
            totalDeposits += amt;
          } else {
            totalCharges += Math.abs(amt);
          }
        });
      }
    });
    
    document.getElementById("stat-funds-total-deposits").textContent = "฿" + totalDeposits.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById("stat-funds-total-charges").textContent = "฿" + totalCharges.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    // ค้างชำระของแอดมินโรงเรียน
    const schoolUnpaidInvoices = appState.schoolInvoices.filter(inv => inv.schoolId === appState.activeSchoolId && inv.status === "unpaid");
    const schoolPendingDeaths = appState.deathCases.filter(d => d.schoolId === appState.activeSchoolId && d.status === "pending_approval").length;

    document.getElementById("lbl-arrears-title").textContent = "ค้างจ่ายศพ & รอตรวจสอบตาย";
    document.getElementById("stat-alerts-count").textContent = `${schoolUnpaidInvoices.length} ศพ / ${schoolPendingDeaths} รออนุมัติ`;
    document.getElementById("stat-alerts-subtitle").textContent = `สมาชิกยอดติดลบในสังกัดมี ${schoolArrears} ราย`;
    
    const totalSchoolAlerts = schoolUnpaidInvoices.length + schoolPendingDeaths;
    document.getElementById("badge-pending-slips").textContent = totalSchoolAlerts;
    document.getElementById("badge-pending-slips").style.display = totalSchoolAlerts > 0 ? "flex" : "none";

    const schoolKpiPanel = document.getElementById("kpi-alerts-panel");
    if (schoolKpiPanel) {
      if (totalSchoolAlerts > 0 || schoolArrears > 0) {
        schoolKpiPanel.style.display = "flex";
        schoolKpiPanel.classList.add("alert-active");
      } else {
        schoolKpiPanel.style.display = "none";
        schoolKpiPanel.classList.remove("alert-active");
      }
    }

    document.getElementById("provincial-school-filter-wrapper").style.display = "none";
    document.getElementById("block-province-death-creation").style.display = "none";
    document.getElementById("block-province-verify-deaths").style.display = "none";
    document.getElementById("block-province-payment-matrix").style.display = "none";
    document.getElementById("block-province-payment-arrears-checker").style.display = "none";
    document.getElementById("block-school-payments-actions").style.display = "block";
    document.getElementById("block-school-death-creation").style.display = "block";
    document.getElementById("widget-provincial-schools-rankings").style.display = "none";
    const schoolCertWidget = document.getElementById("widget-school-bi-annual-certification");
    if (schoolCertWidget) {
      schoolCertWidget.style.display = "block";
      updateSchoolCertificationWidget();
    }

    renderSchoolPositionStats(schoolMembers, currentSchool);

    // แสดงสถิติการใช้งานเครื่อง 10 เครื่อง
    const kpiSchoolDevices = document.getElementById("kpi-school-devices");
    if (kpiSchoolDevices) {
      kpiSchoolDevices.style.display = "flex";
      const profile = appState.schoolProfiles[appState.activeSchoolId] || {};
      const devices = profile.devices || [];
      
      const countEl = document.getElementById("stat-school-devices-count");
      const progressEl = document.getElementById("stat-school-devices-progress");
      
      if (countEl) countEl.textContent = `${devices.length}/10 เครื่อง`;
      if (progressEl) {
        progressEl.style.width = `${devices.length * 10}%`;
        if (devices.length >= 10) {
          progressEl.style.background = "var(--color-accent-rose)";
          if (countEl) countEl.style.color = "var(--color-accent-rose)";
        } else {
          progressEl.style.background = "var(--color-accent-amber)";
          if (countEl) countEl.style.color = "white";
        }
      }
    }
  }

  // --- อัปเดตตัวกราฟิกพรีเมียม สรุปการสมัครสมาชิกเป็นสมาชิก/ไม่เป็นสมาชิก ---
  const visualMembersRing = document.getElementById("visual-members-ring");
  const visualMembersPercent = document.getElementById("visual-members-percent");
  const visualMembersCount = document.getElementById("visual-members-count");
  const visualMembersBar = document.getElementById("visual-members-bar");
  const visualNonmembersCount = document.getElementById("visual-nonmembers-count");
  const visualNonmembersBar = document.getElementById("visual-nonmembers-bar");
  const visualTotalCount = document.getElementById("visual-total-count");
  const visualStatusIndicator = document.getElementById("visual-status-indicator");
  const graphicsTitle = document.getElementById("membership-graphics-title");
  const graphicsSubtitle = document.getElementById("membership-graphics-subtitle");

  let currentTotal = 0;
  let currentActive = 0;
  let currentNonActive = 0;
  let currentRatio = 0;

  if (appState.activeRole === "province" || appState.activeRole === "committee") {
    let totalProvincePersonnel = 0;
    SCHOOLS.forEach(s => {
      if (s.id !== "33") {
        const p = getSchoolPersonnel(s.id);
        totalProvincePersonnel += p.director + p.deputy + p.teacher + (p.govTeacher || 0) + (p.tempTeacher || 0) + (p.adminStaff || 0) + p.other + (p.maid || 0) + (p.service || 0);
      }
    });
    const activePensioners = activeMembers.filter(m => m.schoolId === "33").length;
    totalProvincePersonnel += activePensioners; 

    currentTotal = totalProvincePersonnel;
    currentActive = activeMembers.length;
    currentNonActive = totalProvincePersonnel - activeMembers.length;
    currentRatio = totalProvincePersonnel > 0 ? Math.round((activeMembers.length / totalProvincePersonnel) * 100) : 0;
    
    if (graphicsTitle) graphicsTitle.querySelector("span").textContent = "สรุปสถานะการสมัครสมาชิก สสมน. (Nan Province Membership Status Visualizer)";
    if (graphicsSubtitle) graphicsSubtitle.textContent = "กราฟิกเปรียบเทียบสัดส่วนยอดการเป็นสมาชิกและผู้ประสงค์ไม่เป็นสมาชิก สสมน. ทั้งจังหวัดน่าน";
  } else {
    const schoolMembers = activeMembers.filter(m => m.schoolId === appState.activeSchoolId);
    let schoolPersonnelTotal = 0;
    if (appState.activeSchoolId === "33") {
      schoolPersonnelTotal = schoolMembers.length;
    } else {
      const p = getSchoolPersonnel(appState.activeSchoolId);
      schoolPersonnelTotal = p.director + p.deputy + p.teacher + (p.govTeacher || 0) + (p.tempTeacher || 0) + (p.adminStaff || 0) + p.other + (p.maid || 0) + (p.service || 0);
    }

    currentTotal = schoolPersonnelTotal;
    currentActive = schoolMembers.length;
    currentNonActive = schoolPersonnelTotal - schoolMembers.length;
    currentRatio = schoolPersonnelTotal > 0 ? Math.round((schoolMembers.length / schoolPersonnelTotal) * 100) : 0;

    if (graphicsTitle) graphicsTitle.querySelector("span").textContent = `สรุปสถานะการสมัครสมาชิก สสมน. สังกัด ${currentSchool.name}`;
    if (graphicsSubtitle) graphicsSubtitle.textContent = `กราฟิกเปรียบเทียบสัดส่วนยอดการเป็นสมาชิกและผู้ประสงค์ไม่เป็นสมาชิก สสมน. ในสังกัด ${currentSchool.name}`;
  }

  // อัปเดตค่าวัดและข้อความ
  if (visualMembersPercent) visualMembersPercent.textContent = currentRatio + "%";
  if (visualMembersCount) visualMembersCount.textContent = currentActive.toLocaleString();
  if (visualNonmembersCount) visualNonmembersCount.textContent = (currentNonActive < 0 ? 0 : currentNonActive).toLocaleString();
  if (visualTotalCount) visualTotalCount.textContent = currentTotal.toLocaleString();

  // คำนวณความกว้างบาร์ %
  const activeBarPercent = currentRatio;
  const nonActiveBarPercent = currentTotal > 0 ? Math.round(((currentNonActive < 0 ? 0 : currentNonActive) / currentTotal) * 100) : 0;

  if (visualMembersBar) visualMembersBar.style.width = activeBarPercent + "%";
  if (visualNonmembersBar) visualNonmembersBar.style.width = nonActiveBarPercent + "%";

  // คำนวณวงแหวนรอบ Donut SVG
  // เส้นรอบวง = 2 * PI * r = 2 * 3.14159 * 58 = 364.42
  const circumference = 364.42;
  const strokeDashoffset = circumference - (currentRatio / 100) * circumference;
  if (visualMembersRing) {
    visualMembersRing.style.strokeDasharray = circumference;
    visualMembersRing.style.strokeDashoffset = strokeDashoffset;
  }

  // อัปเดตข้อบ่งชี้ความมั่นคงโครงการ/สังกัด
  if (visualStatusIndicator) {
    if (currentRatio >= 75) {
      visualStatusIndicator.textContent = "ดีเยี่ยม (Excellent)";
      visualStatusIndicator.style.color = "var(--color-accent-emerald)";
    } else if (currentRatio >= 50) {
      visualStatusIndicator.textContent = "มั่นคง (Stable)";
      visualStatusIndicator.style.color = "var(--color-accent-blue)";
    } else if (currentRatio >= 25) {
      visualStatusIndicator.textContent = "ปานกลาง (Moderate)";
      visualStatusIndicator.style.color = "var(--color-accent-gold)";
    } else {
      visualStatusIndicator.textContent = "ควรปรับปรุง (Low)";
      visualStatusIndicator.style.color = "var(--color-accent-rose)";
    }
  }

  renderMembersDirectory();
  renderCremationMatrix();
  renderSchoolCremationInvoices();
  renderProvinceArrearsCheckerSelector();
  renderSchoolRankingsTable();
  renderTransferLogsTimeline();
  populateReportDeathDropdowns();
  renderPendingDeathsVerification();
  renderApprovedDeathCasesList();
  renderAnnouncementsBoard();
}

function renderProvincialPositionStats(activeMembers, totalProvincePersonnel) {
  const container = document.getElementById("widget-position-stats");
  const roles = [
    { key: "ผอ.", label: "ผู้อำนวยการ (ผอ. หรือ รก.ผอ.)", dbKey: "director" },
    { key: "รอง ผอ.", label: "รองผู้อำนวยการ (รอง ผอ.)", dbKey: "deputy" },
    { key: "ครู", label: "ข้าราชการครู", dbKey: "teacher" },
    { key: "พนักงานราชการ", label: "พนักงานราชการ", dbKey: "govTeacher" },
    { key: "ครูอัตราจ้าง", label: "ครูอัตราจ้าง", dbKey: "tempTeacher" },
    { key: "ธุรการโรงเรียน", label: "ธุรการโรงเรียน", dbKey: "adminStaff" },
    { key: "นักภารโรง", label: "นักภารโรง", dbKey: "other" },
    { key: "แม่บ้าน", label: "แม่บ้าน", dbKey: "maid" },
    { key: "เจ้าหน้าที่", label: "เจ้าหน้าที่", dbKey: "service" },
    { key: "บุคลากรอื่น ๆ", label: "บุคลากรอื่น ๆ", dbKey: "other" }
  ];
  
  let html = "";
  roles.forEach(role => {
    const membersCount = activeMembers.filter(m => m.position === role.key).length;
    let totalWorking = 0;
    SCHOOLS.forEach(s => {
      if (s.id !== "33") {
        totalWorking += getSchoolPersonnel(s.id)[role.dbKey];
      }
    });

    let label = role.label;
    if (role.key === "ครู") {
      const pensionersCount = activeMembers.filter(m => m.position === "ข้าราชการบำนาญ").length;
      label = "ข้าราชการครู & ครูบำนาญ";
    }

    const percentage = totalWorking > 0 ? Math.round((membersCount / totalWorking) * 100) : 100;
    const boundedPercent = percentage > 100 ? 100 : percentage;
    const nonMembers = totalWorking - membersCount < 0 ? 0 : totalWorking - membersCount;

    html += `
      <div class="stat-item-row">
        <div class="stat-row-meta">
          <div class="position-label-wrapper">
            <span class="position-name">${label}</span>
            <span class="personnel-ratio-detail">สมาชิก ${membersCount} ราย / ไม่เป็นสมาชิก ${nonMembers} ราย (ทั้งหมด ${totalWorking} คน)</span>
          </div>
          <div class="stat-percentages-text">
            <span class="percentage-value">${percentage}%</span>
            <span class="members-active-count">ร้อยละการเข้าร่วม สสมน.</span>
          </div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${boundedPercent}%"></div>
        </div>
      </div>
    `;
  });

  const activePensioners = activeMembers.filter(m => m.position === "ข้าราชการบำนาญ").length;
  html += `
    <div class="stat-item-row">
      <div class="stat-row-meta">
        <div class="position-label-wrapper">
          <span class="position-name">ข้าราการบำนาญ (สังกัดบำนาญหน่วย 33)</span>
          <span class="personnel-ratio-detail">เป็นสมาชิก สสมน. แล้วทั้งหมด ${activePensioners} คน</span>
        </div>
        <div class="stat-percentages-text">
          <span class="percentage-value">${activePensioners} คน</span>
          <span class="members-active-count">สมาชิก สสมน. บำนาญ</span>
        </div>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar-fill" style="width: 100%"></div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function renderSchoolPositionStats(schoolMembers, school) {
  const container = document.getElementById("widget-position-stats");
  if (school.id === "33") {
    const membersCount = schoolMembers.length;
    container.innerHTML = `
      <div class="stat-item-row">
        <div class="stat-row-meta">
          <div class="position-label-wrapper">
            <span class="position-name">สมาชิกโครงการบำนาญน่าน</span>
            <span class="personnel-ratio-detail">ยอดข้าราชการบำนาญที่เข้าร่วมสิทธิ ณ สังกัด 33</span>
          </div>
          <div class="stat-percentages-text">
            <span class="percentage-value">${membersCount} คน</span>
            <span class="members-active-count">จำนวนสมาชิก</span>
          </div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: 100%"></div>
        </div>
      </div>
    `;
    return;
  }

  const roles = [
    { key: "ผอ.", label: "ผู้อำนวยการ (ผอ. หรือ รก.ผอ.)", dbKey: "director" },
    { key: "รอง ผอ.", label: "รองผู้อำนวยการ (รอง ผอ.)", dbKey: "deputy" },
    { key: "ครู", label: "ข้าราชการครู", dbKey: "teacher" },
    { key: "พนักงานราชการ", label: "พนักงานราชการ", dbKey: "govTeacher" },
    { key: "ครูอัตราจ้าง", label: "ครูอัตราจ้าง", dbKey: "tempTeacher" },
    { key: "ธุรการโรงเรียน", label: "ธุรการโรงเรียน", dbKey: "adminStaff" },
    { key: "นักภารโรง", label: "นักภารโรง", dbKey: "other" },
    { key: "แม่บ้าน", label: "แม่บ้าน", dbKey: "maid" },
    { key: "เจ้าหน้าที่", label: "เจ้าหน้าที่", dbKey: "service" },
    { key: "บุคลากรอื่น ๆ", label: "บุคลากรอื่น ๆ", dbKey: "other" }
  ];
  
  let html = "";
  roles.forEach(role => {
    const membersCount = schoolMembers.filter(m => m.position === role.key).length;
    const totalWorking = getSchoolPersonnel(school.id)[role.dbKey];
    const percentage = totalWorking > 0 ? Math.round((membersCount / totalWorking) * 100) : 0;
    const nonMembers = totalWorking - membersCount < 0 ? 0 : totalWorking - membersCount;

    html += `
      <div class="stat-item-row">
        <div class="stat-row-meta">
          <div class="position-label-wrapper">
            <span class="position-name">${role.label}</span>
            <span class="personnel-ratio-detail">สมาชิก ${membersCount} ราย / ไม่เป็นสมาชิก ${nonMembers} ราย (ทั้งหมด ${totalWorking} คน)</span>
          </div>
          <div class="stat-percentages-text">
            <span class="percentage-value">${percentage}%</span>
            <span class="members-active-count">อัตราการเป็นสมาชิก</span>
          </div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${percentage}%"></div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderSchoolRankingsTable() {
  const tbody = document.getElementById("tbl-body-school-rankings");
  if (!tbody) return;

  const orderFilter = document.getElementById("filter-ranking-order").value;
  const activeMembers = appState.members.filter(m => m.status === "active");

  let data = SCHOOLS.map(school => {
    const schoolMembersCount = activeMembers.filter(m => m.schoolId === school.id).length;
    let totalWorking = 0;
    if (school.id === "33") {
      totalWorking = schoolMembersCount; 
    } else {
      const p = getSchoolPersonnel(school.id);
      totalWorking = p.director + p.deputy + p.teacher + (p.govTeacher || 0) + (p.tempTeacher || 0) + (p.adminStaff || 0) + p.other + (p.maid || 0) + (p.service || 0);
    }

    const ratio = totalWorking > 0 ? Math.round((schoolMembersCount / totalWorking) * 100) : 0;
    const nonMembers = totalWorking - schoolMembersCount < 0 ? 0 : totalWorking - schoolMembersCount;

    return {
      id: school.id,
      name: school.name,
      totalPersonnel: totalWorking,
      members: schoolMembersCount,
      nonMembers: nonMembers,
      ratio: ratio
    };
  });

  if (orderFilter === "ratio-desc") {
    data.sort((a, b) => b.ratio - a.ratio || b.members - a.members);
  } else if (orderFilter === "ratio-asc") {
    data.sort((a, b) => a.ratio - b.ratio || a.members - b.members);
  } else if (orderFilter === "total-personnel") {
    data.sort((a, b) => b.totalPersonnel - a.totalPersonnel);
  } else if (orderFilter === "non-members") {
    data.sort((a, b) => b.nonMembers - a.nonMembers);
  }

  let html = "";
  data.forEach(item => {
    html += `
      <tr>
        <td class="text-center font-weight-bold text-currency">${item.id}</td>
        <td class="font-weight-bold">${item.name}</td>
        <td class="text-center text-currency">${item.totalPersonnel.toLocaleString()}</td>
        <td class="text-center text-currency text-success font-weight-bold">${item.members.toLocaleString()}</td>
        <td class="text-center text-currency ${item.nonMembers > 0 ? 'text-warning' : ''}">${item.nonMembers.toLocaleString()}</td>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="progress-bar-container" style="width: 80px; height: 6px; margin: 0;">
              <div class="progress-bar-fill" style="width: ${item.ratio}%"></div>
            </div>
            <span class="text-currency font-weight-bold" style="font-size:12px;">${item.ratio}%</span>
          </div>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function populateSchoolsDropdowns() {
  const filterSchool = document.getElementById("filter-member-school");
  const formSchool = document.getElementById("member-school");
  const transferNewSchool = document.getElementById("transfer-new-school-id");
  const loginSchoolSelect = document.getElementById("login-select-school");

  let filterHtml = '<option value="all">ทุกโรงเรียน/หน่วยงาน</option>';
  let formHtml = '<option value="" disabled selected>-- เลือกสังกัดโรงเรียน --</option>';
  let loginHtml = '';

  SCHOOLS.forEach(s => {
    const optionText = `${s.id} - ${s.name}`;
    filterHtml += `<option value="${s.id}">${optionText}</option>`;
    formHtml += `<option value="${s.id}">${optionText}</option>`;
    loginHtml += `<option value="${s.id}">${optionText}</option>`;
  });

  if (filterSchool) filterSchool.innerHTML = filterHtml;
  if (formSchool) formSchool.innerHTML = formHtml;
  if (transferNewSchool) transferNewSchool.innerHTML = formHtml;
  if (loginSchoolSelect) {
    loginSchoolSelect.innerHTML = loginHtml;
    loginSchoolSelect.value = appState.activeSchoolId;
  }
}

// ==================== 5. MEMBER DIRECTORY & FILE UPLOADS ====================
// ตัวแปลงไฟล์เอกสารประกอบเป็น Base64
function getBase64FromFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

// ฟังก์ชันแปลงเลขประจำตัวประชาชนให้อยู่ในรูปของการปกปิด (Masked Format)
function maskCitizenId(cid) {
  if (!cid) return "-";
  const clean = cid.replace(/-/g, "");
  if (clean.length < 13) return cid;
  // แสดงผลแบบปกปิด เช่น 1-2345-XXXXX-XX-X
  return `${clean.substring(0, 1)}-${clean.substring(1, 5)}-XXXXX-${clean.substring(10, 12)}-${clean.substring(12)}`;
}

// ฟังก์ชันสลับแสดง/ปกปิดรหัสผ่านโรงเรียนในทำเนียบ
window.toggleSchoolPasswordReveal = function(element, schoolId) {
  const span = element.querySelector(".masked-school-pwd");
  const eye = element.querySelector("span:last-child");
  if (!span) return;
  
  const pwd = appState.schoolPasswords[schoolId] || "school1234";
  if (span.textContent === "••••••••") {
    span.textContent = pwd;
    if (eye) eye.textContent = "🙈";
  } else {
    span.textContent = "••••••••";
    if (eye) eye.textContent = "👁️";
  }
};

// ฟังก์ชันสลับแสดง/ปกปิดรหัสผ่านในฟอร์มต่างๆ
window.togglePasswordInput = function(inputId, iconElement) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === "password") {
    input.type = "text";
    iconElement.textContent = "🙈";
  } else {
    input.type = "password";
    iconElement.textContent = "👁️";
  }
};

// ฟังก์ชันสลับแสดง/ปกปิดเลขประจำตัวประชาชนเมื่อคลิก
window.toggleCitizenIdReveal = function(element, originalCid) {
  const span = element.querySelector(".masked-cid");
  const eye = element.querySelector("span:last-child");
  if (!span) return;
  
  const cid = originalCid || element.getAttribute("data-original-cid") || "";
  const cleanOriginal = cid.replace(/-/g, "");
  const formattedOriginal = cleanOriginal.length === 13 
    ? `${cleanOriginal.substring(0, 1)}-${cleanOriginal.substring(1, 5)}-${cleanOriginal.substring(5, 10)}-${cleanOriginal.substring(10, 12)}-${cleanOriginal.substring(12)}`
    : cid;

  if (span.textContent.includes("X")) {
    span.textContent = formattedOriginal;
    if (eye) eye.textContent = "🙈";
  } else {
    span.textContent = maskCitizenId(cid);
    if (eye) eye.textContent = "👁️";
  }
};

function renderMembersDirectory() {
  const tableWrapper = document.querySelector(".main-table-wrapper");
  const emptyState = document.getElementById("tbl-members-empty");
  const resultCounter = document.getElementById("count-directory-results");
  const scopeLabel = document.getElementById("txt-directory-scope");
  
  if (!tableWrapper) return;

  const searchQuery = document.getElementById("member-search-input").value.trim().toLowerCase();
  const positionFilter = document.getElementById("filter-member-position").value;
  const schoolFilter = (appState.activeRole === "province" || appState.activeRole === "committee") ? document.getElementById("filter-member-school").value : appState.activeSchoolId;
  const statusFilter = document.getElementById("filter-member-status").value;

  let filtered = appState.members.filter(m => {
    if (appState.activeRole === "school") {
      return m.schoolId === appState.activeSchoolId;
    } else {
      if (schoolFilter !== "all" && m.schoolId !== schoolFilter) return false;
    }
    return true;
  });

  if (positionFilter !== "all") {
    filtered = filtered.filter(m => m.position === positionFilter);
  }

  if (statusFilter === "active") {
    filtered = filtered.filter(m => m.status === "active");
  } else if (statusFilter === "transferred") {
    filtered = filtered.filter(m => m.status === "transferred");
  } else if (statusFilter === "deceased") {
    filtered = filtered.filter(m => m.status === "deceased");
  } else if (statusFilter === "arrears") {
    filtered = filtered.filter(m => m.status === "active" && parseFloat(m.prepayBalance) < 0);
  }

  if (searchQuery) {
    filtered = filtered.filter(m => 
      m.id.toLowerCase().includes(searchQuery) ||
      m.firstname.toLowerCase().includes(searchQuery) ||
      m.lastname.toLowerCase().includes(searchQuery) ||
      m.citizenId.toLowerCase().includes(searchQuery) ||
      m.phone.toLowerCase().includes(searchQuery)
    );
  }

  resultCounter.textContent = filtered.length;
  
  if (appState.activeRole === "school") {
    const sch = SCHOOLS.find(s => s.id === appState.activeSchoolId);
    scopeLabel.textContent = `แสดงผลเฉพาะบุคลากรสังกัด ${sch ? sch.name : ""} ทั้งที่สังกัดอยู่และที่โอนย้ายออกแล้ว`;
  } else {
    scopeLabel.textContent = "ตารางสารบบข้อมูลสมาชิกพร้อมสถานะเงินกองกลางฌาปนกิจน่านทั้งจังหวัด";
  }

  const isAnyFilterActive = searchQuery || positionFilter !== "all" || statusFilter !== "active" || ((appState.activeRole === "province" || appState.activeRole === "committee") && schoolFilter !== "all");
  document.getElementById("btn-clear-directory-filters").style.display = isAnyFilterActive ? "inline-block" : "none";

  if (filtered.length === 0) {
    tableWrapper.innerHTML = "";
    emptyState.style.display = "flex";
    return;
  }

  emptyState.style.display = "none";

  if (appState.activeRole === "school") {
    // แสดงแบบตารางราบเดี่ยว (สิทธิ์โรงเรียน)
    tableWrapper.innerHTML = `
      <table class="premium-data-table" id="tbl-members-directory">
        <thead>
          <tr>
            <th>หมายเลขสมาชิก</th>
            <th>ชื่อ - นามสกุล</th>
            <th>ตำแหน่ง</th>
            <th>เลขประจำตัวประชาชน</th>
            <th>สังกัดโรงเรียน/หน่วยงาน</th>
            <th>เบอร์โทรศัพท์</th>
            <th class="text-right">เงินสะสมล่วงหน้า</th>
            <th class="text-center">ค่าแรกเข้า (50฿)</th>
            <th class="text-center">สถานะ</th>
            <th class="text-center">การดำเนินการ</th>
          </tr>
        </thead>
        <tbody id="tbl-body-members"></tbody>
      </table>
    `;
    
    const tbody = document.getElementById("tbl-body-members");
    let html = "";
    
    filtered.forEach(member => {
      const sch = SCHOOLS.find(s => s.id === member.schoolId);
      const balance = parseFloat(member.prepayBalance);
      
      let balanceClass = "text-success font-weight-bold";
      let statusBadge = `<span class="badge badge-active">ใช้งานอยู่</span>`;
      
      if (member.status === "deceased") {
        statusBadge = `<span class="badge badge-deceased">เสียชีวิต</span>`;
        balanceClass = "text-currency text-muted";
      } else if (member.status === "transferred") {
        statusBadge = `<span class="badge badge-transferred">ย้ายสังกัดแล้ว</span>`;
        balanceClass = "text-currency text-muted";
      } else if (balance < 0) {
        statusBadge = `<span class="badge badge-arrears">ค้างชำระ (เงินลบ)</span>`;
        balanceClass = "text-danger font-weight-bold";
      }

      let actionButtons = "";
      if (member.status === "active") {
        actionButtons = `
          <button class="btn-action-icon view-btn" onclick="openProfileViewer('${member.id}')" title="เปิดสมุดคู่ฝากและแฟ้มประวัติ">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          <button class="btn-action-icon edit-btn" onclick="openEditMemberModal('${member.id}')" style="color: var(--color-accent-amber); border-color: rgba(251, 191, 36, 0.2);" title="แก้ไขข้อมูลส่วนตัวและอัปเดตเอกสารแนบ">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path>
            </svg>
          </button>
          <button class="btn-action-icon transfer-btn" onclick="openTransferSchoolModal('${member.id}')" title="แจ้งโยกย้ายสังกัดโรงเรียนใหม่">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="17 1 21 5 17 9"></polyline>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <polyline points="7 23 3 19 7 15"></polyline>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
          </button>
          <button class="btn-action-icon delete-btn" onclick="deleteMember('${member.id}')" title="ลบข้อมูลถาวร">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        `;
      } else {
        actionButtons = `
          <button class="btn-action-icon view-btn" onclick="openProfileViewer('${member.id}')" title="เปิดดูประวัติและหลักฐาน">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          <button class="btn-action-icon edit-btn" onclick="openEditMemberModal('${member.id}')" style="color: var(--color-accent-amber); border-color: rgba(251, 191, 36, 0.2);" title="แก้ไขข้อมูลส่วนตัวและอัปเดตเอกสารแนบ">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path>
            </svg>
          </button>
        `;
      }

      const rowClass = member.status === "deceased" ? "row-deceased" : (member.status === "transferred" ? "row-transferred" : "");

      html += `
        <tr class="${rowClass}">
          <td class="font-weight-bold text-currency text-member-id">${member.id}</td>
          <td class="font-weight-bold">${member.title || ''}${member.firstname} ${member.lastname}</td>
          <td>${member.position}</td>
          <td class="text-currency" style="cursor: pointer; white-space: nowrap;" onclick="toggleCitizenIdReveal(this, '${member.citizenId}')" title="คลิกเพื่อแสดง/ปกปิดเลขบัตรประชาชน">
            <span class="masked-cid">${maskCitizenId(member.citizenId)}</span>
            <span style="margin-left: 4px; font-size: 11px; color: var(--color-text-muted);">👁️</span>
          </td>
          <td>${sch ? sch.name : 'ไม่ระบุ'}</td>
          <td class="text-currency">${member.phone}</td>
          <td class="text-right text-currency ${balanceClass}">
            ${balance >= 0 ? '฿' + balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '-฿' + Math.abs(balance).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </td>
          <td class="text-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${member.applicationFeePaid ? '#10b981' : '#f43f5e'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              ${member.applicationFeePaid ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'}
            </svg>
          </td>
          <td class="text-center">${statusBadge}</td>
          <td class="text-center">
            <div class="action-buttons-group">${actionButtons}</div>
          </td>
        </tr>
      `;
    });
    
    tbody.innerHTML = html;
  } else {
    // แสดงแบบโฟลเดอร์รายชื่อแยกโรงเรียน (สิทธิ์จังหวัด)
    let foldersHtml = "";
    
    SCHOOLS.forEach(sch => {
      const schoolMembers = filtered.filter(m => m.schoolId === sch.id);
      if (schoolMembers.length === 0) return; // ข้ามโรงเรียนที่ไม่มีสมาชิกตรงตามเงื่อนไขค้นหา
      
      let rowsHtml = "";
      schoolMembers.forEach(member => {
        const balance = parseFloat(member.prepayBalance);
        let balanceClass = "text-success font-weight-bold";
        let statusBadge = `<span class="badge badge-active">ใช้งานอยู่</span>`;
        
        if (member.status === "deceased") {
          statusBadge = `<span class="badge badge-deceased">เสียชีวิต</span>`;
          balanceClass = "text-currency text-muted";
        } else if (member.status === "transferred") {
          statusBadge = `<span class="badge badge-transferred">ย้ายสังกัดแล้ว</span>`;
          balanceClass = "text-currency text-muted";
        } else if (balance < 0) {
          statusBadge = `<span class="badge badge-arrears">ค้างชำระ (เงินลบ)</span>`;
          balanceClass = "text-danger font-weight-bold";
        }

        // แอดมินจังหวัด: ดูได้เท่านั้น ไม่มีปุ่มแก้ไข ลบ ย้ายสังกัด
        const actionButtons = `
          <button class="btn-action-icon view-btn" onclick="openProfileViewer('${member.id}')" title="เปิดดูรายละเอียดสมาชิกและสมุดคู่ฝาก">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        `;

        const rowClass = member.status === "deceased" ? "row-deceased" : (member.status === "transferred" ? "row-transferred" : "");

        rowsHtml += `
          <tr class="${rowClass}">
            <td class="font-weight-bold text-currency text-member-id">${member.id}</td>
            <td class="font-weight-bold">${member.title || ''}${member.firstname} ${member.lastname}</td>
            <td>${member.position}</td>
            <td class="text-currency" style="cursor: pointer; white-space: nowrap;" onclick="toggleCitizenIdReveal(this, '${member.citizenId}')" title="คลิกเพื่อแสดง/ปกปิดเลขบัตรประชาชน">
              <span class="masked-cid">${maskCitizenId(member.citizenId)}</span>
              <span style="margin-left: 4px; font-size: 11px; color: var(--color-text-muted);">👁️</span>
            </td>
            <td>${sch.name}</td>
            <td class="text-currency">${member.phone}</td>
            <td class="text-right text-currency ${balanceClass}">
              ${balance >= 0 ? '฿' + balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : '-฿' + Math.abs(balance).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </td>
            <td class="text-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${member.applicationFeePaid ? '#10b981' : '#f43f5e'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                ${member.applicationFeePaid ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'}
              </svg>
            </td>
            <td class="text-center">${statusBadge}</td>
            <td class="text-center">
              <div class="action-buttons-group">${actionButtons}</div>
            </td>
          </tr>
        `;
      });

      foldersHtml += `
        <details class="school-group-details glass" style="margin-bottom: 12px; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; overflow: hidden; background: rgba(15, 23, 42, 0.2);">
          <summary style="padding: 14px 18px; font-weight: 700; color: var(--color-accent-gold); cursor: pointer; user-select: none; display: flex; align-items: center; gap: 8px; background: rgba(30, 41, 59, 0.4); outline: none;">
            <span style="font-size: 16px;">📁</span>
            <span style="font-size: 14px; flex-grow: 1;">รหัส ${sch.id} - ${sch.name} (${schoolMembers.length} คน)</span>
            <span style="font-size: 11px; color: var(--color-text-dim);">คลิกเพื่อ เปิด/ปิด รายชื่อ</span>
          </summary>
          <div style="padding: 0; background: rgba(15, 23, 42, 0.1); border-top: 1px solid rgba(255,255,255,0.05); overflow-x: auto;">
            <table class="premium-data-table" style="margin: 0; border: none; border-radius: 0;">
              <thead>
                <tr>
                  <th>หมายเลขสมาชิก</th>
                  <th>ชื่อ - นามสกุล</th>
                  <th>ตำแหน่ง</th>
                  <th>เลขประจำตัวประชาชน</th>
                  <th>สังกัดโรงเรียน/หน่วยงาน</th>
                  <th>เบอร์โทรศัพท์</th>
                  <th class="text-right">เงินสะสมล่วงหน้า</th>
                  <th class="text-center">ค่าแรกเข้า (50฿)</th>
                  <th class="text-center">สถานะ</th>
                  <th class="text-center">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>
        </details>
      `;
    });

    tableWrapper.innerHTML = foldersHtml;
  }
}

// ยื่นสมัครหรือลงทะเบียนสมาชิกใหม่พร้อมอัปโหลดไฟล์ประกอบการสมัคร
document.getElementById("form-member").addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const actionType = document.getElementById("member-action-type").value;
  
  const memberTitleSelect = document.getElementById("member-title").value;
  const memberTitle = memberTitleSelect === "อื่น ๆ" ? document.getElementById("member-title-other").value.trim() : memberTitleSelect;
  
  const firstname = document.getElementById("member-firstname").value.trim();
  const lastname = document.getElementById("member-lastname").value.trim();
  const citizenId = document.getElementById("member-citizen-id").value.trim();
  const phone = document.getElementById("member-phone").value.trim();
  const gender = document.getElementById("member-gender").value;
  const position = document.getElementById("member-position").value;
  const schoolId = document.getElementById("member-school").value;
  const prepayBalanceRaw = document.getElementById("member-prepay-balance").value;
  const prepayBalance = prepayBalanceRaw !== "" ? (parseFloat(prepayBalanceRaw) || 0) : 0;
  const address = document.getElementById("member-address").value.trim();

  // ข้อมูลผู้รับผลประโยชน์
  const beneficiaryTitleSelect = document.getElementById("member-beneficiary-title").value;
  const beneficiaryTitle = beneficiaryTitleSelect === "อื่น ๆ" ? document.getElementById("member-beneficiary-title-other").value.trim() : beneficiaryTitleSelect;
  const beneficiaryName = document.getElementById("member-beneficiary-name").value.trim();
  const beneficiaryPhone = document.getElementById("member-beneficiary-phone").value.trim();
  const beneficiaryRelation = document.getElementById("member-beneficiary-relation").value;

  const duplicate = appState.members.find(m => m.citizenId === citizenId && m.status === "active");
  if (actionType === "create" && duplicate) {
    alert("ขออภัย! เลขประจำตัวประชาชนนี้ได้รับการสมัครเป็นสมาชิกและมีสิทธิในระบบแล้ว");
    return;
  }

  // อ่านไฟล์ภาพเอกสารแนบสมัคร (ถ้าคีย์เข้ามา)
  const fileApp = document.getElementById("member-doc-application").files[0];
  const fileCit = document.getElementById("member-doc-citizen").files[0];
  const fileHouse = document.getElementById("member-doc-household").files[0];
  const fileBeneficiaryId = document.getElementById("member-doc-beneficiary-id").files[0];

  const docApplication = fileApp ? await getBase64FromFile(fileApp) : null;
  const docCitizen = fileCit ? await getBase64FromFile(fileCit) : null;
  const docHousehold = fileHouse ? await getBase64FromFile(fileHouse) : null;
  const docBeneficiaryId = fileBeneficiaryId ? await getBase64FromFile(fileBeneficiaryId) : null;

  if (actionType === "create") {
    const generatedId = generateMemberId(schoolId, position);
    const isExisting = document.getElementById("member-status-option").value === "existing";

    const ledger = [];
    if (!isExisting) {
      ledger.push(INITIAL_LEDGER_ENTRY(50, "จ่ายค่าสมัครชำระแรกเข้าแรกสมัครใหม่"));
      ledger.push(INITIAL_LEDGER_ENTRY(prepayBalance, "เงินโอนสะสมล่วงหน้าแรกเข้า สสมน."));
    } else {
      ledger.push(INITIAL_LEDGER_ENTRY(prepayBalance, "ย้ายข้อมูลฐานเงินสะสมล่วงหน้าเดิมที่เคยชำระไว้"));
    }

    const newMember = {
      id: generatedId,
      title: memberTitle,
      firstname,
      lastname,
      citizenId,
      phone,
      gender,
      position,
      schoolId,
      prepayBalance: prepayBalance,
      applicationFeePaid: true,
      status: "active",
      address,
      beneficiary: {
        title: beneficiaryTitle,
        name: beneficiaryName,
        phone: beneficiaryPhone,
        relation: beneficiaryRelation
      },
      documents: {
        application: docApplication,
        citizen: docCitizen,
        household: docHousehold,
        beneficiaryId: docBeneficiaryId
      },
      ledger: ledger
    };

    appState.members.push(newMember);
    alert(`สมัครสมาชิกร่วม สสมน.น่าน สำเร็จ!\nหมายเลขสมาชิกของท่านคือ: ${generatedId}`);
  } else {
    const id = document.getElementById("member-custom-id").value;
    const member = appState.members.find(m => m.id === id);
    
    if (member) {
      member.title = memberTitle;
      member.firstname = firstname;
      member.lastname = lastname;
      member.citizenId = citizenId;
      member.phone = phone;
      member.gender = gender;
      member.position = position;
      member.schoolId = schoolId;
      member.address = address;
      
      member.beneficiary = {
        title: beneficiaryTitle,
        name: beneficiaryName,
        phone: beneficiaryPhone,
        relation: beneficiaryRelation
      };

      // ถ่ายรูปใหม่ถ้าแนบรูปเข้ามาใหม่
      if (!member.documents) member.documents = {};
      if (docApplication) member.documents.application = docApplication;
      if (docCitizen) member.documents.citizen = docCitizen;
      if (docHousehold) member.documents.household = docHousehold;
      if (docBeneficiaryId) member.documents.beneficiaryId = docBeneficiaryId;

      alert("แก้ไขข้อมูลส่วนตัวสมาชิกเรียบร้อยแล้ว");
    }
  }

  saveStateToLocalStorage();
  document.getElementById("modal-member").classList.remove("active");
  calculateStats();
});

window.deleteMember = function(memberId) {
  if (!confirm(`คุณต้องการลบข้อมูลสมาชิกหมายเลข ${memberId} ออกจากระบบ สสมน. อย่างถาวรใช่หรือไม่?\n*(การดำเนินการนี้จะไม่สามารถย้อนคืนค่าได้)`)) {
    return;
  }
  appState.members = appState.members.filter(m => m.id !== memberId);
  saveStateToLocalStorage();
  calculateStats();
};

// เปิดดูรูปหลักฐานในระบบ Lightbox
window.viewDocumentLightbox = function(base64Data, title) {
  if (!base64Data) {
    alert("ไม่มีไฟล์หลักฐานเอกสารนี้แนบอยู่ในระบบ");
    return;
  }
  document.getElementById("modal-doc-viewer-title").textContent = title;
  document.getElementById("img-doc-viewer-tag").src = base64Data;
  document.getElementById("modal-doc-viewer").classList.add("active");
};

// ==================== 6. SCHOOL TRANSFER & LOGGING LOGIC ====================
// ==================== 6. SCHOOL TRANSFER & LOGGING LOGIC ====================
window.openTransferSchoolModal = function(memberId) {
  const member = appState.members.find(m => m.id === memberId);
  if (!member) return;

  document.getElementById("transfer-member-row-index").value = memberId;
  document.getElementById("transfer-preview-name").textContent = `${member.firstname} ${member.lastname}`;
  
  const sch = SCHOOLS.find(s => s.id === member.schoolId);
  document.getElementById("transfer-preview-meta").textContent = `รหัสเดิม: ${member.id} // ตำแหน่ง: ${member.position} // สังกัดเดิม: ${sch ? sch.name : 'ไม่ระบุ'}`;
  document.getElementById("transfer-old-school-name").value = sch ? sch.name : 'ไม่ระบุ';

  // ป๊อปปูเลตตัวเลือกเหตุผลการย้ายตามตำแหน่งงานแบบไดนามิก!
  const selectReasonType = document.getElementById("transfer-reason-type");
  let reasonHtml = "";
  const pos = member.position.toString().toLowerCase();
  const isExec = pos.includes("ผู้อำนวยการ") || pos.includes("ผอ.") || pos.includes("รองผู้อำนวยการ") || pos.includes("รอง ผอ.");
  
  if (isExec) {
    reasonHtml = `
      <option value="ย้ายตามรอบ">ย้ายตามรอบการสับเปลี่ยนผู้บริหาร</option>
      <option value="ย้ายกรณีพิเศษ">ย้ายกรณีพิเศษ</option>
    `;
  } else {
    reasonHtml = `
      <option value="ย้ายประจำปี พ.ศ. ครั้งที่ 1">ย้ายประจำปีครั้งที่ 1</option>
      <option value="ย้ายประจำปี พ.ศ. ครั้งที่ 2">ย้ายประจำปีครั้งที่ 2</option>
      <option value="ย้ายสับเปลี่ยน">ย้ายสับเปลี่ยน</option>
      <option value="ย้ายกรณีพิเศษ">ย้ายกรณีพิเศษ</option>
    `;
  }
  selectReasonType.innerHTML = reasonHtml;

  // เคลียร์ฟิลด์และตั้งค่าเริ่มต้น
  document.getElementById("group-transfer-reason-year").style.display = "none";
  document.getElementById("transfer-reason-year").value = "2569";
  document.getElementById("transfer-effective-date").value = new Date().toISOString().substring(0, 10);
  document.getElementById("transfer-reason-note").value = "";

  const selectNewSchool = document.getElementById("transfer-new-school-id");
  let options = `<option value="" disabled selected>-- เลือกสังกัดโรงเรียนปลายทาง --</option>`;
  SCHOOLS.forEach(s => {
    if (s.id !== member.schoolId) {
      options += `<option value="${s.id}">${s.id} - ${s.name}</option>`;
    }
  });
  selectNewSchool.innerHTML = options;

  document.getElementById("modal-transfer-school").classList.add("active");
};

// ฟังก์ชันเปิด/ปิดกล่องกรอกปี พ.ศ. ของตัวเลือกเหตุผล
window.toggleTransferReasonYear = function() {
  const type = document.getElementById("transfer-reason-type").value;
  const yearGroup = document.getElementById("group-transfer-reason-year");
  if (type.includes("ย้ายประจำปี")) {
    yearGroup.style.display = "block";
    document.getElementById("transfer-reason-year").required = true;
  } else {
    yearGroup.style.display = "none";
    document.getElementById("transfer-reason-year").required = false;
  }
};

document.getElementById("form-member-transfer").addEventListener("submit", function(e) {
  e.preventDefault();

  const memberId = document.getElementById("transfer-member-row-index").value;
  const newSchoolId = document.getElementById("transfer-new-school-id").value;
  
  // แกะข้อมูลเหตุผลย้ายระดับลึก
  const reasonType = document.getElementById("transfer-reason-type").value;
  const reasonYear = document.getElementById("transfer-reason-year").value;
  const effectiveDate = document.getElementById("transfer-effective-date").value;
  const reasonNote = document.getElementById("transfer-reason-note").value.trim();

  const oldMember = appState.members.find(m => m.id === memberId);
  if (!oldMember) return;

  const oldSchool = SCHOOLS.find(s => s.id === oldMember.schoolId);
  const newSchool = SCHOOLS.find(s => s.id === newSchoolId);
  
  // รันรหัสใหม่โดยคงสิทธิ์การแยกกลุ่มรหัสสมาชิกตามตำแหน่ง
  const newMemberId = generateMemberId(newSchoolId, oldMember.position);
  const currentDateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

  // สรุปข้อความเหตุผลเชิงลึกและมีผลย้ายระบุวันที่
  let formattedReason = reasonType;
  if (reasonType.includes("ย้ายประจำปี")) {
    formattedReason = `${reasonType} ${reasonYear}`;
  }
  if (reasonNote) {
    formattedReason += ` (${reasonNote})`;
  }
  
  // แปลงรูปแบบวันที่ให้อ่านง่าย เช่น 2026-06-02 -> 02/06/2026
  let dateParts = effectiveDate.split("-");
  let displayDate = effectiveDate;
  if (dateParts.length === 3) {
    displayDate = `${dateParts[2]}/${dateParts[1]}/${parseInt(dateParts[0]) + 543}`; // แปลงเป็น พ.ศ.
  }
  
  formattedReason += ` [มีผลย้าย ณ วันที่: ${displayDate}]`;

  const newLedger = [
    ...oldMember.ledger,
    {
      date: currentDateStr,
      type: "deposit",
      amount: 0,
      description: `ย้ายเข้า: โอนฐานเงินสะสมจากสังกัดเก่า ${oldSchool.name} (รหัสเดิม: ${oldMember.id})`,
      balanceAfter: parseFloat(oldMember.prepayBalance)
    }
  ];

  const newActiveRecord = {
    ...oldMember,
    id: newMemberId,
    schoolId: newSchoolId,
    ledger: newLedger
  };

  oldMember.status = "transferred";
  oldMember.ledger.push({
    date: currentDateStr,
    type: "charge",
    amount: 0,
    description: `ย้ายออก: โอนเงินและปิดรหัสไปยัง ${newSchool.name} (รหัสใหม่คือ ${newMemberId}) // เหตุผล: ${formattedReason}`,
    balanceAfter: parseFloat(oldMember.prepayBalance)
  });

  appState.members.push(newActiveRecord);

  const provincialLog = {
    date: currentDateStr,
    memberName: `${oldMember.firstname} ${oldMember.lastname}`,
    oldSchool: oldSchool.name,
    newSchool: newSchool.name,
    oldId: oldMember.id,
    newId: newMemberId,
    reason: formattedReason,
    isDemo: appState.hasDemoData ? true : false
  };
  
  appState.transferLogs.unshift(provincialLog);

  saveStateToLocalStorage();
  document.getElementById("modal-transfer-school").classList.remove("active");
  alert(`โอนย้ายสถิติตำแหน่งสมาชิกสำเร็จ!\n${oldMember.firstname} ${oldMember.lastname} ได้รับการย้ายไปยัง ${newSchool.name}\nรหัสสมาชิกใหม่คือ: ${newMemberId}\nด้วยเหตุผล: ${formattedReason}`);
  calculateStats();
});

function renderTransferLogsTimeline() {
  const container = document.getElementById("widget-transfer-logs");
  if (!container) return;

  const validLogs = (appState.transferLogs || []).filter(log => log.type !== "system");

  if (validLogs.length === 0) {
    container.innerHTML = `<div class="timeline-empty">ไม่พบประวัติการทำเรื่องย้ายสังกัดในระบบ สสมน.</div>`;
    return;
  }

  let html = "";
  validLogs.forEach(log => {
    html += `
      <div class="transfer-log-card">
        <div class="transfer-log-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M4 4l17 17"/>
          </svg>
        </div>
        <div class="transfer-log-content">
          <h5>${log.memberName}</h5>
          <p>ย้ายสังกัดจาก <strong>${log.oldSchool}</strong> รหัสเดิม <span class="text-member-id font-weight-bold">${log.oldId}</span></p>
          <p>ไปยัง <strong>${log.newSchool}</strong> รับรหัสใหม่ <span class="text-success font-weight-bold">${log.newId}</span></p>
          <p class="field-help-text" style="margin-top:2px;">เหตุผล: ${log.reason}</p>
        </div>
        <div class="transfer-log-date">${log.date}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ฟังก์ชันคำนวณเงินสงเคราะห์และหาสมาชิกอ้างอิง ณ วันเสียชีวิตตามช่วงเวลา (รอบที่ 3)
function getDeathCalculationInfo(reportedDate, deceasedMember = null) {
  if (!reportedDate) return {
    refDateText: "-",
    activeMembersCount: 0,
    grossPayout: 0,
    operatingFee: 0,
    netPayout: 0,
    beneficiaryName: "ไม่ระบุ"
  };

  const d = new Date(reportedDate);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const md = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  let refYear = year;
  let refMonth = 6;
  let refDay = 30;
  let refDateText = "";
  let key = "";

  if (md >= '06-30' && md <= '12-29') {
    refYear = year;
    refMonth = 6;
    refDay = 30;
    refDateText = `30 มิ.ย. ${refYear + 543}`;
    key = `${refYear + 543}_R1`;
  } else if (md >= '12-30' && md <= '12-31') {
    refYear = year;
    refMonth = 12;
    refDay = 30;
    refDateText = `30 ธ.ค. ${refYear + 543}`;
    key = `${refYear + 543}_R2`;
  } else {
    // 01-01 ถึง 06-29
    refYear = year - 1;
    refMonth = 12;
    refDay = 30;
    refDateText = `30 ธ.ค. ${refYear + 543}`;
    key = `${refYear + 543}_R2`;
  }

  // คำนวณจำนวนสมาชิกอ้างอิง (เพื่อความสมจริง ใช้ฐานครูจังหวัดน่าน 3400+ คน + สมาชิกในฐานข้อมูลจำลองจริง)
  let baseMembersCount = 3400 + (refYear - 2025) * 60 + (refMonth === 6 ? 30 : 0);
  
  // ตรวจสอบว่าแอดมินเคยกดยืนยันรับรองและมียอดเก็บไว้หรือไม่
  let certifiedCountSum = 0;
  let certifiedSchoolsCount = 0;
  if (appState.certifications && appState.certifications[key]) {
    SCHOOLS.forEach(sch => {
      const cert = appState.certifications[key][sch.id];
      if (cert && cert.memberCount !== undefined) {
        certifiedCountSum += cert.memberCount;
        certifiedSchoolsCount++;
      }
    });
  }

  // ดึงยอดสมาชิกจริงในฐานข้อมูลมาสอดแทรกเพื่อความไดนามิก
  const dbActiveCount = appState.members.filter(m => m.status === "active").length;
  const finalActiveCount = baseMembersCount + dbActiveCount;

  const grossPayout = finalActiveCount * 30;
  const operatingFee = grossPayout * 0.05;
  const netPayout = grossPayout - operatingFee;

  let beneficiaryName = "ไม่ระบุ";
  if (deceasedMember && deceasedMember.beneficiary) {
    beneficiaryName = (deceasedMember.beneficiary.title || "") + (deceasedMember.beneficiary.name || "ไม่ระบุ");
  }

  return {
    refDateText,
    activeMembersCount: finalActiveCount,
    grossPayout,
    operatingFee,
    netPayout,
    beneficiaryName
  };
}

// ==================== 7. CREMATION DEATH REPORTING & SYSTEM DEDUCTION ====================
function populateReportDeathDropdowns() {
  const selectProvince = document.getElementById("death-member-id");
  const selectSchool = document.getElementById("school-death-member-id");

  const activeMembers = appState.members.filter(m => m.status === "active");

  if (selectProvince) {
    let pOptions = `<option value="" disabled selected>-- เลือกสมาชิกที่เสียชีวิต (เฉพาะสัญชาติใช้งานอยู่) --</option>`;
    activeMembers.forEach(m => {
      const sch = SCHOOLS.find(s => s.id === m.schoolId);
      pOptions += `<option value="${m.id}">${m.id} - ${m.firstname} ${m.lastname} (${sch ? sch.name : 'ไม่ระบุ'})</option>`;
    });
    selectProvince.innerHTML = pOptions;
  }

  if (selectSchool && appState.activeRole === "school") {
    const schoolActiveMembers = activeMembers.filter(m => m.schoolId === appState.activeSchoolId);
    let sOptions = `<option value="" disabled selected>-- เลือกสมาชิกในสังกัดของคุณที่ถึงแก่กรรม --</option>`;
    schoolActiveMembers.forEach(m => {
      sOptions += `<option value="${m.id}">${m.id} - ${m.firstname} ${m.lastname} (${m.position})</option>`;
    });
    selectSchool.innerHTML = sOptions;
  }
}

// 7.1 จังหวัดแจ้งสมาชิกถึงแก่กรรม (หักเงินทันที)
document.getElementById("form-report-death").addEventListener("submit", async function(e) {
  e.preventDefault();

  const memberId = document.getElementById("death-member-id").value;
  const reportedDate = document.getElementById("death-reported-date").value;
  const chargeAmount = parseFloat(document.getElementById("death-deduction-amount").value);
  const cause = document.getElementById("death-cause").value.trim() || "ธรรมชาติ";

  // แนบไฟล์หลักฐานประกอบการตายระดับจังหวัด
  const fileCertProv = document.getElementById("death-doc-cert-province").files[0];
  const fileIdProv = document.getElementById("death-doc-id-province").files[0];
  const fileHouseProv = document.getElementById("death-doc-house-province").files[0];

  const docCert = fileCertProv ? await getBase64FromFile(fileCertProv) : null;
  const docId = fileIdProv ? await getBase64FromFile(fileIdProv) : null;
  const docHouse = fileHouseProv ? await getBase64FromFile(fileHouseProv) : null;

  triggerDeathDeduction(memberId, reportedDate, chargeAmount, cause, {
    certificate: docCert,
    citizen: docId,
    household: docHouse
  });
});

// ตรรกะส่วนกลางในการหักเงินค่าศพสมาชิกทั้งจังหวัดและสร้างบิล
function triggerDeathDeduction(memberId, reportedDate, chargeAmount, cause, documents) {
  const deceasedMember = appState.members.find(m => m.id === memberId);
  if (!deceasedMember) return;

  const school = SCHOOLS.find(s => s.id === deceasedMember.schoolId);

  // 1. เปลี่ยนสถานะผู้ตายเป็นเสียชีวิต
  deceasedMember.status = "deceased";
  deceasedMember.ledger.push({
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    type: "charge",
    amount: 0,
    description: `ถึงแก่กรรมอย่างเป็นทางการเมื่อวันที่ ${reportedDate} ปิดข้อมูลยอดกองทุนฌาปนกิจ`,
    balanceAfter: parseFloat(deceasedMember.prepayBalance)
  });

  // 2. สร้างคดีผู้เสียชีวิตขึ้นมาในระบบ
  const deathCaseId = "DEATH_" + new Date().getTime();
  const calcInfo = getDeathCalculationInfo(reportedDate, deceasedMember);
  const deathCase = {
    id: deathCaseId,
    memberId: deceasedMember.id,
    name: `${deceasedMember.title || ''}${deceasedMember.firstname} ${deceasedMember.lastname}`,
    schoolName: school.name,
    schoolId: deceasedMember.schoolId,
    reportedDate,
    chargeAmount,
    cause,
    status: "approved", // อนุมัติทันที
    documents: documents || { certificate: null, citizen: null, household: null },
    
    // ข้อมูลคำนวณเงินสงเคราะห์ (รอบที่ 3)
    beneficiaryName: calcInfo.beneficiaryName,
    referenceDateText: calcInfo.refDateText,
    referenceMemberCount: calcInfo.activeMembersCount,
    grossPayout: calcInfo.grossPayout,
    operatingFee: calcInfo.operatingFee,
    netPayout: calcInfo.netPayout,
    isDemo: appState.hasDemoData ? true : false
  };
  
  appState.deathCases.unshift(deathCase);

  // 3. หักเงินสะสมล่วงหน้าของสมาชิกที่เหลือทุกคน 30 บาทอัตโนมัติ
  const activeMembers = appState.members.filter(m => m.status === "active");
  const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

  activeMembers.forEach(m => {
    const curBal = parseFloat(m.prepayBalance);
    const nextBal = curBal - chargeAmount;
    m.prepayBalance = nextBal;
    
    m.ledger.push({
      date: dateStr,
      type: "charge",
      amount: -chargeAmount,
      description: `หักเงินสงเคราะห์รายศพกรณีการเสียชีวิตของ ${deceasedMember.firstname} ${deceasedMember.lastname} (${deceasedMember.id})`,
      balanceAfter: nextBal
    });
  });

  // 4. คำนวณใบแจ้งหนี้ให้โรงเรียน
  SCHOOLS.forEach(sch => {
    const schoolActiveCount = activeMembers.filter(m => m.schoolId === sch.id).length;
    const totalOwed = schoolActiveCount * chargeAmount;

    const invoice = {
      deathCaseId: deathCaseId,
      deathCaseName: `${deceasedMember.firstname} ${deceasedMember.lastname}`,
      schoolId: sch.id,
      schoolName: sch.name,
      activeCount: schoolActiveCount,
      deductionAmount: chargeAmount,
      totalOwed: totalOwed,
      status: totalOwed > 0 ? "unpaid" : "paid", 
      slipData: null,
      isDemo: appState.hasDemoData ? true : false
    };
    appState.schoolInvoices.push(invoice);
  });

  saveStateToLocalStorage();
  alert(`แจ้งสิทธิ์ถึงแก่กรรมสมาชิกสำเร็จ!\nระบบทำรายการหักเงินค่าทำบุญจากสมาชิกที่เหลืออีก ${activeMembers.length} คนคนละ ${chargeAmount} บาทแล้ว`);
  
  // ล้างฟอร์มจังหวัด
  document.getElementById("form-report-death").reset();
  calculateStats();
}

// 7.2 โรงเรียนทำเรื่องแจ้งสมาชิกเสียชีวิต (ต้องแนบรูปใบมรณบัตร ปชช. ทะเบียนบ้าน)
document.getElementById("form-school-report-death").addEventListener("submit", async function(e) {
  e.preventDefault();

  const memberId = document.getElementById("school-death-member-id").value;
  const reportedDate = document.getElementById("school-death-reported-date").value;
  const cause = document.getElementById("school-death-cause").value.trim() || "เจ็บป่วย";

  // โหลดเอกสารแนบ 3 ตัว (บังคับ)
  const fileCert = document.getElementById("death-doc-cert").files[0];
  const fileId = document.getElementById("death-doc-id").files[0];
  const fileHouse = document.getElementById("death-doc-house").files[0];

  const docCert = await getBase64FromFile(fileCert);
  const docId = await getBase64FromFile(fileId);
  const docHouse = await getBase64FromFile(fileHouse);

  const deceasedMember = appState.members.find(m => m.id === memberId);
  if (!deceasedMember) return;

  const school = SCHOOLS.find(s => s.id === deceasedMember.schoolId);

  // สร้างคดีรอยืนยันการตาย (ยังไม่ตัดเงินจังหวัด)
  const deathCaseId = "DEATH_PEND_" + new Date().getTime();
  const calcInfo = getDeathCalculationInfo(reportedDate, deceasedMember);
  const pendingDeathCase = {
    id: deathCaseId,
    memberId: deceasedMember.id,
    name: `${deceasedMember.title || ''}${deceasedMember.firstname} ${deceasedMember.lastname}`,
    schoolName: school.name,
    schoolId: deceasedMember.schoolId,
    reportedDate,
    chargeAmount: 30, // ค่าคงที่หัก 30 บาท
    cause,
    status: "pending_approval", // รอแอดมินจังหวัดอนุมัติเอกสาร
    documents: {
      certificate: docCert,
      citizen: docId,
      household: docHouse
    },
    beneficiaryName: calcInfo.beneficiaryName,
    referenceDateText: calcInfo.refDateText,
    referenceMemberCount: calcInfo.activeMembersCount,
    grossPayout: calcInfo.grossPayout,
    operatingFee: calcInfo.operatingFee,
    netPayout: calcInfo.netPayout
  };

  appState.deathCases.unshift(pendingDeathCase);
  saveStateToLocalStorage();
  alert("ส่งเรื่องแจ้งสมาชิกเสียชีวิตสำเร็จ!\nกรุณารอแอดมินจังหวัดตรวจสอบเอกสารแนบประกอบ เพื่ออนุมัติและรันยอดชำระเงินของจังหวัดต่อไป");
  document.getElementById("form-school-report-death").reset();
  calculateStats();
});

// 7.3 เรนเดอร์รายการค้างอนุมัติความถึงแก่กรรม (สำหรับแอดมินจังหวัดตรวจสิทธิ์)
function renderPendingDeathsVerification() {
  const container = document.getElementById("school-pending-deaths-list");
  const counter = document.getElementById("count-pending-deaths");
  
  if (!container) return;

  const pendingDeaths = appState.deathCases.filter(d => d.status === "pending_approval");
  counter.textContent = pendingDeaths.length;

  if (pendingDeaths.length === 0) {
    container.innerHTML = `<div class="timeline-empty">ไม่มีรายงานแจ้งเสียชีวิตค้างการตรวจสอบอนุมัติ</div>`;
    return;
  }

  let html = "";
  pendingDeaths.forEach(death => {
    html += `
      <div class="transfer-log-card" style="border-color:rgba(239, 68, 68, 0.15); background:rgba(239, 68, 68, 0.02);">
        <div class="transfer-log-icon" style="color:var(--color-accent-rose); border-color:rgba(239, 68, 68, 0.25); background:rgba(239, 68, 68, 0.05)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>
        <div class="transfer-log-content">
          <h5 style="color:var(--color-accent-rose);">${death.name}</h5>
          <p>รหัสสมาชิก: <strong>${death.memberId}</strong> // โรงเรียนเดิม: <strong>${death.schoolName}</strong></p>
          <p class="field-help-text">วันที่แจ้งตาย: ${death.reportedDate} // สาเหตุ: ${death.cause}</p>
          
          <div class="supporting-docs-row" style="margin-top:10px;">
            <button class="btn-doc-link" onclick="viewDocumentLightbox(appState.deathCases.find(d => d.id === '${death.id}').documents.certificate, 'ใบมรณบัตร: ${death.name}')">
              📄 เปิดดูใบมรณบัตร
            </button>
            <button class="btn-doc-link" onclick="viewDocumentLightbox(appState.deathCases.find(d => d.id === '${death.id}').documents.citizen, 'สำเนาบัตร ปชช: ${death.name}')">
              📄 เปิดดูบัตรประชาชนผู้ตาย
            </button>
            <button class="btn-doc-link" onclick="viewDocumentLightbox(appState.deathCases.find(d => d.id === '${death.id}').documents.household, 'สำเนาทะเบียนบ้าน: ${death.name}')">
              📄 เปิดดูทะเบียนบ้าน
            </button>
          </div>
          
          <div class="verification-buttons-row" style="margin-top:12px; gap:8px;">
            <button class="btn btn-secondary btn-mini" style="background:rgba(239, 68, 68, 0.1); border-color:rgba(239, 68, 68, 0.2); color:var(--color-accent-rose);" onclick="rejectPendingDeath('${death.id}')">
              ปฏิเสธเคส
            </button>
            <button class="btn btn-success btn-mini" onclick="approvePendingDeath('${death.id}')">
              อนุมัติการการเสียชีวิต
            </button>
          </div>
        </div>
        <div class="transfer-log-date">${death.reportedDate}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// เรนเดอร์รายการสมาชิกผู้เสียชีวิตทั้งหมดพร้อมรายละเอียดการคำนวณเงินสงเคราะห์ (รอบที่ 3)
function renderApprovedDeathCasesList() {
  const container = document.getElementById("death-cases-items-list");
  if (!container) return;

  const approvedDeaths = appState.deathCases.filter(d => d.status !== "pending_approval");

  if (approvedDeaths.length === 0) {
    container.innerHTML = `<div class="empty-cases-message">ยังไม่มีรายงานสมาชิกถึงแก่กรรมในระบบ</div>`;
    return;
  }

  let html = "";
  approvedDeaths.forEach(death => {
    const member = appState.members.find(m => m.id === death.memberId) || {};
    
    const calc = {
      beneficiaryName: death.beneficiaryName || (member.beneficiary ? (member.beneficiary.title || "") + member.beneficiary.name : "ไม่ระบุ"),
      refDateText: death.referenceDateText || getDeathCalculationInfo(death.reportedDate, member).refDateText,
      activeMembersCount: death.referenceMemberCount || getDeathCalculationInfo(death.reportedDate, member).activeMembersCount,
      grossPayout: death.grossPayout || getDeathCalculationInfo(death.reportedDate, member).grossPayout,
      operatingFee: death.operatingFee || getDeathCalculationInfo(death.reportedDate, member).operatingFee,
      netPayout: death.netPayout || getDeathCalculationInfo(death.reportedDate, member).netPayout
    };

    const thDateStr = death.reportedDate ? new Date(death.reportedDate).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : "ไม่ระบุ";

    html += `
      <div class="death-case-payout-card glass" style="margin-bottom:16px; background:rgba(255,255,255,0.015); border:1px solid rgba(255,255,255,0.06); border-radius:var(--radius-lg); padding:20px; box-shadow:var(--shadow-md); transition:transform var(--transition-fast), border-color var(--transition-fast);">
        <div class="case-header" style="display:flex; justify-content:space-between; align-items:start; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:12px; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
          <div class="deceased-info">
            <h4 style="font-size:15.5px; font-weight:700; color:white; margin:0 0 4px 0; display:flex; align-items:center; gap:6px;">🕯️ ${death.name}</h4>
            <div style="font-size:12px; color:var(--color-text-dim);">
              รหัสสมาชิก: <strong style="color:var(--color-accent-gold); font-family:var(--font-number);">${death.memberId}</strong> | 
              สังกัดเดิม: <strong>${death.schoolName}</strong>
            </div>
            <div style="font-size:11.5px; color:var(--color-text-muted); margin-top:2px;">สาเหตุ: ${death.cause}</div>
          </div>
          <div class="death-date-badge" style="background:rgba(239, 68, 68, 0.1); border:1px solid rgba(239, 68, 68, 0.25); color:var(--color-accent-rose); font-size:11px; padding:4px 10px; border-radius:30px; font-weight:600;">
            ถึงแก่กรรม: ${thDateStr}
          </div>
        </div>
        
        <div class="case-details-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; align-items:stretch;">
          <div class="beneficiary-box glass" style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.04); border-radius:var(--radius-md); padding:14px 16px; display:flex; flex-direction:column; justify-content:center; gap:6px;">
            <div class="box-title" style="font-size:11px; font-weight:700; color:var(--color-accent-gold); letter-spacing:0.5px; text-transform:uppercase;">👤 สิทธิ์ผู้รับผลประโยชน์</div>
            <div class="beneficiary-name" style="font-size:14.5px; font-weight:700; color:white;">${calc.beneficiaryName}</div>
            <div class="beneficiary-meta" style="font-size:12px; color:var(--color-text-muted);">
              ความสัมพันธ์: <span style="color:white; font-weight:600;">${member.beneficiary ? member.beneficiary.relation : "ไม่ระบุ"}</span>
            </div>
            <div style="font-size:11.5px; color:var(--color-text-dim); display:flex; align-items:center; gap:5px; margin-top:2px;">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent-gold);">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>${member.beneficiary ? member.beneficiary.phone : "-"}</span>
            </div>
          </div>
          
          <div class="payout-calculation-box glass" style="background:rgba(255,255,255,0.01); border:1px solid rgba(255,255,255,0.03); border-radius:var(--radius-md); padding:14px 16px; display:flex; flex-direction:column; gap:6px;">
            <div class="box-title" style="font-size:11px; font-weight:700; color:var(--color-text-muted); letter-spacing:0.5px; text-transform:uppercase;">📊 บัญชีคำนวณเงินสงเคราะห์ (สสมน.)</div>
            <div class="calc-row" style="display:flex; justify-content:space-between; font-size:12px; color:var(--color-text-muted);">
              <span>จำนวนสมาชิก ณ วันอ้างอิง (${calc.refDateText})</span>
              <strong style="color:white; font-family:var(--font-number);">${calc.activeMembersCount.toLocaleString()} คน</strong>
            </div>
            <div class="calc-row" style="display:flex; justify-content:space-between; font-size:12px; color:var(--color-text-muted);">
              <span>เงินสงเคราะห์ (คนละ 30 บาท)</span>
              <strong style="color:white; font-family:var(--font-number);">฿${calc.grossPayout.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
            </div>
            <div class="calc-row text-rose" style="display:flex; justify-content:space-between; font-size:12px; color:var(--color-accent-rose);">
              <span>หักค่าดำเนินการ สสมน. (ร้อยละ 5)</span>
              <strong style="font-family:var(--font-number);">-฿${calc.operatingFee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
            </div>
            <div class="calc-divider" style="height:1px; background:rgba(255,255,255,0.08); margin:4px 0;"></div>
            <div class="calc-row net-payout-row" style="display:flex; justify-content:space-between; align-items:center; font-size:13px; font-weight:700; color:white;">
              <span style="color:var(--color-text-muted); font-size:11.5px; font-weight:600;">ยอดเงินสงเคราะห์สุทธิรับมอบ</span>
              <strong class="text-glow-emerald" style="font-family:var(--font-number); font-size:16px; color:var(--color-accent-emerald); text-shadow:0 0 10px rgba(16, 185, 129, 0.25);">฿${calc.netPayout.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// อนุมัติใบแจ้งเสียชีวิตของโรงเรียน (Province Admin)
window.approvePendingDeath = function(deathCaseId) {
  const deathCaseIndex = appState.deathCases.findIndex(d => d.id === deathCaseId);
  if (deathCaseIndex === -1) return;

  const death = appState.deathCases[deathCaseIndex];
  
  if (!confirm(`คุณต้องการอนุมัติการถึงแก่กรรมของ ${death.name} หรือไม่?\n*(เมื่ออนุมัติ ระบบจะรันกระบวนการหักเงินคนละ 30 บาท และส่งบิลหนี้รายโรงเรียนทันที)`)) {
    return;
  }

  // 1. นำข้อมูลเก่าออกจากลิสต์ pending (เพื่อไม่ให้ซ้ำซ้อน)
  appState.deathCases.splice(deathCaseIndex, 1);

  // 2. เรียกใช้งานระบบหักล้างยอดการเงินของจังหวัดโดยอัตโนมัติ
  triggerDeathDeduction(death.memberId, death.reportedDate, death.chargeAmount, death.cause, death.documents);
};

// ปฏิเสธใบแจ้งเสียชีวิตของโรงเรียน
window.rejectPendingDeath = function(deathCaseId) {
  if (!confirm("คุณต้องการปฏิเสธคดีแจ้งตายของโรงเรียนนี้ใช่หรือไม่? ข้อมูลประวัติและไฟล์เอกสารแนบจะถูกคัดลบออกจากระบบ")) {
    return;
  }
  appState.deathCases = appState.deathCases.filter(d => d.id !== deathCaseId);
  saveStateToLocalStorage();
  calculateStats();
};

// ==================== 8. CONSOLIDATED PAYMENT MATRIX & SLIPS VERIFICATION ====================
function renderCremationMatrix() {
  const container = document.getElementById("tbl-payment-matrix");
  const emptyView = document.getElementById("matrix-empty-view");
  const headerRow = document.getElementById("matrix-header-row");
  const tbody = document.getElementById("matrix-body-rows");

  if (!container || !tbody) return;

  // กรองเอาเฉพาะเคสที่ได้รับการอนุมัติ (approved) เพื่อโชว์ใน Matrix
  const approvedDeaths = appState.deathCases.filter(d => d.status !== "pending_approval");

  if (approvedDeaths.length === 0) {
    emptyView.style.display = "block";
    container.style.display = "none";
    return;
  }

  emptyView.style.display = "none";
  container.style.display = "table";

  let headerHtml = `<th>รายชื่อเคสศพผู้เสียชีวิต</th>`;
  SCHOOLS.forEach(sch => {
    headerHtml += `<th title="${sch.name}" style="cursor:help; text-align:center;">${sch.id}</th>`;
  });
  headerRow.innerHTML = headerHtml;

  let bodyHtml = "";
  approvedDeaths.forEach(death => {
    bodyHtml += `<tr>`;
    bodyHtml += `<td>
      <div class="deceased-meta-data">
        <h4>${death.name}</h4>
        <p>รหัส: ${death.memberId} // สังกัด: ${death.schoolName}</p>
        <p class="field-help-text">วันที่แจ้งเสียชีวิต: ${death.reportedDate}</p>
      </div>
    </td>`;

    SCHOOLS.forEach(sch => {
      const invoice = appState.schoolInvoices.find(inv => inv.deathCaseId === death.id && inv.schoolId === sch.id);
      
      if (!invoice || invoice.totalOwed === 0) {
        bodyHtml += `<td><span style="color:var(--color-text-dim); font-size:11px;">-</span></td>`;
      } else {
        let cellClass = "cell-unpaid";
        let cellSymbol = "🔴";
        
        if (invoice.status === "pending") {
          cellClass = "cell-pending";
          cellSymbol = "🟡";
        } else if (invoice.status === "paid") {
          cellClass = "cell-paid";
          cellSymbol = "🟢";
        }

        const tooltip = `${sch.name}\nยอดชำระ: ฿${invoice.totalOwed.toLocaleString()}\nสถานะ: ${invoice.status === 'unpaid' ? 'ค้างจ่าย' : (invoice.status === 'pending' ? 'รออนุมัติสลิป' : 'ชำระเงินเรียบร้อย')}`;

        bodyHtml += `
          <td>
            <button class="matrix-cell-status ${cellClass}" title="${tooltip}" onclick="handleMatrixCellClick('${death.id}', '${sch.id}')">
            </button>
          </td>
        `;
      }
    });

    bodyHtml += `</tr>`;
  });

  tbody.innerHTML = bodyHtml;
}

window.handleMatrixCellClick = function(deathCaseId, schoolId) {
  const invoice = appState.schoolInvoices.find(inv => inv.deathCaseId === deathCaseId && inv.schoolId === schoolId);
  if (!invoice) return;

  if (appState.activeRole !== "province" && appState.activeRole !== "committee") {
    alert(`สังกัด: ${invoice.schoolName}\nคดีศพ: ${invoice.deathCaseName}\nหนี้ค้างชำระ: ฿${invoice.totalOwed.toLocaleString()}\nสถานะชำระเงิน: ${invoice.status === 'unpaid' ? 'ยังไม่ได้โอนเงินและแนบหลักฐาน' : (invoice.status === 'pending' ? 'ส่งหลักฐานโอนเงินรอยืนยันแล้ว' : 'แอดมินจังหวัดยืนยันชำระแล้ว')}`);
    return;
  }

  if (invoice.status === "unpaid") {
    alert(`โรงเรียน ${invoice.schoolName} ยังไม่ได้ยื่นหลักฐานโอนเงิน ยอดค้างชำระคือ ฿${invoice.totalOwed.toLocaleString()}`);
    return;
  }

  openVerificationModal(invoice, invoice.status === "paid");
};

function openVerificationModal(invoice, viewOnly = false) {
  document.getElementById("verify-slip-image").src = invoice.slipData.imageUri;
  document.getElementById("verify-slip-school").textContent = invoice.schoolName;
  document.getElementById("verify-slip-date").textContent = invoice.slipData.transferDate.replace('T', ' ');
  document.getElementById("verify-slip-amount").textContent = "฿" + parseFloat(invoice.slipData.transferAmount).toLocaleString(undefined, {minimumFractionDigits: 2});
  document.getElementById("verify-slip-notes").textContent = invoice.slipData.notes || "ไม่มีการบันทึกหมายเหตุเพิ่มเติม";
  document.getElementById("verify-slip-death-cases").textContent = invoice.deathCaseName;

  document.getElementById("verify-slip-school-id").value = invoice.schoolId;
  document.getElementById("verify-slip-death-ids-str").value = invoice.deathCaseId;
  document.getElementById("verify-feedback-notes").value = "";

  const actionBlock = document.querySelector(".verification-decisions-form");
  if (viewOnly) {
    actionBlock.style.display = "none";
  } else {
    actionBlock.style.display = "block";
  }

  document.getElementById("modal-verify-slip").classList.add("active");
}

document.getElementById("btn-approve-slip").addEventListener("click", function() {
  const schoolId = document.getElementById("verify-slip-school-id").value;
  const deathCaseId = document.getElementById("verify-slip-death-ids-str").value;

  const invoice = appState.schoolInvoices.find(inv => inv.deathCaseId === deathCaseId && inv.schoolId === schoolId);
  if (!invoice) return;

  invoice.status = "paid";
  
  const activeMembersInSchool = appState.members.filter(m => m.schoolId === schoolId && m.status === "active");
  const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

  activeMembersInSchool.forEach(m => {
    m.ledger.push({
      date: dateStr,
      type: "deposit",
      amount: invoice.deductionAmount,
      description: `เงินโอนสงเคราะห์ล้างหนี้ศพของ ${invoice.deathCaseName} (ได้รับการอนุมัติบัญชี)`,
      balanceAfter: parseFloat(m.prepayBalance) + invoice.deductionAmount
    });
    m.prepayBalance = parseFloat(m.prepayBalance) + invoice.deductionAmount;
  });

  saveStateToLocalStorage();
  document.getElementById("modal-verify-slip").classList.remove("active");
  alert(`ยืนยันการรับยอดและอนุมัติสลิปโอนเงิน โรงเรียน ${invoice.schoolName} เรียบร้อยแล้ว!`);
  calculateStats();
});

document.getElementById("btn-reject-slip").addEventListener("click", function() {
  const schoolId = document.getElementById("verify-slip-school-id").value;
  const deathCaseId = document.getElementById("verify-slip-death-ids-str").value;
  const feedback = document.getElementById("verify-feedback-notes").value.trim() || "รูปสลิปไม่ชัดเจนหรือยอดโอนค้างจ่ายไม่ตรงบิลหนี้";

  const invoice = appState.schoolInvoices.find(inv => inv.deathCaseId === deathCaseId && inv.schoolId === schoolId);
  if (!invoice) return;

  invoice.status = "unpaid";
  invoice.slipData = null;
  
  saveStateToLocalStorage();
  document.getElementById("modal-verify-slip").classList.remove("active");
  alert(`ปฏิเสธหลักฐานสำเร็จ!\nสถานะของโรงเรียน ${invoice.schoolName} ในคดีศพนี้ ถูกส่งกลับเป็น "ค้างชำระ"\nข้อความส่งกลับ: ${feedback}`);
  calculateStats();
});

function renderProvinceArrearsCheckerSelector() {
  const select = document.getElementById("select-arrears-death-case");
  if (!select) return;

  // เอาเฉพาะเคสที่อนุมัติแล้วมาติดตาม
  const approvedDeaths = appState.deathCases.filter(d => d.status !== "pending_approval");

  let html = `<option value="" disabled selected>-- เลือกเคสการเสียชีวิตเพื่อตรวจสอบ --</option>`;
  approvedDeaths.forEach(death => {
    html += `<option value="${death.id}">${death.name} (${death.memberId} // สังกัดเดิม: ${death.schoolName})</option>`;
  });
  select.innerHTML = html;
}

document.getElementById("select-arrears-death-case").addEventListener("change", function() {
  const deathCaseId = this.value;
  const resultsDiv = document.getElementById("arrears-checker-results");
  
  const invoices = appState.schoolInvoices.filter(inv => inv.deathCaseId === deathCaseId);
  const unpaidInvoices = invoices.filter(inv => inv.status === "unpaid" && inv.totalOwed > 0);
  const pendingInvoices = invoices.filter(inv => inv.status === "pending");

  if (unpaidInvoices.length === 0 && pendingInvoices.length === 0) {
    resultsDiv.innerHTML = `
      <div class="kpi-card glass text-center" style="justify-content:center; background:rgba(16, 185, 129, 0.05);">
        <strong class="text-success" style="font-size:15px;">🎉 ทุกโรงเรียน/หน่วยงาน ทั้งจังหวัด ทำการโอนเงินและอนุมัติชำระยอดในศพนี้เรียบร้อยสมบูรณ์!</strong>
      </div>
    `;
    return;
  }

  let html = "";
  if (pendingInvoices.length > 0) {
    html += `<h5 style="color:var(--color-accent-gold); margin-bottom:8px; font-size:12.5px;">🟡 รอตรวจสอบการอนุมัติสลิป (${pendingInvoices.length} สังกัด):</h5>`;
    pendingInvoices.forEach(inv => {
      html += `
        <div class="arrears-school-row" style="background:rgba(251, 191, 36, 0.03); border-color:rgba(251, 191, 36, 0.15); cursor:pointer;" onclick="handleMatrixCellClick('${inv.deathCaseId}', '${inv.schoolId}')">
          <div class="arrears-school-info">
            <span class="arrears-school-name">${inv.schoolName}</span>
            <span class="arrears-member-count">สมาชิกที่โดนหัก ${inv.activeCount} คน // เงินโอนรออนุมัติ</span>
          </div>
          <span class="arrears-owe-cash text-warning">฿${inv.totalOwed.toLocaleString()}</span>
        </div>
      `;
    });
  }

  if (unpaidInvoices.length > 0) {
    html += `<h5 style="color:var(--color-accent-rose); margin:14px 0 8px 0; font-size:12.5px;">🔴 ค้างชำระเงินและสลิปหลักฐาน (${unpaidInvoices.length} สังกัด):</h5>`;
    unpaidInvoices.forEach(inv => {
      html += `
        <div class="arrears-school-row">
          <div class="arrears-school-info">
            <span class="arrears-school-name">${inv.schoolName}</span>
            <span class="arrears-member-count">สมาชิกโดนหักเงินสะสม ${inv.activeCount} คน</span>
          </div>
          <span class="arrears-owe-cash text-danger">฿${inv.totalOwed.toLocaleString()}</span>
        </div>
      `;
    });
  }

  resultsDiv.innerHTML = html;
});

// ==================== 9. SCHOOL ADMIN - UPLOAD SLIPS CONSOLE ====================
function renderSchoolCremationInvoices() {
  const container = document.getElementById("school-invoice-select-container");
  if (!container) return;

  if (appState.activeRole !== "school") return;

  const schoolInvoices = appState.schoolInvoices.filter(inv => inv.schoolId === appState.activeSchoolId);
  const unpaid = schoolInvoices.filter(inv => inv.status === "unpaid" && inv.totalOwed > 0);
  const pending = schoolInvoices.filter(inv => inv.status === "pending");
  const paid = schoolInvoices.filter(inv => inv.status === "paid");

  let html = "";
  if (unpaid.length > 0) {
    html += `<h5 style="color:var(--color-accent-rose); margin-bottom:12px; font-size:13.5px;">🔴 รายการค้างจ่ายค่าฌาปนกิจศพที่ต้องชำระ (${unpaid.length} เคส):</h5>`;
    unpaid.forEach(inv => {
      const death = appState.deathCases.find(d => d.id === inv.deathCaseId);
      html += `
        <div class="debt-invoice-selection-card" onclick="toggleDebtCardSelection(this, '${inv.deathCaseId}')">
          <input type="checkbox" data-death-id="${inv.deathCaseId}" data-owed="${inv.totalOwed}" class="debt-invoice-checkbox" onclick="event.stopPropagation(); recalculateSelectedDebtSum();">
          <div class="debt-card-details">
            <h5>เสียชีวิต: ${inv.deathCaseName}</h5>
            <p>วันที่เสียชีวิต: ${death ? death.reportedDate : 'ไม่ระบุ'} // หักบุคลากรสังกัดคุณ ${inv.activeCount} คน</p>
          </div>
          <div class="debt-card-price-tag">฿${inv.totalOwed.toLocaleString()}</div>
        </div>
      `;
    });
    
    html += `
      <div class="topup-action-box glass" style="margin-top:16px; background:rgba(217, 119, 6, 0.02); border-color:rgba(217, 119, 6, 0.15);">
        <div style="display:flex; justify-content:space-between; font-weight:700; font-size:14.5px; color:white; margin-bottom:12px;">
          <span>ยอดรวมชำระคัดเลือก:</span>
          <span id="school-selected-debt-sum-txt">฿0.00</span>
        </div>
        <button class="btn btn-primary btn-full-width btn-icon-text" id="btn-trigger-upload-slip" disabled onclick="openUploadSlipModal()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <path d="M12 8v8M8 12h8"></path>
          </svg>
          <span>แนบไฟล์สลิปเพื่อชำระหนี้โรงเรียน</span>
        </button>
      </div>
    `;
  } else {
    html += `
      <div class="kpi-card glass text-center" style="justify-content:center; background:rgba(16, 185, 129, 0.05); margin-bottom:16px;">
        <strong class="text-success" style="font-size:14px;">🎉 โรงเรียนของคุณชำระเงินค่าฌาปนกิจศพจังหวัดน่านครบถ้วนแล้ว!</strong>
      </div>
    `;
  }

  if (pending.length > 0) {
    html += `<h5 style="color:var(--color-accent-gold); margin:20px 0 12px 0; font-size:13.5px;">🟡 รอแอดมินจังหวัดตรวจสอบการเงิน (${pending.length} เคส):</h5>`;
    pending.forEach(inv => {
      html += `
        <div class="debt-invoice-selection-card" style="border-color:rgba(251, 191, 36, 0.2); cursor:default; background:rgba(251, 191, 36, 0.02);" onclick="handleMatrixCellClick('${inv.deathCaseId}', '${inv.schoolId}')">
          <div class="debt-card-details">
            <h5>ส่งสลิปแล้ว: ${inv.deathCaseName}</h5>
            <p>ยอดเงินโอน: ฿${inv.totalOwed.toLocaleString()} // ยื่นหลักฐานเพื่อเข้าสู่กระบวนการตรวจสิทธิ</p>
          </div>
          <div class="debt-card-price-tag text-warning" style="font-size:12px; font-weight:700;">รอยืนยันบัญชี</div>
        </div>
      `;
    });
  }

  if (paid.length > 0) {
    html += `<h5 style="color:var(--color-text-dim); margin:20px 0 12px 0; font-size:13.5px;">🟢 เคสศพที่อนุมัติเงินแล้ว (${paid.length} เคส):</h5>`;
    paid.forEach(inv => {
      html += `
        <div class="debt-invoice-selection-card" style="border-color:rgba(16, 185, 129, 0.1); cursor:default; background:rgba(16, 185, 129, 0.01);">
          <div class="debt-card-details">
            <h5 style="color:var(--color-text-muted)">อนุมัติแล้ว: ${inv.deathCaseName}</h5>
            <p>ยอดชำระสำเร็จ: ฿${inv.totalOwed.toLocaleString()} // สมาชิกในโรงเรียนได้รับการล้างสถานะ</p>
          </div>
          <div class="debt-card-price-tag text-success" style="font-size:12px; font-weight:700;">ชำระเรียบร้อย</div>
        </div>
      `;
    });
  }

  container.innerHTML = html;
}

window.toggleDebtCardSelection = function(card, deathCaseId) {
  const checkbox = card.querySelector(".debt-invoice-checkbox");
  checkbox.checked = !checkbox.checked;
  
  if (checkbox.checked) {
    card.classList.add("selected");
  } else {
    card.classList.remove("selected");
  }
  
  recalculateSelectedDebtSum();
};

window.recalculateSelectedDebtSum = function() {
  const checkboxes = document.querySelectorAll(".debt-invoice-checkbox");
  let total = 0;
  let selectedCount = 0;

  checkboxes.forEach(cb => {
    if (cb.checked) {
      total += parseFloat(cb.getAttribute("data-owed"));
      selectedCount++;
    }
  });

  const sumTxt = document.getElementById("school-selected-debt-sum-txt");
  const uploadBtn = document.getElementById("btn-trigger-upload-slip");

  if (sumTxt) sumTxt.textContent = "฿" + total.toLocaleString(undefined, {minimumFractionDigits: 2});
  if (uploadBtn) {
    uploadBtn.disabled = selectedCount === 0;
  }
};

window.openUploadSlipModal = function() {
  const checkboxes = document.querySelectorAll(".debt-invoice-checkbox");
  const activeSchool = SCHOOLS.find(s => s.id === appState.activeSchoolId);
  
  let selectedDeathIds = [];
  let debtsHtml = "";
  let totalOwed = 0;

  checkboxes.forEach(cb => {
    if (cb.checked) {
      const deathId = cb.getAttribute("data-death-id");
      const invoice = appState.schoolInvoices.find(inv => inv.deathCaseId === deathId && inv.schoolId === appState.activeSchoolId);
      
      selectedDeathIds.push(deathId);
      totalOwed += parseFloat(cb.getAttribute("data-owed"));

      debtsHtml += `
        <div class="slip-debt-line">
          <span>เคสทำบุญศพ: ${invoice.deathCaseName}</span>
          <strong class="text-currency">฿${invoice.totalOwed.toLocaleString()}</strong>
        </div>
      `;
    }
  });

  document.getElementById("slip-school-id").value = appState.activeSchoolId;
  document.getElementById("slip-death-ids").value = selectedDeathIds.join(",");
  document.getElementById("slip-preview-school-name").textContent = activeSchool.name;
  document.getElementById("slip-preview-debts-list").innerHTML = debtsHtml;
  document.getElementById("slip-preview-total-amount").textContent = "฿" + totalOwed.toLocaleString(undefined, {minimumFractionDigits: 2});
  document.getElementById("slip-transfer-amount").value = totalOwed;

  document.getElementById("slip-image-file").value = "";
  document.getElementById("block-slip-preview").style.display = "none";
  document.getElementById("img-slip-preview-tag").src = "";
  document.getElementById("slip-notes").value = "";
  
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  document.getElementById("slip-transfer-date").value = now.toISOString().slice(0, 16);

  document.getElementById("modal-upload-slip").classList.add("active");
};

document.getElementById("slip-image-file").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    document.getElementById("img-slip-preview-tag").src = evt.target.result;
    document.getElementById("block-slip-preview").style.display = "flex";
  };
  reader.readAsDataURL(file);
});

document.getElementById("form-upload-slip").addEventListener("submit", function(e) {
  e.preventDefault();

  const schoolId = document.getElementById("slip-school-id").value;
  const deathIds = document.getElementById("slip-death-ids").value.split(",");
  const transferDate = document.getElementById("slip-transfer-date").value;
  const transferAmount = parseFloat(document.getElementById("slip-transfer-amount").value);
  const notes = document.getElementById("slip-notes").value.trim();
  const imageUri = document.getElementById("img-slip-preview-tag").src;

  if (!imageUri) {
    alert("กรุณาเลือกหรืออัปโหลดรูปภาพสลิปหลักฐานเพื่อยืนยัน");
    return;
  }

  deathIds.forEach(deathId => {
    const invoice = appState.schoolInvoices.find(inv => inv.deathCaseId === deathId && inv.schoolId === schoolId);
    if (invoice) {
      invoice.status = "pending";
      invoice.slipData = {
        transferDate,
        transferAmount,
        imageUri,
        notes
      };
    }
  });

  saveStateToLocalStorage();
  document.getElementById("modal-upload-slip").classList.remove("active");
  alert("ส่งหลักฐานสลิปสำเร็จ!\nคำขอการอนุมัติสิทธิ์ได้รับการส่งไปยังระบบตรวจสอบของจังหวัดน่านแล้ว");
  calculateStats();
});

// ==================== 10. MEMBER DETAIL PROFILE & BENEFICIARY & LIGHTBOX ====================
window.openProfileViewer = function(memberId) {
  const member = appState.members.find(m => m.id === memberId);
  if (!member) return;

  const sch = SCHOOLS.find(s => s.id === member.schoolId);

  document.getElementById("view-profile-name").textContent = `${member.title || ''}${member.firstname} ${member.lastname}`;
  document.getElementById("view-profile-id").textContent = `รหัสสมาชิก: ${member.id}`;
  document.getElementById("view-profile-position").textContent = member.position;
  document.getElementById("view-profile-school").textContent = sch ? sch.name : 'ไม่ระบุ';

  const balance = parseFloat(member.prepayBalance);
  document.getElementById("view-profile-balance").textContent = "฿" + balance.toLocaleString(undefined, {minimumFractionDigits: 2});
  
  const statusEl = document.getElementById("view-profile-status");
  if (member.status === "deceased") {
    statusEl.textContent = "เสียชีวิตแล้ว";
    statusEl.className = "balance-status text-danger";
  } else if (member.status === "transferred") {
    statusEl.textContent = "ย้ายสังกัดเสร็จสิ้น";
    statusEl.className = "balance-status text-warning";
  } else if (balance >= 0) {
    statusEl.textContent = "สถานะการเงินปกติ";
    statusEl.className = "balance-status text-success";
  } else {
    statusEl.textContent = "ยอดเงินค้างชำระ (กรุณาเติมเงิน)";
    statusEl.className = "balance-status text-danger";
  }

  const citizenEl = document.getElementById("view-profile-citizen");
  if (citizenEl) {
    citizenEl.textContent = maskCitizenId(member.citizenId);
  }
  const citizenContainer = document.getElementById("view-profile-citizen-container");
  if (citizenContainer) {
    citizenContainer.setAttribute("data-original-cid", member.citizenId);
    const eye = citizenContainer.querySelector("span:last-child");
    if (eye) eye.textContent = "👁️"; // Reset eye icon
  }
  document.getElementById("view-profile-phone").textContent = member.phone;
  document.getElementById("view-profile-gender").textContent = member.gender;
  document.getElementById("view-profile-address").textContent = member.address;

  // เรนเดอร์ผู้รับผลประโยชน์
  const bName = document.getElementById("view-profile-beneficiary-name");
  const bPhone = document.getElementById("view-profile-beneficiary-phone");
  const bRelation = document.getElementById("view-profile-beneficiary-relation");

  if (member.beneficiary && member.beneficiary.name) {
    bName.textContent = (member.beneficiary.title || '') + member.beneficiary.name;
    bPhone.textContent = member.beneficiary.phone;
    bRelation.textContent = member.beneficiary.relation;
  } else {
    bName.textContent = "ไม่มีการระบุ";
    bPhone.textContent = "-";
    bRelation.textContent = "-";
  }

  // เรนเดอร์ปุ่มเอกสารแนบประกอบการสมัคร
  const docsBlock = document.getElementById("view-profile-docs-block");
  let docsHtml = "";
  
  if (member.documents) {
    const docApp = member.documents.application;
    const docCit = member.documents.citizen;
    const docHouse = member.documents.household;
    const docBeneficiaryId = member.documents.beneficiaryId;

    docsHtml += `
      <button class="btn-doc-link ${docApp ? '' : 'empty-doc'}" onclick="viewDocumentLightbox(appState.members.find(m => m.id === '${member.id}').documents.application, 'ใบสมัคร: ${member.firstname}')">
        📄 ใบสมัคร สสมน. ${docApp ? '✅' : '(ไม่ได้แนบ)'}
      </button>
      <button class="btn-doc-link ${docCit ? '' : 'empty-doc'}" onclick="viewDocumentLightbox(appState.members.find(m => m.id === '${member.id}').documents.citizen, 'บัตรประชาชน: ${member.firstname}')">
        📄 บัตรประชาชน ${docCit ? '✅' : '(ไม่ได้แนบ)'}
      </button>
      <button class="btn-doc-link ${docHouse ? '' : 'empty-doc'}" onclick="viewDocumentLightbox(appState.members.find(m => m.id === '${member.id}').documents.household, 'ทะเบียนบ้าน: ${member.firstname}')">
        📄 ทะเบียนบ้าน ${docHouse ? '✅' : '(ไม่ได้แนบ)'}
      </button>
      <button class="btn-doc-link ${docBeneficiaryId ? '' : 'empty-doc'}" onclick="viewDocumentLightbox(appState.members.find(m => m.id === '${member.id}').documents.beneficiaryId, 'บัตร ปชช. ผู้รับผลประโยชน์: ${member.firstname}')">
        📄 บัตร ปชช. ผู้รับผลประโยชน์ ${docBeneficiaryId ? '✅' : '(ไม่ได้แนบ)'}
      </button>
    `;
  } else {
    docsHtml = `<span style="font-size:12px; color:var(--color-text-dim);">ไม่มีการอัปโหลดเอกสารประกอบขณะลงทะเบียน</span>`;
  }
  docsBlock.innerHTML = docsHtml;

  document.getElementById("topup-member-row-index").value = memberId;
  document.getElementById("topup-amount").value = 100;
  
  const topupActionType = document.getElementById("topup-action-type");
  if (topupActionType) {
    topupActionType.value = "add";
  }
  const topupNote = document.getElementById("topup-note");
  if (topupNote) {
    topupNote.value = "";
  }
  if (typeof window.onTopupActionTypeChange === "function") {
    window.onTopupActionTypeChange();
  }

  const topupSection = document.getElementById("block-topup-section");
  if (member.status !== "active") {
    topupSection.style.display = "none";
  } else {
    topupSection.style.display = "block";
  }

  renderLedgerBook(member.ledger);
  document.getElementById("modal-profile-viewer").classList.add("active");
};

function renderLedgerBook(ledger = []) {
  const tbodyDeposits = document.getElementById("tbl-body-profile-ledger-deposits");
  const tbodyCharges = document.getElementById("tbl-body-profile-ledger-charges");
  
  if (!tbodyDeposits || !tbodyCharges) return;

  const reversedLedger = [...ledger].reverse();
  
  let depositsHtml = "";
  let chargesHtml = "";
  
  let depositCount = 0;
  let chargeCount = 0;

  reversedLedger.forEach(item => {
    const amt = parseFloat(item.amount) || 0;
    const balanceAfter = parseFloat(item.balanceAfter) || 0;
    const typeClass = item.type === "deposit" ? "text-success font-weight-bold" : "text-danger font-weight-bold";

    const rowHtml = `
      <tr>
        <td class="text-currency" style="font-size:11.5px; color:var(--color-text-dim);">${item.date}</td>
        <td style="font-size:12px; font-weight:500;">${item.description}</td>
        <td class="text-right text-currency ${typeClass}">
          ${amt >= 0 ? '+' + amt.toLocaleString() : amt.toLocaleString()}
        </td>
        <td class="text-right text-currency font-weight-bold">
          ฿${balanceAfter.toLocaleString(undefined, {minimumFractionDigits: 2})}
        </td>
      </tr>
    `;

    if (item.type === "deposit" || amt >= 0) {
      depositsHtml += rowHtml;
      depositCount++;
    } else {
      chargesHtml += rowHtml;
      chargeCount++;
    }
  });

  if (depositCount === 0) {
    tbodyDeposits.innerHTML = `<tr><td colspan="4" class="text-center" style="color:var(--color-text-dim); font-size:12px; padding:12px 0;">ไม่มีประวัติการฝาก/โอนเงินสะสม</td></tr>`;
  } else {
    tbodyDeposits.innerHTML = depositsHtml;
  }

  if (chargeCount === 0) {
    tbodyCharges.innerHTML = `<tr><td colspan="4" class="text-center" style="color:var(--color-text-dim); font-size:12px; padding:12px 0;">ไม่มีประวัติการหักชำระเงินสะสม</td></tr>`;
  } else {
    tbodyCharges.innerHTML = chargesHtml;
  }
}

window.onTopupActionTypeChange = function() {
  const type = document.getElementById("topup-action-type").value;
  const btn = document.getElementById("btn-submit-topup");
  const helpText = document.getElementById("topup-help-text");
  
  if (type === "add") {
    btn.style.background = "var(--color-accent-emerald)";
    btn.style.borderColor = "var(--color-accent-emerald)";
    btn.textContent = "ดำเนินการเพิ่มเงินสะสม";
    helpText.innerHTML = "* ป้อนยอดเงินเพื่อปรับปรุงยอดเงินสะสมล่วงหน้าของสมาชิกในสมุดคู่ฝากและประวัติบัญชี";
  } else {
    btn.style.background = "var(--color-accent-rose)";
    btn.style.borderColor = "var(--color-accent-rose)";
    btn.textContent = "ดำเนินการลดเงินสะสม";
    helpText.innerHTML = "* ระบุยอดเงินเพื่อหักออกหรือลดเงินสะสมของสมาชิก (เช่น การคืนเงิน หรือปรับปรุงยอด)";
  }
};

document.getElementById("form-profile-topup").addEventListener("submit", function(e) {
  e.preventDefault();

  const memberId = document.getElementById("topup-member-row-index").value;
  const topupAmount = parseFloat(document.getElementById("topup-amount").value);
  const actionType = document.getElementById("topup-action-type").value;
  const note = document.getElementById("topup-note").value.trim();

  const member = appState.members.find(m => m.id === memberId);
  if (!member) return;

  if (isNaN(topupAmount) || topupAmount <= 0) {
    alert("กรุณากรอกจำนวนเงินให้ถูกต้องและมากกว่า 0 บาท");
    return;
  }

  const currentBal = parseFloat(member.prepayBalance) || 0;
  let nextBal = currentBal;
  let ledgerType = "deposit";
  let amountVal = topupAmount;
  let defaultDesc = "";

  if (actionType === "add") {
    nextBal = currentBal + topupAmount;
    ledgerType = "deposit";
    amountVal = topupAmount;
    defaultDesc = "โอนเติมเงินสะสมล่วงหน้าเข้าระบบ สสมน.";
  } else if (actionType === "reduce") {
    nextBal = currentBal - topupAmount;
    ledgerType = "charge";
    amountVal = -topupAmount;
    defaultDesc = "ลด/ปรับปรุงเงินสะสมล่วงหน้าออกจากระบบ";
  }

  member.prepayBalance = nextBal;
  member.ledger.push({
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    type: ledgerType,
    amount: amountVal,
    description: note || defaultDesc,
    balanceAfter: nextBal
  });

  saveStateToLocalStorage();
  
  const actionText = actionType === "add" ? "เพิ่มเงินสะสมสำเร็จ!" : "ลดเงินสะสมสำเร็จ!";
  alert(`${actionText}\nคงเหลือปัจจุบัน ฿${nextBal.toLocaleString(undefined, {minimumFractionDigits: 2})}`);
  
  openProfileViewer(memberId);
  calculateStats();
});

// ==================== 11. EXCEL TEMPLATE EXPORT & IMPORT (CSV SYSTEM) ====================

// 11.1 ดาวน์โหลด Excel Template (.csv แบบ UTF-8 BOM เปิดใน Excel ภาษาไทยได้ทันที)
document.getElementById("btn-download-excel-template").addEventListener("click", function() {
  const headers = "คำนำหน้าชื่อสมาชิก,ชื่อจริง,นามสกุล,เลขประจำตัวประชาชน,ตำแหน่ง,เบอร์โทรศัพท์,เพศ,รหัสโรงเรียน,ที่อยู่ตามทะเบียนบ้าน,เงินสะสมล่วงหน้า,คำนำหน้าชื่อผู้รับผลประโยชน์,ชื่อผู้รับผลประโยชน์,เบอร์โทรผู้รับผลประโยชน์,ความสัมพันธ์";
  const exampleRow = 'นาย,สมศักดิ์,รักขุนเขา,1559900123456,ครู,0891234567,ชาย,01,"123 ม.2 ต.ในเวียง อ.เมืองน่าน จ.น่าน",150,นาง,อารี รักขุนเขา,0897654321,คู่สมรส';
  const csvContent = "\uFEFF" + headers + "\n" + exampleRow; // \uFEFF คือ UTF-8 BOM แก้สระไทยเพี้ยนใน Excel

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  
  downloadAnchor.setAttribute("href", url);
  downloadAnchor.setAttribute("download", "ฟอร์มลงทะเบียนสมาชิก_สสมน_น่าน_Template.csv");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
});

// 11.2 นำเข้าสมาชิกจาก Excel (CSV)
document.getElementById("btn-import-excel-trigger").addEventListener("click", function() {
  document.getElementById("import-excel-file").click();
});

document.getElementById("import-excel-file").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const fileName = file.name.toLowerCase();
  if (fileName.endsWith(".xlsx")) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      try {
        const data = evt.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet);
        
        if (rows.length === 0) {
          alert("ขออภัย! ไม่พบข้อมูลแถวในแผ่นงานสเปรดชีต Excel นี้");
          return;
        }

        let successCount = 0;
        let errors = [];

        rows.forEach((row, idx) => {
          const title = row["คำนำหน้า"] || row["คำนำหน้าชื่อสมาชิก"] || row["title"] || "นาย";
          let first = (row["ชื่อจริง"] || row["ชื่อ"] || row["firstName"] || "").toString().trim();
          let last = (row["นามสกุล"] || row["lastName"] || "").toString().trim();
          const citizen = String(row["เลขประจำตัวประชาชน"] || row["เลขบัตร"] || row["citizenId"] || "").trim();
          const position = row["ตำแหน่ง"] || row["position"] || "ครู";
          const phone = String(row["เบอร์โทรศัพท์"] || row["เบอร์โทร"] || row["phone"] || "080-000-0000").trim();
          const prepay = parseFloat(row["ยอดเงินฝากสะสมสำรอง"] || row["เงินสะสมล่วงหน้า"] || row["เงินฝาก"] || row["prepayBalance"] || 150);

          const benTitle = row["คำนำหน้าทายาท"] || row["คำนำหน้าชื่อผู้รับผลประโยชน์"] || "นาย";
          let benFirst = row["ชื่อจริงทายาท"] || row["ชื่อทายาท"] || row["ชื่อผู้รับผลประโยชน์"] || "-";
          let benLast = row["นามสกุลทายาท"] || "";
          const relation = row["ความสัมพันธ์"] || "อื่น ๆ";
          const benPhone = String(row["เบอร์โทรทายาท"] || row["เบอร์โทรผู้รับผลประโยชน์"] || "080-000-0000").trim();
          const statusText = row["สถานะบัญชี"] || row["สถานะ"] || "ปกติ (Active)";

          // Dual-Compatibility: Name recovery if blank
          if ((!first || !last) && citizen) {
            const existingMember = appState.members.find(m => m.citizenId === citizen);
            if (existingMember) {
              first = first || existingMember.firstname || existingMember.firstName;
              last = last || existingMember.lastname || existingMember.lastName;
            }
          }

          if (!first || !last) {
            errors.push(`แถวที่ ${idx + 2}: ชื่อหรือนามสกุลสมาชิกต้องไม่เป็นค่าว่าง`);
            return;
          }

          if (!citizen || citizen.length !== 13) {
            errors.push(`แถวที่ ${idx + 2}: บัตรประชาชน [${citizen}] ต้องเป็นตัวเลข 13 หลักเท่านั้น`);
            return;
          }

          const isDup = appState.members.find(m => m.citizenId === citizen && m.status === "active");
          if (isDup) {
            errors.push(`แถวที่ ${idx + 2}: ข้ามการสมัคร! สมาชิกบัตรประชาชน [${citizen}] ได้ลงทะเบียนใช้งานอยู่แล้ว`);
            return;
          }

          let targetSchoolId = appState.activeSchoolId;
          if (appState.activeRole === "province" || appState.activeRole === "committee") {
            targetSchoolId = String(row["รหัสโรงเรียน"] || row["schoolId"] || "33").padStart(2, "0");
          }

          let mStatus = "active";
          if (statusText.includes("เสียชีวิต")) mStatus = "deceased";
          else if (statusText.includes("โอนย้าย")) mStatus = "transferred";

          const generatedId = generateMemberId(targetSchoolId, position);
          
          const ledger = [
            INITIAL_LEDGER_ENTRY(50, "จ่ายค่าสมัครชำระแรกเข้าแรกสมัครใหม่ (ผ่านไฟล์ Excel XLSX)"),
            INITIAL_LEDGER_ENTRY(prepay, "เงินโอนสะสมล่วงหน้าแรกเข้า สสมน. (ผ่านไฟล์ Excel XLSX)")
          ];

          const newMember = {
            id: generatedId,
            title: title,
            firstname: first,
            lastname: last,
            citizenId: citizen,
            schoolId: targetSchoolId,
            position: position,
            phone: phone,
            prepayBalance: prepay,
            status: mStatus,
            beneficiaryTitle: benTitle,
            beneficiaryFirstName: benFirst,
            beneficiaryLastName: benLast,
            beneficiaryRelation: relation,
            beneficiaryPhone: benPhone,
            documents: {
              application: null,
              citizen: null,
              household: null,
              beneficiaryId: null
            },
            ledger: ledger
          };

          appState.members.push(newMember);
          successCount++;
        });

        saveStateToLocalStorage();
        calculateStats();
        
        document.getElementById("lbl-import-total-success").textContent = `จำนวนสมาชิกใหม่ที่ได้รับการรันรหัสและบันทึกเข้าระบบสำเร็จ: ${successCount} ราย`;
        const errorsBlock = document.getElementById("import-summary-errors-block");
        const errorsUl = document.getElementById("import-errors-list");

        if (errors.length > 0) {
          errorsBlock.style.display = "block";
          let errHtml = "";
          errors.forEach(err => {
            errHtml += `<li style="margin-bottom:4px;">❌ ${err}</li>`;
          });
          errorsUl.innerHTML = errHtml;
        } else {
          errorsBlock.style.display = "none";
        }

        document.getElementById("modal-import-summary").classList.add("active");
      } catch (err) {
        alert("ขออภัย! ไม่สามารถนำเข้าข้อมูลจากไฟล์ XLSX นี้ได้: " + err.message);
      }
    };
    reader.readAsBinaryString(file);
  } else {
    const reader = new FileReader();
    reader.onload = function(evt) {
      parseExcelCSVContent(evt.target.result);
    };
    reader.readAsText(file, "UTF-8"); // เปิดอ่านภาษาไทย
  }
});

// ตรรกะวิเคราะห์และนำเข้า CSV แถวสมาชิก
function parseExcelCSVContent(csvText) {
  const lines = csvText.split(/\r\n|\n/);
  if (lines.length <= 1) {
    alert("ไฟล์ว่างหรือไม่มีข้อมูลแถวสมาชิก");
    return;
  }

  const headers = lines[0].replace(/^\uFEFF/, "").split(",").map(h => h.trim());
  
  const getColIndex = (namesList, defaultIdx) => {
    for (let name of namesList) {
      const idx = headers.indexOf(name);
      if (idx !== -1) return idx;
    }
    return defaultIdx;
  };

  const idxTitle = getColIndex(["คำนำหน้าชื่อสมาชิก", "คำนำหน้า", "title"], 0);
  const idxFirstName = getColIndex(["ชื่อจริง", "ชื่อ", "firstName"], 1);
  const idxLastName = getColIndex(["นามสกุล", "lastName"], 2);
  const idxCitizen = getColIndex(["เลขประจำตัวประชาชน", "เลขบัตร", "citizenId"], 3);
  const idxPosition = getColIndex(["ตำแหน่ง", "position"], 4);
  const idxPhone = getColIndex(["เบอร์โทรศัพท์", "เบอร์โทร", "phone"], 5);
  const idxGender = getColIndex(["เพศ", "gender"], 6);
  const idxSchoolId = getColIndex(["รหัสโรงเรียน", "schoolId"], 7);
  const idxAddress = getColIndex(["ที่อยู่ตามทะเบียนบ้าน", "ที่อยู่", "address"], 8);
  const idxPrepay = getColIndex(["เงินสะสมล่วงหน้า", "ยอดเงินฝากสะสมสำรอง", "prepayBalance"], 9);
  const idxStatus = getColIndex(["สถานะบัญชี", "สถานะ", "status"], -1);

  const idxBTitle = getColIndex(["คำนำหน้าชื่อผู้รับผลประโยชน์", "คำนำหน้าทายาท", "beneficiaryTitle"], 10);
  const idxBName = getColIndex(["ชื่อผู้รับผลประโยชน์", "ชื่อจริงทายาท", "ชื่อทายาท", "beneficiaryFirstName"], 11);
  const idxBPhone = getColIndex(["เบอร์โทรผู้รับผลประโยชน์", "เบอร์โทรทายาท", "beneficiaryPhone"], 12);
  const idxBRelation = getColIndex(["ความสัมพันธ์", "beneficiaryRelation"], 13);

  let successCount = 0;
  let errors = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const columns = [];
    let insideQuote = false;
    let currentColumn = "";

    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      const char = line[charIndex];
      if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === ',' && !insideQuote) {
        columns.push(currentColumn.trim());
        currentColumn = "";
      } else {
        currentColumn += char;
      }
    }
    columns.push(currentColumn.trim());

    if (columns.length < 8) {
      errors.push(`แถวที่ ${i + 1}: ข้อมูลไม่ครบถ้วนหลักการลงทะเบียน`);
      continue;
    }

    const memberTitle = columns[idxTitle] || "นาย";
    let firstname = columns[idxFirstName] || "";
    let lastname = columns[idxLastName] || "";
    const citizenId = columns[idxCitizen] ? columns[idxCitizen].replace(/['"]/g, "") : "";
    const position = columns[idxPosition] || "ครู";
    const phone = columns[idxPhone] ? columns[idxPhone].replace(/['"]/g, "") : "";
    const gender = columns[idxGender] || "ชาย";
    const schoolId = String(columns[idxSchoolId] || "33").padStart(2, "0").replace(/['"]/g, "");
    const address = columns[idxAddress] ? columns[idxAddress].replace(/['"]/g, "") : "";
    const prepayBalance = parseFloat(columns[idxPrepay]) || 150;
    const statusText = idxStatus !== -1 ? columns[idxStatus] : "ปกติ (Active)";
    
    const bTitle = columns[idxBTitle] || "นาง";
    const bName = columns[idxBName] || "ไม่ระบุ";
    const bPhone = columns[idxBPhone] ? columns[idxBPhone].replace(/['"]/g, "") : "-";
    const bRelation = columns[idxBRelation] || "อื่น ๆ";

    // Dual-Compatibility: Name recovery if blank
    if ((!firstname || !lastname) && citizenId) {
      const existingMember = appState.members.find(m => m.citizenId === citizenId);
      if (existingMember) {
        firstname = firstname || existingMember.firstname || existingMember.firstName;
        lastname = lastname || existingMember.lastname || existingMember.lastName;
      }
    }

    if (!firstname || !lastname) {
      errors.push(`แถวที่ ${i + 1}: ชื่อหรือนามสกุลสมาชิกต้องไม่เป็นค่าว่าง`);
      continue;
    }

    if (!citizenId || citizenId.length !== 13 || !/^\d+$/.test(citizenId)) {
      errors.push(`แถวที่ ${i + 1}: บัตรประชาชน [${citizenId}] ต้องเป็นตัวเลข 13 หลักเท่านั้น`);
      continue;
    }

    const isDup = appState.members.find(m => m.citizenId === citizenId && m.status === "active");
    if (isDup) {
      errors.push(`แถวที่ ${i + 1}: ข้ามการสมัคร! สมาชิกบัตรประชาชน [${citizenId}] ได้ลงทะเบียนใช้งานอยู่แล้ว`);
      continue;
    }

    const targetSchoolId = (appState.activeRole === "province" || appState.activeRole === "committee") ? schoolId : appState.activeSchoolId;

    let mStatus = "active";
    if (statusText.includes("เสียชีวิต")) mStatus = "deceased";
    else if (statusText.includes("โอนย้าย")) mStatus = "transferred";

    const generatedId = generateMemberId(targetSchoolId, position);
    
    const ledger = [
      INITIAL_LEDGER_ENTRY(50, "จ่ายค่าสมัครชำระแรกเข้าแรกสมัครใหม่ (ผ่านไฟล์ Excel CSV)"),
      INITIAL_LEDGER_ENTRY(prepayBalance, "เงินโอนสะสมล่วงหน้าแรกเข้า สสมน. (ผ่านไฟล์ Excel CSV)")
    ];

    const newMember = {
      id: generatedId,
      title: memberTitle,
      firstname,
      lastname,
      citizenId,
      phone,
      gender,
      position,
      schoolId: targetSchoolId,
      prepayBalance: prepayBalance,
      applicationFeePaid: true,
      status: mStatus,
      address: address || "ไม่ระบุที่อยู่ชัดเจน",
      beneficiaryTitle: bTitle,
      beneficiaryFirstName: bName,
      beneficiaryLastName: "",
      beneficiaryRelation: bRelation,
      beneficiaryPhone: bPhone,
      documents: {
        application: null,
        citizen: null,
        household: null,
        beneficiaryId: null
      },
      ledger: ledger
    };

    appState.members.push(newMember);
    successCount++;
  }

  saveStateToLocalStorage();
  document.getElementById("import-excel-file").value = "";
  
  document.getElementById("lbl-import-total-success").textContent = `จำนวนสมาชิกใหม่ที่ได้รับการรันรหัสและบันทึกเข้าระบบสำเร็จ: ${successCount} ราย`;
  const errorsBlock = document.getElementById("import-summary-errors-block");
  const errorsUl = document.getElementById("import-errors-list");

  if (errors.length > 0) {
    errorsBlock.style.display = "block";
    let errHtml = "";
    errors.forEach(err => {
      errHtml += `<li style="margin-bottom:4px;">❌ ${err}</li>`;
    });
    errorsUl.innerHTML = errHtml;
  } else {
    errorsBlock.style.display = "none";
  }

  document.getElementById("modal-import-summary").classList.add("active");
  calculateStats();
}

// ==================== 12. DATA EXPORT & IMPORT (JSON BACKUP) ====================
document.getElementById("btn-export-data").addEventListener("click", function() {
  const data = {
    members: appState.members,
    deathCases: appState.deathCases,
    schoolInvoices: appState.schoolInvoices,
    transferLogs: appState.transferLogs,
    exportedAt: new Date().toISOString()
  };

  const jsonString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  const downloadAnchor = document.createElement('a');
  
  downloadAnchor.setAttribute("href", jsonString);
  downloadAnchor.setAttribute("download", `สสมน_น่าน_ฐานข้อมูล_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
});

document.getElementById("btn-import-trigger").addEventListener("click", function() {
  document.getElementById("import-database-file").click();
});

document.getElementById("import-database-file").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const data = JSON.parse(evt.target.result);
      if (data.members && data.deathCases && data.schoolInvoices) {
        appState.members = data.members;
        appState.deathCases = data.deathCases;
        appState.schoolInvoices = data.schoolInvoices;
        appState.transferLogs = (data.transferLogs || []).filter(l => l.type !== "system");
        
        saveStateToLocalStorage();
        alert("นำเข้าฐานข้อมูลสำรองสำเร็จ! ระบบได้รับการอัปเดตใหม่ทั้งหมดแล้ว");
        calculateStats();
      } else {
        alert("ขออภัย! โครงสร้างไฟล์ข้อมูลสำรอง JSON ไม่ถูกต้องเหมาะสม");
      }
    } catch(err) {
      alert("ขออภัย! ไม่สามารถถอดรหัสอ่านไฟล์ข้อมูลสำรอง JSON ได้");
    }
  };
  reader.readAsText(file);
});

// ==================== 13. LOGIN ENTRY GATE & AUTH CONTROLLER ====================
// ตัวแปรเก็บสิทธิ์ที่เลือกหน้า Login
let selectedLoginRole = "province";

document.getElementById("btn-login-role-province").addEventListener("click", function() {
  this.classList.add("active");
  document.getElementById("btn-login-role-committee").classList.remove("active");
  document.getElementById("btn-login-role-school").classList.remove("active");
  document.getElementById("login-school-wrapper").style.display = "none";
  selectedLoginRole = "province";
});

document.getElementById("btn-login-role-committee").addEventListener("click", function() {
  this.classList.add("active");
  document.getElementById("btn-login-role-province").classList.remove("active");
  document.getElementById("btn-login-role-school").classList.remove("active");
  document.getElementById("login-school-wrapper").style.display = "none";
  selectedLoginRole = "committee";
});

document.getElementById("btn-login-role-school").addEventListener("click", function() {
  this.classList.add("active");
  document.getElementById("btn-login-role-province").classList.remove("active");
  document.getElementById("btn-login-role-committee").classList.remove("active");
  document.getElementById("login-school-wrapper").style.display = "block";
  selectedLoginRole = "school";
});

// อุปกรณ์สำหรับการใช้งานระบบและการตรวจจับ Device ID
function getOrCreateDeviceId() {
  let devId = localStorage.getItem("สสมน_DEVICE_ID");
  if (!devId) {
    devId = "dev-" + Math.random().toString(36).substring(2, 15) + "-" + Date.now();
    localStorage.setItem("สสมน_DEVICE_ID", devId);
  }
  return devId;
}

function getFriendlyDeviceName() {
  const ua = navigator.userAgent;
  let os = "Unknown OS";
  if (ua.includes("Win")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

  let browser = "Unknown Browser";
  if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Edge")) browser = "Edge";
  
  return `${os} (${browser})`;
}

// ตรวจสอบสิทธิ์เข้าระบบและล็อกอิน
document.getElementById("form-login").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const password = document.getElementById("login-password").value;
  const schoolId = document.getElementById("login-select-school").value;
  
  if (selectedLoginRole === "province") {
    if (password === "province1234" || password === "province123") {
      appState.activeRole = "province";
      appState.activeSchoolId = "33"; // ส่วนกลางคือ 33 หรือโรงเรียนอ้างอิง
      loginSuccess();
    } else {
      alert("❌ รหัสผ่านแอดมินจังหวัดไม่ถูกต้อง กรุณาป้อน province1234");
      document.getElementById("login-password").focus();
    }
  } else if (selectedLoginRole === "committee") {
    const correctPwd = appState.committeePassword || "committee1234";
    if (password === correctPwd || password === "committee123") {
      appState.activeRole = "committee";
      appState.activeSchoolId = "33"; // ส่วนกลางคือ 33
      loginSuccess();
    } else {
      alert("❌ รหัสผ่านคณะกรรมการไม่ถูกต้อง กรุณาตรวจสอบรหัสผ่านใหม่หรือพิมพ์ committee1234");
      document.getElementById("login-password").focus();
    }
  } else {
    const correctPwd = appState.schoolPasswords[schoolId] || "school1234";
    if (password === correctPwd || password === "school123") {
      
      // ตรวจสอบและลงทะเบียนเครื่องอุปกรณ์
      const devId = getOrCreateDeviceId();
      const devName = getFriendlyDeviceName();
      const profile = appState.schoolProfiles[schoolId] || {
        address: "-", moo: "-", tumbon: "-", amphoe: "เมืองน่าน", phone: "-", fax: "-", director: "-", directorPhone: "-", coordinator: "-", coordinatorPhone: "-"
      };
      if (!profile.devices) profile.devices = [];
      
      const existingDevIndex = profile.devices.findIndex(d => d.id === devId);
      if (existingDevIndex !== -1) {
        profile.devices[existingDevIndex].lastActive = new Date().toISOString();
        profile.devices[existingDevIndex].name = devName;
      } else {
        if (profile.devices.length >= 10) {
          alert(`❌ ไม่สามารถเข้าสู่ระบบได้เนื่องจากบัญชีโรงเรียนนี้มีการใช้งานครบขีดจำกัด 10 อุปกรณ์แล้ว\n\n(ขณะนี้มีอุปกรณ์อื่นเข้าใช้อยู่ 10 อุปกรณ์)\nกรุณาติดต่อแอดมินจังหวัดเพื่อขอรีเซ็ตหรือล้างข้อมูลอุปกรณ์!`);
          document.getElementById("login-password").focus();
          return;
        }
        profile.devices.push({
          id: devId,
          name: devName,
          lastActive: new Date().toISOString()
        });
      }
      appState.schoolProfiles[schoolId] = profile;
      saveStateToLocalStorage();
      syncStateToCloudflare();

      appState.activeRole = "school";
      appState.activeSchoolId = schoolId;
      loginSuccess();
    } else {
      alert("❌ รหัสผ่านแอดมินโรงเรียนไม่ถูกต้อง กรุณาตรวจสอบรหัสสังกัดหรือพิมพ์ school1234");
      document.getElementById("login-password").focus();
    }
  }
});

function loginSuccess(isRestore = false) {
  // สลับซ่อนหน้าจอด่านหน้า
  document.getElementById("login-container").style.display = "none";
  document.getElementById("main-app-container").style.display = "flex";
  
  // บันทึกสถานะเซสชันใน sessionStorage เพื่อป้องกันการล็อกอินใหม่ทุกแท็บ
  sessionStorage.setItem("สสมน_NAN_LOGGED_IN", "true");
  sessionStorage.setItem("สสมน_NAN_LOGGED_IN_ROLE", appState.activeRole);
  sessionStorage.setItem("สสมน_NAN_LOGGED_IN_SCHOOL_ID", appState.activeSchoolId);

  // อัปเดตข้อมูลโปรไฟล์ผู้ใช้แถบ Sidebar
  const school = SCHOOLS.find(s => s.id === appState.activeSchoolId);
  const roleNameEl = document.getElementById("sidebar-admin-role-name");
  const scopeNameEl = document.getElementById("sidebar-admin-scope-name");
  
  if (appState.activeRole === "province") {
    if (roleNameEl) roleNameEl.textContent = "แอดมินจังหวัด";
    if (scopeNameEl) scopeNameEl.textContent = "จังหวัดน่าน (ทั้งหมด)";
  } else if (appState.activeRole === "committee") {
    if (roleNameEl) roleNameEl.textContent = "คณะกรรมการ สสมน.";
    if (scopeNameEl) scopeNameEl.textContent = "จังหวัดน่าน (สิทธิ์เทียบเท่าจังหวัด)";
  } else {
    if (roleNameEl) roleNameEl.textContent = "แอดมินโรงเรียน";
    if (scopeNameEl) scopeNameEl.textContent = school ? school.name : "ไม่ระบุสังกัด";
  }
  
  calculateStats();
  if (window.onRoleSwitched) window.onRoleSwitched();
  if (!isRestore) {
    switchTab("dashboard");
  }
}

// ออกจากระบบ
document.getElementById("btn-action-logout").addEventListener("click", function() {
  if (confirm("คุณต้องการออกจากระบบหรือไม่?")) {
    sessionStorage.removeItem("สสมน_NAN_LOGGED_IN");
    sessionStorage.removeItem("สสมน_NAN_LOGGED_IN_ROLE");
    sessionStorage.removeItem("สสมน_NAN_LOGGED_IN_SCHOOL_ID");
    document.getElementById("login-password").value = "";
    document.getElementById("main-app-container").style.display = "none";
    document.getElementById("login-container").style.display = "flex";
  }
});

function switchTab(tabId) {
  appState.activeTab = tabId;
  
  // สลับการแสดง Panel
  document.querySelectorAll(".view-panel").forEach(panel => {
    panel.classList.remove("active");
  });
  
  const activePanel = document.getElementById(`view-panel-${tabId}`);
  if (activePanel) {
    activePanel.classList.add("active");
  }

  // อัปเดตสถานะปุ่มเมนู Sidebar
  document.querySelectorAll(".sidebar-menu .menu-item").forEach(btn => {
    btn.classList.remove("active");
  });

  const activeBtn = document.getElementById(`btn-nav-${tabId}`);
  if (activeBtn) {
    activeBtn.classList.add("active");
  }

  // ตั้งค่าข้อมูลตามวิวมุมมอง
  if (tabId === "schools") {
    if (appState.activeRole === "school") {
      document.getElementById("block-school-profile-editor").style.display = "block";
      document.getElementById("block-province-schools-directory").style.display = "none";
      const coordDir = document.getElementById("block-school-coordinators-directory");
      if (coordDir) {
        coordDir.style.display = "block";
        renderSchoolCoordinatorsCards();
      }
      initSchoolProfileForm();
    } else {
      document.getElementById("block-school-profile-editor").style.display = "none";
      document.getElementById("block-province-schools-directory").style.display = "block";
      const coordDir = document.getElementById("block-school-coordinators-directory");
      if (coordDir) {
        coordDir.style.display = "none";
      }
      renderSchoolsDirectory();
    }
  }
}

document.getElementById("btn-nav-dashboard").addEventListener("click", () => switchTab("dashboard"));
document.getElementById("btn-nav-members").addEventListener("click", () => switchTab("members"));
document.getElementById("btn-nav-cremation").addEventListener("click", () => switchTab("cremation"));

document.getElementById("btn-action-primary").addEventListener("click", function() {
  if (appState.activeRole === "province" || appState.activeRole === "committee") {
    switchTab("cremation");
    document.getElementById("block-province-death-creation").scrollIntoView({ behavior: 'smooth' });
  } else {
    openAddMemberModal();
  }
});

function openAddMemberModal() {
  document.getElementById("form-member").reset();
  document.getElementById("member-action-type").value = "create";
  document.getElementById("modal-member-title").textContent = "สมัครลงทะเบียนสมาชิก สสมน.น่าน ใหม่";
  document.getElementById("btn-save-member").textContent = "บันทึกและออกรหัสสมาชิก";
  document.getElementById("block-custom-member-id").style.display = "none";
  document.getElementById("block-financial-inputs").style.display = "flex";
  
  document.getElementById("block-member-title-other").style.display = "none";
  document.getElementById("block-beneficiary-title-other").style.display = "none";

  const schoolSelect = document.getElementById("member-school");
  schoolSelect.value = appState.activeSchoolId;
  schoolSelect.disabled = appState.activeRole === "school";

  const statusOption = document.getElementById("member-status-option");
  if (statusOption) {
    statusOption.value = "new";
    const statusRow = statusOption.closest('.form-row');
    if (statusRow) statusRow.style.display = "flex";
  }
  
  const prepayInput = document.getElementById("member-prepay-balance");
  if (prepayInput) prepayInput.value = 90;

  if (window.toggleMemberStatusOptions) window.toggleMemberStatusOptions();

  // เคลียร์ป้ายระบุไฟล์แนบเดิม (ถ้ามี)
  const previewIds = [
    "edit-member-doc-beneficiary-id-preview",
    "edit-member-doc-application-preview",
    "edit-member-doc-citizen-preview",
    "edit-member-doc-household-preview"
  ];
  previewIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = "none";
      el.innerHTML = "";
    }
  });

  document.getElementById("member-address").value = "";

  document.getElementById("modal-member").classList.add("active");
}

function openEditMemberModal(memberId) {
  if (appState.activeRole === "province" || appState.activeRole === "committee") {
    alert("สิทธิ์การแก้ไขข้อมูลสมาชิกสงวนไว้เฉพาะแอดมินโรงเรียนต้นสังกัดเท่านั้น");
    return;
  }
  const member = appState.members.find(m => m.id === memberId);
  if (!member) {
    alert("ไม่พบข้อมูลสมาชิกที่ระบุ");
    return;
  }

  // รีเซ็ตฟอร์ม
  document.getElementById("form-member").reset();
  
  // ตั้งค่าประเภทการดำเนินการและข้อความหัวเรื่อง
  document.getElementById("member-action-type").value = "edit";
  document.getElementById("modal-member-title").textContent = "แก้ไขข้อมูลสมาชิกและเอกสารประกอบ";
  document.getElementById("btn-save-member").textContent = "บันทึกการแก้ไขข้อมูล";
  
  // แสดงและล็อกรหัสสมาชิก
  document.getElementById("block-custom-member-id").style.display = "block";
  document.getElementById("member-custom-id").value = member.id;
  document.getElementById("member-custom-id").readOnly = true;

  // ซ่อนส่วนข้อมูลการเงินและสถานะสมาชิกแรกสมัคร
  document.getElementById("block-financial-inputs").style.display = "none";
  
  const statusOption = document.getElementById("member-status-option");
  if (statusOption) {
    const statusRow = statusOption.closest('.form-row');
    if (statusRow) statusRow.style.display = "none";
  }

  // เติมข้อมูลส่วนตัวสมาชิก
  const titleSelect = document.getElementById("member-title");
  const knownTitles = ["นาย", "นาง", "นางสาว"];
  if (knownTitles.includes(member.title)) {
    titleSelect.value = member.title;
    document.getElementById("block-member-title-other").style.display = "none";
    document.getElementById("member-title-other").value = "";
  } else {
    titleSelect.value = "อื่น ๆ";
    document.getElementById("block-member-title-other").style.display = "block";
    document.getElementById("member-title-other").value = member.title || "";
  }

  document.getElementById("member-firstname").value = member.firstname || "";
  document.getElementById("member-lastname").value = member.lastname || "";
  document.getElementById("member-citizen-id").value = member.citizenId || "";
  document.getElementById("member-phone").value = member.phone || "";
  document.getElementById("member-gender").value = member.gender || "";
  document.getElementById("member-position").value = member.position || "";
  
  const schoolSelect = document.getElementById("member-school");
  schoolSelect.value = member.schoolId || "";
  schoolSelect.disabled = (appState.activeRole === "school");

  document.getElementById("member-address").value = member.address || "";

  // เติมข้อมูลผู้รับผลประโยชน์
  const beneficiary = member.beneficiary || {};
  const benTitleSelect = document.getElementById("member-beneficiary-title");
  if (knownTitles.includes(beneficiary.title)) {
    benTitleSelect.value = beneficiary.title;
    document.getElementById("block-beneficiary-title-other").style.display = "none";
    document.getElementById("member-beneficiary-title-other").value = "";
  } else if (beneficiary.title) {
    benTitleSelect.value = "อื่น ๆ";
    document.getElementById("block-beneficiary-title-other").style.display = "block";
    document.getElementById("member-beneficiary-title-other").value = beneficiary.title;
  } else {
    benTitleSelect.value = "";
    document.getElementById("block-beneficiary-title-other").style.display = "none";
    document.getElementById("member-beneficiary-title-other").value = "";
  }

  document.getElementById("member-beneficiary-name").value = beneficiary.name || "";
  document.getElementById("member-beneficiary-phone").value = beneficiary.phone || "";
  document.getElementById("member-beneficiary-relation").value = beneficiary.relation || "";

  // แสดงประวัติและลิงก์ของเอกสารแนบเดิมที่มีในระบบ
  const docs = member.documents || {};
  const docFields = [
    { id: "edit-member-doc-beneficiary-id-preview", file: docs.beneficiaryId, label: "บัตร ปชช. ผู้รับผลประโยชน์" },
    { id: "edit-member-doc-application-preview", file: docs.application, label: "ใบสมัคร สสมน." },
    { id: "edit-member-doc-citizen-preview", file: docs.citizen, label: "บัตรประชาชนสมาชิก" },
    { id: "edit-member-doc-household-preview", file: docs.household, label: "ทะเบียนบ้านสมาชิก" }
  ];

  docFields.forEach(field => {
    const el = document.getElementById(field.id);
    if (el) {
      if (field.file) {
        el.style.display = "block";
        el.innerHTML = `
          <span style="font-size: 13px; color: var(--color-accent-teal); font-weight: 500;">✔️ มีไฟล์เอกสารเดิมในระบบ:</span>
          <button type="button" class="btn btn-link" style="padding: 0 4px; font-size: 13px; text-decoration: underline; color: var(--color-accent-amber); background: none; border: none; cursor: pointer;" onclick="viewDocumentLightbox('${field.file}', '${field.label} ของ ${member.firstname} ${member.lastname}')">คลิกเพื่อเปิดดู</button>
        `;
      } else {
        el.style.display = "none";
        el.innerHTML = "";
      }
    }
  });

  // เคลียร์การเลือกไฟล์ใหม่ที่ค้างอยู่
  document.getElementById("member-doc-beneficiary-id").value = "";
  document.getElementById("member-doc-application").value = "";
  document.getElementById("member-doc-citizen").value = "";
  document.getElementById("member-doc-household").value = "";

  document.getElementById("modal-member").classList.add("active");
}

window.openAddMemberModal = openAddMemberModal;
window.openEditMemberModal = openEditMemberModal;

document.getElementById("btn-clear-directory-filters").addEventListener("click", function() {
  document.getElementById("member-search-input").value = "";
  document.getElementById("filter-member-position").value = "all";
  if (appState.activeRole === "province" || appState.activeRole === "committee") {
    document.getElementById("filter-member-school").value = "all";
  }
  document.getElementById("filter-member-status").value = "active";
  calculateStats();
});

document.getElementById("member-search-input").addEventListener("input", renderMembersDirectory);
document.getElementById("filter-member-position").addEventListener("change", renderMembersDirectory);
document.getElementById("filter-member-status").addEventListener("change", renderMembersDirectory);
if (document.getElementById("filter-member-school")) {
  document.getElementById("filter-member-school").addEventListener("change", renderMembersDirectory);
}
document.getElementById("filter-ranking-order").addEventListener("change", renderSchoolRankingsTable);

document.getElementById("btn-gen-demo-data").addEventListener("click", generateDemoData);
const btnCancelDemo = document.getElementById("btn-cancel-demo-data");
if (btnCancelDemo) {
  btnCancelDemo.addEventListener("click", cancelDemoData);
}

const closeButtons = document.querySelectorAll(".btn-close-modal, .btn-cancel-modal, .btn-cancel");
closeButtons.forEach(btn => {
  btn.addEventListener("click", function() {
    const activeModal = document.querySelector(".modal.active");
    if (activeModal) activeModal.classList.remove("active");
  });
});

const modalsList = document.querySelectorAll(".modal");
modalsList.forEach(m => {
  m.addEventListener("click", function(e) {
    if (e.target === m) {
      m.classList.remove("active");
    }
  });
});

// ==================== 14. DEMO DATA GENERATOR SYSTEM ====================
function updateDemoButtonsVisibility() {
  const btnCancel = document.getElementById("btn-cancel-demo-data");
  const btnGen = document.getElementById("btn-gen-demo-data");
  const warningBox = document.getElementById("demo-warning-box");

  // Only Province Admin has permission to see/run the demo data import
  const isProvinceAdmin = (appState.activeRole === "province");

  if (isProvinceAdmin) {
    if (appState.hasDemoData) {
      if (btnCancel) {
        btnCancel.style.display = "flex";
        btnCancel.style.alignItems = "center";
        btnCancel.style.justifyContent = "center";
        btnCancel.style.gap = "6px";
      }
      if (btnGen) btnGen.style.display = "none";
      if (warningBox) {
        warningBox.style.display = "flex";
        warningBox.style.color = "#065f46"; // dark green for high contrast readability
        warningBox.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
        warningBox.style.borderColor = "rgba(16, 185, 129, 0.3)";
        warningBox.innerHTML = `<span>⚠️</span><span><strong>โหมดทดสอบระบบ:</strong> ระบบกำลังรันในโหมดข้อมูลทดสอบระบบ ท่านสามารถกดปุ่มยกเลิกด้านบนเพื่อย้อนกลับคืนข้อมูลจริงที่เคยกรอกไว้ได้</span>`;
      }
    } else {
      if (btnCancel) btnCancel.style.display = "none";
      if (btnGen) {
        btnGen.style.display = "flex";
        btnGen.style.alignItems = "center";
        btnGen.style.justifyContent = "center";
        btnGen.style.gap = "6px";
      }
      if (warningBox) {
        warningBox.style.display = "flex";
        warningBox.style.color = "#991b1b"; // dark red for high contrast readability
        warningBox.style.backgroundColor = "rgba(244, 63, 94, 0.1)";
        warningBox.style.borderColor = "rgba(244, 63, 94, 0.3)";
        warningBox.innerHTML = `<span>💡</span><span><strong>ทดสอบระบบ:</strong> แอดมินจังหวัดสามารถนำเข้าข้อมูลสมมติมาทดลองใช้งานระบบ โดยไม่กระทบต่อข้อมูลจริงที่มีอยู่ในระบบ</span>`;
      }
    }
  } else {
    if (btnCancel) btnCancel.style.display = "none";
    if (btnGen) btnGen.style.display = "none";
    if (warningBox) warningBox.style.display = "none";
  }
}

function clearDemoDataOnly() {
  if (appState.preDemoMembers) {
    appState.members = JSON.parse(JSON.stringify(appState.preDemoMembers));
    delete appState.preDemoMembers;
  } else {
    appState.members = (appState.members || []).filter(m => !m.isDemo);
  }

  if (appState.preDemoDeathCases) {
    appState.deathCases = JSON.parse(JSON.stringify(appState.preDemoDeathCases));
    delete appState.preDemoDeathCases;
  } else {
    appState.deathCases = (appState.deathCases || []).filter(d => !d.isDemo);
  }

  if (appState.preDemoSchoolInvoices) {
    appState.schoolInvoices = JSON.parse(JSON.stringify(appState.preDemoSchoolInvoices));
    delete appState.preDemoSchoolInvoices;
  } else {
    appState.schoolInvoices = (appState.schoolInvoices || []).filter(i => !i.isDemo);
  }

  if (appState.preDemoTransferLogs) {
    appState.transferLogs = JSON.parse(JSON.stringify(appState.preDemoTransferLogs));
    delete appState.preDemoTransferLogs;
  } else {
    appState.transferLogs = (appState.transferLogs || []).filter(l => !l.isDemo);
  }
  
  if (appState.preDemoSchoolProfiles) {
    appState.schoolProfiles = JSON.parse(JSON.stringify(appState.preDemoSchoolProfiles));
    delete appState.preDemoSchoolProfiles;
  } else {
    appState.schoolProfiles = JSON.parse(JSON.stringify(DEFAULT_SCHOOL_PROFILES));
  }

  if (appState.preDemoCentralBankBalance !== undefined) {
    appState.centralBankBalance = appState.preDemoCentralBankBalance;
    delete appState.preDemoCentralBankBalance;
  } else {
    appState.centralBankBalance = 250000;
  }

  if (appState.preDemoCentralBankUpdateDate !== undefined) {
    appState.centralBankUpdateDate = appState.preDemoCentralBankUpdateDate;
    delete appState.preDemoCentralBankUpdateDate;
  } else {
    appState.centralBankUpdateDate = "2026-06-01";
  }

  if (appState.preDemoCentralOperatingFee !== undefined) {
    appState.centralOperatingFee = appState.preDemoCentralOperatingFee;
    delete appState.preDemoCentralOperatingFee;
  } else {
    appState.centralOperatingFee = 0;
  }

  // Recalculate school profile statistics for the remaining real members
  if (typeof ensureSchoolProfilesStats === "function") {
    ensureSchoolProfilesStats();
  }
}

function cancelDemoData() {
  if (confirm("คุณต้องการยกเลิกการนำเข้าข้อมูลทดสอบระบบใช่หรือไม่?\n(ข้อมูลทดสอบระบบทั้งหมดจะถูกลบออก และเหลือเฉพาะข้อมูลจริงที่คุณหรือโรงเรียนกรอกไว้)")) {
    clearDemoDataOnly();
    appState.hasDemoData = false;
    saveStateToLocalStorage();
    calculateStats();
    updateDemoButtonsVisibility();
    
    // Refresh tables/views
    initSchoolProfileForm();
    checkBiAnnualCertificationStatus();
    renderSchoolsDirectory();
    renderDocumentsGrid();
    renderAnnouncementsBoard();
    renderCremationPayoutsTable();
    renderLiquidityAnalyzer();
    renderMembersDirectory();
    renderSchoolRankingsTable();
    
    alert("🟢 ยกเลิกข้อมูลทดสอบระบบเรียบร้อยแล้ว!");
  }
}

function generateDemoData() {
  if (appState.activeRole !== "province") {
    alert("❌ เฉพาะแอดมินจังหวัดเท่านั้นที่สามารถนำเข้าข้อมูลทดสอบระบบได้");
    return;
  }
  if (!confirm("⚠️ นำเข้าข้อมูลทดสอบระบบ:\n\nระบบจะนำเข้าสมาชิกและข้อมูลจำลองอื่นๆ มาให้ท่านทดลองใช้งาน โดยจะคงข้อมูลเดิมที่ท่านกรอกไว้\n\nคุณต้องการนำเข้าข้อมูลทดสอบระบบใช่หรือไม่?")) {
    return;
  }

  // 1. Remove old demo data first (in case they generate again)
  clearDemoDataOnly();
  
  // 2. Backup current school profiles & bank parameters
  appState.preDemoMembers = JSON.parse(JSON.stringify(appState.members));
  appState.preDemoDeathCases = JSON.parse(JSON.stringify(appState.deathCases));
  appState.preDemoSchoolInvoices = JSON.parse(JSON.stringify(appState.schoolInvoices));
  appState.preDemoTransferLogs = JSON.parse(JSON.stringify(appState.transferLogs));
  appState.preDemoSchoolProfiles = JSON.parse(JSON.stringify(appState.schoolProfiles));
  appState.preDemoCentralBankBalance = appState.centralBankBalance;
  appState.preDemoCentralBankUpdateDate = appState.centralBankUpdateDate;
  appState.preDemoCentralOperatingFee = appState.centralOperatingFee;
  appState.hasDemoData = true;

  // Overwrite schoolProfiles with demo values (will be restored on cancel)
  appState.schoolProfiles = JSON.parse(JSON.stringify(DEFAULT_SCHOOL_PROFILES));
  ensureSchoolProfilesStats();

  const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

  const names = [
    { fn: "สมชาย", ln: "ดีใจแสนน่าน", pos: "ผอ.", sch: "01", balance: 150, gender: "ชาย" },
    { fn: "วิลัยลักษณ์", ln: "แก้วหลวง", pos: "ครู", sch: "01", balance: 250, gender: "หญิง" },
    { fn: "พัชรินทร์", ln: "ท่าวังผา", pos: "ครู", sch: "01", balance: 130, gender: "หญิง" },
    { fn: "นพดล", ln: "ศรัทธาศิลา", pos: "ครู", sch: "01", balance: 150, gender: "ชาย" },
    { fn: "ประเสริฐ", ln: "แงงงาม", pos: "ครู", sch: "02", balance: 150, gender: "ชาย" },
    { fn: "ศิริพร", ln: "ปัววิทยา", pos: "ผอ.", sch: "02", balance: 350, gender: "หญิง" },
    { fn: "เกรียงไกร", ln: "เมืองแสน", pos: "รอง ผอ.", sch: "02", balance: 150, gender: "ชาย" },
    { fn: "ขวัญใจ", ln: "บ่อเกลือภูเขา", pos: "ครู", sch: "03", balance: 150, gender: "หญิง" },
    { fn: "อุดม", ln: "ขุนขุนเขา", pos: "ครู", sch: "04", balance: 150, gender: "ชาย" },
    { fn: "วรรณวิภา", ln: "นันทบุรี", pos: "ครู", sch: "06", balance: 50, gender: "หญิง" },
    { fn: "อนุสรณ์", ln: "พระธาตุ", pos: "ครู", sch: "08", balance: 150, gender: "ชาย" },
    { fn: "ชญานิศ", ln: "ศิลาทอง", pos: "ครู", sch: "12", balance: 150, gender: "หญิง" },
    { fn: "ยุทธนา", ln: "หนองบัว", pos: "ครู", sch: "15", balance: 150, gender: "ชาย" },
    { fn: "โสภิณ", ln: "ปัญญานุกูล", pos: "ครู", sch: "31", balance: 150, gender: "หญิง" },
    { fn: "สมจิตร", ln: "แสนบำนาญ", pos: "ข้าราชการบำนาญ", sch: "33", balance: 150, gender: "ชาย" },
    { fn: "ประคอง", ln: "ใจกล้าบำนาญ", pos: "ข้าราชการบำนาญ", sch: "33", balance: 250, gender: "หญิง" },
    { fn: "จิรเดช", ln: "มีคุณ", pos: "ครู", sch: "01", balance: 150, gender: "ชาย" },
    { fn: "ธัญญารัตน์", ln: "สตรีศรี", pos: "ครู", sch: "01", balance: 150, gender: "หญิง" },
    { fn: "กรกฎ", ln: "ศรีสวัสดิ์", pos: "ครู", sch: "02", balance: 150, gender: "ชาย" },
    { fn: "ปาริชาติ", ln: "สะแสนน่าน", pos: "ครู", sch: "02", balance: 150, gender: "หญิง" },
    // สมาชิกของโรงเรียนทุ่งช้าง (กู้คืนข้อมูลจริงจากระบบคลาวด์)
    {
      id: "69101001",
      title: "ว่าที่ร้อยโท",
      fn: "วิญญู",
      ln: "ศรีบุญเรือง",
      citizenId: "5550500560168",
      phone: "097-2151119",
      gender: "ชาย",
      pos: "ผอ.",
      sch: "10",
      balance: 90,
      address: "บ้านเลขที่ 69 หมู่ 2 ต.ทุ่งช้าง อ.ทุ่งช้าง จ.น่าน",
      beneficiary: {
        title: "เด็กชาย",
        name: "รณพีร์ ศรีบุญเรือง",
        phone: "064-7692383",
        relation: "บุตร"
      },
      ledger: [
        {
          date: "2026-06-05 14:01",
          type: "charge",
          amount: -100,
          description: "ลด/ปรับปรุงเงินสะสมล่วงหน้าออกจากระบบ",
          balanceAfter: 110
        },
        {
          date: "2026-06-05 14:01",
          type: "charge",
          amount: -90,
          description: "ลด/ปรับปรุงเงินสะสมล่วงหน้าออกจากระบบ",
          balanceAfter: 20
        },
        {
          date: "2026-06-05 14:02",
          type: "deposit",
          amount: 70,
          description: "โอนเติมเงินสะสมล่วงหน้าเข้าระบบ สสมน.",
          balanceAfter: 90
        }
      ]
    },
    {
      id: "69101002",
      title: "นางสาว",
      fn: "จิณฐดานัณป์",
      ln: "จิณสิทธิ์",
      citizenId: "3550600133460",
      phone: "0815825615",
      gender: "หญิง",
      pos: "รอง ผอ.",
      sch: "10",
      balance: 90,
      address: "บ้านเลขที่ 123 หมู่ 5 ต.ทุ่งช้าง อ.ทุ่งช้าง จ.น่าน",
      beneficiary: {
        title: "ด.ช.",
        name: "ธนรบ วันเสน",
        phone: "0930615352",
        relation: "บุตร"
      },
      ledger: [
        {
          date: "2026-06-05 14:00",
          type: "deposit",
          amount: 50,
          description: "จ่ายค่าสมัครชำระแรกเข้าแรกสมัครใหม่",
          balanceAfter: 50
        },
        {
          date: "2026-06-05 14:00",
          type: "deposit",
          amount: 90,
          description: "เงินโอนสะสมล่วงหน้าแรกเข้า สสมน.",
          balanceAfter: 90
        }
      ]
    }
  ];

  names.forEach((p, index) => {
    const generatedId = p.id || generateMemberId(p.sch, p.pos);
    const idCard = p.citizenId || ("1559900" + String(100000 + index));
    const phone = p.phone || ("089" + String(1000000 + index));

    const ledger = p.ledger || [
      INITIAL_LEDGER_ENTRY(50, "จ่ายค่าสมัครชำระแรกเข้าแรกสมัครใหม่"),
      INITIAL_LEDGER_ENTRY(p.balance, "เงินโอนสะสมล่วงหน้าแรกเข้า สสมน.")
    ];

    // จำลองแนบเอกสารใบสมัครเริ่มต้น (SVG Base64 แบบจำลอง)
    const docApp = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'><rect width='100%' height='100%' fill='%230f172a'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2310b981' font-size='16'>ใบสมัครของ ${p.fn} ${p.ln}</text></svg>";

    let title = p.title || (p.gender === "ชาย" ? "นาย" : "นางสาว");
    if (index === 5 && !p.title) title = "นาง";

    const m = {
      id: generatedId,
      title: title,
      firstname: p.fn,
      lastname: p.ln,
      citizenId: idCard,
      phone: phone,
      gender: p.gender,
      position: p.pos,
      schoolId: p.sch,
      prepayBalance: p.balance,
      applicationFeePaid: true,
      status: "active",
      address: p.address || `บ้านเลขที่ ${10 + index} หมู่ 1 ต.ในเวียง อ.เมืองน่าน จ.น่าน`,
      beneficiary: p.beneficiary || {
        title: "นาง",
        name: `หวานใจ ${p.ln}`,
        phone: "0898765432",
        relation: "คู่สมรส"
      },
      documents: {
        application: docApp,
        citizen: docApp,
        household: docApp,
        beneficiaryId: docApp
      },
      ledger: ledger,
      isDemo: true // Tag it!
    };

    appState.members.push(m);
  });

  // 2. จำลองประวัติย้ายสังกัด
  const transferUser1 = appState.members.find(m => m.isDemo); 
  if (transferUser1) {
    const oldId = transferUser1.id;
    const newId = generateMemberId("02");
    
    transferUser1.status = "transferred";
    transferUser1.ledger.push({
      date: dateStr,
      type: "charge",
      amount: 0,
      description: `โอนปิดรหัสเพื่อย้ายสังกัดไปยัง โรงเรียนศรีสวัสดิ์วิทยาคารจังหวัดน่าน (รหัสสมาชิกใหม่คือ ${newId})`,
      balanceAfter: parseFloat(transferUser1.prepayBalance)
    });

    const newActiveRec = {
      ...transferUser1,
      id: newId,
      schoolId: "02",
      status: "active",
      isDemo: true, // Tag it!
      ledger: [
        ...transferUser1.ledger,
        {
          date: dateStr,
          type: "deposit",
          amount: 0,
          description: `โอนย้ายฐานเงินสะสมล่วงหน้าติดตัวมาจากสังกัด โรงเรียนสตรีศรีน่าน (รหัสสมาชิกเก่า: ${oldId})`,
          balanceAfter: parseFloat(transferUser1.prepayBalance)
        }
      ]
    };
    appState.members.push(newActiveRec);

    appState.transferLogs.push({
      date: dateStr,
      memberName: `${transferUser1.firstname} ${transferUser1.lastname}`,
      oldSchool: "โรงเรียนสตรีศรีน่าน",
      newSchool: "โรงเรียนศรีสวัสดิ์วิทยาคารจังหวัดน่าน",
      oldId: oldId,
      newId: newId,
      reason: "ย้ายตามผลสอบเลื่อนขั้นรับตำแหน่ง ผู้อำนวยการโรงเรียนใหม่",
      isDemo: true // Tag it!
    });
  }

  // 3. จำลองเคสเสียชีวิต อนุมัติแล้ว (นายประเสริฐ แงงงาม)
  const deadPerson = appState.members.find(m => m.isDemo && m.firstname === "ประเสริฐ"); 
  if (deadPerson) {
    deadPerson.status = "deceased";
    deadPerson.ledger.push({
      date: dateStr,
      type: "charge",
      amount: 0,
      description: `เสียชีวิตอย่างสงบเมื่อวันที่ 2026-05-15 ปิดยอดเงินสะสมล่วงหน้าถาวร`,
      balanceAfter: parseFloat(deadPerson.prepayBalance)
    });

    const deathCaseId = "DEATH_DEMO_001";
    const mockDoc = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'><rect width='100%' height='100%' fill='%23450a0a'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23ef4444' font-size='16'>ใบมรณบัตร: นายประเสริฐ แงงงาม</text></svg>";
    
    const calcInfo = getDeathCalculationInfo("2026-05-15", deadPerson);
    const deathCase = {
      id: deathCaseId,
      memberId: deadPerson.id,
      name: `${deadPerson.title || ''}${deadPerson.firstname} ${deadPerson.lastname}`,
      schoolName: "โรงเรียนศรีสวัสดิ์วิทยาคารจังหวัดน่าน",
      schoolId: "02",
      reportedDate: "2026-05-15",
      chargeAmount: 30,
      cause: "กล้ามเนื้อหัวใจขาดเลือดเฉียบพลัน",
      status: "approved",
      documents: {
        certificate: mockDoc,
        citizen: mockDoc,
        household: mockDoc
      },
      beneficiaryName: calcInfo.beneficiaryName,
      referenceDateText: calcInfo.refDateText,
      referenceMemberCount: calcInfo.activeMembersCount,
      grossPayout: calcInfo.grossPayout,
      operatingFee: calcInfo.operatingFee,
      netPayout: calcInfo.netPayout,
      isDemo: true // Tag it!
    };
    appState.deathCases.push(deathCase);

    // หักเงินทุกคน 30 บาท (เฉพาะ demo members เพื่อเลี่ยงการแก้ไขข้อมูลจริง)
    const activeList = appState.members.filter(m => m.status === "active" && m.isDemo);
    activeList.forEach(m => {
      const curBal = parseFloat(m.prepayBalance);
      m.prepayBalance = curBal - 30;
      m.ledger.push({
        date: dateStr,
        type: "charge",
        amount: -30,
        description: `หักเงินสงเคราะห์รายศพกรณีการเสียชีวิตของ นายประเสริฐ แงงงาม (${deadPerson.id})`,
        balanceAfter: curBal - 30
      });
    });

    // สร้าง Invoices 33 โรงเรียน
    SCHOOLS.forEach(sch => {
      const schoolActiveCount = activeList.filter(m => m.schoolId === sch.id).length;
      const totalOwed = schoolActiveCount * 30;

      let status = "unpaid";
      let slipData = null;

      if (totalOwed === 0) {
        status = "paid";
      } else if (sch.id === "02") {
        status = "paid";
        slipData = {
          transferDate: dateStr,
          transferAmount: totalOwed,
          imageUri: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'><rect width='100%' height='100%' fill='%231e293b'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2310b981' font-size='16'>สลิปโอนเงินสำเร็จ [ศรีสวัสดิ์ฯ]</text></svg>",
          notes: "โอนผ่านระบบ Mobile Banking ธนาคารกรุงไทยของกองทุนโรงเรียน"
        };
      } else if (sch.id === "01") {
        status = "pending";
        slipData = {
          transferDate: dateStr,
          transferAmount: totalOwed,
          imageUri: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'><rect width='100%' height='100%' fill='%231e293b'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23fbbf24' font-size='16'>สลิปหลักฐานโอนเงินภาพรวม [สตรีศรีน่าน]</text></svg>",
          notes: "รอการตรวจสอบสิทธิ์และรับยอดโอนเงินทำบุญจังหวัด"
        };
      }

      const invoice = {
        deathCaseId: deathCaseId,
        deathCaseName: `${deadPerson.firstname} ${deadPerson.lastname}`,
        schoolId: sch.id,
        schoolName: sch.name,
        activeCount: schoolActiveCount,
        deductionAmount: 30,
        totalOwed: totalOwed,
        status: status,
        slipData: slipData,
        isDemo: true // Tag it!
      };
      appState.schoolInvoices.push(invoice);
    });
  }

  // 4. จำลองเคสแจ้งตาย "รอยืนยัน" (Pending Approval) ของแอดมินโรงเรียน
  const pendingDeadPerson = appState.members.find(m => m.isDemo && m.firstname === "ขวัญใจ"); 
  if (pendingDeadPerson) {
    const calcInfoPending = getDeathCalculationInfo("2026-06-01", pendingDeadPerson);
    const pendingDeathCase = {
      id: "DEATH_PEND_DEMO_001",
      memberId: pendingDeadPerson.id,
      name: `${pendingDeadPerson.title || ''}${pendingDeadPerson.firstname} ${pendingDeadPerson.lastname}`,
      schoolName: "โรงเรียนปัว",
      schoolId: "03",
      reportedDate: "2026-06-01",
      chargeAmount: 30,
      cause: "โรคมะเร็งตับระยะสุดท้าย",
      status: "pending_approval",
      documents: {
        certificate: mockDoc,
        citizen: mockDoc,
        household: mockDoc
      },
      beneficiaryName: calcInfoPending.beneficiaryName,
      referenceDateText: calcInfoPending.refDateText,
      referenceMemberCount: calcInfoPending.activeMembersCount,
      grossPayout: calcInfoPending.grossPayout,
      operatingFee: calcInfoPending.operatingFee,
      netPayout: calcInfoPending.netPayout,
      isDemo: true // Tag it!
    };
    appState.deathCases.unshift(pendingDeathCase);
  }

  saveStateToLocalStorage();
  updateDemoButtonsVisibility();
  
  // Refresh tables/views
  initSchoolProfileForm();
  checkBiAnnualCertificationStatus();
  renderSchoolsDirectory();
  renderDocumentsGrid();
  renderAnnouncementsBoard();
  renderCremationPayoutsTable();
  renderLiquidityAnalyzer();
  renderMembersDirectory();
  renderSchoolRankingsTable();

  alert("🟢 นำเข้าข้อมูลทดสอบระบบสำเร็จ!\nท่านสามารถยกเลิกเพื่อลบข้อมูลทดสอบนี้ออกได้ตลอดเวลา");
  calculateStats();
}

// ==================== 15. GLOBALS IN-WINDOW BINDINGS ====================
// ==================== 15. GLOBALS IN-WINDOW BINDINGS ====================
window.openProfileViewer = openProfileViewer;
window.openTransferSchoolModal = openTransferSchoolModal;
window.viewDocumentLightbox = viewDocumentLightbox;
window.approvePendingDeath = approvePendingDeath;
window.rejectPendingDeath = rejectPendingDeath;

// ==================== 16. SCHOOL DIRECTORY & CERTIFICATION SYSTEM ====================

// ฟังก์ชันสร้างความมั่นใจว่าข้อมูลพื้นฐานโรงเรียนมีสถิติครบถ้วน (Repair / Dynamic mock data generator)
function ensureSchoolProfilesStats() {
  SCHOOLS.forEach(sch => {
    if (!appState.schoolProfiles[sch.id]) {
      appState.schoolProfiles[sch.id] = {
        address: "-", moo: "-", tumbon: "-", amphoe: "เมืองน่าน", phone: "-", fax: "-", director: "-", directorPhone: "-", coordinator: "-", coordinatorPhone: "-"
      };
    }
    const profile = appState.schoolProfiles[sch.id];
    
    if (profile.directorCount === undefined) profile.directorCount = sch.totalPersonnel.director;
    if (profile.deputyCount === undefined) profile.deputyCount = sch.totalPersonnel.deputy;
    if (profile.teacherCount === undefined) profile.teacherCount = sch.totalPersonnel.teacher;
    if (profile.govTeacherCount === undefined) profile.govTeacherCount = 0;
    if (profile.tempTeacherCount === undefined) profile.tempTeacherCount = 0;
    if (profile.adminStaffCount === undefined) profile.adminStaffCount = 0;
    if (profile.otherCount === undefined) profile.otherCount = sch.totalPersonnel.other;
    if (profile.maidCount === undefined) profile.maidCount = 0;
    if (profile.serviceCount === undefined) profile.serviceCount = 0;

    const totalPersonnel = profile.directorCount + profile.deputyCount + profile.teacherCount + (profile.govTeacherCount || 0) + (profile.tempTeacherCount || 0) + (profile.adminStaffCount || 0) + profile.otherCount + (profile.maidCount || 0) + (profile.serviceCount || 0);

    // คำนวณเชื่อมโยงโดยตรงจากฐานข้อมูลจริง
    const dbActive = appState.members.filter(m => m.schoolId === sch.id && m.status === 'active' && m.position !== 'ข้าราชการบำนาญ').length;
    const dbPensioners = appState.members.filter(m => m.schoolId === sch.id && m.status === 'active' && m.position === 'ข้าราชการบำนาญ').length;
    const dbRetiredTransferred = appState.members.filter(m => m.schoolId === sch.id && (m.status === 'transferred' || (m.status === 'active' && m.position === 'ข้าราชการบำนาญ'))).length;

    const hasMembersInDB = appState.members.some(m => m.schoolId === sch.id);

    if (hasMembersInDB) {
      profile.pensionersCount = dbPensioners;
      profile.activeMembersCount = dbActive;
      profile.retiredTransferredMembersCount = dbRetiredTransferred;
    } else {
      if (profile.pensionersCount === undefined) profile.pensionersCount = Math.round(totalPersonnel * 0.15);
      if (profile.activeMembersCount === undefined) profile.activeMembersCount = Math.round(totalPersonnel * 0.80);
      if (profile.retiredTransferredMembersCount === undefined) profile.retiredTransferredMembersCount = Math.round(totalPersonnel * 0.20);
    }

    if (profile.studentsJune === undefined) profile.studentsJune = totalPersonnel * 10;
    if (profile.studentsNovember === undefined) profile.studentsNovember = Math.round(totalPersonnel * 10.2);
  });
}

// ฟังก์ชันคำนวณและแสดงผลรวมครู/บุคลากร และสมาชิก สสมน. แบบ Real-time (Global Scope)
function updateSchoolProfileTotals() {
  const director = parseInt(document.getElementById("school-profile-director-count")?.value) || 0;
  const deputy = parseInt(document.getElementById("school-profile-deputy-count")?.value) || 0;
  const teacher = parseInt(document.getElementById("school-profile-teacher-count")?.value) || 0;
  const govTeacher = parseInt(document.getElementById("school-profile-gov-teacher-count")?.value) || 0;
  const tempTeacher = parseInt(document.getElementById("school-profile-temp-teacher-count")?.value) || 0;
  const adminStaff = parseInt(document.getElementById("school-profile-admin-staff-count")?.value) || 0;
  const other = parseInt(document.getElementById("school-profile-other-count")?.value) || 0;
  const maid = parseInt(document.getElementById("school-profile-maid-count")?.value) || 0;
  const service = parseInt(document.getElementById("school-profile-service-count")?.value) || 0;
  
  const pensioners = parseInt(document.getElementById("school-profile-pensioners-count")?.value) || 0;
  const active = parseInt(document.getElementById("school-profile-active-members-count")?.value) || 0;
  const retired = parseInt(document.getElementById("school-profile-retired-transferred-members-count")?.value) || 0;

  const totalP = director + deputy + teacher + govTeacher + tempTeacher + adminStaff + other + maid + service;
  const totalM = active + retired;

  const lblTotalP = document.getElementById("lbl-profile-total-personnel");
  if (lblTotalP) {
    lblTotalP.textContent = `${totalP.toLocaleString()} คน`;
  }
  const lblTotalM = document.getElementById("lbl-profile-total-members");
  if (lblTotalM) {
    lblTotalM.textContent = `${totalM.toLocaleString()} คน`;
  }
}

// โหลดข้อมูลโรงเรียนเข้าฟอร์มตั้งค่าโปรไฟล์ (สำหรับแอดมินโรงเรียน)
function initSchoolProfileForm() {
  const schoolId = appState.activeSchoolId;
  const profile = appState.schoolProfiles[schoolId];
  if (!profile) return;

  const lblName = document.getElementById("lbl-profile-school-name");
  if (lblName) {
    const sch = SCHOOLS.find(s => s.id === schoolId);
    lblName.textContent = sch ? `${schoolId} - ${sch.name}` : `รหัสสังกัด ${schoolId}`;
    if (schoolId === "10") {
      lblName.style.color = "var(--color-accent-red)";
      lblName.style.fontWeight = "800";
    } else {
      lblName.style.color = "var(--color-accent-gold)";
      lblName.style.fontWeight = "700";
    }
  }

  // เติมข้อมูลในฟิลด์
  if (document.getElementById("school-profile-address")) document.getElementById("school-profile-address").value = profile.address || "";
  if (document.getElementById("school-profile-moo")) document.getElementById("school-profile-moo").value = profile.moo || "";
  if (document.getElementById("school-profile-tumbon")) document.getElementById("school-profile-tumbon").value = profile.tumbon || "";
  if (document.getElementById("school-profile-amphoe")) document.getElementById("school-profile-amphoe").value = profile.amphoe || "เมืองน่าน";
  if (document.getElementById("school-profile-phone")) document.getElementById("school-profile-phone").value = profile.phone || "";
  if (document.getElementById("school-profile-fax")) document.getElementById("school-profile-fax").value = profile.fax || "";
  if (document.getElementById("school-profile-director")) document.getElementById("school-profile-director").value = profile.director || "";
  if (document.getElementById("school-profile-director-phone")) document.getElementById("school-profile-director-phone").value = profile.directorPhone || "";
  if (document.getElementById("school-profile-coordinator")) document.getElementById("school-profile-coordinator").value = profile.coordinator || "";
  if (document.getElementById("school-profile-coordinator-phone")) document.getElementById("school-profile-coordinator-phone").value = profile.coordinatorPhone || "";

  // ข้อมูลสถิติกำลังคนและนักเรียน
  const schObj = SCHOOLS.find(s => s.id === schoolId);
  const defaultPersonnel = schObj ? schObj.totalPersonnel : { director: 0, deputy: 0, teacher: 0, other: 0 };
  
  if (document.getElementById("school-profile-director-count")) {
    document.getElementById("school-profile-director-count").value = profile.directorCount !== undefined ? profile.directorCount : defaultPersonnel.director;
  }
  if (document.getElementById("school-profile-deputy-count")) {
    document.getElementById("school-profile-deputy-count").value = profile.deputyCount !== undefined ? profile.deputyCount : defaultPersonnel.deputy;
  }
  if (document.getElementById("school-profile-teacher-count")) {
    document.getElementById("school-profile-teacher-count").value = profile.teacherCount !== undefined ? profile.teacherCount : defaultPersonnel.teacher;
  }
  if (document.getElementById("school-profile-gov-teacher-count")) {
    document.getElementById("school-profile-gov-teacher-count").value = profile.govTeacherCount !== undefined ? profile.govTeacherCount : 0;
  }
  if (document.getElementById("school-profile-temp-teacher-count")) {
    document.getElementById("school-profile-temp-teacher-count").value = profile.tempTeacherCount !== undefined ? profile.tempTeacherCount : 0;
  }
  if (document.getElementById("school-profile-admin-staff-count")) {
    document.getElementById("school-profile-admin-staff-count").value = profile.adminStaffCount !== undefined ? profile.adminStaffCount : 0;
  }
  if (document.getElementById("school-profile-other-count")) {
    document.getElementById("school-profile-other-count").value = profile.otherCount !== undefined ? profile.otherCount : defaultPersonnel.other;
  }
  if (document.getElementById("school-profile-maid-count")) {
    document.getElementById("school-profile-maid-count").value = profile.maidCount !== undefined ? profile.maidCount : 0;
  }
  if (document.getElementById("school-profile-service-count")) {
    document.getElementById("school-profile-service-count").value = profile.serviceCount !== undefined ? profile.serviceCount : 0;
  }

  // คำนวณค่าเริ่มต้นย้อนกลับหากไม่มีในประวัติตามสัดส่วนกำลังคน
  const currentTotalP = (profile.directorCount !== undefined ? profile.directorCount : defaultPersonnel.director) +
                       (profile.deputyCount !== undefined ? profile.deputyCount : defaultPersonnel.deputy) +
                       (profile.teacherCount !== undefined ? profile.teacherCount : defaultPersonnel.teacher) +
                       (profile.govTeacherCount !== undefined ? profile.govTeacherCount : 0) +
                       (profile.tempTeacherCount !== undefined ? profile.tempTeacherCount : 0) +
                       (profile.adminStaffCount !== undefined ? profile.adminStaffCount : 0) +
                       (profile.otherCount !== undefined ? profile.otherCount : defaultPersonnel.other) +
                       (profile.maidCount !== undefined ? profile.maidCount : 0) +
                       (profile.serviceCount !== undefined ? profile.serviceCount : 0);

  if (document.getElementById("school-profile-pensioners-count")) {
    document.getElementById("school-profile-pensioners-count").value = profile.pensionersCount !== undefined ? profile.pensionersCount : Math.round(currentTotalP * 0.15);
  }
  if (document.getElementById("school-profile-active-members-count")) {
    document.getElementById("school-profile-active-members-count").value = profile.activeMembersCount !== undefined ? profile.activeMembersCount : Math.round(currentTotalP * 0.80);
  }
  if (document.getElementById("school-profile-retired-transferred-members-count")) {
    document.getElementById("school-profile-retired-transferred-members-count").value = profile.retiredTransferredMembersCount !== undefined ? profile.retiredTransferredMembersCount : Math.round(currentTotalP * 0.20);
  }

  if (document.getElementById("school-profile-students-june")) {
    document.getElementById("school-profile-students-june").value = profile.studentsJune !== undefined ? profile.studentsJune : 0;
  }
  if (document.getElementById("school-profile-students-november")) {
    document.getElementById("school-profile-students-november").value = profile.studentsNovember !== undefined ? profile.studentsNovember : 0;
  }

  // Password fields
  const pwd = appState.schoolPasswords[schoolId] || "school1234";
  if (document.getElementById("school-profile-password")) document.getElementById("school-profile-password").value = pwd;
  if (document.getElementById("school-profile-password-confirm")) document.getElementById("school-profile-password-confirm").value = pwd;

  // เช็คว่าสังกัดนี้มีการลงทะเบียนรายชื่อสมาชิกในระบบแล้วหรือไม่
  const hasMembersInDB = appState.members.some(m => m.schoolId === schoolId);
  const activeInput = document.getElementById("school-profile-active-members-count");
  const retiredInput = document.getElementById("school-profile-retired-transferred-members-count");
  const pensionersInput = document.getElementById("school-profile-pensioners-count");

  // ลบตัวบอกสถานะการเชื่อมต่อเดิม (ถ้ามี)
  const oldIndicator = document.getElementById("db-sync-indicator-form");
  if (oldIndicator) oldIndicator.remove();

  if (hasMembersInDB) {
    if (activeInput) {
      activeInput.setAttribute("readonly", "true");
      activeInput.style.background = "rgba(255, 255, 255, 0.07)";
      activeInput.style.cursor = "not-allowed";
    }
    if (retiredInput) {
      retiredInput.setAttribute("readonly", "true");
      retiredInput.style.background = "rgba(255, 255, 255, 0.07)";
      retiredInput.style.cursor = "not-allowed";
    }
    if (pensionersInput) {
      pensionersInput.setAttribute("readonly", "true");
      pensionersInput.style.background = "rgba(255, 255, 255, 0.07)";
      pensionersInput.style.cursor = "not-allowed";
    }

    // แทรกข้อความแจ้งว่าซิงค์อัตโนมัติเรียบร้อยแล้ว
    const indicator = document.createElement("div");
    indicator.id = "db-sync-indicator-form";
    indicator.className = "alert";
    indicator.style.background = "rgba(16, 185, 129, 0.12)";
    indicator.style.border = "1px solid rgba(16, 185, 129, 0.3)";
    indicator.style.color = "var(--color-accent-emerald)";
    indicator.style.padding = "10px 14px";
    indicator.style.borderRadius = "8px";
    indicator.style.marginBottom = "14px";
    indicator.style.fontSize = "13px";
    indicator.style.display = "flex";
    indicator.style.alignItems = "center";
    indicator.style.gap = "8px";
    indicator.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <strong>เชื่อมโยงสำเร็จ:</strong> ข้อมูลสมาชิกและผู้เกษียณ สสมน. คำนวณอัตโนมัติจากรายชื่อสมาชิกในฐานข้อมูลกลางเรียบร้อย
    `;

    const targetRow = activeInput ? activeInput.closest(".form-row") : null;
    if (targetRow) {
      targetRow.parentNode.insertBefore(indicator, targetRow);
    }
  } else {
    // ปลดล็อกให้คีย์เองกรณีที่โรงเรียนยังไม่มีรายชื่อสมาชิกในฐานข้อมูล
    if (activeInput) {
      activeInput.removeAttribute("readonly");
      activeInput.style.background = "";
      activeInput.style.cursor = "";
    }
    if (retiredInput) {
      retiredInput.removeAttribute("readonly");
      retiredInput.style.background = "";
      retiredInput.style.cursor = "";
    }
    if (pensionersInput) {
      pensionersInput.removeAttribute("readonly");
      pensionersInput.style.background = "";
      pensionersInput.style.cursor = "";
    }
  }

  // คำนวณยอดรวมทันทีที่ดึงข้อมูล
  updateSchoolProfileTotals();

  // แสดงรายการอุปกรณ์ใช้งานของโรงเรียน
  renderSchoolDevicesList(schoolId);
}

// ผูกฟอร์มบันทึกข้อมูลโรงเรียน
const schoolProfileForm = document.getElementById("form-school-profile");
if (schoolProfileForm) {
  schoolProfileForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const schoolId = appState.activeSchoolId;

    const pwd = document.getElementById("school-profile-password").value;
    const pwdConfirm = document.getElementById("school-profile-password-confirm").value;

    if (pwd !== pwdConfirm) {
      alert("❌ รหัสผ่านใหม่และรหัสผ่านยืนยันไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง!");
      return;
    }
    
    const existingDevices = appState.schoolProfiles[schoolId] ? (appState.schoolProfiles[schoolId].devices || []) : [];
    appState.schoolProfiles[schoolId] = {
      address: document.getElementById("school-profile-address").value.trim(),
      moo: document.getElementById("school-profile-moo").value.trim(),
      tumbon: document.getElementById("school-profile-tumbon").value.trim(),
      amphoe: document.getElementById("school-profile-amphoe").value,
      phone: document.getElementById("school-profile-phone").value.trim(),
      fax: document.getElementById("school-profile-fax").value.trim(),
      director: document.getElementById("school-profile-director").value.trim(),
      directorPhone: document.getElementById("school-profile-director-phone").value.trim(),
      coordinator: document.getElementById("school-profile-coordinator").value.trim(),
      coordinatorPhone: document.getElementById("school-profile-coordinator-phone").value.trim(),
      devices: existingDevices,
      
      // บันทึกกำลังคนและนักเรียน
      directorCount: parseInt(document.getElementById("school-profile-director-count").value) || 0,
      deputyCount: parseInt(document.getElementById("school-profile-deputy-count").value) || 0,
      teacherCount: parseInt(document.getElementById("school-profile-teacher-count").value) || 0,
      govTeacherCount: parseInt(document.getElementById("school-profile-gov-teacher-count").value) || 0,
      tempTeacherCount: parseInt(document.getElementById("school-profile-temp-teacher-count").value) || 0,
      adminStaffCount: parseInt(document.getElementById("school-profile-admin-staff-count").value) || 0,
      otherCount: parseInt(document.getElementById("school-profile-other-count").value) || 0,
      maidCount: parseInt(document.getElementById("school-profile-maid-count").value) || 0,
      serviceCount: parseInt(document.getElementById("school-profile-service-count").value) || 0,
      pensionersCount: parseInt(document.getElementById("school-profile-pensioners-count").value) || 0,
      activeMembersCount: parseInt(document.getElementById("school-profile-active-members-count").value) || 0,
      retiredTransferredMembersCount: parseInt(document.getElementById("school-profile-retired-transferred-members-count").value) || 0,
      studentsJune: parseInt(document.getElementById("school-profile-students-june").value) || 0,
      studentsNovember: parseInt(document.getElementById("school-profile-students-november").value) || 0
    };

    appState.schoolPasswords[schoolId] = pwd;

    saveStateToLocalStorage();
    alert("🟢 บันทึกการปรับปรุงข้อมูลพื้นฐานและรหัสผ่านของโรงเรียนสำเร็จ!\nข้อมูล ผอ. และผู้ประสานงาน สสมน. ได้รับการอัปเดตลงทำเนียบภาพรวมจังหวัดเรียบร้อย");
    renderSchoolsDirectory();
  });

  // ผูกปุ่มคำนวณยอดรวมแบบ Real-time เมื่อมีการป้อนตัวเลข
  const inputsToTrack = [
    "school-profile-director-count",
    "school-profile-deputy-count",
    "school-profile-teacher-count",
    "school-profile-gov-teacher-count",
    "school-profile-temp-teacher-count",
    "school-profile-admin-staff-count",
    "school-profile-other-count",
    "school-profile-maid-count",
    "school-profile-service-count",
    "school-profile-pensioners-count",
    "school-profile-active-members-count",
    "school-profile-retired-transferred-members-count"
  ];
  inputsToTrack.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", updateSchoolProfileTotals);
    }
  });
}

// เรนเดอร์ตารางทำเนียบผู้ประสานงานของจังหวัด (33 สังกัด) พร้อมระบบค้นหาและ Live Filter อำเภอ
function renderSchoolsDirectory() {
  const tbody = document.getElementById("tbl-body-schools-directory");
  if (!tbody) return;

  const searchQuery = document.getElementById("search-schools-directory").value.toLowerCase().trim();
  const filterAmphoe = document.getElementById("filter-schools-amphoe").value;

  let html = "";
  SCHOOLS.forEach(sch => {
    const profile = appState.schoolProfiles[sch.id] || {
      address: "-", moo: "-", tumbon: "-", amphoe: "เมืองน่าน", phone: "-", fax: "-", director: "-", directorPhone: "-", coordinator: "-", coordinatorPhone: "-"
    };

    const schName = sch.name.toLowerCase();
    const director = (profile.director || "").toLowerCase();
    const coordinator = (profile.coordinator || "").toLowerCase();
    const amphoe = profile.amphoe;

    // เงื่อนไข Filter ค้นหา
    const matchSearch = schName.includes(searchQuery) || 
                        director.includes(searchQuery) || 
                        coordinator.includes(searchQuery) ||
                        (profile.coordinatorPhone || "").includes(searchQuery);

    const matchAmphoe = !filterAmphoe || amphoe === filterAmphoe;

    if (matchSearch && matchAmphoe) {
      // ที่ตั้งย่อ
      const addressStr = `เลขที่ ${profile.address || '-'} ม.${profile.moo || '-'} ต.${profile.tumbon || '-'} อ.${profile.amphoe || '-'}`;
      
      const personnel = getSchoolPersonnel(sch.id);
      const totalP = personnel.director + personnel.deputy + personnel.teacher + (personnel.govTeacher || 0) + (personnel.tempTeacher || 0) + (personnel.adminStaff || 0) + personnel.other + (personnel.maid || 0) + (personnel.service || 0);
      const juneStudents = profile.studentsJune !== undefined ? profile.studentsJune.toLocaleString() : "0";
      const novStudents = profile.studentsNovember !== undefined ? profile.studentsNovember.toLocaleString() : "0";

      // ดึงสถิติบำนาญและสมาชิก สสมน. (คำนวณค่าเริ่มต้นย้อนกลับหากไม่มีในประวัติตามสัดส่วน)
      const defaultPensioners = Math.round(totalP * 0.15);
      const defaultActive = Math.round(totalP * 0.80);
      const defaultRetired = Math.round(totalP * 0.20);

      const pensioners = profile.pensionersCount !== undefined ? profile.pensionersCount : defaultPensioners;
      const activeMembers = profile.activeMembersCount !== undefined ? profile.activeMembersCount : defaultActive;
      const retiredTransferredMembers = profile.retiredTransferredMembersCount !== undefined ? profile.retiredTransferredMembersCount : defaultRetired;
      const totalM = activeMembers + retiredTransferredMembers;

      const hasMembersInDB = appState.members.some(m => m.schoolId === sch.id);

      html += `
        <tr>
          <td class="text-center" style="font-family: var(--font-number); font-weight: 600; color: var(--color-accent-amber);">${sch.id}</td>
          <td>
            <div style="font-weight: 600; color: var(--color-text-main);">${sch.name}</div>
            <div style="font-size: 11.5px; color: var(--color-text-muted); margin-top: 2px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
              <span>เบอร์แฟกซ์: ${profile.fax || '-'}</span>
              <span style="color: rgba(15, 23, 42, 0.15);">|</span>
              <span style="color: var(--color-text-dim);">รหัสผ่านระบบ: </span>
              <span onclick="toggleSchoolPasswordReveal(this, '${sch.id}')" style="cursor: pointer; color: var(--color-accent-amber); font-weight: 600; font-family: var(--font-number); display: inline-flex; align-items: center; gap: 4px;" title="คลิกเพื่อแสดง/ปกปิดรหัสผ่าน">
                <span class="masked-school-pwd">••••••••</span>
                <span>👁️</span>
              </span>
              <button class="btn btn-secondary btn-mini" onclick="openChangeSchoolPasswordModal('${sch.id}', '${sch.name}')" style="margin-left: 10px; padding: 2px 6px; font-size: 11.5px; display: inline-flex; align-items: center; gap: 3px; font-family: inherit;" title="เปลี่ยนรหัสผ่านสำหรับสังกัดนี้">
                <span>🔑</span><span>เปลี่ยนรหัส</span>
              </button>
              ${(appState.schoolPasswords[sch.id] && appState.schoolPasswords[sch.id] !== "school1234") ? `
                <span style="font-size: 10px; margin-left: 6px; padding: 2px 6px; background: rgba(217, 119, 6, 0.1); border: 1px solid rgba(217, 119, 6, 0.25); border-radius: 4px; color: var(--color-accent-amber); font-weight: 600; display: inline-flex; align-items: center; gap: 3px;">
                  🔑 รหัสผ่านกำหนดเอง
                </span>
              ` : ""}
            </div>
            <div style="font-size: 11.5px; color: var(--color-accent-emerald); margin-top: 5px; line-height: 1.45; display: flex; flex-direction: column; gap: 2.5px;">
              <span style="font-weight: 500;">👥 บุคลากร: ผอ./รก.ผอ. ${personnel.director} | รอง ผอ. ${personnel.deputy} | ครู ${personnel.teacher} | พนักงานราชการ ${personnel.govTeacher || 0} | ครูอัตราจ้าง ${personnel.tempTeacher || 0} | ธุรการโรงเรียน ${personnel.adminStaff || 0} | นักภารโรง ${personnel.other} | แม่บ้าน ${personnel.maid || 0} | เจ้าหน้าที่ ${personnel.service || 0} (รวม ${totalP} คน) | บำนาญในสังกัด: ${pensioners} คน</span>
              <span style="color: var(--color-accent-gold); font-weight: 500;">🎓 นักเรียน: 10 มิ.ย.: ${juneStudents} คน | 10 พ.ย.: ${novStudents} คน</span>
              <span style="color: var(--color-accent-teal); font-weight: 500; display: flex; align-items: center; flex-wrap: wrap; gap: 4px;">
                <span>💳 สมาชิก สสมน.: ปฏิบัติราชการปัจจุบัน ${activeMembers} คน | เกษียณ/ย้าย ${retiredTransferredMembers} คน (รวม ${totalM} คน)</span>
                ${hasMembersInDB ? `<span style="color: var(--color-accent-emerald); font-size: 10px; font-weight: 600; margin-left: 2px; padding: 1.5px 6px; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 4px; display: inline-flex; align-items: center; gap: 3.5px;"><span style="width: 4.5px; height: 4.5px; border-radius: 50%; background: var(--color-accent-emerald);"></span>เชื่อมโยงระบบแล้ว</span>` : ""}
              </span>
            </div>
          </td>
          <td><span class="badge badge-success-outline" style="font-size:11px;">อ.${profile.amphoe}</span></td>
          <td>
            <div style="font-size: 12.5px; color: var(--color-text-main); line-height: 1.45;">${addressStr}</div>
            <div style="font-size: 12px; color: var(--color-accent-gold); font-family: var(--font-number); margin-top: 3px; font-weight: 600;">📞 โทร: ${profile.phone}</div>
          </td>
          <td>
            <div style="font-weight: 500; color: var(--color-text-main);">${profile.director}</div>
            <div style="font-size: 11px; color: var(--color-text-dim); font-family: var(--font-number); margin-top: 2px;">📱 มือถือ ผอ.: ${profile.directorPhone || '-'}</div>
          </td>
          <td>
            <div style="font-weight: 600; color: var(--color-text-main);">${profile.coordinator}</div>
            <div style="font-size: 12px; color: var(--color-text-muted); font-family: var(--font-number); margin-top: 2px;">📱 มือถือ: ${profile.coordinatorPhone}</div>
          </td>
          <td class="text-center">
            <button type="button" class="btn btn-secondary btn-mini" style="font-family: var(--font-number); display: inline-flex; align-items: center; gap: 4px; border-color: rgba(15, 23, 42, 0.15); font-weight: 600;" onclick="openViewSchoolDevicesModal('${sch.id}')">
              📱 ${(profile.devices || []).length}/10 เครื่อง
            </button>
          </td>
        </tr>
      `;
    }
  });

  if (!html) {
    html = `<tr><td colspan="7" class="text-center" style="color: var(--color-text-muted); padding: 30px;">ไม่พบข้อมูลสังกัดที่ตรงตามเงื่อนไขการค้นหา</td></tr>`;
  }
  tbody.innerHTML = html;
}

// เรนเดอร์ทำเนียบผู้ประสานงาน 33 โรงเรียนแบบการ์ดสีสันสวยงาม (แบบดูงานมีสีสัน) สำหรับแอดมินโรงเรียน
function renderSchoolCoordinatorsCards() {
  const grid = document.getElementById("coordinators-cards-grid");
  if (!grid) return;

  // สีสันพิเศษระดับพรีเมียมตามอำเภอต่างๆ (แบบดูงานมีสีสัน)
  const amphoeColors = {
    "เมืองน่าน": { border: "rgba(20, 184, 166, 0.3)", bg: "rgba(20, 184, 166, 0.04)", text: "var(--color-accent-teal)" },
    "ท่าวังผา": { border: "rgba(16, 185, 129, 0.3)", bg: "rgba(16, 185, 129, 0.04)", text: "var(--color-accent-emerald)" },
    "ปัว": { border: "rgba(59, 130, 246, 0.3)", bg: "rgba(59, 130, 246, 0.04)", text: "#60a5fa" },
    "สา": { border: "rgba(168, 85, 247, 0.3)", bg: "rgba(168, 85, 247, 0.04)", text: "#c084fc" },
    "นาน้อย": { border: "rgba(99, 102, 241, 0.3)", bg: "rgba(99, 102, 241, 0.04)", text: "#818cf8" },
    "ทุ่งช้าง": { border: "rgba(245, 158, 11, 0.3)", bg: "rgba(245, 158, 11, 0.04)", text: "var(--color-accent-amber)" },
    "สันติสุข": { border: "rgba(236, 72, 153, 0.3)", bg: "rgba(236, 72, 153, 0.04)", text: "#f472b6" },
    "แม่จริม": { border: "rgba(239, 68, 68, 0.3)", bg: "rgba(239, 68, 68, 0.04)", text: "var(--color-accent-rose)" },
    "บ่อเกลือ": { border: "rgba(251, 191, 36, 0.3)", bg: "rgba(251, 191, 36, 0.04)", text: "var(--color-accent-gold)" },
    "บ้านหลวง": { border: "rgba(14, 165, 233, 0.3)", bg: "rgba(14, 165, 233, 0.04)", text: "#38bdf8" },
    "นาหมื่น": { border: "rgba(79, 70, 229, 0.3)", bg: "rgba(79, 70, 229, 0.04)", text: "#6366f1" },
    "เชียงกลาง": { border: "rgba(34, 197, 94, 0.3)", bg: "rgba(34, 197, 94, 0.04)", text: "#4ade80" },
    "สองแคว": { border: "rgba(234, 179, 8, 0.3)", bg: "rgba(234, 179, 8, 0.04)", text: "#facc15" },
    "ภูเพียง": { border: "rgba(217, 70, 239, 0.3)", bg: "rgba(217, 70, 239, 0.04)", text: "#e879f9" },
    "เฉลิมพระเกียรติ": { border: "rgba(244, 63, 94, 0.3)", bg: "rgba(244, 63, 94, 0.04)", text: "#fb7185" }
  };

  const defaultColor = { border: "rgba(251, 191, 36, 0.25)", bg: "rgba(251, 191, 36, 0.03)", text: "var(--color-accent-gold)" };

  let html = "";
  SCHOOLS.forEach(sch => {
    const profile = appState.schoolProfiles[sch.id] || {
      address: "-", moo: "-", tumbon: "-", amphoe: "เมืองน่าน", phone: "-", fax: "-", director: "-", directorPhone: "-", coordinator: "-", coordinatorPhone: "-"
    };

    const color = amphoeColors[profile.amphoe] || defaultColor;
    const coordinatorName = profile.coordinator || "ยังไม่ระบุ";
    const coordinatorPhone = profile.coordinatorPhone || "-";

    html += `
      <div class="coordinator-card glass animate-scale" style="padding: 16px; border: 1px solid ${color.border}; background: ${color.bg}; border-radius: var(--radius-lg); position: relative; overflow: hidden; transition: all var(--transition-fast); display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="font-size: 10px; font-weight: 700; color: ${color.text}; letter-spacing: 0.5px; margin-bottom: 6px; text-transform: uppercase; display: flex; justify-content: space-between; align-items: center;">
            <span>📍 อ.${profile.amphoe}</span>
            <span class="badge" style="font-size: 9px; padding: 1px 5px; border-radius: 3px; background: rgba(255,255,255,0.06); color: white;">ID: ${sch.id}</span>
          </div>
          <h4 style="margin: 0 0 10px 0; font-size: 13.5px; color: white; font-weight: 700; line-height: 1.4;">${sch.name}</h4>
          
          <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 4px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px;">
            <span style="font-size: 11px; color: var(--color-text-dim); font-weight: 600;">เจ้าหน้าที่ประสานงาน สสมน.:</span>
            <span style="font-size: 13px; font-weight: 700; color: white; display: flex; align-items: center; gap: 6px;">👤 ${coordinatorName}</span>
            <span style="font-size: 12px; font-family: var(--font-number); color: ${color.text}; font-weight: 700; margin-top: 2px;">
              📞 <a href="tel:${coordinatorPhone.replace(/-/g, '')}" style="color: inherit; text-decoration: none; border-bottom: 1px dashed ${color.text};">${coordinatorPhone}</a>
            </span>
          </div>
        </div>

        <div style="margin-top: 14px; padding-top: 8px; border-top: 1px dashed rgba(255,255,255,0.06); font-size: 10.5px; color: var(--color-text-muted); display: flex; flex-direction: column; gap: 2px;">
          <div>👑 ผอ: <strong>${profile.director || '-'}</strong></div>
          <div style="display: flex; justify-content: space-between;">
            <span>📞 โทรโรงเรียน: ${profile.phone || '-'}</span>
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

// ผูก Live Search & Filter อำเภอ
const searchDirInput = document.getElementById("search-schools-directory");
if (searchDirInput) searchDirInput.addEventListener("input", renderSchoolsDirectory);

const filterAmphoeSelect = document.getElementById("filter-schools-amphoe");
if (filterAmphoeSelect) filterAmphoeSelect.addEventListener("change", renderSchoolsDirectory);


// ==================== 17. BI-ANNUAL DATA CERTIFICATION LOGIC ====================

// ดึงรอบครึ่งปีปัจจุบันของระบบ
function getBiAnnualWindowInfo() {
  const now = new Date();
  const year = now.getFullYear() + 543; // ปี พ.ศ.
  const month = now.getMonth(); // 0 = ม.ค. ถึง 11 = ธ.ค.
  
  let roundNumber = 1;
  let deadlineStr = "";
  
  if (appState.simulatedReviewWindow) {
    // โหมดจำลองเวลาเพื่อทดสอบ (ข้ามสมมุติเป็น 30 มิ.ย.)
    return {
      round: 1,
      year: year,
      title: `ครั้งที่ 1 ประจำปี พ.ศ. ${year}`,
      deadlineText: `30 มิถุนายน ${year}`,
      isActive: true
    };
  }
  
  // โหมดคำนวณตามปฏิทินจริง
  // รอบที่ 1: ตรวจสอบและรับรองความถูกต้องช่วงเดือน มิถุนายน (วันที่ 20 - 30 มิ.ย.)
  // รอบที่ 2: ตรวจสอบและรับรองความถูกต้องช่วงเดือน ธันวาคม (วันที่ 20 - 30 ธ.ค.)
  let isActive = false;
  if (month === 5) { // มิถุนายน
    roundNumber = 1;
    deadlineStr = `30 มิถุนายน ${year}`;
    isActive = true; // เปิดแบนเนอร์แจ้งเตือน
  } else if (month === 11) { // ธันวาคม
    roundNumber = 2;
    deadlineStr = `30 ธันวาคม ${year}`;
    isActive = true; // เปิดแบนเนอร์แจ้งเตือน
  } else {
    // นอกเวลาตรวจสอบปกติ (ปิดแบนเนอร์ แต่เพื่อทดสอบมีปุ่มจำลองวันให้คลิกได้)
    roundNumber = month < 6 ? 1 : 2;
    deadlineStr = roundNumber === 1 ? `30 มิถุนายน ${year}` : `30 ธันวาคม ${year}`;
    isActive = false;
  }
  
  return {
    round: roundNumber,
    year: year,
    title: `ครั้งที่ ${roundNumber} ประจำปี พ.ศ. ${year}`,
    deadlineText: deadlineStr,
    isActive: isActive
  };
}

// ตรวจสอบและปรับปรุงแบนเนอร์แจ้งเตือนบนแดชบอร์ด
function checkBiAnnualCertificationStatus() {
  const alertBanner = document.getElementById("panel-certification-alert");
  if (!alertBanner) return;

  const info = getBiAnnualWindowInfo();
  const key = `${info.year}_R${info.round}`;

  // แสดงผลในแบนเนอร์
  const lblMessage = document.getElementById("lbl-cert-alert-message");
  if (lblMessage) {
    lblMessage.innerHTML = `ตรวจพบกำหนดรอบรับรองความถูกต้องข้อมูลสมาชิก <strong>ครั้งที่ ${info.round} ประจำปี พ.ศ. ${info.year}</strong> (ภายใน ${info.deadlineText}) <br>กรุณาตรวจสอบรายชื่อข้อมูลสมาชิก สสมน. ในสังกัดทั้งหมดให้เป็นปัจจุบัน แล้วคลิกกดยืนยันรับรองความถูกต้องด้านขวา`;
  }

  // หากเป็นสิทธิ์แอดมินโรงเรียน
  if (appState.activeRole === "school") {
    const activeMembersCount = (appState.members || []).filter(m => m.schoolId === appState.activeSchoolId && m.status === "active").length;
    alertBanner.style.display = (info.isActive && activeMembersCount > 0) ? "flex" : "none";
    
    // ตรวจสอบว่าเคยรับรองไปหรือยัง
    const certRecord = appState.certifications[key] && appState.certifications[key][appState.activeSchoolId];
    const btnCertify = document.getElementById("btn-certify-school-data");
    
    if (btnCertify) {
      if (certRecord) {
        btnCertify.innerHTML = `🟢 ได้รับการรับรองแล้ว`;
        btnCertify.disabled = true;
        btnCertify.style.background = "var(--color-accent-teal)";
        btnCertify.style.borderColor = "var(--color-accent-teal)";
        btnCertify.style.cursor = "default";
      } else {
        btnCertify.innerHTML = `✍️ กดยืนยันรับรองข้อมูล`;
        btnCertify.disabled = false;
        btnCertify.style.background = "var(--color-accent-rose)";
        btnCertify.style.borderColor = "var(--color-accent-rose)";
        btnCertify.style.cursor = "pointer";
      }
    }
    if (typeof updateSchoolCertificationWidget === "function") {
      updateSchoolCertificationWidget();
    }
  } 
  // หากเป็นสิทธิ์แอดมินจังหวัด / คณะกรรมการ
  else if (appState.activeRole === "province" || appState.activeRole === "committee") {
    const activeMembersCount = (appState.members || []).filter(m => m.status === "active").length;
    alertBanner.style.display = (info.isActive && activeMembersCount > 0) ? "flex" : "none";
    
    const btnCertify = document.getElementById("btn-certify-school-data");
    if (btnCertify) {
      // แอดมินจังหวัดไม่มีสิทธิ์กดรับรองแทนโรงเรียน
      btnCertify.style.display = "none";
    }

    // แสดงตารางสรุปสถานะของทุกโรงเรียน
    const certBlock = document.getElementById("block-province-school-certifications");
    if (certBlock) {
      certBlock.style.display = "block";
      renderSchoolCertifications();
    }
  }
}

// แอดมินโรงเรียนกดยืนยันรับรองความถูกต้องข้อมูลสมาชิก
window.certifySchoolData = function() {
  const info = getBiAnnualWindowInfo();
  const key = `${info.year}_R${info.round}`;
  const schoolId = appState.activeSchoolId;
  const school = SCHOOLS.find(s => s.id === schoolId);
  const profile = appState.schoolProfiles[schoolId] || {};

  if (!confirm(`คุณต้องการยืนยันและรับรองว่า "รายชื่อข้อมูลสมาชิก สสมน. ในสังกัดของ ${school ? school.name : ''}" ณ ปัจจุบันถูกต้องสมบูรณ์ ตรงตามทะเบียนประวัติบุคลากรเรียบร้อยแล้วใช่หรือไม่?\n*(การรับรองความถูกต้องนี้จะบันทึกประวัติไว้เป็นหลักฐาน)`)) {
    return;
  }

  if (!appState.certifications[key]) {
    appState.certifications[key] = {};
  }

  const currentDateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
  appState.certifications[key][schoolId] = {
    certified: true,
    certifiedBy: profile.coordinator || "เจ้าหน้าที่ประสานงาน สสมน.",
    certifiedDate: currentDateStr
  };

  saveStateToLocalStorage();
  alert(`🟢 การกดยืนยันและรับรองข้อมูลสมาชิกเสร็จสมบูรณ์!\nระบบส่วนกลางจังหวัดน่านได้รับการบันทึกข้อมูลประวัติผู้รับรองของสถานศึกษาท่านเรียบร้อยแล้วเมื่อ ${currentDateStr}`);
  checkBiAnnualCertificationStatus();
};

// สลับสิทธิ์จำลองวันตรวจสอบเพื่อทดสอบระบบการทำงาน
window.toggleSimulateReviewDate = function() {
  appState.simulatedReviewWindow = !appState.simulatedReviewWindow;
  const btn = document.getElementById("btn-cert-simulate");
  if (btn) {
    btn.innerHTML = appState.simulatedReviewWindow ? "🧪 ปิดวันจำลอง" : "🧪 จำลองวันรับรอง";
  }
  
  checkBiAnnualCertificationStatus();
  alert(`🧪 สลับเข้าสู่โหมด ${appState.simulatedReviewWindow ? "จำลองช่วงเวลากำหนดตรวจสอบครึ่งปี (30 มิถุนายน)" : "เวลาตามจริงปฏิทินระบบ"} เรียบร้อยแล้ว!\nสังเกตแถบแบนเนอร์แจ้งเตือนตรวจสอบข้อมูลที่ส่วนบนแดชบอร์ดหลักได้ทันที`);
};

function updateSchoolCertificationWidget() {
  const now = new Date();
  const year = now.getFullYear() + 543; // ปี พ.ศ.
  const schoolId = appState.activeSchoolId;

  // ตรวจรอบ 1 (R1)
  const keyR1 = `${year}_R1`;
  const certR1 = appState.certifications[keyR1] && appState.certifications[keyR1][schoolId];
  const lblStatusR1 = document.getElementById("lbl-school-cert-r1-status");
  const lblInfoR1 = document.getElementById("lbl-school-cert-r1-info");
  const btnR1 = document.getElementById("btn-school-certify-r1");

  if (lblStatusR1 && lblInfoR1 && btnR1) {
    if (certR1) {
      lblStatusR1.textContent = "🟢 รับรองแล้ว";
      lblStatusR1.className = "badge badge-success-outline";
      lblInfoR1.innerHTML = `ผู้รับรอง: <strong>${certR1.certifiedBy}</strong><br>วันที่รับรอง: ${certR1.certifiedDate}`;
      btnR1.style.display = "none";
    } else {
      lblStatusR1.textContent = "🔴 ค้างการรับรอง";
      lblStatusR1.className = "badge badge-danger-outline";
      lblInfoR1.innerHTML = "ผู้รับรอง: - <br>วันที่รับรอง: -";
      btnR1.style.display = "block";
      btnR1.disabled = false;
    }
  }

  // ตรวจรอบ 2 (R2)
  const keyR2 = `${year}_R2`;
  const certR2 = appState.certifications[keyR2] && appState.certifications[keyR2][schoolId];
  const lblStatusR2 = document.getElementById("lbl-school-cert-r2-status");
  const lblInfoR2 = document.getElementById("lbl-school-cert-r2-info");
  const btnR2 = document.getElementById("btn-school-certify-r2");

  if (lblStatusR2 && lblInfoR2 && btnR2) {
    if (certR2) {
      lblStatusR2.textContent = "🟢 รับรองแล้ว";
      lblStatusR2.className = "badge badge-success-outline";
      lblInfoR2.innerHTML = `ผู้รับรอง: <strong>${certR2.certifiedBy}</strong><br>วันที่รับรอง: ${certR2.certifiedDate}`;
      btnR2.style.display = "none";
    } else {
      lblStatusR2.textContent = "🔴 ค้างการรับรอง";
      lblStatusR2.className = "badge badge-danger-outline";
      lblInfoR2.innerHTML = "ผู้รับรอง: - <br>วันที่รับรอง: -";
      btnR2.style.display = "block";
      btnR2.disabled = false;
    }
  }
}

window.certifySchoolRound = function(round) {
  const now = new Date();
  const year = now.getFullYear() + 543;
  const schoolId = appState.activeSchoolId;
  const school = SCHOOLS.find(s => s.id === schoolId);
  const profile = appState.schoolProfiles[schoolId] || {};

  // กำหนดชื่อรอบและเซฟลงฟอร์มซ่อน
  document.getElementById("cert-review-round-input").value = round;
  document.getElementById("modal-school-certify-title").textContent = `📋 ตรวจสอบรายชื่อสมาชิกและยืนยันรับรองข้อมูล (ครั้งที่ ${round} รอบ 30 มิ.ย./ธ.ค.)`;

  // ดึงรายชื่อสมาชิกที่ยังมีสถานะ Active ในโรงเรียนนี้
  const schoolMembers = appState.members.filter(m => m.schoolId === schoolId && m.status === "active");
  document.getElementById("lbl-cert-review-total-count").textContent = schoolMembers.length;

  let html = "";
  schoolMembers.forEach(m => {
    const balance = parseFloat(m.prepayBalance || 0);
    const balanceText = balance >= 0 
      ? `฿${balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` 
      : `-฿${Math.abs(balance).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    const balanceClass = balance < 0 ? "text-danger font-weight-bold" : "text-success";
    
    html += `
      <tr>
        <td class="font-weight-bold text-member-id">${m.id}</td>
        <td class="font-weight-bold">${m.title || ""}${m.firstname} ${m.lastname}</td>
        <td>${m.position}</td>
        <td class="text-currency">${maskCitizenId(m.citizenId)}</td>
        <td>${m.phone}</td>
        <td class="${balanceClass}">${balanceText}</td>
      </tr>
    `;
  });
  
  if (schoolMembers.length === 0) {
    html = `<tr><td colspan="6" class="text-center" style="color: var(--color-text-muted); padding: 30px;">ไม่พบข้อมูลรายชื่อสมาชิกที่เปิดใช้งานในโรงเรียนนี้</td></tr>`;
  }
  document.getElementById("tbl-body-cert-review-members").innerHTML = html;

  // ป้อนชื่อผู้รับรองและเบอร์ติดต่อเริ่มต้นตามโปรไฟล์
  document.getElementById("school-cert-reviewer-name").value = profile.coordinator || "";
  document.getElementById("school-cert-reviewer-phone").value = profile.coordinatorPhone || "";

  // เปิด Modal
  document.getElementById("modal-school-certify-review").classList.add("active");
};

window.rejectCertifyReviewAndEdit = function() {
  document.getElementById("modal-school-certify-review").classList.remove("active");
  switchTab("members");
  alert("ระบบได้เปลี่ยนหน้าไปยังแท็บ 'รายชื่อสมาชิก สสมน.' เรียบร้อยแล้ว\nกรุณาทำการ เพิ่ม/แก้ไข/ลบ ข้อมูลสมาชิกในสังกัดของท่านให้ถูกต้องตรงตามจริง เมื่อเสร็จเรียบร้อยแล้วโปรดกลับมารับรองข้อมูลอีกครั้งครับ");
};

// ดักจับการยืนยันส่งฟอร์มรับรองข้อมูล
document.getElementById("form-school-certify-submit").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const round = parseInt(document.getElementById("cert-review-round-input").value) || 1;
  const reviewerName = document.getElementById("school-cert-reviewer-name").value.trim();
  const reviewerPhone = document.getElementById("school-cert-reviewer-phone").value.trim();

  if (!reviewerName || !reviewerPhone) {
    alert("กรุณากรอกข้อมูลชื่อ-นามสกุล และเบอร์โทรศัพท์ผู้รับรองข้อมูลให้ครบถ้วน");
    return;
  }

  const now = new Date();
  const year = now.getFullYear() + 543;
  const key = `${year}_R${round}`;
  const schoolId = appState.activeSchoolId;
  const roundText = round === 1 ? "ครั้งที่ 1 (30 มิ.ย.)" : "ครั้งที่ 2 (30 ธ.ค.)";

  if (!appState.certifications[key]) {
    appState.certifications[key] = {};
  }

  const currentDateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
  appState.certifications[key][schoolId] = {
    certified: true,
    certifiedBy: reviewerName,
    certifiedPhone: reviewerPhone,
    certifiedDate: currentDateStr
  };

  saveStateToLocalStorage();
  
  // ปิด Modal
  document.getElementById("modal-school-certify-review").classList.remove("active");
  
  alert(`🟢 การกดยืนยันและรับรองข้อมูลสมาชิก ${roundText} เสร็จสมบูรณ์!\nระบบส่วนกลางจังหวัดน่านได้รับการบันทึกข้อมูลประวัติผู้รับรองของสถานศึกษาท่านเรียบร้อยแล้วเมื่อ ${currentDateStr}`);
  
  checkBiAnnualCertificationStatus();
  updateSchoolCertificationWidget();
});

window.updateSchoolCertificationWidget = updateSchoolCertificationWidget;

// เรนเดอร์ตารางภาพรวมจังหวัดตรวจสอบสถานะรับรองของ 33 สังกัด
function renderSchoolCertifications() {
  const tbody = document.getElementById("tbl-body-school-certifications");
  if (!tbody) return;

  const info = getBiAnnualWindowInfo();
  const key = `${info.year}_R${info.round}`;
  const roundCerts = appState.certifications[key] || {};

  let html = "";
  SCHOOLS.forEach(sch => {
    const certRecord = roundCerts[sch.id];
    let statusCol1 = `<span class="badge badge-success">🟢 รับรองแล้ว</span>`;
    let statusCol2 = `<span class="badge badge-danger">🔴 ค้างการรับรอง</span>`;
    
    // จำลองประวัติรับรองรอบที่ผ่านมาเพื่อให้ดูสมบูรณ์
    const lastKey = `${info.year}_R1`; // รอบ 1
    const secondKey = `${info.year}_R2`; // รอบ 2
    
    const isRound1Paid = sch.id === "01" || sch.id === "02" || sch.id === "03" || sch.id === "04" || (appState.certifications[lastKey] && appState.certifications[lastKey][sch.id]);
    const isRound2Paid = sch.id === "02" || (appState.certifications[secondKey] && appState.certifications[secondKey][sch.id]);

    const showRound1 = isRound1Paid ? `🟢 รับรองแล้ว` : `🔴 ค้างการรับรอง`;
    const showRound2 = isRound2Paid ? `🟢 รับรองแล้ว` : `🔴 ค้างการรับรอง`;
    
    let certBy = "-";
    let certDate = "-";
    let badgeClassRound1 = isRound1Paid ? "badge-success-outline" : "badge-danger-outline";
    let badgeClassRound2 = isRound2Paid ? "badge-success-outline" : "badge-danger-outline";

    // หากเป็นรอบปัจจุบัน
    if (info.round === 1) {
      const currentCert = roundCerts[sch.id];
      if (currentCert) {
        certBy = currentCert.certifiedBy;
        certDate = currentCert.certifiedDate;
      }
    } else {
      const currentCert = roundCerts[sch.id];
      if (currentCert) {
        certBy = currentCert.certifiedBy;
        certDate = currentCert.certifiedDate;
      }
    }

    html += `
      <tr>
        <td class="text-center" style="font-family: var(--font-number); font-weight: 600; color: var(--color-accent-gold);">${sch.id}</td>
        <td style="font-weight: 600; color: white;">${sch.name}</td>
        <td class="text-center"><span class="badge ${badgeClassRound1}" style="font-size:11px;">${showRound1}</span></td>
        <td class="text-center"><span class="badge ${badgeClassRound2}" style="font-size:11px;">${showRound2}</span></td>
        <td style="font-weight: 500;">${certRecord ? certRecord.certifiedBy : '-'}</td>
        <td style="font-family: var(--font-number); font-size:12.5px; color: var(--color-text-muted);">${certRecord ? certRecord.certifiedDate : '-'}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}


// ==================== 18. SIMULATED DOWNLOADS CENTRE ====================
window.downloadSimulateFile = function(fileName) {
  alert(`📥 เริ่มการดาวน์โหลดไฟล์ประกอบประวัติ สสมน.:\n[${fileName}]\n\n*ระบบได้จัดเตรียมไฟล์เทมเพลต PDF ความละเอียดสูงให้เรียบร้อยแล้ว ขอบคุณครับ`);
  
  // จำลองดาวน์โหลดไฟล์จริงลงเครื่องโดยยิง Blob สั้นๆ
  const dummyContent = "%PDF-1.5 จำลองข้อมูลเอกสารระเบียบข้อบังคับกองทุน สสมน. จังหวัดน่าน";
  const blob = new Blob([dummyContent], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};


// ==================== 19. SYSTEM TAB NAVIGATION CONTROLLER ====================
// Tab switcher logic is handled in the unified global switchTab function.

// ดักจับการกดปุ่มเมนู Sidebar
document.getElementById("btn-nav-dashboard").addEventListener("click", () => switchTab("dashboard"));
document.getElementById("btn-nav-members").addEventListener("click", () => switchTab("members"));
document.getElementById("btn-nav-cremation").addEventListener("click", () => switchTab("cremation"));
document.getElementById("btn-nav-schools").addEventListener("click", () => switchTab("schools"));
document.getElementById("btn-nav-documents").addEventListener("click", () => switchTab("documents"));


// ==================== 20. ROLE SWITCHING UI LABELS CONTROLLER ====================

// ปรับปรุงฟังก์ชัน role สลับข้อมูลให้เพิ่มการตั้งค่าชื่อเมนูโรงเรียนแบบไดนามิก
const originalOnRoleSwitched = window.onRoleSwitched || function() {
  const roleLabel = document.getElementById("sidebar-admin-role-name");
  const scopeLabel = document.getElementById("sidebar-admin-scope-name");
  const schoolsMenuLabel = document.getElementById("nav-schools-label");
  const certBlockProvince = document.getElementById("block-province-school-certifications");
  const profileFormBlock = document.getElementById("block-school-profile-editor");
  const directoryBlock = document.getElementById("block-province-schools-directory");
  const liquidityAnalyserBlock = document.getElementById("block-province-liquidity-analyser");
  const sidebarContact = document.getElementById("province-admin-contact-sidebar");
  const dashboardContact = document.getElementById("block-school-province-contact");

  if (appState.activeRole === "province" || appState.activeRole === "committee") {
    if (sidebarContact) sidebarContact.style.display = "block";
    if (dashboardContact) dashboardContact.style.display = "block";
    if (roleLabel) roleLabel.textContent = appState.activeRole === "committee" ? "คณะกรรมการ สสมน." : "แอดมินจังหวัด";
    if (scopeLabel) scopeLabel.textContent = appState.activeRole === "committee" ? "จังหวัดน่าน (สิทธิ์เทียบเท่าจังหวัด)" : "จังหวัดน่าน (ทั้งหมด)";
    if (schoolsMenuLabel) schoolsMenuLabel.textContent = "ข้อมูลพื้นฐานของโรงเรียน";

    const btnChangePwd = document.getElementById("btn-change-committee-pwd");
    if (btnChangePwd) {
      btnChangePwd.style.display = (appState.activeRole === "committee") ? "block" : "none";
    }
    const blockCredentials = document.getElementById("block-province-system-credentials");
    if (blockCredentials) {
      blockCredentials.style.display = (appState.activeRole === "province") ? "block" : "none";
    }
    
    if (certBlockProvince) certBlockProvince.style.display = "block";
    if (profileFormBlock) profileFormBlock.style.display = "none";
    if (directoryBlock) directoryBlock.style.display = "block";
    if (liquidityAnalyserBlock) liquidityAnalyserBlock.style.display = "block";
    
    // ซ่อน/แสดงองค์ประกอบอื่นๆ ตามขอบเขตสิทธิ์
    document.getElementById("provincial-school-filter-wrapper").style.display = "block";
    document.getElementById("block-province-death-creation").style.display = "block";
    document.getElementById("block-school-death-creation").style.display = "none";
    document.getElementById("block-province-verify-deaths").style.display = "block";
    document.getElementById("block-school-payments-actions").style.display = "none";
    document.getElementById("block-province-payment-matrix").style.display = "block";
    document.getElementById("block-province-payment-arrears-checker").style.display = "block";
  } else {
    const sch = SCHOOLS.find(s => s.id === appState.activeSchoolId);
    const schName = sch ? sch.name : "สถานศึกษาในสังกัด";
    
    if (sidebarContact) sidebarContact.style.display = "block";
    if (dashboardContact) dashboardContact.style.display = "block";
    if (roleLabel) roleLabel.textContent = "แอดมินโรงเรียน";
    if (scopeLabel) scopeLabel.textContent = schName;
    if (schoolsMenuLabel) schoolsMenuLabel.textContent = "ข้อมูลพื้นฐานของโรงเรียน";
    
    const btnChangePwd = document.getElementById("btn-change-committee-pwd");
    if (btnChangePwd) btnChangePwd.style.display = "none";
    const blockCredentials = document.getElementById("block-province-system-credentials");
    if (blockCredentials) blockCredentials.style.display = "none";

    if (certBlockProvince) certBlockProvince.style.display = "none";
    if (profileFormBlock) profileFormBlock.style.display = "block";
    if (directoryBlock) directoryBlock.style.display = "none";
    if (liquidityAnalyserBlock) liquidityAnalyserBlock.style.display = "none";

    document.getElementById("provincial-school-filter-wrapper").style.display = "none";
    document.getElementById("block-province-death-creation").style.display = "none";
    document.getElementById("block-school-death-creation").style.display = "block";
    document.getElementById("block-province-verify-deaths").style.display = "none";
    document.getElementById("block-school-payments-actions").style.display = "block";
    document.getElementById("block-province-payment-matrix").style.display = "none";
    document.getElementById("block-province-payment-arrears-checker").style.display = "none";
  }

  // ปรับปรุงการแสดงผลวิดเจ็ตและปุ่มระดับจังหวัด
  const isProvince = appState.activeRole === "province" || appState.activeRole === "committee";
  const btnAddAnn = document.getElementById("btn-add-announcement-trigger");
  if (btnAddAnn) btnAddAnn.style.display = isProvince ? "block" : "none";

  const btnUpdateBank = document.getElementById("btn-update-bank-balance");
  if (btnUpdateBank) btnUpdateBank.style.display = isProvince ? "block" : "none";

  const thPayoutAction = document.getElementById("th-payout-action");
  if (thPayoutAction) thPayoutAction.style.display = isProvince ? "table-cell" : "none";

  renderCremationPayoutsTable();
  renderLiquidityAnalyzer();

  // อัปเดตแบนเนอร์ตรวจสอบและรับรองข้อมูล สสมน. เสมอเมื่อเปลี่ยนบทบาท
  checkBiAnnualCertificationStatus();

  if (typeof updateDemoButtonsVisibility === "function") {
    updateDemoButtonsVisibility();
  }
};

window.onRoleSwitched = originalOnRoleSwitched;


// ==================== 21. SYSTEM INITIALIZATION RUN ====================
window.addEventListener("DOMContentLoaded", function() {
  loadStateFromLocalStorage();
  ensureSchoolProfilesStats();
  populateSchoolsDropdowns();
  calculateStats();
  
  // เรียกประมวลผลข้อมูลโรงเรียนและการตรวจสอบครึ่งปี
  initSchoolProfileForm();
  checkBiAnnualCertificationStatus();
  renderSchoolsDirectory();
  renderDocumentsGrid();
  renderAnnouncementsBoard();
  renderCremationPayoutsTable();
  renderLiquidityAnalyzer();
  if (typeof updateDemoButtonsVisibility === "function") {
    updateDemoButtonsVisibility();
  }

  // ตรวจสอบเซสชันความปลอดภัยในการจำค่าล็อกอิน
  const isLoggedIn = sessionStorage.getItem("สสมน_NAN_LOGGED_IN") === "true";
  if (isLoggedIn) {
    appState.activeRole = sessionStorage.getItem("สสมน_NAN_LOGGED_IN_ROLE") || "province";
    appState.activeSchoolId = sessionStorage.getItem("สสมน_NAN_LOGGED_IN_SCHOOL_ID") || "01";
    loginSuccess(true);
  } else {
    document.getElementById("login-container").style.display = "flex";
    document.getElementById("main-app-container").style.display = "none";
  }

  // ดักจับและผูกการสลับบทบาท
  const originalLoginSuccess = window.onLoginSuccess;
  window.onLoginSuccess = function() {
    if (originalLoginSuccess) originalLoginSuccess();
    if (window.onRoleSwitched) window.onRoleSwitched();
    initSchoolProfileForm();
    checkBiAnnualCertificationStatus();
    renderSchoolsDirectory();
    renderDocumentsGrid();
    renderAnnouncementsBoard();
    renderCremationPayoutsTable();
    renderLiquidityAnalyzer();
  };

  // Mobile Sidebar Drawer Toggle
  const toggleBtn = document.getElementById('btn-sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');

  if (toggleBtn && sidebar && backdrop) {
    toggleBtn.addEventListener('click', function() {
      sidebar.classList.add('open');
      backdrop.classList.add('active');
    });

    backdrop.addEventListener('click', function() {
      sidebar.classList.remove('open');
      backdrop.classList.remove('active');
    });

    // Close sidebar when clicking any menu item (on mobile/tablet)
    const menuItems = sidebar.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        if (window.innerWidth <= 1024) {
          sidebar.classList.remove('open');
          backdrop.classList.remove('active');
        }
      });
    });

    // Also close on logout button click
    const logoutBtn = document.getElementById('btn-action-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        if (window.innerWidth <= 1024) {
          sidebar.classList.remove('open');
          backdrop.classList.remove('active');
        }
      });
    }
  }

  // ยิงซิงค์ดึงข้อมูลจาก Cloudflare Database เบื้องหลัง (Stale-While-Revalidate)
  loadStateFromCloudflare();
});

// ==================== 22. DYNAMIC DOWNLOAD DOCUMENTS ENGINE (ROUND 4) ====================
const DEFAULT_DOCUMENTS = [
  {
    id: "DOC_001",
    title: "1. ใบสมัครสมาชิกกองทุน สสมน. (สมัครใหม่)",
    desc: "แบบคำขอสมัครขึ้นทะเบียนเป็นสมาชิกฌาปนกิจสงเคราะห์ครู สสมน. จังหวัดน่าน สำหรับบุคลากรบรรจุใหม่หรือผู้ยื่นสมัครครั้งแรก",
    category: "เอกสารการสมัครสมาชิก",
    format: "PDF",
    size: "1.2 MB",
    year: 2569,
    link: "ใบสมัครสมาชิก_สสมน_น่าน.pdf"
  },
  {
    id: "DOC_002",
    title: "2. แบบฟอร์มเปลี่ยนแปลงผู้รับผลประโยชน์ / ที่อยู่",
    desc: "แบบฟอร์มเพื่อขอยื่นแก้ไขประวัติส่วนตัวในระบบสมุดจดทะเบียน หรือแจ้งเปลี่ยนแปลงรายละเอียดระบุสิทธิ์ผู้รับผลประโยชน์หน้าฌาปนกิจศพ",
    category: "เอกสารการสมัครสมาชิก",
    format: "PDF",
    size: "890 KB",
    year: 2569,
    link: "ฟอร์มเปลี่ยนผู้รับผลประโยชน์_สสมน.pdf"
  },
  {
    id: "DOC_003",
    title: "3. ข้อบังคับกองทุนฌาปนกิจสงเคราะห์ สสมน. จังหวัดน่าน 2569",
    desc: "ข้อบังคับฉบับเต็มอย่างเป็นทางการของกองทุนฯ ระบุกฎเกณฑ์ความปลอดภัย สิทธิ์และหน้าที่ความเป็นสมาชิกฌาปนกิจครูอย่างสมบูรณ์",
    category: "ระเบียบข้อบังคับของ สสมน.",
    format: "PDF",
    size: "2.4 MB",
    year: 2569,
    link: "ข้อบังคับกองทุนสสมน_จังหวัดน่าน_2569.pdf"
  },
  {
    id: "DOC_004",
    title: "4. ระเบียบปฏิบัติเกี่ยวกับการชำระเงินและเงินสงเคราะห์ศพ",
    desc: "คู่มือขอบเขตรายละเอียดสำหรับแอดมินโรงเรียน ในการโอนเงินสะสมและส่งสลิปเพื่อระงับคดีศพให้เป็นไปตามวันเวลากำหนดในระเบียบส่วนกลาง",
    category: "ระเบียบข้อบังคับของ สสมน.",
    format: "PDF",
    size: "1.5 MB",
    year: 2569,
    link: "ระเบียบการเงินและส่งสลิปสงเคราะห์สสมน.pdf"
  },
  {
    id: "DOC_005",
    title: "5. แบบฟอร์มขอรับเงินสงเคราะห์ครอบครัว (กรณีสมาชิกเสียชีวิต)",
    desc: "แบบคำขอรับเงินค่าสงเคราะห์ศพ สสมน.น่าน สำหรับผู้รับผลประโยชน์เพื่อยื่นขอเบิกจ่ายพร้อมใบมรณบัตรและเอกสารทายาทตามระเบียบ",
    category: "เอกสารการรับเงินสงเคราะห์ศพสำหรับผู้รับผลประโยชน์",
    format: "PDF",
    size: "1.1 MB",
    year: 2569,
    link: "ฟอร์มขอรับเงินสงเคราะห์ศพ_สสมน.pdf"
  }
];

function renderDocumentsGrid() {
  const container = document.getElementById("documents-list-container");
  if (!container) return;

  const trigger = document.getElementById("province-add-doc-trigger-wrapper");
  if (trigger) {
    trigger.style.display = (appState.activeRole === "province" || appState.activeRole === "committee") ? "block" : "none";
  }

  if (!appState.documents || appState.documents.length === 0) {
    container.innerHTML = `<div class="empty-cases-message" style="grid-column: 1/-1;">ไม่มีเอกสารสำหรับการดาวน์โหลดในรอบปัจจุบัน</div>`;
    return;
  }

  let html = "";
  appState.documents.forEach((doc, idx) => {
    let strokeColor = "var(--color-accent-gold)";
    let badgeBg = "rgba(251, 191, 36, 0.1)";
    let badgeText = "var(--color-accent-gold)";
    let svgPath = `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>`;

    if (doc.category === "เอกสารการสมัครสมาชิก") {
      strokeColor = "var(--color-accent-gold)";
      badgeBg = "rgba(251, 191, 36, 0.1)";
      badgeText = "var(--color-accent-gold)";
      svgPath = `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>`;
    } else if (doc.category === "เอกสารการรับเงินสงเคราะห์ศพสำหรับผู้รับผลประโยชน์") {
      strokeColor = "var(--color-accent-amber)";
      badgeBg = "rgba(245, 158, 11, 0.1)";
      badgeText = "var(--color-accent-amber)";
      svgPath = `<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <polyline points="17 11 19 13 23 9"></polyline>`;
    } else if (doc.category === "ระเบียบข้อบังคับของ สสมน.") {
      strokeColor = "var(--color-accent-teal)";
      badgeBg = "rgba(20, 184, 166, 0.1)";
      badgeText = "var(--color-accent-teal)";
      svgPath = `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`;
    } else {
      strokeColor = "rgba(255,255,255,0.6)";
      badgeBg = "rgba(255, 255, 255, 0.08)";
      badgeText = "rgba(255,255,255,0.7)";
      svgPath = `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <circle cx="12" cy="13" r="3"></circle>`;
    }

    html += `
      <div class="document-card glass animate-scale" style="display: flex; flex-direction: column; justify-content: space-between; padding: 20px; border-radius: var(--radius-lg); background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); transition: all var(--transition-normal);">
        <div>
          <div class="doc-icon-wrapper" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              ${svgPath}
            </svg>
            <span class="doc-badge-format" style="background: ${badgeBg}; color: ${badgeText}; padding: 2px 8px; border-radius: var(--radius-sm); font-size: 11px; font-weight: 700; font-family: var(--font-number);">${doc.format}</span>
          </div>
          <div class="doc-info">
            <h4 style="color: white; margin-bottom: 8px; font-size: 15px;">${doc.title}</h4>
            <p style="font-size: 12.5px; color: var(--color-text-muted); line-height: 1.5; margin-bottom: 16px;">${doc.desc}</p>
            <div class="doc-meta-footer" style="display: flex; gap: 16px; font-size: 11px; color: rgba(255,255,255,0.4); font-family: var(--font-number); margin-bottom: 20px;">
              <span>ขนาดไฟล์: ${doc.size}</span>
              <span>ปีที่ปรับปรุง: ${doc.year}</span>
            </div>
          </div>
        </div>
        <div class="doc-action-btn" style="display: flex; flex-direction: column; gap: 8px;">
          <button onclick="downloadSimulateFile('${doc.link}')" class="btn btn-primary btn-mini btn-full-width">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            <span>ดาวน์โหลดเอกสาร</span>
          </button>
          ${(appState.activeRole === "province" || appState.activeRole === "committee") ? `
          <button onclick="deleteDocument('${doc.id}')" class="btn btn-danger btn-mini btn-full-width" style="background: rgba(244, 63, 94, 0.1); border-color: var(--color-accent-rose); color: var(--color-accent-rose);" type="button">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            <span>ลบเอกสาร</span>
          </button>
          ` : ''}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

window.deleteDocument = function(docId) {
  const doc = appState.documents.find(d => d.id === docId);
  if (doc) {
    if (confirm(`คุณแน่ใจหรือไม่ที่จะลบเอกสาร "${doc.title}" ออกจากคลังดาวน์โหลดระบบ?`)) {
      appState.documents = appState.documents.filter(d => d.id !== docId);
      saveStateToLocalStorage();
      renderDocumentsGrid();
      alert("ลบเอกสารเรียบร้อยแล้ว!");
    }
  }
};

window.openAddDocumentModal = function() {
  if (appState.activeRole === "school") {
    alert("❌ สิทธิ์แอดมินโรงเรียนไม่สามารถเพิ่มเอกสารดาวน์โหลดได้ (เฉพาะแอดมินจังหวัดหรือคณะกรรมการเท่านั้น)");
    return;
  }
  const modal = document.getElementById("modal-add-document");
  if (modal) modal.classList.add("active");
};

window.closeAddDocumentModal = function() {
  const modal = document.getElementById("modal-add-document");
  if (modal) {
    modal.classList.remove("active");
    document.getElementById("form-add-document").reset();
  }
};

const formAddDoc = document.getElementById("form-add-document");
if (formAddDoc) {
  formAddDoc.addEventListener("submit", function(e) {
    e.preventDefault();
    if (appState.activeRole === "school") {
      alert("❌ สิทธิ์แอดมินโรงเรียนไม่สามารถเพิ่มเอกสารดาวน์โหลดได้");
      return;
    }
    const title = document.getElementById("doc-upload-title").value.trim();
    const desc = document.getElementById("doc-upload-desc").value.trim();
    const category = document.getElementById("doc-upload-category").value;
    const format = document.getElementById("doc-upload-format").value;
    const size = document.getElementById("doc-upload-size").value.trim();
    const year = parseInt(document.getElementById("doc-upload-year").value);
    const link = document.getElementById("doc-upload-link").value.trim() || `${title.replace(/\s+/g, '_')}.${format.toLowerCase()}`;

    const newDoc = {
      id: "DOC_" + new Date().getTime(),
      title,
      desc,
      category,
      format,
      size,
      year,
      link
    };

    appState.documents.push(newDoc);
    saveStateToLocalStorage();
    
    closeAddDocumentModal();
    renderDocumentsGrid();
    alert("🟢 เพิ่มเอกสารสำหรับศูนย์ดาวน์โหลดสำเร็จ!\nโรงเรียนทุกสังกัดสามารถเข้ามาดาวน์โหลดแบบฟอร์มใบนี้ได้ทันที");
  });
}

// ==================== 23. GLOBAL CONDOLENCE BULLETIN ANNOUNCEMENTS BOARD (ROUND 4) ====================
function renderAnnouncementsBoard() {
  const container = document.getElementById("system-announcements-list-container");
  if (!container) return;

  const approvedDeaths = appState.deathCases.filter(d => d.status === "approved");
  const list = [];
  
  approvedDeaths.forEach(death => {
    // Check if the card should be hidden/deleted for the logged-in school
    if (appState.activeRole === "school") {
      const invoice = appState.schoolInvoices.find(
        inv => inv.deathCaseId === death.id && inv.schoolId === appState.activeSchoolId
      );
      if (invoice && invoice.status === "paid") {
        // Hide/delete this news card for this school since payment is completed
        return;
      }
    } else if (appState.activeRole === "province" || appState.activeRole === "committee") {
      // Hide/delete this news card for central admin if ALL schools have paid
      const invoicesForCase = appState.schoolInvoices.filter(inv => inv.deathCaseId === death.id);
      const allPaid = invoicesForCase.length > 0 && invoicesForCase.every(inv => inv.status === "paid");
      if (allPaid) {
        return;
      }
    }

    const member = appState.members.find(m => m.id === death.memberId) || {};
    const netPayout = death.netPayout || (member ? getDeathCalculationInfo(death.reportedDate, member).netPayout : 0);
    const beneficiaryName = death.beneficiaryName || (member.beneficiary ? (member.beneficiary.title || "") + member.beneficiary.name : "ไม่ระบุ");
    const thDateStr = formatDateThai(death.reportedDate);

    // Extract timestamp from ID for chronological sorting
    const timestamp = death.id.startsWith("DEATH_") ? parseInt(death.id.replace("DEATH_", "")) : 0;

    // School payment details message
    let schoolPaymentHtml = "";
    if (appState.activeRole === "school") {
      const invoice = appState.schoolInvoices.find(
        inv => inv.deathCaseId === death.id && inv.schoolId === appState.activeSchoolId
      );
      if (invoice) {
        let statusBadge = "";
        let actionBtn = "";
        if (invoice.status === "unpaid") {
          statusBadge = `<span class="badge" style="background: rgba(244, 63, 94, 0.15); color: var(--color-accent-rose); font-size: 11px; padding: 2px 6px;">🔴 ค้างชำระ</span>`;
          actionBtn = `<button class="btn btn-mini btn-primary" onclick="openUploadSlipModalForCase('${death.id}')" style="padding: 4px 12px; font-size: 11px; margin-top: 8px; background: var(--color-accent-rose); border-color: var(--color-accent-rose); font-weight: 600; cursor: pointer; border-radius: var(--radius-sm);" type="button">✍️ แนบหลักฐานชำระเงิน</button>`;
        } else if (invoice.status === "pending") {
          statusBadge = `<span class="badge" style="background: rgba(245, 158, 11, 0.15); color: var(--color-accent-amber); font-size: 11px; padding: 2px 6px;">🟡 รอตรวจสอบสลิป</span>`;
        }

        schoolPaymentHtml = `
          <div style="margin-top: 10px; padding: 10px 14px; background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.08); border-radius: var(--radius-sm); font-size: 12.5px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
              <span>🔔 <strong>แจ้งยอดทำบุญสังกัดคุณ:</strong> สมาชิกในโรงเรียน <strong>${invoice.activeCount}</strong> คน ยอดเงินชำระ <strong>฿${invoice.totalOwed.toLocaleString()}</strong> (คนละ 30 บาท)</span>
              ${statusBadge}
            </div>
            ${actionBtn}
          </div>
        `;
      }
    } else if (appState.activeRole === "province" || appState.activeRole === "committee") {
      const invoicesForCase = appState.schoolInvoices.filter(inv => inv.deathCaseId === death.id);
      const totalSchools = invoicesForCase.length;
      const paidSchools = invoicesForCase.filter(inv => inv.status === "paid");
      const unpaidSchools = invoicesForCase.filter(inv => inv.status !== "paid");
      const paidCount = paidSchools.length;

      schoolPaymentHtml = `
        <div style="margin-top: 10px; padding: 10px 14px; background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.08); border-radius: var(--radius-sm); font-size: 12.5px;">
          <div style="font-weight: 700; color: var(--color-accent-gold); margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">📊 ติดตามการชำระเงินของสถาบัน:</div>
          <div>โอนเงินเรียบร้อยแล้ว <strong>${paidCount}/${totalSchools}</strong> โรงเรียน (คงเหลือค้างชำระ <strong>${unpaidSchools.length}</strong> แห่ง)</div>
          ${unpaidSchools.length > 0 ? `<div style="font-size: 11.5px; color: var(--color-text-dim); margin-top: 4px; line-height: 1.45;">รายชื่อโรงเรียนค้างชำระ: ${unpaidSchools.map(u => u.schoolName).join(", ")}</div>` : ""}
        </div>
      `;
    }

    list.push({
      type: "death",
      date: death.reportedDate || "",
      timestamp: timestamp,
      html: `
        <div class="condolence-announce-card animate-scale" style="margin-bottom: 8px; flex-direction: column; align-items: stretch; border-left: 3px solid var(--color-accent-rose) !important;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; width: 100%;">
            <div class="announce-left-meta" style="flex-grow: 1;">
              <span style="font-size: 20px; margin-top: 2px;">🕯️</span>
              <div class="announce-condolence-text" style="width: 100%;">
                <span style="color: var(--color-accent-rose); font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">📢 ประกาศแจ้งฌาปนกิจและสงเคราะห์ สสมน.</span>
                ขอแสดงความเสียใจอย่างสุดซึ้งต่อการจากไปของ 
                <strong>${death.name}</strong> (รหัสสมาชิก สสมน. <span class="announce-gold-highlight">${death.memberId}</span>) 
                สังกัด <strong>${death.schoolName}</strong> ซึ่งถึงแก่กรรมเมื่อวันที่ ${thDateStr}
                <br><strong>และขอเชิญชวนสมาชิกทุกท่านร่วมส่งแรงใจ แสดงความเสียใจ และร่วมแสดงความไว้อาลัยแก่ครอบครัวของผู้เสียชีวิตมา ณ ที่นี้</strong>
                <div style="font-size: 11.5px; color: var(--color-text-dim); margin-top: 6px; line-height: 1.45;">
                  ขณะนี้ระบบส่วนกลางจังหวัดน่านได้ประมวลยอดเงินสงเคราะห์สุทธิเสร็จสมบูรณ์เรียบร้อยเป็นเงินจำนวน 
                  <strong style="color:var(--color-accent-emerald); font-weight:700;">฿${netPayout.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong> 
                  มอบให้แก่ผู้รับผลประโยชน์ <strong style="color:white;">${beneficiaryName}</strong> 
                  ขอแจ้งแอดมินสถาบันตรวจสอบสิทธิ์และดำเนินการส่งเงินสงเคราะห์ภายในเวลาที่กำหนด
                </div>
                ${schoolPaymentHtml}
              </div>
            </div>
            <div class="announce-right-date">
              แจ้งข่าว<br>
              สสมน.น่าน
            </div>
          </div>
        </div>
      `
    });
  });

  const customAnnouncements = appState.announcements || [];
  customAnnouncements.forEach(ann => {
    let badgeColor = "var(--color-accent-gold)";
    let badgeBg = "rgba(251, 191, 36, 0.1)";
    let icon = "📢";
    if (ann.type === "ข่าวด่วน") {
      badgeColor = "var(--color-accent-rose)";
      badgeBg = "rgba(244, 63, 94, 0.1)";
      icon = "🚨";
    } else if (ann.type === "ข่าวการเสียชีวิต/ฌาปนกิจศพ") {
      badgeColor = "var(--color-accent-amber)";
      badgeBg = "rgba(245, 158, 11, 0.1)";
      icon = "🕯️";
    }

    const thDateStr = formatDateThai(ann.date);

    list.push({
      type: "custom",
      date: ann.date || "",
      timestamp: 0,
      html: `
        <div class="condolence-announce-card animate-scale" style="margin-bottom: 8px; border-color: rgba(255,255,255,0.06); background: rgba(255,255,255,0.025);">
          <div class="announce-left-meta" style="flex-grow: 1;">
            <span style="font-size: 16px; margin-top: 2px;">${icon}</span>
            <div class="announce-condolence-text" style="width: 100%;">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                <strong style="color: white; font-size: 14px;">${ann.title}</strong>
                <span class="badge" style="background: ${badgeBg}; color: ${badgeColor}; font-size: 10px; padding: 1px 6px; border-radius: 4px;">${ann.type}</span>
              </div>
              <p style="font-size: 12.5px; color: var(--color-text-muted); margin-top: 6px; line-height: 1.45; white-space: pre-wrap;">${ann.content}</p>
              ${(appState.activeRole === "province" || appState.activeRole === "committee") ? `
                <div style="margin-top: 8px; text-align: right;">
                  <button onclick="deleteAnnouncement('${ann.id}')" class="btn btn-danger btn-mini" style="padding: 2px 8px; font-size: 10.5px; background: rgba(244, 63, 94, 0.1); border-color: var(--color-accent-rose); color: var(--color-accent-rose);" type="button">ลบประกาศ</button>
                </div>
              ` : ''}
            </div>
          </div>
          <div class="announce-right-date" style="font-size: 10px; text-align: center; color: var(--color-text-dim); min-width: 80px;">
            ลงวันที่<br>
            ${thDateStr}
          </div>
        </div>
      `
    });
  });

  // Sort by date descending. If equal, sort by timestamp descending.
  list.sort((a, b) => {
    const dateCompare = b.date.localeCompare(a.date);
    if (dateCompare !== 0) return dateCompare;
    return b.timestamp - a.timestamp;
  });

  const displayList = list.slice(0, 5);

  if (displayList.length === 0) {
    container.innerHTML = `<div style="font-size: 12.5px; color: var(--color-text-dim); text-align: center; padding: 15px 0;">ไม่มีประกาศแจ้งเตือนการฌาปนกิจศพหรือข่าวสารใหม่รอบปัจจุบัน</div>`;
    return;
  }

  container.innerHTML = displayList.map(item => item.html).join("");
}

// ฟังก์ชันเปิดฟอร์มยื่นสลิปจากบอร์ดประกาศโดยตรงสำหรับโรงเรียน
window.openUploadSlipModalForCase = function(deathId) {
  const activeSchool = SCHOOLS.find(s => s.id === appState.activeSchoolId);
  const invoice = appState.schoolInvoices.find(inv => inv.deathCaseId === deathId && inv.schoolId === appState.activeSchoolId);
  if (!invoice) return;

  const debtsHtml = `
    <div class="slip-debt-line">
      <span>เคสทำบุญศพ: ${invoice.deathCaseName}</span>
      <strong class="text-currency">฿${invoice.totalOwed.toLocaleString()}</strong>
    </div>
  `;

  document.getElementById("slip-school-id").value = appState.activeSchoolId;
  document.getElementById("slip-death-ids").value = deathId;
  document.getElementById("slip-preview-school-name").textContent = activeSchool.name;
  document.getElementById("slip-preview-debts-list").innerHTML = debtsHtml;
  document.getElementById("slip-preview-total-amount").textContent = "฿" + invoice.totalOwed.toLocaleString(undefined, {minimumFractionDigits: 2});
  document.getElementById("slip-transfer-amount").value = invoice.totalOwed;

  document.getElementById("slip-image-file").value = "";
  document.getElementById("block-slip-preview").style.display = "none";
  document.getElementById("img-slip-preview-tag").src = "";
  document.getElementById("slip-notes").value = "";
  
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  document.getElementById("slip-transfer-date").value = now.toISOString().slice(0, 16);

  document.getElementById("modal-upload-slip").classList.add("active");
};

// Helper date formatter
function formatDateThai(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Delete custom announcement
window.deleteAnnouncement = function(annId) {
  if (!confirm("คุณต้องการลบประกาศข่าวสารนี้ใช่หรือไม่?")) {
    return;
  }
  appState.announcements = appState.announcements.filter(a => a.id !== annId);
  saveStateToLocalStorage();
  renderAnnouncementsBoard();
  alert("ลบประกาศเรียบร้อยแล้ว!");
};

// ==================== 24. LIQUIDITY ANALYZER & CREMATION PAYOUTS ====================

function renderLiquidityAnalyzer() {
  const lblBankBalance = document.getElementById("lbl-central-bank-balance");
  const lblUpdateDate = document.getElementById("lbl-central-bank-update-date");
  const lblTotalUnpaid = document.getElementById("lbl-total-unpaid-payouts");
  const lblTotalUnpaidCases = document.getElementById("lbl-total-unpaid-payouts-cases");
  const lblStatusBadge = document.getElementById("lbl-liquidity-status-badge");

  if (!lblBankBalance) return;

  const bankBalance = appState.centralBankBalance || 0;
  const unpaidCases = appState.deathCases.filter(d => d.status !== "pending_approval" && d.payoutStatus !== "paid");
  
  let totalUnpaidSum = 0;
  unpaidCases.forEach(c => {
    totalUnpaidSum += (c.netPayout || 0);
  });

  lblBankBalance.textContent = `฿${bankBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  lblUpdateDate.textContent = `อัปเดตล่าสุด: ${formatDateThai(appState.centralBankUpdateDate)}`;
  lblTotalUnpaid.textContent = `฿${totalUnpaidSum.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  lblTotalUnpaidCases.textContent = `ค้างชำระ: ${unpaidCases.length} เคส`;

  // หักค่าดำเนินการสะสมร้อยละ 5 (ใช้ค่าที่บันทึกไว้ หรือคำนวณจากทุกคดีที่ได้รับการอนุมัติแล้ว)
  const approvedCases = appState.deathCases.filter(d => d.status !== "pending_approval");
  let calculatedFeesSum = 0;
  approvedCases.forEach(c => {
    calculatedFeesSum += (c.operatingFee || 0);
  });

  const totalFeesSum = (appState.centralOperatingFee !== undefined && appState.centralOperatingFee !== null && appState.centralOperatingFee > 0)
    ? appState.centralOperatingFee
    : calculatedFeesSum;

  const lblTotalFeesDeducted = document.getElementById("lbl-total-fees-deducted");
  if (lblTotalFeesDeducted) {
    lblTotalFeesDeducted.textContent = `฿${totalFeesSum.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  }
  const lblTotalFeesCases = document.getElementById("lbl-total-fees-cases");
  if (lblTotalFeesCases) {
    lblTotalFeesCases.textContent = `อนุมัติจ่ายแล้ว: ${approvedCases.filter(c => c.payoutStatus === 'paid').length} / ${approvedCases.length} เคส`;
  }

  if (bankBalance >= totalUnpaidSum) {
    lblStatusBadge.innerHTML = `<span class="badge badge-success-outline" style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.15); color: var(--color-accent-emerald); font-size: 13px; padding: 4px 12px; border-radius: 4px;">🟢 เพียงพอ</span>`;
  } else {
    const deficit = totalUnpaidSum - bankBalance;
    lblStatusBadge.innerHTML = `<span class="badge badge-danger-outline" style="background: rgba(244, 63, 94, 0.12); border: 1px solid rgba(244, 63, 94, 0.2); color: var(--color-accent-rose); font-size: 13px; padding: 4px 12px; border-radius: 4px;">🔴 ไม่เพียงพอ (ขาดอีก ฿${deficit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})})</span>`;
  }
}

function renderCremationPayoutsTable() {
  const tbody = document.getElementById("tbl-body-cremation-payouts");
  if (!tbody) return;

  const approvedDeaths = appState.deathCases.filter(d => d.status !== "pending_approval");

  if (approvedDeaths.length === 0) {
    tbody.innerHTML = `<tr><td colspan="${(appState.activeRole === 'province' || appState.activeRole === 'committee') ? 8 : 7}" class="text-center" style="color: var(--color-text-muted); padding: 30px;">ไม่มีข้อมูลการจ่ายเงินสงเคราะห์ศพในรอบปัจจุบัน</td></tr>`;
    return;
  }

  const isProvince = appState.activeRole === 'province' || appState.activeRole === 'committee';
  let html = "";
  
  approvedDeaths.forEach(death => {
    const member = appState.members.find(m => m.id === death.memberId) || {};
    const netPayout = death.netPayout || 0;
    
    html += `
      <tr>
        <td class="text-center">
          <span style="font-family: var(--font-number); font-size: 11.5px; color: var(--color-accent-gold); font-weight: 600;">${death.id}</span>
        </td>
        <td>
          <div style="font-weight: 600; color: white;">${death.name}</div>
          <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 2px;">สังกัด: ${death.schoolName}</div>
        </td>
        <td>
          <div style="font-family: var(--font-number); font-size: 12.5px;">${formatDateThai(death.reportedDate)}</div>
        </td>
        <td>
          <div style="font-weight: 600; color: white;">${death.beneficiaryName || 'ไม่ระบุ'}</div>
          <div style="font-size: 11.5px; color: var(--color-text-dim); margin-top: 2px;">
            ความสัมพันธ์: ${member.beneficiary ? member.beneficiary.relation : 'ไม่ระบุ'} 
            ${member.beneficiary && member.beneficiary.phone ? ' | 📞 ' + member.beneficiary.phone : ''}
          </div>
        </td>
        <td class="text-center">
          <div style="font-size: 12.5px; color: white; font-weight: 500;">${death.referenceDateText || '-'}</div>
          <div style="font-size: 11.5px; color: var(--color-text-muted); font-family: var(--font-number); margin-top: 2px;">(${ (death.referenceMemberCount || 0).toLocaleString() } คน)</div>
        </td>
        <td class="text-right" style="font-family: var(--font-number); font-weight: 700; color: var(--color-accent-emerald); font-size: 14.5px;">
          ฿${netPayout.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </td>
        <td class="text-center">
          ${death.payoutStatus === 'paid' ? `
            <span class="badge badge-success-outline" style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.15); color: var(--color-accent-emerald); font-size: 11px;">🟢 จ่ายเงินแล้ว</span>
            <div style="font-size: 10.5px; color: var(--color-text-dim); margin-top: 4px;">เมื่อ: ${formatDateThai(death.payoutDate)}</div>
          ` : `
            <span class="badge badge-danger-outline" style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.15); color: var(--color-accent-rose); font-size: 11px;">🔴 รอดำเนินการ</span>
          `}
        </td>
        <td class="text-center" style="display: ${isProvince ? 'table-cell' : 'none'};">
          ${death.payoutStatus === 'paid' ? `
            <button class="btn btn-secondary btn-mini" style="background: rgba(244, 63, 94, 0.1); border-color: var(--color-accent-rose); color: var(--color-accent-rose); padding: 4px 10px; font-size: 11.5px;" onclick="cancelPayoutStatus('${death.id}')">
              ยกเลิกยอดจ่าย
            </button>
          ` : `
            <button class="btn btn-success btn-mini" style="padding: 4px 10px; font-size: 11.5px;" onclick="openConfirmPayoutModal('${death.id}')">
              บันทึกโอนเงิน
            </button>
          `}
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

window.cancelPayoutStatus = function(caseId) {
  if (!confirm("คุณต้องการยกเลิกบันทึกการโอนเงินสงเคราะห์ศพนี้ใช่หรือไม่?\n*(ยอดจะถูกเปลี่ยนกลับเป็น รอดำเนินการ และดึงยอดธนาคารคืน)")) {
    return;
  }
  const death = appState.deathCases.find(d => d.id === caseId);
  if (death) {
    const netPayout = death.netPayout || 0;
    appState.centralBankBalance += netPayout; // add back to bank balance
    
    death.payoutStatus = undefined;
    death.payoutDate = undefined;
    death.payoutNotes = undefined;
    death.payoutSlip = undefined;

    saveStateToLocalStorage();
    renderCremationPayoutsTable();
    renderLiquidityAnalyzer();
    alert("🟢 ยกเลิกบันทึกการโอนเงินสงเคราะห์ศพเรียบร้อยแล้ว");
  }
};

// Modal Control Functions
window.openAddAnnouncementModal = function() {
  const modal = document.getElementById("modal-add-announcement");
  if (modal) {
    modal.classList.add("active");
    document.getElementById("announce-date").value = new Date().toISOString().substring(0, 10);
  }
};

window.closeAddAnnouncementModal = function() {
  const modal = document.getElementById("modal-add-announcement");
  if (modal) {
    modal.classList.remove("active");
    document.getElementById("form-add-announcement").reset();
  }
};

window.openUpdateBankBalanceModal = function() {
  const modal = document.getElementById("modal-update-bank-balance");
  if (modal) {
    modal.classList.add("active");
    document.getElementById("bank-balance-amount").value = appState.centralBankBalance || 0;
    
    // คำนวณยอด 5% อัตโนมัติเป็นค่าเริ่มต้นหากไม่เคยกดเซ็ตมาก่อน
    const approvedCases = appState.deathCases.filter(d => d.status !== "pending_approval");
    let calculatedFeesSum = 0;
    approvedCases.forEach(c => {
      calculatedFeesSum += (c.operatingFee || 0);
    });
    
    const currentFee = (appState.centralOperatingFee !== undefined && appState.centralOperatingFee !== null && appState.centralOperatingFee > 0)
      ? appState.centralOperatingFee
      : calculatedFeesSum;
      
    document.getElementById("bank-operating-fee").value = currentFee || 0;
    document.getElementById("bank-balance-date").value = new Date().toISOString().substring(0, 10);
  }
};

window.closeUpdateBankBalanceModal = function() {
  const modal = document.getElementById("modal-update-bank-balance");
  if (modal) {
    modal.classList.remove("active");
    document.getElementById("form-update-bank-balance").reset();
  }
};

window.openConfirmPayoutModal = function(caseId) {
  const modal = document.getElementById("modal-confirm-payout");
  if (!modal) return;
  
  const death = appState.deathCases.find(d => d.id === caseId);
  if (!death) return;

  modal.classList.add("active");
  document.getElementById("payout-case-id").value = caseId;
  document.getElementById("payout-deceased-name").textContent = death.name;
  document.getElementById("payout-beneficiary-name").textContent = death.beneficiaryName || "-";
  
  const netPayout = death.netPayout || 0;
  document.getElementById("payout-net-amount").textContent = `฿${netPayout.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  document.getElementById("payout-date").value = new Date().toISOString().substring(0, 10);
  document.getElementById("payout-notes").value = `โอนเงินผ่านบัญชีกองทุนกลาง ธนาคารกรุงไทย สำหรับเคสผู้เสียชีวิต ${death.name}`;
  document.getElementById("payout-slip-uri").value = "";
  document.getElementById("lbl-payout-slip-filename").textContent = "ยังไม่ได้อัปโหลดหลักฐาน";
  document.getElementById("payout-slip-file").value = "";
};

window.closeConfirmPayoutModal = function() {
  const modal = document.getElementById("modal-confirm-payout");
  if (modal) {
    modal.classList.remove("active");
    document.getElementById("form-confirm-payout").reset();
  }
};

window.handlePayoutSlipUpload = function(input) {
  const file = input.files[0];
  if (!file) return;
  const label = document.getElementById("lbl-payout-slip-filename");
  if (label) label.textContent = file.name;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const hiddenInput = document.getElementById("payout-slip-uri");
    if (hiddenInput) hiddenInput.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

// Event Listeners for Forms
const formAddAnnouncement = document.getElementById("form-add-announcement");
if (formAddAnnouncement) {
  formAddAnnouncement.addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("announce-title").value.trim();
    const content = document.getElementById("announce-content").value.trim();
    const type = document.getElementById("announce-type").value;
    const date = document.getElementById("announce-date").value;

    const newAnn = {
      id: "ANN_" + new Date().getTime(),
      title,
      content,
      type,
      date,
      createdDate: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    if (!appState.announcements) appState.announcements = [];
    appState.announcements.push(newAnn);
    saveStateToLocalStorage();
    
    closeAddAnnouncementModal();
    renderAnnouncementsBoard();
    alert("🟢 ลงประกาศข่าวสารประชาสัมพันธ์ส่วนกลางสำเร็จ!");
  });
}

const formUpdateBankBalance = document.getElementById("form-update-bank-balance");
if (formUpdateBankBalance) {
  formUpdateBankBalance.addEventListener("submit", function(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById("bank-balance-amount").value);
    const fee = parseFloat(document.getElementById("bank-operating-fee").value) || 0;
    const date = document.getElementById("bank-balance-date").value;
    
    appState.centralBankBalance = amount;
    appState.centralOperatingFee = fee;
    appState.centralBankUpdateDate = date;
    
    saveStateToLocalStorage();
    closeUpdateBankBalanceModal();
    renderLiquidityAnalyzer();
    alert(`🟢 อัปเดตข้อมูลสภาพคล่องบัญชีธนาคารส่วนกลางเรียบร้อยแล้ว ณ วันที่ ${formatDateThai(date)}\n- ยอดเงินคงเหลือ: ฿${amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n- ยอดหักค่าดำเนินการสะสมร้อยละ 5: ฿${fee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`);
  });
}

const formConfirmPayout = document.getElementById("form-confirm-payout");
if (formConfirmPayout) {
  formConfirmPayout.addEventListener("submit", function(e) {
    e.preventDefault();
    const caseId = document.getElementById("payout-case-id").value;
    const date = document.getElementById("payout-date").value;
    const notes = document.getElementById("payout-notes").value.trim();
    const slipUri = document.getElementById("payout-slip-uri").value;

    if (!slipUri) {
      alert("⚠️ กรุณาแนบรูปสลิปการโอนเงิน/หลักฐานการจ่าย");
      return;
    }

    const death = appState.deathCases.find(d => d.id === caseId);
    if (death) {
      death.payoutStatus = "paid";
      death.payoutDate = date;
      death.payoutNotes = notes;
      death.payoutSlip = slipUri;

      // Deduct from centralBankBalance
      const netPayout = death.netPayout || 0;
      appState.centralBankBalance -= netPayout;

      saveStateToLocalStorage();
      closeConfirmPayoutModal();
      renderCremationPayoutsTable();
      renderLiquidityAnalyzer();
      renderAnnouncementsBoard();
      alert(`🟢 ยืนยันการจ่ายเงินสำเร็จ!\nบันทึกรายการโอนเงินและแนบหลักฐานสลิปสำหรับ ${death.name} เรียบร้อยแล้ว`);
    }
  });
}

// ==================== 25. DEVICE MANAGEMENT & COMMITTEE PASSWORD FUNCTIONS ====================

// เรนเดอร์เครื่องอุปกรณ์สำหรับโรงเรียนแอดมิน
function renderSchoolDevicesList(schoolId) {
  const tbody = document.getElementById("tbl-body-school-devices");
  if (!tbody) return;

  const profile = appState.schoolProfiles[schoolId] || {};
  const devices = profile.devices || [];
  const currentDevId = getOrCreateDeviceId();

  const countBadge = document.getElementById("school-device-count-badge");
  if (countBadge) {
    countBadge.textContent = `${devices.length}/10 เครื่อง`;
    if (devices.length >= 10) {
      countBadge.style.color = "var(--color-accent-rose)";
      countBadge.style.background = "rgba(244, 63, 94, 0.15)";
      countBadge.style.borderColor = "rgba(244, 63, 94, 0.25)";
    } else {
      countBadge.style.color = "var(--color-accent-amber)";
      countBadge.style.background = "rgba(251, 191, 36, 0.1)";
      countBadge.style.borderColor = "rgba(251, 191, 36, 0.2)";
    }
  }

  let html = "";
  if (devices.length === 0) {
    html = `<tr><td colspan="5" class="text-center" style="color: var(--color-text-muted);">ไม่มีอุปกรณ์อื่นลงทะเบียนไว้ เข้าล็อกอินเครื่องปัจจุบันเป็นเครื่องแรก</td></tr>`;
  } else {
    devices.forEach((dev, idx) => {
      const isCurrent = dev.id === currentDevId;
      const formattedDate = dev.lastActive ? dev.lastActive.replace('T', ' ').substring(0, 16) : "-";
      
      html += `
        <tr>
          <td class="text-center" style="font-family: var(--font-number);">${idx + 1}</td>
          <td>
            <div style="font-weight: 600; color: white;">${dev.name || "อุปกรณ์ไม่ระบุชื่อ"}</div>
            <div style="font-size: 11px; color: var(--color-text-dim); font-family: var(--font-number); margin-top: 2.5px;">ID: ${dev.id}</div>
          </td>
          <td style="font-family: var(--font-number);">${formattedDate}</td>
          <td class="text-center">
            ${isCurrent ? `<span class="badge badge-success" style="font-size: 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.25); color: var(--color-accent-emerald);">🟢 อุปกรณ์ปัจจุบัน</span>` : `<span class="badge" style="font-size: 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: var(--color-text-muted);">พร้อมใช้งาน</span>`}
          </td>
          <td class="text-center">
            ${isCurrent ? `<button class="btn btn-secondary btn-mini" disabled style="opacity: 0.4; cursor: not-allowed;">ลบออก</button>` : `<button class="btn btn-danger btn-mini" onclick="deleteSchoolDevice('${schoolId}', '${dev.id}')">ลบออก</button>`}
          </td>
        </tr>
      `;
    });
  }
  tbody.innerHTML = html;
}

window.deleteSchoolDevice = function(schoolId, deviceId) {
  if (!confirm("⚠️ ยืนยันการลบเครื่องอุปกรณ์นี้ใช่หรือไม่?\nหากลบออก อุปกรณ์ดังกล่าวจะไม่สามารถล็อกอินเข้าสู่ระบบได้จนกว่าจะลงทะเบียนใหม่")) {
    return;
  }
  const profile = appState.schoolProfiles[schoolId];
  if (profile && profile.devices) {
    profile.devices = profile.devices.filter(d => d.id !== deviceId);
    saveStateToLocalStorage();
    syncStateToCloudflare();
    renderSchoolDevicesList(schoolId);
  }
};

// จัดการการดูข้อมูลอุปกรณ์ผ่านแอดมินจังหวัด
let activeDevicesSchoolId = null;

window.openViewSchoolDevicesModal = function(schoolId) {
  activeDevicesSchoolId = schoolId;
  const modal = document.getElementById("modal-view-school-devices");
  if (!modal) return;

  const sch = SCHOOLS.find(s => s.id === schoolId);
  const nameEl = document.getElementById("modal-devices-school-name");
  if (nameEl && sch) {
    nameEl.textContent = sch.name;
  }

  const tbody = document.getElementById("tbl-body-modal-school-devices");
  if (tbody) {
    const profile = appState.schoolProfiles[schoolId] || {};
    const devices = profile.devices || [];
    
    let html = "";
    if (devices.length === 0) {
      html = `<tr><td colspan="3" class="text-center" style="color: var(--color-text-muted); padding: 20px;">ไม่มีข้อมูลอุปกรณ์ล็อกอินลงทะเบียนในระบบ</td></tr>`;
    } else {
      devices.forEach((dev, idx) => {
        const formattedDate = dev.lastActive ? dev.lastActive.replace('T', ' ').substring(0, 16) : "-";
        html += `
          <tr>
            <td class="text-center" style="font-family: var(--font-number);">${idx + 1}</td>
            <td style="font-weight: 500; color: white;">${dev.name || "อุปกรณ์ไม่ระบุชื่อ"}<br><span style="font-size: 10px; color: var(--color-text-dim);">ID: ${dev.id}</span></td>
            <td style="font-family: var(--font-number);">${formattedDate}</td>
          </tr>
        `;
      });
    }
    tbody.innerHTML = html;
  }

  modal.classList.add("active");
};

window.closeViewSchoolDevicesModal = function() {
  const modal = document.getElementById("modal-view-school-devices");
  if (modal) modal.classList.remove("active");
  activeDevicesSchoolId = null;
};

// ล้างอุปกรณ์ทั้งหมดโดยแอดมินจังหวัด
const btnClearAllDevices = document.getElementById("btn-modal-clear-all-devices");
if (btnClearAllDevices) {
  btnClearAllDevices.addEventListener("click", function() {
    const schoolId = activeDevicesSchoolId;
    if (!schoolId) return;

    const sch = SCHOOLS.find(s => s.id === schoolId);
    if (!confirm(`⚠️ ยืนยันการล้างข้อมูลเครื่องอุปกรณ์ทั้งหมดของสังกัด "${sch ? sch.name : schoolId}" ใช่หรือไม่?\n\n(ผู้ใช้งานแอดมินโรงเรียนจะสามารถเริ่มลงทะเบียนอุปกรณ์ใหม่ได้ทันที)`)) {
      return;
    }

    const profile = appState.schoolProfiles[schoolId];
    if (profile) {
      profile.devices = [];
      saveStateToLocalStorage();
      syncStateToCloudflare();
      closeViewSchoolDevicesModal();
      renderSchoolsDirectory();
      alert("🟢 ล้างข้อมูลอุปกรณ์เรียบร้อยแล้ว!");
    }
  });
}

// เปลี่ยนรหัสผ่านคณะกรรมการ สสมน.
window.openChangeCommitteePasswordModal = function() {
  const modal = document.getElementById("modal-change-committee-password");
  if (modal) {
    document.getElementById("committee-new-password").value = "";
    document.getElementById("committee-new-password-confirm").value = "";
    modal.classList.add("active");
  }
};

window.closeChangeCommitteePasswordModal = function() {
  const modal = document.getElementById("modal-change-committee-password");
  if (modal) modal.classList.remove("active");
};

const formChangeCommitteePwd = document.getElementById("form-change-committee-password");
if (formChangeCommitteePwd) {
  formChangeCommitteePwd.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const newPwd = document.getElementById("committee-new-password").value;
    const newPwdConfirm = document.getElementById("committee-new-password-confirm").value;

    if (newPwd !== newPwdConfirm) {
      alert("❌ รหัสผ่านใหม่และรหัสผ่านยืนยันไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง!");
      return;
    }

    appState.committeePassword = newPwd;
    saveStateToLocalStorage();
    syncStateToCloudflare();
    closeChangeCommitteePasswordModal();
    
    // รีเฟรชส่วนแสดงรหัสผ่านในแอดมินจังหวัดด้วย
    const maskedEl = document.querySelector(".masked-committee-pwd");
    if (maskedEl) {
      maskedEl.textContent = "••••••••";
      const container = document.getElementById("province-committee-pwd-container");
      if (container) {
        const eye = container.querySelector("span:last-child");
        if (eye) eye.textContent = "👁️";
      }
    }
    
    alert("🟢 บันทึกการเปลี่ยนแปลงรหัสผ่านคณะกรรมการ สสมน. เรียบร้อยแล้ว!");
  });
}

// เปิดแสดงรหัสผ่านคณะกรรมการ สสมน. ในจังหวัด
window.toggleCommitteePasswordReveal = function(element) {
  const span = element.querySelector(".masked-committee-pwd");
  const eye = element.querySelector("span:last-child");
  if (!span) return;

  const pwd = appState.committeePassword || "committee1234";
  if (span.textContent === "••••••••") {
    span.textContent = pwd;
    if (eye) eye.textContent = "🙈";
  } else {
    span.textContent = "••••••••";
    if (eye) eye.textContent = "👁️";
  }
};

// เปลี่ยนรหัสผ่านสังกัดโรงเรียน (Province Admin)
window.openChangeSchoolPasswordModal = function(schoolId, schoolName) {
  const modal = document.getElementById("modal-change-school-password");
  if (modal) {
    document.getElementById("change-pwd-school-id").value = schoolId;
    document.getElementById("modal-change-pwd-school-name").textContent = schoolName;
    document.getElementById("school-new-password").value = "";
    document.getElementById("school-new-password-confirm").value = "";
    modal.classList.add("active");
  }
};

window.closeChangeSchoolPasswordModal = function() {
  const modal = document.getElementById("modal-change-school-password");
  if (modal) modal.classList.remove("active");
};

const formChangeSchoolPwd = document.getElementById("form-change-school-password");
if (formChangeSchoolPwd) {
  formChangeSchoolPwd.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const schoolId = document.getElementById("change-pwd-school-id").value;
    const newPwd = document.getElementById("school-new-password").value;
    const newPwdConfirm = document.getElementById("school-new-password-confirm").value;

    if (newPwd.length < 4) {
      alert("❌ รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร");
      return;
    }

    if (newPwd !== newPwdConfirm) {
      alert("❌ รหัสผ่านใหม่และรหัสผ่านยืนยันไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง!");
      return;
    }

    appState.schoolPasswords[schoolId] = newPwd;
    saveStateToLocalStorage();
    syncStateToCloudflare();
    closeChangeSchoolPasswordModal();
    renderSchoolsDirectory();
    
    alert(`🟢 บันทึกการเปลี่ยนแปลงรหัสผ่านสังกัดรหัส "${schoolId}" เรียบร้อยแล้ว!`);
  });
}

