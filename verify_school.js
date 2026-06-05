const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Starting Verification Script...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Listen for JS exceptions on the page
  let pageErrors = [];
  page.on('pageerror', (err) => {
    console.error('❌ JS Exception on page:', err.message);
    pageErrors.push(err.message);
  });

  try {
    // 1. Launch or open http://localhost:8001/
    console.log('Navigating to http://localhost:8001/...');
    await page.goto('http://localhost:8001/', { waitUntil: 'networkidle2' });

    // 2. Select school '01' and input password 'school1234' on login screen
    console.log('Selecting school admin role...');
    await page.click('#btn-login-role-school');

    console.log('Selecting school 01 (โรงเรียนสตรีศรีน่าน)...');
    await page.select('#login-select-school', '01');

    console.log('Entering password...');
    await page.type('#login-password', 'school1234');

    // 3. Click the login button
    console.log('Clicking login button...');
    await Promise.all([
      page.click('#form-login button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {})
    ]);

    // Check if login succeeded (main-app-container should be visible)
    const isAppVisible = await page.evaluate(() => {
      const container = document.getElementById('main-app-container');
      return container && container.style.display !== 'none';
    });

    if (!isAppVisible) {
      throw new Error('Login failed. Application container not visible.');
    }
    console.log('✅ Login successful!');

    // 4. Navigate to 'ข้อมูลพื้นฐานของโรงเรียน' (Basic School Info)
    console.log('Navigating to Basic School Info...');
    await page.click('#btn-nav-schools');
    await page.waitForSelector('#block-school-profile-editor', { visible: true });

    // 5. Modify the values of teachers/personnel, pensioners, active members, and retired members
    console.log('Modifying school statistics...');
    
    // Clear and fill Director
    await page.evaluate(() => {
      document.getElementById('school-profile-director-count').value = '';
      document.getElementById('school-profile-deputy-count').value = '';
      document.getElementById('school-profile-teacher-count').value = '';
      document.getElementById('school-profile-other-count').value = '';
      document.getElementById('school-profile-pensioners-count').value = '';
      document.getElementById('school-profile-active-members-count').value = '';
      document.getElementById('school-profile-retired-transferred-members-count').value = '';
    });

    // Enter test values: Director=2, Deputy=3, Teacher=150, Other=10
    // Pensioners=40, Active=160, Retired=30
    await page.type('#school-profile-director-count', '2');
    await page.type('#school-profile-deputy-count', '3');
    await page.type('#school-profile-teacher-count', '150');
    await page.type('#school-profile-other-count', '10');
    await page.type('#school-profile-pensioners-count', '40');
    await page.type('#school-profile-active-members-count', '160');
    await page.type('#school-profile-retired-transferred-members-count', '30');

    // Trigger input event to ensure recalculation (usually handled by type, but let's be sure)
    await page.evaluate(() => {
      document.getElementById('school-profile-director-count').dispatchEvent(new Event('input'));
    });

    // 6. Verify that the sums (total personnel and total members) recalculate dynamically in real-time
    const totalsBeforeSave = await page.evaluate(() => {
      return {
        personnel: document.getElementById('lbl-profile-total-personnel').textContent,
        members: document.getElementById('lbl-profile-total-members').textContent
      };
    });

    console.log('Dynamic sums recalculated in real-time:');
    console.log('- Total Personnel (expected 165):', totalsBeforeSave.personnel);
    console.log('- Total Members (expected 190):', totalsBeforeSave.members);

    if (!totalsBeforeSave.personnel.includes('165') || !totalsBeforeSave.members.includes('190')) {
      throw new Error(`Real-time sums recalculation incorrect: ${JSON.stringify(totalsBeforeSave)}`);
    }
    console.log('✅ Real-time sum calculations verified!');

    // 7. Click the save button
    console.log('Saving profile...');
    
    // Intercept standard alert dialogs
    page.on('dialog', async dialog => {
      console.log('Dialog prompt:', dialog.message());
      await dialog.accept();
    });

    await page.click('#form-school-profile button[type="submit"]');
    // Wait a brief moment to ensure localStorage is updated
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

    // 8. Refresh or reload the page and verify that edited values persist
    console.log('Reloading page to verify persistence...');
    await page.reload({ waitUntil: 'networkidle2' });

    // Login again after refresh if page state is lost
    const needLoginAfterRefresh = await page.evaluate(() => {
      const login = document.getElementById('view-panel-login');
      return login && login.style.display !== 'none';
    });

    if (needLoginAfterRefresh) {
      console.log('Re-authenticating after page reload...');
      await page.click('#btn-login-role-school');
      await page.select('#login-select-school', '01');
      await page.type('#login-password', 'school1234');
      await Promise.all([
        page.click('#form-login button[type="submit"]'),
        page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {})
      ]);
    }

    // Navigate back to Basic School Info
    await page.click('#btn-nav-schools');
    await page.waitForSelector('#block-school-profile-editor', { visible: true });

    // Read values after reload
    const persistedValues = await page.evaluate(() => {
      return {
        director: document.getElementById('school-profile-director-count').value,
        deputy: document.getElementById('school-profile-deputy-count').value,
        teacher: document.getElementById('school-profile-teacher-count').value,
        other: document.getElementById('school-profile-other-count').value,
        pensioners: document.getElementById('school-profile-pensioners-count').value,
        active: document.getElementById('school-profile-active-members-count').value,
        retired: document.getElementById('school-profile-retired-transferred-members-count').value,
        personnelSum: document.getElementById('lbl-profile-total-personnel').textContent,
        membersSum: document.getElementById('lbl-profile-total-members').textContent
      };
    });

    console.log('Values after reload:');
    console.log(persistedValues);

    if (persistedValues.director === '2' && 
        persistedValues.deputy === '3' && 
        persistedValues.teacher === '150' && 
        persistedValues.other === '10' && 
        persistedValues.pensioners === '40' && 
        persistedValues.active === '160' && 
        persistedValues.retired === '30' &&
        persistedValues.personnelSum.includes('165') &&
        persistedValues.membersSum.includes('190')) {
      console.log('✅ Success! All edited values persisted properly after page refresh.');
    } else {
      throw new Error(`Persisted values do not match expected values. Got: ${JSON.stringify(persistedValues)}`);
    }

    if (pageErrors.length > 0) {
      console.log(`⚠️ Completed with ${pageErrors.length} JavaScript exceptions detected.`);
    } else {
      console.log('✅ No JavaScript exceptions were thrown during verification.');
    }

  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  } finally {
    await browser.close();
  }
})();
