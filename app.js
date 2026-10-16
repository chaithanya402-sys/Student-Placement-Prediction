/**
 * Student Placement Prediction System Controller
 * Modern Campus SaaS Design System Edition
 * Navy (#172B4D) • Primary Blue (#2563EB) • Teal (#0D9488) • Canvas (#F5F7FB)
 */

document.addEventListener('DOMContentLoaded', () => {
  const store = window.PlacementDataStore;
  window.store = store;
  if (!store) {
    console.error('PlacementDataStore not found!');
    return;
  }

  // Lucide-style SVG icon map
  const icons = {
    overview: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
    prediction: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle></svg>`,
    skills: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
    jobs: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
    resume: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`,
    profile: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    assistant: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"></path></svg>`,
    students: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>`,
    performance: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline></svg>`,
    mentoring: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`,
    reports: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`,
    access: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    companies: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="2"></line><line x1="15" y1="22" x2="15" y2="2"></line></svg>`
  };

  // Role Configurations
  const roleNavConfig = {
    student: {
      portalTitle: 'Placement Prediction',
      badgeTitle: 'STUDENT PORTAL',
      defaultRoute: '/student/overview',
      breadcrumb: 'OVERVIEW / STUDENT',
      links: [
        { route: '/student/overview', icon: icons.overview, title: 'Overview' },
        { route: '/student/profile', icon: icons.profile, title: 'Student Profile' },
        { route: '/student/prediction', icon: icons.prediction, title: 'Prediction' },
        { route: '/student/skills', icon: icons.skills, title: 'Skill Analysis' },
        { route: '/student/jobs', icon: icons.jobs, title: 'Jobs & Drives' },
        { route: '/student/resume', icon: icons.resume, title: 'Resume' },
        { route: '/student/assistant', icon: icons.assistant, title: 'AI Assistant' }
      ]
    },
    faculty: {
      portalTitle: 'Faculty Mentor',
      badgeTitle: 'FACULTY PORTAL',
      defaultRoute: '/faculty/overview',
      breadcrumb: 'OVERVIEW / FACULTY',
      links: [
        { route: '/faculty/overview', icon: icons.overview, title: 'Overview' },
        { route: '/faculty/students', icon: icons.students, title: 'My Students' },
        { route: '/faculty/performance', icon: icons.performance, title: 'Performance' },
        { route: '/faculty/skill-gaps', icon: icons.skills, title: 'Skill Gaps' },
        { route: '/faculty/mentoring', icon: icons.mentoring, title: 'Mentoring & Tasks' },
        { route: '/faculty/reports', icon: icons.reports, title: 'Reports' }
      ]
    },
    officer: {
      portalTitle: 'T&P Cell Admin',
      badgeTitle: 'T&P PORTAL',
      defaultRoute: '/officer/overview',
      breadcrumb: 'OVERVIEW / T&P CELL',
      links: [
        { route: '/officer/overview', icon: icons.overview, title: 'Overview Analytics' },
        { route: '/officer/students', icon: icons.students, title: 'Student Master' },
        { route: '/officer/drives', icon: icons.companies, title: 'Companies & Drives' },
        { route: '/officer/applications', icon: icons.jobs, title: 'Applications & Offers' },
        { route: '/officer/reports', icon: icons.reports, title: 'Placement Reports' },
        { route: '/officer/access-control', icon: icons.access, title: 'Access Control' }
      ]
    }
  };

  // Route to stage pane mapping
  const routeToPaneId = {
    '/student/overview': 'pane-student-overview',
    '/student/profile': 'pane-student-profile',
    '/student/prediction': 'pane-student-prediction',
    '/student/skills': 'pane-student-skills',
    '/student/jobs': 'pane-student-jobs',
    '/student/resume': 'pane-student-resume',
    '/student/assistant': 'pane-student-assistant',

    '/faculty/overview': 'pane-faculty-overview',
    '/faculty/students': 'pane-faculty-students',
    '/faculty/performance': 'pane-faculty-performance',
    '/faculty/skill-gaps': 'pane-faculty-skill-gaps',
    '/faculty/mentoring': 'pane-faculty-mentoring',
    '/faculty/reports': 'pane-faculty-reports',

    '/officer/overview': 'pane-officer-overview',
    '/officer/students': 'pane-officer-students',
    '/officer/drives': 'pane-officer-drives',
    '/officer/applications': 'pane-officer-applications',
    '/officer/reports': 'pane-officer-reports',
    '/officer/access-control': 'pane-officer-access-control',

    '/what-if': 'pane-student-prediction',
    '/skill-gap-analysis': 'pane-student-skills',
    '/resume-analyzer': 'pane-student-resume'
  };

  const routeTitles = {
    '/student/overview': 'Placement Overview',
    '/student/profile': 'Student Academic & Placement Profile',
    '/student/prediction': 'Prediction & What-If Simulator',
    '/student/skills': 'Skill Gap Analysis & Paths',
    '/student/jobs': 'Campus Recruitment Drives',
    '/student/resume': 'Resume Analyzer & ATS Compatibility',
    '/student/assistant': 'AI Career & Mock Interview Assistant',

    '/faculty/overview': 'Faculty Mentoring Overview',
    '/faculty/students': 'Assigned Mentees Roster',
    '/faculty/performance': 'Student Assessment Analytics',
    '/faculty/skill-gaps': 'Department Skill Gap Diagnostics',
    '/faculty/mentoring': 'Mentoring Tasks & Meeting Notes',
    '/faculty/reports': 'Department Placement Reports',

    '/officer/overview': 'Institutional Placement Analytics',
    '/officer/students': 'College Student Placement Registry',
    '/officer/drives': 'Recruitment Drives & Company Partnerships',
    '/officer/applications': 'Applications & Offer Letters Queue',
    '/officer/reports': 'Annual Placement Reports',
    '/officer/access-control': 'Role Permissions & Audit Trail'
  };

  function getCurrentRoute() {
    const rawHash = window.location.hash ? window.location.hash.replace(/^#\/?/, '/') : '';
    if (rawHash) {
      return rawHash.startsWith('/') ? rawHash : '/' + rawHash;
    }
    const role = store.getActiveRole();
    return roleNavConfig[role]?.defaultRoute || '/student/overview';
  }

  function renderSidebarNav(role) {
    const config = roleNavConfig[role] || roleNavConfig.student;
    const linksContainer = document.getElementById('sidebar-role-links');
    if (!linksContainer) return;

    let html = `
      <div class="nav-group-title">${role.toUpperCase()} MENU</div>
      <ul class="nav-items-list">
    `;

    config.links.forEach(item => {
      html += `
        <li>
          <a href="#${item.route}" class="nav-link" data-route="${item.route}">
            <div class="nav-link-left">
              ${item.icon}
              <span>${item.title}</span>
            </div>
          </a>
        </li>
      `;
    });

    html += `</ul>`;
    linksContainer.innerHTML = html;

    linksContainer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          closeMobileSidebar();
        }
      });
    });

    // Update brand titles
    const titleEl = document.getElementById('sidebar-portal-title');
    const badgeEl = document.getElementById('sidebar-role-badge');
    if (titleEl) titleEl.textContent = config.portalTitle;
    if (badgeEl) badgeEl.textContent = config.badgeTitle;

    // Update context box
    const contextTitle = document.getElementById('sidebar-status-title');
    const contextDesc = document.getElementById('sidebar-status-desc');
    if (contextTitle && contextDesc) {
      if (role === 'student') {
        contextTitle.textContent = '84% Readiness';
        contextDesc.textContent = 'Placement Model v2.4';
      } else if (role === 'faculty') {
        contextTitle.textContent = '42 Mentees';
        contextDesc.textContent = 'CSE Department';
      } else if (role === 'officer') {
        contextTitle.textContent = '892 Placed';
        contextDesc.textContent = 'Season 2025–2026';
      }
    }
  }

  // Sign Out Handler
  window.handleLogout = async function() {
    if (window.SupabaseAuth) {
      await window.SupabaseAuth.signOut();
    } else {
      localStorage.removeItem('spp_user_email');
      localStorage.removeItem('spp_user_role');
      localStorage.removeItem('spp_user_name');
      window.location.href = 'login.html';
    }
  };

  function updateUserProfileHeader(role) {
    const profile = store.getUserProfile(role);
    const customName = localStorage.getItem('spp_user_name');
    const customEmail = localStorage.getItem('spp_user_email');
    const assignedRole = localStorage.getItem('spp_user_role') || role;

    const nameLabel = document.getElementById('user-name-label');
    const emailLabel = document.getElementById('user-email-label');
    const avatarPill = document.getElementById('user-avatar-pill');
    const topAvatarCircle = document.getElementById('top-avatar-circle');
    const roleSelect = document.getElementById('header-role-select');

    const displayName = (assignedRole === role && customName) ? customName : profile.name;
    const displayEmail = (assignedRole === role && customEmail) ? customEmail : profile.email;
    const initials = displayName ? displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : (profile.avatar || 'US');

    if (nameLabel) nameLabel.textContent = displayName;
    if (emailLabel) emailLabel.textContent = displayEmail;
    if (avatarPill) avatarPill.textContent = initials;
    if (topAvatarCircle) topAvatarCircle.textContent = initials;
    if (roleSelect && roleSelect.value !== role) {
      roleSelect.value = role;
    }
  }

  window.switchActiveRole = function(role) {
    const authenticatedRole = localStorage.getItem('spp_user_role') || 'student';
    // Role protection: Disallow unauthorized portal hopping
    if (authenticatedRole === 'student' && role !== 'student') {
      window.showToast?.('Role Restricted: Your account is authenticated as Student. Log in with faculty credentials to access this portal.', 'error');
      const select = document.getElementById('header-role-select');
      if (select) select.value = 'student';
      return;
    }
    if (authenticatedRole === 'faculty' && role === 'officer') {
      window.showToast?.('Role Restricted: Faculty mentors cannot access the T&P Officer portal.', 'error');
      const select = document.getElementById('header-role-select');
      if (select) select.value = 'faculty';
      return;
    }

    store.setActiveRole(role);
    renderSidebarNav(role);
    updateUserProfileHeader(role);

    const targetRoute = roleNavConfig[role]?.defaultRoute || '/student/overview';
    window.location.hash = targetRoute;
  };

  function updateRouting() {
    let currentRoute = getCurrentRoute();
    const authenticatedRole = localStorage.getItem('spp_user_role') || 'student';

    // Route protection guards
    if (authenticatedRole === 'student' && (currentRoute.startsWith('/faculty/') || currentRoute.startsWith('/officer/'))) {
      window.showToast?.('Access Restricted: Students cannot access Faculty or Officer portals.', 'error');
      window.location.hash = '/student/overview';
      return;
    }
    if (authenticatedRole === 'faculty' && currentRoute.startsWith('/officer/')) {
      window.showToast?.('Access Restricted: Faculty cannot access T&P Officer administration.', 'error');
      window.location.hash = '/faculty/overview';
      return;
    }

    let detectedRole = store.getActiveRole();
    if (currentRoute.startsWith('/student/')) {
      detectedRole = 'student';
    } else if (currentRoute.startsWith('/faculty/')) {
      detectedRole = 'faculty';
    } else if (currentRoute.startsWith('/officer/')) {
      detectedRole = 'officer';
    } else if (currentRoute === '/dashboard' || currentRoute === '/') {
      currentRoute = roleNavConfig[detectedRole]?.defaultRoute || '/student/overview';
      window.location.hash = currentRoute;
      return;
    }

    if (detectedRole !== store.getActiveRole()) {
      store.setActiveRole(detectedRole);
    }

    renderSidebarNav(detectedRole);
    updateUserProfileHeader(detectedRole);

    // Set active link
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
      const linkRoute = link.getAttribute('data-route') || link.getAttribute('href')?.replace(/^#/, '');
      link.classList.toggle('active', linkRoute === currentRoute);
    });

    // Toggle active pane
    const targetPaneId = routeToPaneId[currentRoute] || 'pane-student-overview';
    document.querySelectorAll('.screen-pane').forEach(pane => {
      pane.style.display = (pane.id === targetPaneId) ? 'flex' : 'none';
      if (pane.id === targetPaneId) {
        pane.style.display = 'flex';
      }
    });

    // Header Breadcrumbs and Title
    const breadcrumbLabel = document.getElementById('page-breadcrumb-label');
    const pageTitleLabel = document.getElementById('page-title-label');
    if (breadcrumbLabel) {
      breadcrumbLabel.textContent = roleNavConfig[detectedRole]?.breadcrumb || 'OVERVIEW';
    }
    if (pageTitleLabel && routeTitles[currentRoute]) {
      pageTitleLabel.textContent = routeTitles[currentRoute];
    }

    const mainStage = document.querySelector('.main-stage');
    if (mainStage) mainStage.scrollTop = 0;
  }

  window.navigateToRoute = function(route) {
    if (!route.startsWith('/')) route = '/' + route;
    window.location.hash = route;
  };

  window.addEventListener('hashchange', updateRouting);

  // --- REACTIVE RENDERING ENGINE ---

  function renderStudentViews() {
    const student = store.data.roles.student;
    const drives = store.getDrives();
    const myApps = store.getStudentApplications(student.id);
    const myTasks = store.getStudentTasks(student.id);
    const stats = store.getStats('student');

    // KPIs
    const probEl = document.getElementById('kpi-student-prob');
    const appsEl = document.getElementById('kpi-student-apps');
    const shortlistedEl = document.getElementById('kpi-student-shortlisted');
    const placedBadgeKpi = document.getElementById('student-placed-badge-kpi');

    if (probEl) probEl.textContent = `${stats.probability}%`;
    if (appsEl) appsEl.innerHTML = `${stats.applicationsCount} <span style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">Applied</span>`;
    if (shortlistedEl) shortlistedEl.textContent = `${stats.shortlistedCount} Shortlisted`;

    if (placedBadgeKpi) {
      if (stats.placementStatus === 'Placed') {
        placedBadgeKpi.innerHTML = `<span style="color: var(--success-green); font-weight: 700;">Placed @ ${stats.placedCompany} (₹${stats.placedPackage} LPA)</span>`;
      } else {
        placedBadgeKpi.textContent = 'Status: In Process';
      }
    }

    // Tasks list on overview
    const tasksContainer = document.getElementById('student-tasks-list');
    const pendingBadge = document.getElementById('student-pending-tasks-badge');
    if (pendingBadge) pendingBadge.textContent = `${stats.pendingTasks} Pending`;

    if (tasksContainer) {
      if (myTasks.length === 0) {
        tasksContainer.innerHTML = `<p style="font-size: 12.5px; color: var(--text-muted); padding: 12px 0;">No active tasks assigned by mentor.</p>`;
      } else {
        tasksContainer.innerHTML = myTasks.slice(0, 4).map(task => `
          <div class="task-row-card ${task.status === 'Completed' ? 'done' : ''}">
            <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
              <button class="task-check-circle" onclick="toggleTaskStatus('${task.id}')" title="Toggle task status">
                ${task.status === 'Completed' ? '✓' : ''}
              </button>
              <div>
                <div class="task-title-text">${task.title}</div>
                <div class="task-meta-info">Due: ${task.dueDate} • Priority: <span style="font-weight: 700; color: ${task.priority === 'High' ? 'var(--error-red)' : 'var(--primary-blue)'};">${task.priority}</span></div>
              </div>
            </div>
            <span class="badge-status ${task.status === 'Completed' ? 'success' : 'warning'}">
              ${task.status === 'Completed' ? 'Done' : 'Pending'}
            </span>
          </div>
        `).join('');
      }
    }

    // Active drives on student overview
    const drivesContainer = document.getElementById('student-drives-list');
    if (drivesContainer) {
      const topDrives = drives.slice(0, 3);
      drivesContainer.innerHTML = topDrives.map(drive => {
        const isEligible = (student.cgpa >= drive.minCGPA) && (student.backlogs <= drive.maxBacklogs);
        const hasApplied = myApps.some(a => a.driveId === drive.id);

        return `
          <div class="drive-list-card">
            <div class="drive-logo-initials">${drive.company.slice(0, 2).toUpperCase()}</div>
            <div class="drive-info-col">
              <div class="drive-company-title">
                <span>${drive.company}</span>
                <span class="badge-status success">₹${drive.packageLPA} LPA</span>
              </div>
              <div class="drive-meta-text">
                <span>${drive.role} • ${drive.location}</span>
                <span>Cutoff: Min CGPA ${drive.minCGPA}</span>
                <span class="badge-status ${isEligible ? 'teal' : 'error'}">
                  ${isEligible ? 'Eligible' : 'Cutoff Unmet'}
                </span>
              </div>
            </div>
            <div>
              ${hasApplied 
                ? `<button class="btn-outline btn-sm" disabled style="background: var(--success-bg); color: var(--success-green); border-color: var(--success-green);">Applied ✓</button>`
                : isEligible 
                  ? `<button class="btn-primary btn-sm" onclick="applyForDrive('${drive.id}')">Apply</button>`
                  : `<button class="btn-outline btn-sm" disabled>Ineligible</button>`
              }
            </div>
          </div>
        `;
      }).join('');
    }

    // Active applications for Student Overview tab
    const overviewAppsContainer = document.getElementById('student-overview-apps-list');
    if (overviewAppsContainer) {
      if (myApps.length === 0) {
        overviewAppsContainer.innerHTML = `<p style="font-size: 12.5px; color: var(--text-muted); padding: 14px 0;">No active applications submitted yet.</p>`;
      } else {
        overviewAppsContainer.innerHTML = myApps.slice(0, 4).map(app => {
          let badgeClass = 'blue';
          if (app.status === 'Offered') badgeClass = 'success';
          else if (app.status === 'Interview Scheduled') badgeClass = 'teal';
          else if (app.status === 'Shortlisted') badgeClass = 'blue';

          return `
            <div class="history-item">
              <div class="history-item-left">
                <div class="drive-logo-initials" style="width: 34px; height: 34px; font-size: 12px;">${app.company.slice(0, 2).toUpperCase()}</div>
                <div>
                  <div class="history-title">${app.company} &bull; <span style="font-weight: 500; color: var(--text-secondary); font-size: 12px;">${app.role}</span></div>
                  <div class="history-date">Applied: ${app.appliedDate} &bull; T&P Ref: ${app.id}</div>
                </div>
              </div>
              <span class="badge-status ${badgeClass}">${app.status}</span>
            </div>
          `;
        }).join('');
      }
    }

    // Full drives list on Jobs tab
    const fullDrivesContainer = document.getElementById('student-full-drives-list');
    if (fullDrivesContainer) {
      fullDrivesContainer.innerHTML = drives.map(drive => {
        const isEligible = (student.cgpa >= drive.minCGPA) && (student.backlogs <= drive.maxBacklogs);
        const hasApplied = myApps.some(a => a.driveId === drive.id);

        return `
          <div class="drive-list-card" style="padding: 16px;">
            <div class="drive-logo-initials" style="width: 44px; height: 44px;">${drive.company.slice(0, 2).toUpperCase()}</div>
            <div class="drive-info-col">
              <div class="drive-company-title" style="font-size: 15px;">
                <span>${drive.company}</span>
                <span class="badge-status success">₹${drive.packageLPA} LPA</span>
                <span style="font-size: 11px; font-weight: 500; color: var(--text-secondary);">(${drive.applicantsCount || 0} applicants)</span>
              </div>
              <div class="drive-meta-text" style="margin-top: 4px;">
                <span>${drive.role} • Location: ${drive.location}</span>
                <span>Cutoff: Min CGPA ${drive.minCGPA}, Max Backlogs ${drive.maxBacklogs}</span>
                <span>Deadline: ${drive.deadline}</span>
                <span class="badge-status ${isEligible ? 'teal' : 'error'}">
                  ${isEligible ? 'Eligible to Apply' : 'Cutoff Criteria Not Met'}
                </span>
              </div>
            </div>
            <div>
              ${hasApplied 
                ? `<button class="btn-outline btn-sm" disabled style="background: var(--success-bg); color: var(--success-green); border-color: var(--success-green);">Applied ✓</button>`
                : isEligible 
                  ? `<button class="btn-primary btn-sm" onclick="applyForDrive('${drive.id}')">Apply Now</button>`
                  : `<button class="btn-outline btn-sm" disabled>Ineligible</button>`
              }
            </div>
          </div>
        `;
      }).join('');
    }

    // Applied drives table
    const appliedTbody = document.getElementById('student-applied-table-body');
    if (appliedTbody) {
      if (myApps.length === 0) {
        appliedTbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 18px;">No drive applications submitted yet.</td></tr>`;
      } else {
        appliedTbody.innerHTML = myApps.map(app => {
          let badgeClass = 'blue';
          if (app.status === 'Offered') badgeClass = 'success';
          else if (app.status === 'Interview Scheduled') badgeClass = 'teal';

          return `
            <tr>
              <td><code>${app.id}</code></td>
              <td><strong>${app.company}</strong></td>
              <td>${app.role}</td>
              <td>${app.appliedDate}</td>
              <td><span class="badge-status ${badgeClass}">${app.status}</span></td>
              <td>
                ${app.status === 'Offered' 
                  ? `<span style="font-weight: 700; color: var(--success-green);">Offer Package: ₹${app.offerPackage || 8.0} LPA</span>` 
                  : `<span style="color: var(--text-secondary); font-size: 11.5px;">Reviewed by T&P</span>`
                }
              </td>
            </tr>
          `;
        }).join('');
      }
    }

    // Render dynamic Donut Chart & Radar Chart
    renderStudentCharts(student);

    // Render Student Profile View
    renderStudentProfileView(student);
  }

  function renderStudentCharts(student) {
    if (!student) return;

    // 1. Dynamic Factor Weights labels
    const cgpaEl = document.getElementById('factor-name-cgpa');
    const aptEl = document.getElementById('factor-name-aptitude');
    const backlogsEl = document.getElementById('factor-name-backlogs');
    if (cgpaEl) cgpaEl.textContent = `Academic CGPA (${student.cgpa || 8.1} / 10.0)`;
    if (aptEl) aptEl.textContent = `Aptitude Test Score (${student.aptitudeScore || 78} / 100)`;
    if (backlogsEl) backlogsEl.textContent = `Active Backlogs (${student.backlogs ?? 0} Active)`;

    // 2. Dynamic Radar Chart & Skills
    const skills = [
      { id: 'dsa', name: 'Data Structures & Algorithms', score: 82, benchmark: 80, angle: -90 },
      { id: 'web', name: 'Web Technologies & Frameworks', score: 88, benchmark: 80, angle: -18 },
      { id: 'sys', name: 'System Design & Architecture', score: 65, benchmark: 80, angle: 54 },
      { id: 'cs', name: 'Core CS (OS, DBMS, Networks)', score: 74, benchmark: 80, angle: 126 },
      { id: 'apt', name: 'Quantitative & Logical Aptitude', score: student.aptitudeScore ? Math.round(student.aptitudeScore * 80 / 78) : 80, benchmark: 80, angle: 198 }
    ];

    const cx = 170, cy = 135, R = 85;
    const polyPoints = [];

    skills.forEach(s => {
      const isMet = s.score >= s.benchmark;
      const diff = s.score - s.benchmark;

      const scoreEl = document.getElementById(`skill-score-${s.id}`);
      const pillEl = document.getElementById(`skill-pill-${s.id}`);
      const valEl = document.getElementById(`radar-val-${s.id}`);

      if (scoreEl) {
        scoreEl.textContent = `${s.score}%`;
        scoreEl.className = `skill-score-num ${isMet ? 'green' : 'orange'}`;
      }

      if (pillEl) {
        if (s.score >= 85) {
          pillEl.textContent = 'Exceeds';
          pillEl.className = 'pill-skill-status met';
        } else if (isMet) {
          pillEl.textContent = 'Met';
          pillEl.className = 'pill-skill-status met';
        } else {
          pillEl.textContent = `Gap (${diff}%)`;
          pillEl.className = 'pill-skill-status gap';
        }
      }

      if (valEl) {
        valEl.textContent = `${s.score}%`;
        valEl.setAttribute('fill', isMet ? '#059669' : '#D97706');
      }

      const normRadius = Math.max(0.15, Math.min(1.0, s.score / 100)) * R;
      const rad = s.angle * Math.PI / 180;
      const x = (cx + normRadius * Math.cos(rad)).toFixed(1);
      const y = (cy + normRadius * Math.sin(rad)).toFixed(1);
      polyPoints.push(`${x},${y}`);
    });

    const polyEl = document.getElementById('radar-student-polygon');
    if (polyEl) {
      polyEl.setAttribute('points', polyPoints.join(' '));
    }
  }

  function renderStudentProfileView(student) {
    if (!student) return;

    // 1. Identity Header Card
    const nameEl = document.getElementById('sp-name');
    const avatarEl = document.getElementById('sp-avatar-text');
    const degBranchEl = document.getElementById('sp-degree-branch');
    const collegeEl = document.getElementById('sp-college');
    const emailEl = document.getElementById('sp-email');
    const phoneEl = document.getElementById('sp-phone');
    const locEl = document.getElementById('sp-location');
    const yrBadgeEl = document.getElementById('sp-year-badge');
    const cgpaBadgeEl = document.getElementById('sp-cgpa-badge');
    const statusBadgeEl = document.getElementById('sp-status-badge');

    if (nameEl) nameEl.textContent = student.name || 'Aditya Verma';
    if (avatarEl) avatarEl.textContent = student.avatar || (student.name ? student.name.split(' ').map(n => n[0]).join('') : 'AV');
    if (degBranchEl) degBranchEl.textContent = `${student.degree || 'B.Tech'} - ${student.branch || 'Computer Science & Engineering'}`;
    if (collegeEl) collegeEl.innerHTML = `${student.college || 'College of Engineering, Hyderabad'} &bull; Class of ${student.gradYear || 2026}`;
    if (emailEl) emailEl.textContent = student.email || 'aditya.verma@college.edu';
    if (phoneEl) phoneEl.textContent = student.phone || '+91 98765 43210';
    if (locEl) locEl.textContent = `${student.city || 'Hyderabad'}, ${student.state || 'Telangana'}`;
    if (yrBadgeEl) yrBadgeEl.textContent = student.currentYear || '3rd Year (Current)';
    if (cgpaBadgeEl) cgpaBadgeEl.textContent = `CGPA: ${student.cgpa || 8.4} / 10.0`;
    if (statusBadgeEl) statusBadgeEl.textContent = student.placementStatus || 'Placement Ready';

    // 2. Score Summary & Live Completion Gauge
    const score = store.getProfileCompletionScore ? store.getProfileCompletionScore() : 78;
    const gaugeValEl = document.getElementById('sp-gauge-val');
    const gaugeCircle = document.getElementById('sp-gauge-circle');
    const gaugeStatusEl = document.getElementById('sp-gauge-status');

    if (gaugeValEl) gaugeValEl.textContent = `${score}%`;
    if (gaugeCircle) {
      // 2 * PI * 32 ~= 201 circumference
      const circumference = 201;
      const offset = circumference - (circumference * score / 100);
      gaugeCircle.setAttribute('stroke-dashoffset', offset);
    }
    if (gaugeStatusEl) {
      if (score >= 85) gaugeStatusEl.textContent = 'Excellent';
      else if (score >= 70) gaugeStatusEl.textContent = 'Very Good';
      else if (score >= 50) gaugeStatusEl.textContent = 'Good';
      else gaugeStatusEl.textContent = 'Needs Improvement';
    }

    // Counts
    const cntInternships = document.getElementById('sp-cnt-internships');
    const cntWork = document.getElementById('sp-cnt-work');
    const cntProjects = document.getElementById('sp-cnt-projects');
    const cntCerts = document.getElementById('sp-cnt-certs');

    if (cntInternships) cntInternships.textContent = student.internships ? student.internships.length : 1;
    if (cntWork) cntWork.textContent = student.workExperience ? student.workExperience.length : 0;
    if (cntProjects) cntProjects.textContent = student.projects ? student.projects.length : 3;
    if (cntCerts) cntCerts.textContent = student.certifications ? student.certifications.length : 0;

    // 3. Row 1: Academic Details
    const tenthSubEl = document.getElementById('sp-tenth-sub');
    const tenthScoreEl = document.getElementById('sp-tenth-score');
    const twelfthSubEl = document.getElementById('sp-twelfth-sub');
    const twelfthScoreEl = document.getElementById('sp-twelfth-score');
    const btechSubEl = document.getElementById('sp-btech-sub');
    const btechScoreEl = document.getElementById('sp-btech-score');

    if (tenthSubEl) tenthSubEl.textContent = `${student.tenthBoard || 'State Board'} • ${student.tenthSchool || 'St. Paul High School'} (${student.tenthYear || 2020})`;
    if (tenthScoreEl) tenthScoreEl.textContent = `${student.tenthPct || 92.0}%`;

    if (twelfthSubEl) twelfthSubEl.textContent = `${student.twelfthBoard || 'State Board'} • ${student.twelfthStream || 'MPC'} • ${student.twelfthCollege || 'Narayana Junior College'} (${student.twelfthYear || 2022})`;
    if (twelfthScoreEl) twelfthScoreEl.textContent = `${student.twelfthPct || 89.0}%`;

    if (btechSubEl) btechSubEl.textContent = `${student.branch || 'CSE'} • ${student.backlogs || 0} Active Backlogs`;
    if (btechScoreEl) btechScoreEl.textContent = `${Number(student.cgpa || 8.4).toFixed(2)} CGPA`;

    // 4. Internships Container
    const internContainer = document.getElementById('sp-internships-container');
    const internVerifiedNote = document.getElementById('sp-internship-verified-note');
    if (internContainer) {
      const list = student.internships || [];
      if (internVerifiedNote) internVerifiedNote.textContent = `${list.length} Verified Experience${list.length === 1 ? '' : 's'}`;
      if (list.length === 0) {
        internContainer.innerHTML = `
          <div class="empty-state-box">
            <div class="empty-state-icon">💼</div>
            <div class="empty-state-title">No Internships Added</div>
            <div class="empty-state-desc">Add internships or industrial training to boost your recruiter match rate.</div>
            <button class="profile-card-action-btn" style="margin-top: 10px;" onclick="openAddInternshipModal()">+ Add Internship</button>
          </div>
        `;
      } else {
        internContainer.innerHTML = list.map(item => `
          <div style="padding: 10px 12px; background: #F8FAFC; border-radius: var(--radius-md); margin-bottom: 8px; border-left: 3px solid #0D8A60; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <div style="font-weight: 700; color: var(--text-navy); font-size: 13px;">${item.role}</div>
                <div style="color: #0D8A60; font-size: 11.5px; font-weight: 600;">${item.company} &bull; <span style="color: var(--text-secondary);">${item.mode || 'Hybrid'}</span></div>
              </div>
              <button onclick="deleteStudentInternship('${item.id}')" title="Delete" style="background: transparent; border: none; color: #94A3B8; cursor: pointer; font-size: 13px;">✕</button>
            </div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">
              <span>🗓 ${item.startDate || ''} - ${item.endDate || ''}</span>
              ${item.stipend ? ` &bull; <span>💰 ${item.stipend}</span>` : ''}
            </div>
            ${item.skillsUsed ? `<div style="font-size: 11px; color: var(--text-navy); margin-top: 3px;"><strong>Stack:</strong> ${item.skillsUsed}</div>` : ''}
          </div>
        `).join('');
      }
    }

    // 5. Work Experience Container
    const workContainer = document.getElementById('sp-work-container');
    if (workContainer) {
      const list = student.workExperience || [];
      if (list.length === 0) {
        workContainer.innerHTML = `
          <div class="empty-state-box">
            <div class="empty-state-icon">🏢</div>
            <div class="empty-state-title">No Work Experience Added</div>
            <div class="empty-state-desc">Add full-time, freelance, or contract roles if applicable.</div>
            <button class="profile-card-action-btn" style="margin-top: 10px;" onclick="openAddWorkExperienceModal()">+ Add Experience</button>
          </div>
        `;
      } else {
        workContainer.innerHTML = list.map(item => `
          <div style="padding: 10px 12px; background: #F8FAFC; border-radius: var(--radius-md); margin-bottom: 8px; border-left: 3px solid #2563EB;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <div style="font-weight: 700; color: var(--text-navy); font-size: 13px;">${item.jobTitle}</div>
                <div style="color: #2563EB; font-size: 11.5px; font-weight: 600;">${item.company} &bull; ${item.empType || 'Full-time'}</div>
              </div>
              <button onclick="deleteStudentWorkExperience('${item.id}')" title="Delete" style="background: transparent; border: none; color: #94A3B8; cursor: pointer; font-size: 13px;">✕</button>
            </div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">🗓 ${item.duration}</div>
            ${item.description ? `<div style="font-size: 11px; color: var(--text-secondary); margin-top: 3px;">${item.description}</div>` : ''}
          </div>
        `).join('');
      }
    }

    // 6. Skills & Technologies
    const skillsContainer = document.getElementById('sp-skills-container');
    const skillsCountLabel = document.getElementById('sp-skills-count-label');
    if (skillsContainer) {
      const skills = student.skills || [];
      if (skillsCountLabel) skillsCountLabel.textContent = `${skills.length} Skills Added`;
      skillsContainer.innerHTML = skills.map(skill => `
        <span class="skill-chip-pill">${skill}</span>
      `).join('') + `
        <button type="button" class="skill-chip-pill" style="cursor: pointer; background: #EFF6FF; border-color: #BFDBFE; color: #2563EB;" onclick="openEditSkillsModal()">+ Add Skill</button>
      `;
    }

    // 7. Education / Present Course
    const presCollege = document.getElementById('sp-pres-college');
    const presDegree = document.getElementById('sp-pres-degree');
    const presBranch = document.getElementById('sp-pres-branch');
    const presMeta = document.getElementById('sp-pres-meta');
    const presMentor = document.getElementById('sp-pres-mentor');

    if (presCollege) presCollege.textContent = student.college || 'College of Engineering, Hyderabad';
    if (presDegree) presDegree.textContent = `Bachelor of Technology (${student.degree || 'B.Tech'})`;
    if (presBranch) presBranch.textContent = `Branch: ${student.branch || 'Computer Science & Engineering'}`;
    if (presMeta) presMeta.innerHTML = `Roll No: ${student.rollNo || '21CSE042'} &bull; Batch: ${student.admissionYear || 2022} - ${student.gradYear || 2026}`;
    if (presMentor) presMentor.textContent = `Mentor: ${student.mentorName || 'Dr. Rajesh Sharma'} (CSE Dept)`;

    // 8. Certifications Container
    const certsContainer = document.getElementById('sp-certs-container');
    if (certsContainer) {
      const list = student.certifications || [];
      if (list.length === 0) {
        certsContainer.innerHTML = `
          <div class="empty-state-box">
            <div class="empty-state-icon">🏅</div>
            <div class="empty-state-title">No Certifications Added</div>
            <div class="empty-state-desc">Add cloud, developer, or LeetCode credentials to showcase verified competencies.</div>
            <button class="profile-card-action-btn" style="margin-top: 10px;" onclick="openAddCertificationModal()">+ Add Certification</button>
          </div>
        `;
      } else {
        certsContainer.innerHTML = list.map(item => `
          <div style="padding: 10px 12px; background: #F8FAFC; border-radius: var(--radius-md); margin-bottom: 8px; border-left: 3px solid #0D9488;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <div style="font-weight: 700; color: var(--text-navy); font-size: 13px;">${item.name}</div>
                <div style="color: #0D9488; font-size: 11.5px; font-weight: 600;">${item.issuer}</div>
              </div>
              <button onclick="deleteStudentCertification('${item.id}')" title="Delete" style="background: transparent; border: none; color: #94A3B8; cursor: pointer; font-size: 13px;">✕</button>
            </div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">
              <span>🗓 Issued: ${item.date || '2025'}</span>
              ${item.credentialUrl ? ` &bull; <a href="${item.credentialUrl}" target="_blank" style="color: #2563EB;">Verify ↗</a>` : ''}
            </div>
          </div>
        `).join('');
      }
    }

    // 9. Academic Performance & Metrics Bars
    const tenthVal = student.tenthPct || 92;
    const twelfthVal = student.twelfthPct || 89;
    const cgpaVal = student.cgpa || 8.4;
    const cgpaPct = Math.min(100, Math.round((cgpaVal / 10) * 100));

    const pTenth = document.getElementById('sp-perf-tenth');
    const bTenth = document.getElementById('sp-bar-tenth');
    if (pTenth) pTenth.textContent = `${tenthVal}%`;
    if (bTenth) bTenth.style.width = `${Math.min(100, tenthVal)}%`;

    const pTwelfth = document.getElementById('sp-perf-twelfth');
    const bTwelfth = document.getElementById('sp-bar-twelfth');
    if (pTwelfth) pTwelfth.textContent = `${twelfthVal}%`;
    if (bTwelfth) bTwelfth.style.width = `${Math.min(100, twelfthVal)}%`;

    const pCgpa = document.getElementById('sp-perf-cgpa');
    const bCgpa = document.getElementById('sp-bar-cgpa');
    if (pCgpa) pCgpa.textContent = `${Number(cgpaVal).toFixed(2)} CGPA`;
    if (bCgpa) bCgpa.style.width = `${cgpaPct}%`;

    const techScore = student.technicalScore || 84;
    const aptScore = student.aptitudeScore || 78;
    const resumeScore = student.resumeScore || 82;

    const mCgpa = document.getElementById('sp-metric-cgpa');
    if (mCgpa) mCgpa.textContent = `${cgpaVal} / 10.0 (${cgpaPct}%)`;

    const mTech = document.getElementById('sp-metric-tech');
    const bTech = document.getElementById('sp-bar-tech');
    if (mTech) mTech.textContent = `${techScore} / 100`;
    if (bTech) bTech.style.width = `${techScore}%`;

    const mApt = document.getElementById('sp-metric-apt');
    const bApt = document.getElementById('sp-bar-apt');
    if (mApt) mApt.textContent = `${aptScore} / 100`;
    if (bApt) bApt.style.width = `${aptScore}%`;

    const mRes = document.getElementById('sp-metric-resume');
    const bRes = document.getElementById('sp-bar-resume');
    if (mRes) mRes.textContent = `${resumeScore} / 100`;
    if (bRes) bRes.style.width = `${resumeScore}%`;

    // 10. Recent Activity Log
    const actContainer = document.getElementById('sp-activity-container');
    if (actContainer) {
      const activities = student.recentActivities || [
        { title: 'Resume ATS scan completed', desc: 'Score updated to 82/100', time: 'Today' },
        { title: 'Applied to Microsoft Cloud Drive', desc: 'Application ID: APP-1002', time: 'Yesterday' },
        { title: 'Mock Technical Interview cleared', desc: 'Rated 84% in Core CS & DSA', time: 'Oct 08, 2026' }
      ];
      actContainer.innerHTML = activities.slice(0, 3).map(act => `
        <div style="padding: 8px 10px; background: #F8FAFC; border-radius: var(--radius-md); font-size: 11.5px; border-left: 2.5px solid var(--primary-blue);">
          <div style="font-weight: 700; color: var(--text-navy);">${act.title}</div>
          <div style="color: var(--text-secondary); font-size: 11px;">${act.desc} &bull; <span style="color: #94A3B8;">${act.time}</span></div>
        </div>
      `).join('');
    }
  }

  function renderFacultyViews() {
    const mentees = store.getMentees('fac_001');
    const tasks = store.getMentorTasks('fac_001');
    const notes = store.data.mentorNotes || [];
    const stats = store.getStats('faculty');

    // Faculty Overview KPIs
    const elAssigned = document.getElementById('fac-kpi-assigned');
    const elReady = document.getElementById('fac-kpi-ready');
    const elAtRisk = document.getElementById('fac-kpi-atrisk');
    const elAvg = document.getElementById('fac-kpi-avgreadiness');

    if (elAssigned) elAssigned.textContent = stats.totalMentees || 42;
    if (elReady) elReady.textContent = stats.readyCount || 31;
    if (elAtRisk) elAtRisk.textContent = stats.atRiskCount || 8;
    if (elAvg) elAvg.textContent = `${stats.avgReadiness || 74.2}%`;

    // Priority At-Risk Watchlist Table
    const watchlistTbody = document.getElementById('faculty-watchlist-tbody');
    if (watchlistTbody) {
      const atRiskMentees = mentees
        .filter(m => m.status === 'At Risk' || m.probability < 55 || m.backlogs > 0)
        .sort((a, b) => a.probability - b.probability);

      if (atRiskMentees.length > 0) {
        watchlistTbody.innerHTML = atRiskMentees.slice(0, 5).map(s => `
          <tr>
            <td><code>${s.rollNo}</code></td>
            <td><strong>${s.name}</strong></td>
            <td>${s.cgpa}</td>
            <td><span class="badge-status ${s.backlogs > 1 ? 'error' : 'warning'}" style="${s.backlogs > 1 ? 'background: #FEF2F2; color: #DC2626;' : 'background: #FFFBEB; color: #D97706;'} font-weight: 700;">${s.backlogs} Backlog${s.backlogs > 1 ? 's' : ''}</span></td>
            <td style="color: ${s.probability < 45 ? '#DC2626' : '#D97706'}; font-weight: 700;">${s.probability}%</td>
            <td><button class="btn-primary btn-sm" style="background: #0D8A60; padding: 4px 14px; border-radius: 6px; font-size: 11.5px;" onclick="openAssignTaskModal('${s.id}')">Assign</button></td>
          </tr>
        `).join('');
      }
    }

    // Mentees table
    const menteesTbody = document.getElementById('faculty-students-table-body');
    if (menteesTbody) {
      menteesTbody.innerHTML = mentees.map(s => {
        let riskBadge = '<span class="badge-status success">Ready</span>';
        if (s.status === 'At Risk' || s.probability < 55 || s.backlogs > 0) {
          riskBadge = '<span class="badge-status error">At Risk</span>';
        } else if (s.probability < 75) {
          riskBadge = '<span class="badge-status warning">Moderate</span>';
        }

        let statusText = s.status;
        if (s.status === 'Placed') {
          statusText = `<span style="color: var(--success-green); font-weight: 700;">Placed @ ${s.placedCompany || 'Campus'}</span>`;
        }

        return `
          <tr>
            <td><code>${s.rollNo}</code></td>
            <td><strong>${s.name}</strong></td>
            <td>${s.branch}</td>
            <td><strong>${s.cgpa}</strong></td>
            <td>${s.aptitude}%</td>
            <td>${s.backlogs > 0 ? `<span style="color: var(--error-red); font-weight: 700;">${s.backlogs}</span>` : '0'}</td>
            <td>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-weight: 700;">${s.probability}%</span>
                ${riskBadge}
              </div>
            </td>
            <td>${statusText}</td>
            <td>
              <div style="display: flex; gap: 6px;">
                <button class="btn-outline btn-sm" onclick="openStudentProfileModal('${s.id}')">Profile</button>
                <button class="btn-primary btn-sm" onclick="openAssignTaskModal('${s.id}')">Assign Task</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    // Assigned tasks tracker
    const assignedTasksContainer = document.getElementById('faculty-assigned-tasks-list');
    const allTasksJournal = document.getElementById('faculty-all-tasks-journal');

    const renderTaskItems = (container) => {
      if (!container) return;
      if (tasks.length === 0) {
        container.innerHTML = `<p style="font-size: 12px; color: var(--text-muted); padding: 10px 0;">No assigned tasks recorded.</p>`;
      } else {
        container.innerHTML = tasks.map(t => `
          <div class="task-row-card ${t.status === 'Completed' ? 'done' : ''}">
            <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
              <span style="font-size: 13px;">${t.status === 'Completed' ? '✓' : '⏳'}</span>
              <div>
                <div class="task-title-text">${t.title}</div>
                <div class="task-meta-info">Mentee: <strong>${t.studentName}</strong> • Due: ${t.dueDate} • Priority: ${t.priority}</div>
              </div>
            </div>
            <span class="badge-status ${t.status === 'Completed' ? 'success' : 'warning'}">
              ${t.status === 'Completed' ? 'Completed by Student' : 'Pending'}
            </span>
          </div>
        `).join('');
      }
    };

    renderTaskItems(assignedTasksContainer);
    renderTaskItems(allTasksJournal);

    // Notes history
    const notesHistoryContainer = document.getElementById('faculty-notes-history-list');
    if (notesHistoryContainer) {
      if (notes.length === 0) {
        notesHistoryContainer.innerHTML = `<p style="font-size: 11.5px; color: var(--text-muted);">No counseling notes recorded yet.</p>`;
      } else {
        notesHistoryContainer.innerHTML = notes.slice(0, 5).map(n => `
          <div style="padding: 10px; background: #F8FAFC; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); margin-bottom: 6px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary); margin-bottom: 2px;">
              <span><strong>Mentee ID:</strong> ${n.studentId}</span>
              <span>${n.date}</span>
            </div>
            <p style="color: var(--text-navy); font-style: italic;">"${n.note}"</p>
          </div>
        `).join('');
      }
    }
  }

  function renderOfficerViews() {
    const drives = store.getDrives();
    const allStudents = store.getStudents();
    const apps = store.getApplications();
    const stats = store.getStats('officer');
    const logs = store.getAuditLogs();

    // KPIs
    const placedEl = document.getElementById('kpi-officer-placed');
    const rateEl = document.getElementById('kpi-officer-rate');
    const drivesEl = document.getElementById('kpi-officer-drives');
    const totalAppsBadge = document.getElementById('officer-total-apps-badge');

    if (placedEl) placedEl.innerHTML = `${stats.placedStudents} <span style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">Placed</span>`;
    if (rateEl) rateEl.textContent = stats.placementRate;
    if (drivesEl) drivesEl.innerHTML = `${stats.activeDrivesCount} <span style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">Drives</span>`;
    if (totalAppsBadge) totalAppsBadge.textContent = `${apps.length} Active Applications`;

    // Drives management table
    const officerDrivesWrap = document.getElementById('officer-drives-table-wrap');
    if (officerDrivesWrap) {
      officerDrivesWrap.innerHTML = `
        <div class="table-container">
          <table class="saas-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Package (LPA)</th>
                <th>Min CGPA</th>
                <th>Max Backlogs</th>
                <th>Deadline</th>
                <th>Applicants</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${drives.map(d => `
                <tr>
                  <td><strong>${d.company}</strong></td>
                  <td>${d.role}</td>
                  <td><span class="badge-status success">₹${d.packageLPA} LPA</span></td>
                  <td>${d.minCGPA}</td>
                  <td>${d.maxBacklogs}</td>
                  <td>${d.deadline}</td>
                  <td><strong>${d.applicantsCount || 0}</strong> candidates</td>
                  <td><span class="badge-status blue">${d.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    // All drives list on drives tab
    const officerAllDrives = document.getElementById('officer-all-drives-list');
    if (officerAllDrives) {
      officerAllDrives.innerHTML = drives.map(d => `
        <div class="drive-list-card" style="padding: 16px;">
          <div class="drive-logo-initials" style="width: 44px; height: 44px;">${d.company.slice(0, 2).toUpperCase()}</div>
          <div class="drive-info-col">
            <div class="drive-company-title">
              <span>${d.company}</span>
              <span class="badge-status success">₹${d.packageLPA} LPA</span>
            </div>
            <div class="drive-meta-text">
              <span>${d.role} • Openings: ${d.openings}</span>
              <span>Cutoff: Min CGPA ${d.minCGPA}, Max Backlogs ${d.maxBacklogs}</span>
              <span>Branches: ${d.allowedBranches.join(', ')}</span>
              <span>Deadline: ${d.deadline}</span>
              <span>Applicants: <strong>${d.applicantsCount || 0}</strong></span>
            </div>
          </div>
          <div>
            <button class="btn-outline btn-sm" onclick="navigateToRoute('/officer/applications')">Review Queue</button>
          </div>
        </div>
      `).join('');
    }

    // Master student registry
    const officerStudentsTbody = document.getElementById('officer-students-table-body');
    if (officerStudentsTbody) {
      officerStudentsTbody.innerHTML = allStudents.map(s => `
        <tr>
          <td><code>${s.rollNo}</code></td>
          <td><strong>${s.name}</strong></td>
          <td>${s.branch}</td>
          <td>${s.cgpa}</td>
          <td>${s.aptitude}%</td>
          <td>${s.backlogs}</td>
          <td><strong>${s.probability}%</strong></td>
          <td>
            <span class="badge-status ${s.status === 'Placed' ? 'success' : s.status === 'At Risk' ? 'error' : 'blue'}">
              ${s.status}
            </span>
          </td>
          <td>${s.placedCompany ? `<strong>${s.placedCompany} (₹${s.placedPackage} LPA)</strong>` : '—'}</td>
        </tr>
      `).join('');
    }

    // Applications & Offers Table with Action Buttons
    const officerAppsTbody = document.getElementById('officer-applications-table-body');
    if (officerAppsTbody) {
      officerAppsTbody.innerHTML = apps.map(app => {
        let badgeClass = 'blue';
        if (app.status === 'Offered') badgeClass = 'success';
        else if (app.status === 'Interview Scheduled') badgeClass = 'teal';

        return `
          <tr>
            <td><code>${app.id}</code></td>
            <td><strong>${app.studentName}</strong></td>
            <td>${app.rollNo}</td>
            <td>${app.branch}</td>
            <td><strong>${app.company}</strong></td>
            <td>${app.role}</td>
            <td>${app.appliedDate}</td>
            <td><span class="badge-status ${badgeClass}">${app.status}</span></td>
            <td>
              <div style="display: flex; gap: 6px; align-items: center;">
                ${app.status !== 'Offered' ? `
                  <button class="btn-outline btn-sm" onclick="setAppStatus('${app.id}', 'Shortlisted')">Shortlist</button>
                  <button class="btn-outline btn-sm" onclick="setAppStatus('${app.id}', 'Interview Scheduled')">Interview</button>
                  <button class="btn-primary btn-sm" onclick="openIssueOfferModal('${app.id}', '${app.studentName}', '${app.company}')">Issue Offer</button>
                ` : `
                  <span style="color: var(--success-green); font-weight: 700; font-size: 11.5px;">Offer Issued (₹${app.offerPackage || 8.0} LPA)</span>
                `}
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    // Audit logs
    const auditLogsContainer = document.getElementById('officer-audit-log-list');
    if (auditLogsContainer) {
      auditLogsContainer.innerHTML = logs.slice(0, 6).map(log => `
        <div style="padding: 8px 10px; background: #F8FAFC; border-left: 3px solid var(--primary-blue); border-radius: var(--radius-sm); font-size: 11.5px;">
          <div style="font-weight: 600; color: var(--text-navy);">${log.action}</div>
          <div style="font-size: 10px; color: var(--text-muted); margin-top: 1px;">${log.time}</div>
        </div>
      `).join('');
    }
  }

  function renderAllViews() {
    renderStudentViews();
    renderFacultyViews();
    renderOfficerViews();
  }

  store.subscribe(renderAllViews);

  // --- ACTIONS & HANDLERS ---

  window.applyForDrive = function(driveId) {
    const student = store.data.roles.student;
    const res = store.applyToDrive(student.id, driveId);
    if (res.success) {
      alert(`Application submitted successfully! Your profile has been sent to the T&P Cell.`);
    } else {
      alert(res.message);
    }
  };

  window.toggleTaskStatus = function(taskId) {
    store.toggleTaskStatus(taskId);
  };

  window.switchStudentDriveTab = function(tab) {
    const drivesPane = document.getElementById('student-tab-drives-content');
    const appsPane = document.getElementById('student-tab-apps-content');
    const btnDrives = document.getElementById('btn-student-tab-drives');
    const btnApps = document.getElementById('btn-student-tab-apps');

    if (tab === 'drives') {
      if (drivesPane) drivesPane.style.display = 'block';
      if (appsPane) appsPane.style.display = 'none';
      btnDrives?.classList.add('active');
      btnApps?.classList.remove('active');
    } else {
      if (drivesPane) drivesPane.style.display = 'none';
      if (appsPane) appsPane.style.display = 'block';
      btnDrives?.classList.remove('active');
      btnApps?.classList.add('active');
    }
  };

  window.switchStudentTaskTab = function(tab) {
    const tasksPane = document.getElementById('student-tab-tasks-content');
    const assessmentsPane = document.getElementById('student-tab-assessments-content');
    const btnTasks = document.getElementById('btn-student-tab-tasks');
    const btnAssessments = document.getElementById('btn-student-tab-assessments');

    if (tab === 'tasks') {
      if (tasksPane) tasksPane.style.display = 'block';
      if (assessmentsPane) assessmentsPane.style.display = 'none';
      btnTasks?.classList.add('active');
      btnAssessments?.classList.remove('active');
    } else {
      if (tasksPane) tasksPane.style.display = 'none';
      if (assessmentsPane) assessmentsPane.style.display = 'block';
      btnTasks?.classList.remove('active');
      btnAssessments?.classList.add('active');
    }
  };

  window.openAssignTaskModal = function(preselectedStudentId = null) {
    const modal = document.getElementById('modal-assign-task');
    if (modal) {
      if (preselectedStudentId) {
        const select = document.getElementById('task-select-student');
        if (select) select.value = preselectedStudentId;
      }
      modal.style.display = 'flex';
    }
  };

  window.handleAssignTaskSubmit = function(e) {
    e.preventDefault();
    const studentId = document.getElementById('task-select-student').value;
    const title = document.getElementById('task-input-title').value;
    const dueDate = document.getElementById('task-input-due').value;
    const priority = document.getElementById('task-select-priority').value;
    const notes = document.getElementById('task-input-notes').value;

    store.assignTask({ studentId, title, dueDate, priority, notes });
    closeModal('modal-assign-task');
    alert(`Task "${title}" assigned to mentee.`);
  };

  window.handleSaveMentorNote = function(e) {
    e.preventDefault();
    const studentId = document.getElementById('note-student-select').value;
    const noteText = document.getElementById('note-content-input').value;

    store.addMentorNote(studentId, noteText);
    document.getElementById('note-content-input').value = '';
    alert('Meeting note saved.');
  };

  window.openCreateDriveModal = function() {
    const modal = document.getElementById('modal-create-drive');
    if (modal) modal.style.display = 'flex';
  };

  window.handleCreateDriveSubmit = function(e) {
    e.preventDefault();
    const company = document.getElementById('drive-input-company').value;
    const role = document.getElementById('drive-input-role').value;
    const packageLPA = document.getElementById('drive-input-ctc').value;
    const minCGPA = document.getElementById('drive-input-cgpa').value;
    const maxBacklogs = document.getElementById('drive-input-backlogs').value;
    const deadline = document.getElementById('drive-input-deadline').value;
    const location = document.getElementById('drive-input-location').value;

    store.createDrive({
      company,
      role,
      packageLPA,
      minCGPA,
      maxBacklogs,
      deadline,
      location,
      allowedBranches: ['CSE', 'IT', 'ECE']
    });

    closeModal('modal-create-drive');
    alert(`Drive for ${company} published successfully!`);
  };

  window.setAppStatus = function(appId, newStatus) {
    store.updateApplicationStatus(appId, newStatus);
  };

  window.openIssueOfferModal = function(appId, studentName, company) {
    const modal = document.getElementById('modal-issue-offer');
    if (!modal) return;

    document.getElementById('offer-hidden-app-id').value = appId;
    document.getElementById('offer-display-student').value = studentName;
    document.getElementById('offer-display-company').value = company;
    modal.style.display = 'flex';
  };

  window.handleIssueOfferSubmit = function(e) {
    e.preventDefault();
    const appId = document.getElementById('offer-hidden-app-id').value;
    const packageLPA = document.getElementById('offer-input-package').value;

    store.updateApplicationStatus(appId, 'Offered', packageLPA);
    closeModal('modal-issue-offer');
    alert(`Official Offer Letter issued! Candidate marked as Placed.`);
  };

  window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
  };

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
  };

  window.openStudentProfileModal = function(studentId) {
    const student = store.getStudentById(studentId);
    if (!student) return;

    const modal = document.getElementById('modal-student-profile');
    const nameEl = document.getElementById('profile-modal-name');
    const contentEl = document.getElementById('profile-modal-content');

    if (nameEl) nameEl.textContent = `${student.name} (${student.rollNo})`;
    if (contentEl) {
      contentEl.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
          <div style="background: #F8FAFC; padding: 10px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-size: 11px; color: var(--text-secondary);">Branch & Dept</div>
            <div style="font-size: 13.5px; font-weight: 700; color: var(--text-navy);">${student.branch}</div>
          </div>
          <div style="background: #F8FAFC; padding: 10px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-size: 11px; color: var(--text-secondary);">CGPA</div>
            <div style="font-size: 13.5px; font-weight: 700; color: var(--primary-blue);">${student.cgpa} / 10.0</div>
          </div>
          <div style="background: #F8FAFC; padding: 10px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-size: 11px; color: var(--text-secondary);">Aptitude Score</div>
            <div style="font-size: 13.5px; font-weight: 700; color: var(--teal-accent);">${student.aptitude}%</div>
          </div>
          <div style="background: #F8FAFC; padding: 10px 12px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-size: 11px; color: var(--text-secondary);">Active Backlogs</div>
            <div style="font-size: 13.5px; font-weight: 700; color: ${student.backlogs > 0 ? 'var(--error-red)' : 'var(--success-green)'};">${student.backlogs} Backlogs</div>
          </div>
        </div>

        <div style="background: var(--primary-blue-light); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 14px; margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 12px; font-weight: 600; color: var(--primary-navy);">Placement Probability</span>
            <span style="font-size: 16px; font-weight: 800; color: var(--primary-blue);">${student.probability}%</span>
          </div>
          <p style="font-size: 11.5px; color: var(--text-secondary); margin-top: 2px;">Assigned Mentor: ${student.mentorName || 'Dr. Rajesh Sharma'}</p>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 8px;">
          <button class="btn-outline btn-sm" onclick="closeModal('modal-student-profile')">Close</button>
          <button class="btn-primary btn-sm" onclick="closeModal('modal-student-profile'); openAssignTaskModal('${student.id}');">Assign Preparation Task</button>
        </div>
      `;
    }

    if (modal) modal.style.display = 'flex';
  };

  window.exportMenteeCSV = function() {
    const mentees = store.getMentees('fac_001');
    let csv = "RollNo,Name,Branch,CGPA,Aptitude,Backlogs,PlacementProbability,Status\n";
    mentees.forEach(m => {
      csv += `"${m.rollNo}","${m.name}","${m.branch}",${m.cgpa},${m.aptitude},${m.backlogs},${m.probability}%,"${m.status}"\n`;
    });
    downloadCSVFile(csv, 'CSE_Mentee_Placement_Readiness_Report.csv');
  };

  window.exportPlacedStudentsCSV = function() {
    const students = store.getStudents();
    let csv = "RollNo,Name,Branch,CGPA,Aptitude,Backlogs,PlacementProbability,PlacementStatus,PlacedCompany,OfferedPackageLPA\n";
    students.forEach(s => {
      csv += `"${s.rollNo}","${s.name}","${s.branch}",${s.cgpa},${s.aptitude},${s.backlogs},${s.probability}%,"${s.status}","${s.placedCompany || 'N/A'}",${s.placedPackage || 'N/A'}\n`;
    });
    downloadCSVFile(csv, 'College_Placement_Master_Report_2026.csv');
  };

  function downloadCSVFile(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  window.updateSimulation = function() {
    const cgpa = parseFloat(document.getElementById('slider-cgpa')?.value || 8.1);
    const apt = parseInt(document.getElementById('slider-apt')?.value || 78, 10);
    const tech = parseInt(document.getElementById('slider-tech')?.value || 8, 10);
    const intern = parseInt(document.getElementById('slider-intern')?.value || 1, 10);
    const backlogs = parseInt(document.getElementById('slider-backlogs')?.value || 0, 10);

    const cgpaVal = document.getElementById('slider-cgpa-val');
    const aptVal = document.getElementById('slider-apt-val');
    const techVal = document.getElementById('slider-tech-val');
    const internVal = document.getElementById('slider-intern-val');
    const backlogsVal = document.getElementById('slider-backlogs-val');

    if (cgpaVal) cgpaVal.textContent = cgpa.toFixed(1);
    if (aptVal) aptVal.textContent = apt;
    if (techVal) techVal.textContent = tech;
    if (internVal) internVal.textContent = intern;
    if (backlogsVal) backlogsVal.textContent = backlogs;

    let rawScore = (cgpa * 6.5) + (apt * 0.35) + (tech * 2.6) + (intern * 3.5) - (backlogs * 14.0);
    let prob = Math.min(98, Math.max(20, Math.round(rawScore * 0.88)));
    const isPlaced = (prob >= 60 && backlogs <= 1);

    const statusTitle = document.getElementById('sim-status-title');
    const probTitle = document.getElementById('sim-prob-title');
    const explText = document.getElementById('sim-explanation-text');

    if (statusTitle && probTitle) {
      if (isPlaced) {
        statusTitle.textContent = 'PLACED';
        statusTitle.style.color = 'var(--success-green)';
        probTitle.textContent = `${prob}% Probability`;
        probTitle.style.color = 'var(--teal-accent)';
        if (explText) explText.textContent = `High probability of clearing campus placements for Dream / Super Dream recruitment drives.`;
      } else {
        statusTitle.textContent = 'NOT PLACED / AT RISK';
        statusTitle.style.color = 'var(--error-red)';
        probTitle.textContent = `${prob}% Probability`;
        probTitle.style.color = 'var(--error-red)';
        if (explText) explText.textContent = `Placement probability below cutoff threshold. Clearing backlogs and improving aptitude score above 65 is strongly recommended.`;
      }
    }
  };

  window.openAIAssistant = function() {
    const modal = document.getElementById('ai-assistant-modal');
    if (modal) modal.style.display = 'flex';
  };

  window.closeAIAssistant = function() {
    const modal = document.getElementById('ai-assistant-modal');
    if (modal) modal.style.display = 'none';
  };

  window.sendModalAIChat = function() {
    const input = document.getElementById('ai-modal-input');
    const box = document.getElementById('ai-modal-messages');
    if (!input || !box || !input.value.trim()) return;

    const userText = input.value.trim();
    box.innerHTML += `<p style="margin-top: 8px;"><strong>You:</strong> ${userText}</p>`;
    input.value = '';

    setTimeout(() => {
      let reply = "Practicing 15-20 medium LeetCode algorithms on Graphs and Trees alongside maintaining a 75+ Aptitude score yields a 92% placement probability in campus tech drives.";
      if (userText.toLowerCase().includes('microsoft')) {
        reply = "For Microsoft's campus drive (18.0 LPA), the technical rounds prioritize Distributed Systems fundamentals, Operating Systems concurrency, and Dynamic Programming.";
      } else if (userText.toLowerCase().includes('backlog')) {
        reply = "Campus recruiters require 0 active backlogs at the time of joining. Schedule backlog remedial exams immediately to unlock 100% eligibility.";
      }
      box.innerHTML += `<p style="color: var(--primary-blue); margin-top: 6px;"><strong>AI Mentor:</strong> ${reply}</p>`;
      box.scrollTop = box.scrollHeight;
    }, 400);
  };

  window.sendChatMessage = function() {
    const input = document.getElementById('assistant-input-box');
    const container = document.getElementById('assistant-chat-messages');
    if (!input || !container || !input.value.trim()) return;

    const q = input.value.trim();
    container.innerHTML += `
      <div style="background: var(--primary-blue-light); border-radius: var(--radius-md); padding: 10px 14px; max-width: 80%; align-self: flex-end;">
        <div style="font-size: 11px; font-weight: 700; color: var(--primary-blue); margin-bottom: 2px;">You</div>
        <p style="font-size: 13px; color: var(--primary-navy);">${q}</p>
      </div>
    `;
    input.value = '';

    setTimeout(() => {
      container.innerHTML += `
        <div style="background: #F8FAFC; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 10px 14px; max-width: 80%;">
          <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); margin-bottom: 2px;">Placement AI Mentor</div>
          <p style="font-size: 13px; color: var(--text-navy);">For technical campus recruitment, articulate your problem-solving method using the STAR framework. Highlight your time complexity optimizations and test edge cases proactively.</p>
        </div>
      `;
      container.scrollTop = container.scrollHeight;
    }, 450);
  };

  window.sendQuickPrompt = function(promptText) {
    const input = document.getElementById('assistant-input-box');
    if (input) {
      input.value = promptText;
      window.sendChatMessage();
    }
  };

  window.handleResumeUpload = function(e) {
    const file = e.target.files[0];
    if (file) {
      const filenameLabel = document.getElementById('resume-filename');
      if (filenameLabel) filenameLabel.textContent = file.name;
      alert(`Resume "${file.name}" uploaded and parsed successfully! ATS Score: 82/100.`);
    }
  };

  window.showNotificationsAlert = function() {
    alert(`Campus Placement Notifications:\n\n1. Microsoft Cloud Drive application deadline is Oct 28.\n2. Dr. Rajesh Sharma assigned a new LeetCode preparation task.\n3. Mock Technical Interview rounds start next Monday.`);
  };

  // --- THEME TOGGLE (LIGHT / DARK) ---
  window.toggleTheme = function(mode) {
    const isDark = mode === 'dark';
    if (isDark) {
      document.body.classList.add('dark-theme');
      document.getElementById('btn-theme-dark')?.classList.add('active');
      document.getElementById('btn-theme-light')?.classList.remove('active');
      localStorage.setItem('spp_theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.getElementById('btn-theme-light')?.classList.add('active');
      document.getElementById('btn-theme-dark')?.classList.remove('active');
      localStorage.setItem('spp_theme', 'light');
    }
  };

  // Restore saved theme on initial load
  const savedTheme = localStorage.getItem('spp_theme');
  if (savedTheme === 'dark') {
    window.toggleTheme('dark');
  } else {
    window.toggleTheme('light');
  }

  // --- STUDENT PROFILE ACTIONS & MODALS ---
  window.openEditProfileModal = function() {
    const s = store.data.roles.student;
    if (!s) return;
    const nameInput = document.getElementById('edit-sp-name');
    const emailInput = document.getElementById('edit-sp-email');
    const phoneInput = document.getElementById('edit-sp-phone');
    const locInput = document.getElementById('edit-sp-location');
    const degInput = document.getElementById('edit-sp-degree');
    const branchInput = document.getElementById('edit-sp-branch');
    const collegeInput = document.getElementById('edit-sp-college');
    const yearSelect = document.getElementById('edit-sp-year');

    if (nameInput) nameInput.value = s.name || '';
    if (emailInput) emailInput.value = s.email || '';
    if (phoneInput) phoneInput.value = s.phone || '';
    if (locInput) locInput.value = `${s.city || 'Hyderabad'}, ${s.state || 'Telangana'}`;
    if (degInput) degInput.value = s.degree || 'B.Tech';
    if (branchInput) branchInput.value = s.branch || '';
    if (collegeInput) collegeInput.value = s.college || '';
    if (yearSelect) yearSelect.value = s.currentYear || '3rd Year (Current)';

    openModal('modal-edit-student-profile');
  };

  // Toast Notification Helper
  window.showToast = function(message, type = 'success') {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    const icon = type === 'success' ? '✓' : (type === 'error' ? '✕' : 'ℹ');
    toast.innerHTML = `<span style="font-weight: bold; font-size: 15px; margin-right: 4px;">${icon}</span> <span>${message}</span>`;
    toast.className = `toast-notification ${type} show`;

    if (window._toastTimeout) clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  window.handleSaveStudentProfile = function(e) {
    e.preventDefault();
    const locVal = document.getElementById('edit-sp-location')?.value || '';
    const parts = locVal.split(',');
    const city = parts[0]?.trim() || '';
    const state = parts[1]?.trim() || '';

    store.updateStudentProfile({
      name: document.getElementById('edit-sp-name')?.value?.trim() || 'Aditya Verma',
      email: document.getElementById('edit-sp-email')?.value?.trim() || 'aditya.verma@college.edu',
      phone: document.getElementById('edit-sp-phone')?.value?.trim() || '+91 98765 43210',
      degree: document.getElementById('edit-sp-degree')?.value?.trim() || 'B.Tech',
      branch: document.getElementById('edit-sp-branch')?.value?.trim() || 'Computer Science & Engineering',
      college: document.getElementById('edit-sp-college')?.value?.trim() || 'College of Engineering, Hyderabad',
      currentYear: document.getElementById('edit-sp-year')?.value || '3rd Year (Current)',
      city: city || 'Hyderabad',
      state: state || 'Telangana'
    });

    closeModal('modal-edit-student-profile');
    showToast('Student profile details updated successfully!');
  };

  window.openEditAcademicModal = function() {
    const s = store.data.roles.student;
    if (!s) return;
    const tenthSchool = document.getElementById('edit-sp-tenth-school');
    const tenthBoard = document.getElementById('edit-sp-tenth-board');
    const tenthPct = document.getElementById('edit-sp-tenth-pct');
    const tenthYear = document.getElementById('edit-sp-tenth-year');

    const twCollege = document.getElementById('edit-sp-twelfth-college');
    const twStream = document.getElementById('edit-sp-twelfth-stream');
    const twBoard = document.getElementById('edit-sp-twelfth-board');
    const twPct = document.getElementById('edit-sp-twelfth-pct');
    const twYear = document.getElementById('edit-sp-twelfth-year');

    const cgpa = document.getElementById('edit-sp-cgpa');
    const backlogs = document.getElementById('edit-sp-backlogs');

    if (tenthSchool) tenthSchool.value = s.tenthSchool || 'St. Paul High School';
    if (tenthBoard) tenthBoard.value = s.tenthBoard || 'State Board';
    if (tenthPct) tenthPct.value = s.tenthPct || 92.0;
    if (tenthYear) tenthYear.value = s.tenthYear || 2020;

    if (twCollege) twCollege.value = s.twelfthCollege || 'Narayana Junior College';
    if (twStream) twStream.value = s.twelfthStream || 'MPC';
    if (twBoard) twBoard.value = s.twelfthBoard || 'State Board';
    if (twPct) twPct.value = s.twelfthPct || 89.0;
    if (twYear) twYear.value = s.twelfthYear || 2022;

    if (cgpa) cgpa.value = s.cgpa || 8.4;
    if (backlogs) backlogs.value = s.backlogs ?? 0;

    openModal('modal-edit-academic-scores');
  };

  window.handleSaveAcademicScores = function(e) {
    e.preventDefault();
    store.updateStudentAcademic({
      tenthSchool: document.getElementById('edit-sp-tenth-school')?.value?.trim() || 'St. Paul High School',
      tenthBoard: document.getElementById('edit-sp-tenth-board')?.value?.trim() || 'State Board',
      tenthPct: parseFloat(document.getElementById('edit-sp-tenth-pct')?.value || 92),
      tenthYear: parseInt(document.getElementById('edit-sp-tenth-year')?.value || 2020, 10),

      twelfthCollege: document.getElementById('edit-sp-twelfth-college')?.value?.trim() || 'Narayana Junior College',
      twelfthStream: document.getElementById('edit-sp-twelfth-stream')?.value?.trim() || 'MPC',
      twelfthBoard: document.getElementById('edit-sp-twelfth-board')?.value?.trim() || 'State Board',
      twelfthPct: parseFloat(document.getElementById('edit-sp-twelfth-pct')?.value || 89),
      twelfthYear: parseInt(document.getElementById('edit-sp-twelfth-year')?.value || 2022, 10),

      cgpa: parseFloat(document.getElementById('edit-sp-cgpa')?.value || 8.4),
      backlogs: parseInt(document.getElementById('edit-sp-backlogs')?.value || 0, 10)
    });

    closeModal('modal-edit-academic-scores');
    showToast('Academic scores updated! Placement probability recalculated.');
  };

  window.openAddInternshipModal = function() {
    document.getElementById('form-add-internship')?.reset();
    openModal('modal-add-internship');
  };

  window.handleSaveInternship = function(e) {
    e.preventDefault();
    store.addStudentInternship({
      company: document.getElementById('edit-sp-int-company')?.value?.trim() || 'Tech Corp',
      role: document.getElementById('edit-sp-int-role')?.value?.trim() || 'Software Intern',
      startDate: document.getElementById('edit-sp-int-period')?.value?.trim() || 'May 2025',
      endDate: 'Completed',
      stipend: document.getElementById('edit-sp-int-stipend')?.value?.trim() || '₹25,000 / month',
      mode: document.getElementById('edit-sp-int-mode')?.value || 'Hybrid',
      skillsUsed: document.getElementById('edit-sp-int-tech')?.value?.trim() || 'React, Node.js',
      responsibilities: document.getElementById('edit-sp-int-resp')?.value?.trim() || ''
    });
    closeModal('modal-add-internship');
    showToast('Internship experience added successfully!');
  };

  window.deleteStudentInternship = function(id) {
    if (confirm('Are you sure you want to remove this internship experience?')) {
      store.deleteStudentInternship(id);
      showToast('Internship removed.');
    }
  };

  window.openAddWorkExperienceModal = function() {
    document.getElementById('form-add-work')?.reset();
    openModal('modal-add-work');
  };

  window.handleSaveWorkExperience = function(e) {
    e.preventDefault();
    store.addStudentWorkExperience({
      company: document.getElementById('edit-sp-work-company')?.value?.trim() || 'Company',
      jobTitle: document.getElementById('edit-sp-work-role')?.value?.trim() || 'Engineer',
      empType: document.getElementById('edit-sp-work-type')?.value || 'Full-time',
      duration: document.getElementById('edit-sp-work-duration')?.value?.trim() || '2024 - 2025',
      description: document.getElementById('edit-sp-work-desc')?.value?.trim() || ''
    });
    closeModal('modal-add-work');
    showToast('Work experience added successfully!');
  };

  window.deleteStudentWorkExperience = function(id) {
    if (confirm('Are you sure you want to remove this work experience?')) {
      store.deleteStudentWorkExperience(id);
      showToast('Work experience removed.');
    }
  };

  // Skills Modal logic
  function renderModalSkillsList() {
    const container = document.getElementById('modal-skills-list-container');
    if (!container) return;
    const skills = store.data.roles.student.skills || [];
    container.innerHTML = skills.map(skill => `
      <span class="skill-chip-pill">
        ${skill}
        <button type="button" onclick="removeStudentSkillItem('${skill}')" style="background: transparent; border: none; cursor: pointer; color: #DC2626; margin-left: 4px; font-weight: 700;">✕</button>
      </span>
    `).join('');
  }

  window.openEditSkillsModal = function() {
    renderModalSkillsList();
    openModal('modal-edit-skills');
  };

  window.addNewSkillFromInput = function() {
    const input = document.getElementById('edit-sp-new-skill');
    if (!input || !input.value.trim()) return;
    const val = input.value.trim();
    store.addStudentSkill(val);
    input.value = '';
    renderModalSkillsList();
    showToast(`Skill "${val}" added!`);
  };

  window.quickAddSkill = function(skillName) {
    store.addStudentSkill(skillName);
    renderModalSkillsList();
    showToast(`Skill "${skillName}" added!`);
  };

  window.removeStudentSkillItem = function(skillName) {
    store.removeStudentSkill(skillName);
    renderModalSkillsList();
    showToast(`Skill "${skillName}" removed.`);
  };

  window.openAddProjectModal = function() {
    document.getElementById('form-add-project')?.reset();
    openModal('modal-add-project');
  };

  window.handleSaveProject = function(e) {
    e.preventDefault();
    const title = document.getElementById('edit-sp-proj-title')?.value?.trim() || 'Technical Project';
    store.addStudentProject({
      title,
      tech: document.getElementById('edit-sp-proj-tech')?.value?.trim() || 'Full Stack',
      domain: document.getElementById('edit-sp-proj-domain')?.value?.trim() || 'Software Development',
      githubUrl: document.getElementById('edit-sp-proj-github')?.value?.trim() || '',
      description: document.getElementById('edit-sp-proj-desc')?.value?.trim() || '',
      startDate: '2025',
      endDate: '2025'
    });
    closeModal('modal-add-project');
    showToast(`Project "${title}" added to portfolio!`);
  };

  window.deleteStudentProject = function(id) {
    if (confirm('Are you sure you want to remove this project?')) {
      store.deleteStudentProject(id);
      showToast('Project removed.');
    }
  };

  window.openAddCertificationModal = function() {
    document.getElementById('form-add-certification')?.reset();
    openModal('modal-add-certification');
  };

  window.handleSaveCertification = function(e) {
    e.preventDefault();
    const name = document.getElementById('edit-sp-cert-name')?.value?.trim() || 'Certification';
    store.addStudentCertification({
      name,
      issuer: document.getElementById('edit-sp-cert-issuer')?.value?.trim() || 'Issuing Authority',
      date: document.getElementById('edit-sp-cert-date')?.value?.trim() || '2025',
      credentialUrl: document.getElementById('edit-sp-cert-url')?.value?.trim() || ''
    });
    closeModal('modal-add-certification');
    showToast(`Certification "${name}" added!`);
  };

  window.deleteStudentCertification = function(id) {
    if (confirm('Are you sure you want to remove this certification?')) {
      store.deleteStudentCertification(id);
      showToast('Certification removed.');
    }
  };

  // Backdrop overlay click to dismiss any modal
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.display = 'none';
      }
    });
  });

  // Escape key to dismiss any active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.style.display = 'none';
      });
    }
  });

  const sidebarEl = document.getElementById('app-sidebar');
  const backdropEl = document.getElementById('sidebar-backdrop');

  function openMobileSidebar() {
    sidebarEl?.classList.add('mobile-open');
    backdropEl?.classList.add('active');
  }

  function closeMobileSidebar() {
    sidebarEl?.classList.remove('mobile-open');
    backdropEl?.classList.remove('active');
  }

  document.getElementById('btn-toggle-sidebar')?.addEventListener('click', openMobileSidebar);
  document.getElementById('btn-close-sidebar')?.addEventListener('click', closeMobileSidebar);
  backdropEl?.addEventListener('click', closeMobileSidebar);

  updateRouting();
  renderAllViews();
});
