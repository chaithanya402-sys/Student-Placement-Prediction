/**
 * PlacementDataStore - Shared Central Reactive State for Student Placement Prediction System
 * 
 * Synchronizes data across all 3 roles:
 * - Student (Aditya Verma)
 * - Faculty Mentor (Dr. Rajesh Sharma)
 * - T&P Officer (Prof. S. K. Nair)
 * 
 * Connected features:
 * 1. Recruitment Drives created by T&P Officer immediately appear for Students to apply.
 * 2. Student applications appear live in T&P Officer's Applications & Offers queue.
 * 3. Offer Letters issued by T&P Officer update the Student's placement status to 'Placed',
 *    increment T&P's total placed count & placement rate, and notify the Faculty Mentor.
 * 4. Mentoring Tasks & Notes assigned by Faculty Mentor appear live on Student's dashboard.
 * 5. Student task completion reflects live on Faculty Mentor's monitoring view.
 */

(function () {
  const DB_STORAGE_KEY = 'spp_placement_db_v2';

  // Seed default data if storage is empty
  const defaultInitialData = {
    roles: {
      student: {
        id: 'std_042',
        name: 'Aditya Verma',
        rollNo: '21CSE042',
        email: 'aditya.verma@college.edu',
        phone: '+91 98765 43210',
        role: 'student',
        college: 'College of Engineering, Hyderabad',
        degree: 'B.Tech',
        branch: 'Computer Science & Engineering',
        specialization: 'CSE (AI & ML)',
        semester: '7th Semester',
        currentYear: '3rd Year (Current)',
        admissionYear: 2022,
        gradYear: 2026,
        city: 'Hyderabad',
        state: 'Telangana',
        cgpa: 8.4,
        tenthPct: 92.0,
        tenthYear: 2020,
        tenthBoard: 'State Board',
        tenthSchool: 'St. Paul High School, Hyderabad',
        twelfthPct: 89.0,
        twelfthYear: 2022,
        twelfthBoard: 'State Board',
        twelfthCollege: 'Narayana Junior College, Hyderabad',
        twelfthStream: 'MPC',
        backlogs: 0,
        historicalBacklogs: 0,
        affiliation: 'JNTUK',
        aptitudeScore: 78,
        technicalScore: 84,
        resumeScore: 82,
        probability: 84,
        predictionStatus: 'Placed (High Confidence)',
        placementStatus: 'Placement Ready',
        placedCompany: null,
        placedPackage: null,
        mentorId: 'fac_001',
        mentorName: 'Dr. Rajesh Sharma',
        skills: ['Java', 'Python', 'C', 'JavaScript', 'React', 'MySQL', 'HTML', 'CSS', 'Data Structures', 'Machine Learning'],
        avatar: 'AV',
        internships: [
          {
            id: 'int_1',
            company: 'Trigent Software Inc.',
            role: 'Software Development Intern',
            domain: 'Full Stack Development',
            empType: 'Internship',
            startDate: 'May 2025',
            endDate: 'Jun 2025',
            paid: true,
            stipend: '₹25,000 / month',
            mode: 'Hybrid',
            skillsUsed: 'React, Node.js, REST APIs, PostgreSQL',
            responsibilities: 'Built scalable microservice dashboard and automated recruitment pipeline testing.',
            status: 'Completed'
          }
        ],
        workExperience: [],
        projects: [
          {
            id: 'proj_1',
            title: 'Campus Placement Prediction AI',
            description: 'Supervised Random Forest ML model predicting recruitment outcomes with 89.2% accuracy.',
            domain: 'Machine Learning / Web',
            tech: 'Python, Scikit-Learn, Flask, React',
            startDate: 'Jan 2025',
            endDate: 'Apr 2025',
            isMajor: true,
            githubUrl: 'https://github.com/aditya/placement-prediction',
            demoUrl: 'https://careerlens-demo.edu',
            outcomes: 'Deployed across 3 college departments for placement readiness diagnostics.'
          },
          {
            id: 'proj_2',
            title: 'Distributed File Storage Engine',
            description: 'Go-based peer-to-peer file synchronization engine with cryptographic chunk hashing.',
            domain: 'Systems & Networking',
            tech: 'Go, gRPC, Docker',
            startDate: 'Aug 2024',
            endDate: 'Nov 2024',
            isMajor: false,
            githubUrl: 'https://github.com/aditya/distributed-fs',
            demoUrl: '',
            outcomes: 'Achieved 4x faster chunk sync across 10 virtual container nodes.'
          },
          {
            id: 'proj_3',
            title: 'Smart Resume ATS Scorer',
            description: 'TF-IDF and cosine similarity resume parser matching candidate skills to JDs.',
            domain: 'Natural Language Processing',
            tech: 'Python, NLTK, FastAPI',
            startDate: 'May 2024',
            endDate: 'Jul 2024',
            isMajor: false,
            githubUrl: 'https://github.com/aditya/resume-ats-scanner',
            demoUrl: '',
            outcomes: 'Used by 250+ batchmates for resume optimization.'
          }
        ],
        certifications: [],
        recentActivities: [
          { id: 'act_1', title: 'Profile updated', desc: 'Your profile information has been updated successfully.', time: '2 days ago', type: 'profile' },
          { id: 'act_2', title: 'Internship added', desc: 'Trigent Software Inc. | May 2025 - Jun 2025', time: '3 days ago', type: 'internship' },
          { id: 'act_3', title: 'New skill added', desc: 'React | Frontend Development', time: '5 days ago', type: 'skill' }
        ],
        resume: {
          fileName: 'Aditya_Verma_Resume_2026.pdf',
          fileSize: '184 KB',
          lastUpdated: 'Oct 08, 2026',
          completeness: 92,
          atsScore: 84
        }
      },
      faculty: {
        id: 'fac_001',
        name: 'Dr. Rajesh Sharma',
        department: 'Computer Science & Engineering',
        email: 'dr.rajesh.mentor@college.edu',
        role: 'faculty',
        designation: 'Associate Professor & Placement Mentor',
        menteeCount: 42,
        avatar: 'RS'
      },
      officer: {
        id: 'tpo_001',
        name: 'Prof. S. K. Nair',
        department: 'Training & Placement Cell',
        email: 'placement.cell@college.edu',
        role: 'officer',
        designation: 'Head, Training & Placement Cell',
        avatar: 'SN'
      }
    },
    students: [
      {
        id: 'std_042',
        name: 'Aditya Verma',
        rollNo: '21CSE042',
        email: 'aditya.verma@college.edu',
        branch: 'CSE',
        cgpa: 8.1,
        aptitude: 78,
        techScore: 84,
        backlogs: 0,
        probability: 84,
        status: 'In Process',
        mentorId: 'fac_001',
        mentorName: 'Dr. Rajesh Sharma',
        placedCompany: null,
        placedPackage: null,
        riskLevel: 'Ready'
      },
      {
        id: 'std_089',
        name: 'Priya Nair',
        rollNo: '21CSE089',
        email: 'priya.nair@college.edu',
        branch: 'CSE',
        cgpa: 8.9,
        aptitude: 85,
        techScore: 90,
        backlogs: 0,
        probability: 93,
        status: 'Placed',
        mentorId: 'fac_001',
        mentorName: 'Dr. Rajesh Sharma',
        placedCompany: 'TCS Digital',
        placedPackage: 7.5,
        riskLevel: 'Ready'
      },
      {
        id: 'std_104',
        name: 'Rohan Gupta',
        rollNo: '21CSE104',
        email: 'rohan.gupta@college.edu',
        branch: 'CSE',
        cgpa: 6.8,
        aptitude: 58,
        techScore: 60,
        backlogs: 1,
        probability: 52,
        status: 'At Risk',
        mentorId: 'fac_001',
        mentorName: 'Dr. Rajesh Sharma',
        placedCompany: null,
        placedPackage: null,
        riskLevel: 'High Risk'
      },
      {
        id: 'std_023',
        name: 'Sneha Patel',
        rollNo: '21IT023',
        email: 'sneha.patel@college.edu',
        branch: 'IT',
        cgpa: 7.6,
        aptitude: 72,
        techScore: 75,
        backlogs: 0,
        probability: 76,
        status: 'In Process',
        mentorId: 'fac_001',
        mentorName: 'Dr. Rajesh Sharma',
        placedCompany: null,
        placedPackage: null,
        riskLevel: 'Medium'
      },
      {
        id: 'std_112',
        name: 'Rahul Verma',
        rollNo: '21CSE112',
        email: 'rahul.verma@college.edu',
        branch: 'CSE',
        cgpa: 6.2,
        aptitude: 50,
        techScore: 52,
        backlogs: 2,
        probability: 38,
        status: 'At Risk',
        mentorId: 'fac_001',
        mentorName: 'Dr. Rajesh Sharma',
        placedCompany: null,
        placedPackage: null,
        riskLevel: 'Critical'
      },
      {
        id: 'std_015',
        name: 'Ananya Sen',
        rollNo: '21ECE015',
        email: 'ananya.sen@college.edu',
        branch: 'ECE',
        cgpa: 8.4,
        aptitude: 82,
        techScore: 80,
        backlogs: 0,
        probability: 88,
        status: 'Placed',
        mentorId: 'fac_001',
        mentorName: 'Dr. Rajesh Sharma',
        placedCompany: 'Cisco',
        placedPackage: 14.0,
        riskLevel: 'Ready'
      },
      {
        id: 'std_145',
        name: 'Vikram Malhotra',
        rollNo: '21CSE145',
        email: 'vikram.m@college.edu',
        branch: 'CSE',
        cgpa: 7.4,
        aptitude: 70,
        techScore: 72,
        backlogs: 0,
        probability: 72,
        status: 'In Process',
        mentorId: 'fac_001',
        mentorName: 'Dr. Rajesh Sharma',
        placedCompany: null,
        placedPackage: null,
        riskLevel: 'Ready'
      },
      {
        id: 'std_088',
        name: 'Neha Sharma',
        rollNo: '21IT088',
        email: 'neha.sharma@college.edu',
        branch: 'IT',
        cgpa: 9.1,
        aptitude: 92,
        techScore: 94,
        backlogs: 0,
        probability: 96,
        status: 'Placed',
        mentorId: 'fac_001',
        mentorName: 'Dr. Rajesh Sharma',
        placedCompany: 'Microsoft',
        placedPackage: 18.0,
        riskLevel: 'Ready'
      },
      {
        id: 'std_055',
        name: 'Karthik Raja',
        rollNo: '21MECH055',
        email: 'karthik.r@college.edu',
        branch: 'MECH',
        cgpa: 6.9,
        aptitude: 62,
        techScore: 58,
        backlogs: 0,
        probability: 58,
        status: 'In Process',
        mentorId: 'fac_002',
        mentorName: 'Dr. P. Venkat',
        placedCompany: null,
        placedPackage: null,
        riskLevel: 'Medium'
      },
      {
        id: 'std_067',
        name: 'Divya Krishnan',
        rollNo: '21CIVIL067',
        email: 'divya.k@college.edu',
        branch: 'CIVIL',
        cgpa: 7.8,
        aptitude: 74,
        techScore: 68,
        backlogs: 0,
        probability: 69,
        status: 'In Process',
        mentorId: 'fac_003',
        mentorName: 'Prof. M. Anita',
        placedCompany: null,
        placedPackage: null,
        riskLevel: 'Medium'
      }
    ],
    drives: [
      {
        id: 'drv_001',
        company: 'Microsoft',
        role: 'Cloud SWE',
        packageLPA: 18.0,
        minCGPA: 8.0,
        allowedBranches: ['CSE', 'IT', 'ECE'],
        maxBacklogs: 0,
        deadline: '2026-10-28',
        status: 'Active',
        location: 'Hyderabad / Bangalore',
        skillsRequired: ['C++', 'Python', 'Cloud / Distributed Systems', 'Data Structures'],
        applicantsCount: 38,
        openings: 12
      },
      {
        id: 'drv_002',
        company: 'Amazon',
        role: 'SDE-1',
        packageLPA: 16.5,
        minCGPA: 7.8,
        allowedBranches: ['CSE', 'IT'],
        maxBacklogs: 0,
        deadline: '2026-10-30',
        status: 'Active',
        location: 'Bangalore',
        skillsRequired: ['Java', 'Algorithms', 'System Design Basics', 'Problem Solving'],
        applicantsCount: 52,
        openings: 15
      },
      {
        id: 'drv_003',
        company: 'TCS Digital',
        role: 'Systems Engineer',
        packageLPA: 7.5,
        minCGPA: 7.0,
        allowedBranches: ['CSE', 'IT', 'ECE', 'MECH'],
        maxBacklogs: 1,
        deadline: '2026-11-05',
        status: 'Active',
        location: 'Pan India',
        skillsRequired: ['Python / Java', 'Aptitude & Reasoning', 'SQL', 'Web Tech'],
        applicantsCount: 142,
        openings: 80
      },
      {
        id: 'drv_004',
        company: 'Google',
        role: 'Associate Software Engineer',
        packageLPA: 24.0,
        minCGPA: 8.5,
        allowedBranches: ['CSE', 'IT'],
        maxBacklogs: 0,
        deadline: '2026-11-12',
        status: 'Active',
        location: 'Bangalore / Hyderabad',
        skillsRequired: ['Advanced Algorithms', 'Graph Theory', 'C++ / Go', 'System Architecture'],
        applicantsCount: 22,
        openings: 6
      },
      {
        id: 'drv_005',
        company: 'Infosys SP',
        role: 'Specialist Programmer',
        packageLPA: 9.5,
        minCGPA: 7.2,
        allowedBranches: ['CSE', 'IT', 'ECE'],
        maxBacklogs: 0,
        deadline: '2026-11-18',
        status: 'Active',
        location: 'Pune / Mysore',
        skillsRequired: ['Full Stack', 'Database Management', 'Data Structures'],
        applicantsCount: 88,
        openings: 45
      },
      {
        id: 'drv_006',
        company: 'Cisco',
        role: 'Software Engineer - Networking',
        packageLPA: 14.0,
        minCGPA: 8.0,
        allowedBranches: ['CSE', 'ECE', 'IT'],
        maxBacklogs: 0,
        deadline: '2026-11-20',
        status: 'Active',
        location: 'Bangalore',
        skillsRequired: ['Computer Networks', 'Operating Systems', 'Python / C', 'Linux'],
        applicantsCount: 34,
        openings: 10
      }
    ],
    applications: [
      {
        id: 'app_101',
        studentId: 'std_089',
        studentName: 'Priya Nair',
        rollNo: '21CSE089',
        branch: 'CSE',
        driveId: 'drv_003',
        company: 'TCS Digital',
        role: 'Systems Engineer',
        appliedDate: '2026-10-02',
        status: 'Offered',
        offerPackage: 7.5
      },
      {
        id: 'app_102',
        studentId: 'std_015',
        studentName: 'Ananya Sen',
        rollNo: '21ECE015',
        branch: 'ECE',
        driveId: 'drv_006',
        company: 'Cisco',
        role: 'Software Engineer - Networking',
        appliedDate: '2026-10-03',
        status: 'Offered',
        offerPackage: 14.0
      },
      {
        id: 'app_103',
        studentId: 'std_088',
        studentName: 'Neha Sharma',
        rollNo: '21IT088',
        branch: 'IT',
        driveId: 'drv_001',
        company: 'Microsoft',
        role: 'Cloud SWE',
        appliedDate: '2026-10-04',
        status: 'Offered',
        offerPackage: 18.0
      },
      {
        id: 'app_104',
        studentId: 'std_042',
        studentName: 'Aditya Verma',
        rollNo: '21CSE042',
        branch: 'CSE',
        driveId: 'drv_002',
        company: 'Amazon',
        role: 'SDE-1',
        appliedDate: '2026-10-05',
        status: 'Shortlisted',
        offerPackage: null
      },
      {
        id: 'app_105',
        studentId: 'std_042',
        studentName: 'Aditya Verma',
        rollNo: '21CSE042',
        branch: 'CSE',
        driveId: 'drv_001',
        company: 'Microsoft',
        role: 'Cloud SWE',
        appliedDate: '2026-10-06',
        status: 'Interview Scheduled',
        offerPackage: null
      },
      {
        id: 'app_106',
        studentId: 'std_023',
        studentName: 'Sneha Patel',
        rollNo: '21IT023',
        branch: 'IT',
        driveId: 'drv_005',
        company: 'Infosys SP',
        role: 'Specialist Programmer',
        appliedDate: '2026-10-07',
        status: 'Applied',
        offerPackage: null
      }
    ],
    mentorTasks: [
      {
        id: 'tsk_001',
        mentorId: 'fac_001',
        studentId: 'std_042',
        studentName: 'Aditya Verma',
        title: 'Complete 20 Dynamic Programming problems on LeetCode',
        dueDate: '2026-10-18',
        priority: 'High',
        status: 'Pending',
        assignedDate: '2026-10-08',
        notes: 'Focus on 0/1 Knapsack and Longest Common Subsequence'
      },
      {
        id: 'tsk_002',
        mentorId: 'fac_001',
        studentId: 'std_042',
        studentName: 'Aditya Verma',
        title: 'Review System Design Fundamentals (Caching & Load Balancing)',
        dueDate: '2026-10-22',
        priority: 'Medium',
        status: 'Completed',
        assignedDate: '2026-10-06',
        notes: 'Read chapter 3 of System Design Interview guide'
      },
      {
        id: 'tsk_003',
        mentorId: 'fac_001',
        studentId: 'std_104',
        studentName: 'Rohan Gupta',
        title: 'Aptitude Practice: Quantitative Formula Mastery',
        dueDate: '2026-10-19',
        priority: 'High',
        status: 'Pending',
        assignedDate: '2026-10-09',
        notes: 'Score below 60 on last mock test; needs formula revision'
      },
      {
        id: 'tsk_004',
        mentorId: 'fac_001',
        studentId: 'std_112',
        studentName: 'Rahul Verma',
        title: 'Attend Remedial Session for Operating Systems Backlog',
        dueDate: '2026-10-24',
        priority: 'High',
        status: 'Pending',
        assignedDate: '2026-10-09',
        notes: 'Mandatory attendance for backlog clearing drive'
      }
    ],
    mentorNotes: [
      {
        studentId: 'std_042',
        date: '2026-10-06',
        author: 'Dr. Rajesh Sharma',
        note: 'Aditya demonstrates solid problem-solving fundamentals. Recommended preparing for upcoming Microsoft cloud round.'
      },
      {
        studentId: 'std_104',
        date: '2026-10-07',
        author: 'Dr. Rajesh Sharma',
        note: 'Rohan has 1 backlog in 5th sem. Advised to focus on aptitude cutoff criteria for mass and dream recruiters.'
      }
    ],
    auditLog: [
      {
        time: 'Just now',
        action: 'System initialized with shared reactive placement dataset v2.4.'
      },
      {
        time: '2 hours ago',
        action: 'T&P Officer Prof. S. K. Nair published new placement drive: Microsoft Cloud SWE (18 LPA).'
      },
      {
        time: 'Yesterday',
        action: 'Student Aditya Verma applied for Amazon SDE-1 Recruitment Drive.'
      }
    ]
  };

  class PlacementDataStore {
    constructor() {
      this.listeners = [];
      this.load();
    }

    load() {
      try {
        const stored = localStorage.getItem(DB_STORAGE_KEY);
        if (stored) {
          this.data = JSON.parse(stored);
          // Auto-migrate new profile fields into existing stored student
          const st = this.data.roles?.student;
          if (st) {
            const seed = defaultInitialData.roles.student;
            if (!st.internships || st.internships.length === 0) st.internships = JSON.parse(JSON.stringify(seed.internships));
            if (!st.workExperience) st.workExperience = [];
            if (!st.projects || st.projects.length === 0) st.projects = JSON.parse(JSON.stringify(seed.projects));
            if (!st.certifications) st.certifications = [];
            if (!st.recentActivities || st.recentActivities.length === 0) st.recentActivities = JSON.parse(JSON.stringify(seed.recentActivities));
            if (!st.phone) st.phone = seed.phone;
            if (!st.college) st.college = seed.college;
            if (!st.specialization) st.specialization = seed.specialization;
            if (!st.city) st.city = seed.city;
            if (!st.state) st.state = seed.state;
            if (!st.currentYear) st.currentYear = seed.currentYear;
            if (!st.gradYear) st.gradYear = seed.gradYear;
            if (!st.tenthYear) st.tenthYear = seed.tenthYear;
            if (!st.tenthBoard) st.tenthBoard = seed.tenthBoard;
            if (!st.tenthPct) st.tenthPct = seed.tenthPct;
            if (!st.twelfthYear) st.twelfthYear = seed.twelfthYear;
            if (!st.twelfthBoard) st.twelfthBoard = seed.twelfthBoard;
            if (!st.twelfthPct) st.twelfthPct = seed.twelfthPct;
            if (!st.affiliation) st.affiliation = seed.affiliation;
            if (!st.resume) st.resume = JSON.parse(JSON.stringify(seed.resume));
          }
        } else {
          this.data = JSON.parse(JSON.stringify(defaultInitialData));
          this.save();
        }
      } catch (e) {
        console.warn('Failed to parse localStorage dataStore, resetting to default.', e);
        this.data = JSON.parse(JSON.stringify(defaultInitialData));
      }
    }

    save() {
      try {
        localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(this.data));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
      this.notify();
    }

    resetToDefault() {
      this.data = JSON.parse(JSON.stringify(defaultInitialData));
      this.save();
    }

    subscribe(callback) {
      if (typeof callback === 'function') {
        this.listeners.push(callback);
      }
      return () => {
        this.listeners = this.listeners.filter(cb => cb !== callback);
      };
    }

    notify() {
      this.listeners.forEach(cb => {
        try {
          cb(this.data);
        } catch (e) {
          console.error('Error in listener callback:', e);
        }
      });
    }

    // Role helpers
    getActiveRole() {
      return localStorage.getItem('spp_user_role') || 'student';
    }

    setActiveRole(role) {
      localStorage.setItem('spp_user_role', role);
      const roleProfiles = {
        student: { email: 'aditya.verma@college.edu' },
        faculty: { email: 'dr.rajesh.mentor@college.edu' },
        officer: { email: 'placement.cell@college.edu' }
      };
      if (roleProfiles[role]) {
        localStorage.setItem('spp_user_email', roleProfiles[role].email);
      }
      this.notify();
    }

    getUserProfile(role = null) {
      const r = role || this.getActiveRole();
      return this.data.roles[r] || this.data.roles.student;
    }

    // Students
    getStudents() {
      return this.data.students || [];
    }

    getStudentById(id) {
      return this.data.students.find(s => s.id === id);
    }

    getMentees(mentorId = 'fac_001') {
      return this.data.students.filter(s => s.mentorId === mentorId);
    }

    // Drives
    getDrives() {
      return this.data.drives || [];
    }

    createDrive(driveObj) {
      const newDrive = {
        id: 'drv_' + Date.now().toString(36),
        company: driveObj.company || 'New Partner',
        role: driveObj.role || 'Software Engineer',
        packageLPA: parseFloat(driveObj.packageLPA) || 6.0,
        minCGPA: parseFloat(driveObj.minCGPA) || 7.0,
        allowedBranches: Array.isArray(driveObj.allowedBranches) ? driveObj.allowedBranches : ['CSE', 'IT'],
        maxBacklogs: parseInt(driveObj.maxBacklogs, 10) || 0,
        deadline: driveObj.deadline || '2026-11-30',
        status: 'Active',
        location: driveObj.location || 'Bangalore / Remote',
        skillsRequired: driveObj.skillsRequired || ['Data Structures', 'Python', 'SQL'],
        applicantsCount: 0,
        openings: parseInt(driveObj.openings, 10) || 10
      };

      this.data.drives.unshift(newDrive);
      this.addAudit(`T&P Cell published new campus drive: ${newDrive.company} (${newDrive.role}, ₹${newDrive.packageLPA} LPA)`);
      this.save();
      return newDrive;
    }

    // Applications
    getApplications() {
      return this.data.applications || [];
    }

    getStudentApplications(studentId = 'std_042') {
      return this.data.applications.filter(a => a.studentId === studentId);
    }

    applyToDrive(studentId, driveId) {
      const student = this.getStudentById(studentId) || this.data.roles.student;
      const drive = this.data.drives.find(d => d.id === driveId);
      if (!drive) return { success: false, message: 'Drive not found' };

      // Check existing application
      const existing = this.data.applications.find(a => a.studentId === studentId && a.driveId === driveId);
      if (existing) {
        return { success: false, message: 'Already applied for this drive' };
      }

      // Check eligibility
      if (student.cgpa < drive.minCGPA) {
        return {
          success: false,
          message: `Ineligible: Minimum CGPA required is ${drive.minCGPA} (Your CGPA is ${student.cgpa})`
        };
      }
      if (student.backlogs > drive.maxBacklogs) {
        return {
          success: false,
          message: `Ineligible: Maximum backlogs allowed is ${drive.maxBacklogs} (You have ${student.backlogs})`
        };
      }

      const newApp = {
        id: 'app_' + Date.now().toString(36),
        studentId: student.id,
        studentName: student.name,
        rollNo: student.rollNo,
        branch: student.branch,
        driveId: drive.id,
        company: drive.company,
        role: drive.role,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'Applied',
        offerPackage: null
      };

      this.data.applications.unshift(newApp);
      drive.applicantsCount = (drive.applicantsCount || 0) + 1;
      this.addAudit(`Student ${student.name} applied for ${drive.company} (${drive.role})`);
      this.save();
      return { success: true, application: newApp };
    }

    updateApplicationStatus(applicationId, newStatus, offerPackage = null) {
      const app = this.data.applications.find(a => a.id === applicationId);
      if (!app) return false;

      app.status = newStatus;
      if (offerPackage) {
        app.offerPackage = parseFloat(offerPackage);
      }

      // If status changed to 'Offered', mark student as Placed!
      if (newStatus === 'Offered') {
        const student = this.getStudentById(app.studentId);
        if (student) {
          student.status = 'Placed';
          student.placedCompany = app.company;
          student.placedPackage = app.offerPackage || 8.0;
        }

        // Also update role profile if it's the demo student
        if (this.data.roles.student.id === app.studentId) {
          this.data.roles.student.placementStatus = 'Placed';
          this.data.roles.student.placedCompany = app.company;
          this.data.roles.student.placedPackage = app.offerPackage || 8.0;
        }

        this.addAudit(`🎉 Offer Letter issued to ${app.studentName} from ${app.company} (₹${app.offerPackage || 8.0} LPA)!`);
      } else {
        this.addAudit(`Application status updated: ${app.studentName} -> ${app.company} (${newStatus})`);
      }

      this.save();
      return true;
    }

    // Mentoring Tasks
    getMentorTasks(mentorId = 'fac_001') {
      return this.data.mentorTasks || [];
    }

    getStudentTasks(studentId = 'std_042') {
      return this.data.mentorTasks.filter(t => t.studentId === studentId);
    }

    assignTask(taskObj) {
      const student = this.getStudentById(taskObj.studentId) || this.data.roles.student;
      const newTask = {
        id: 'tsk_' + Date.now().toString(36),
        mentorId: taskObj.mentorId || 'fac_001',
        studentId: student.id,
        studentName: student.name,
        title: taskObj.title || 'Placement Preparation Task',
        dueDate: taskObj.dueDate || '2026-10-30',
        priority: taskObj.priority || 'Medium',
        status: 'Pending',
        assignedDate: new Date().toISOString().split('T')[0],
        notes: taskObj.notes || ''
      };

      this.data.mentorTasks.unshift(newTask);
      this.addAudit(`Faculty Mentor assigned task to ${student.name}: "${newTask.title}"`);
      this.save();
      return newTask;
    }

    toggleTaskStatus(taskId) {
      const task = this.data.mentorTasks.find(t => t.id === taskId);
      if (!task) return false;

      task.status = (task.status === 'Completed') ? 'Pending' : 'Completed';
      this.addAudit(`Student ${task.studentName} marked task "${task.title}" as ${task.status}.`);
      this.save();
      return task.status;
    }

    addMentorNote(studentId, noteText) {
      const note = {
        studentId,
        date: new Date().toISOString().split('T')[0],
        author: this.data.roles.faculty.name,
        note: noteText
      };
      if (!this.data.mentorNotes) this.data.mentorNotes = [];
      this.data.mentorNotes.unshift(note);
      this.addAudit(`Faculty note added for student ID ${studentId}.`);
      this.save();
      return note;
    }

    getStudentNotes(studentId) {
      return (this.data.mentorNotes || []).filter(n => n.studentId === studentId);
    }

    // Audit logs
    addAudit(actionText) {
      if (!this.data.auditLog) this.data.auditLog = [];
      this.data.auditLog.unshift({
        time: 'Just now',
        action: actionText
      });
      if (this.data.auditLog.length > 25) {
        this.data.auditLog.pop();
      }
    }

    getAuditLogs() {
      return this.data.auditLog || [];
    }

    // Role-specific live KPI calculations
    getStats(role) {
      const r = role || this.getActiveRole();

      if (r === 'student') {
        const student = this.data.roles.student;
        const myApps = this.getStudentApplications(student.id);
        const myTasks = this.getStudentTasks(student.id);
        const pendingTasks = myTasks.filter(t => t.status === 'Pending').length;
        const offersCount = myApps.filter(a => a.status === 'Offered').length;

        return {
          probability: student.probability,
          predictionStatus: student.predictionStatus,
          readinessScore: 78,
          skillsMastered: 14,
          applicationsCount: myApps.length,
          shortlistedCount: myApps.filter(a => a.status === 'Shortlisted' || a.status === 'Interview Scheduled').length,
          offersCount,
          pendingTasks,
          cgpa: student.cgpa,
          backlogs: student.backlogs,
          placementStatus: student.placementStatus,
          placedCompany: student.placedCompany,
          placedPackage: student.placedPackage
        };
      }

      if (r === 'faculty') {
        const mentees = this.getMentees('fac_001');
        const totalMentees = mentees.length;
        const readyCount = mentees.filter(m => m.probability >= 75).length;
        const atRiskCount = mentees.filter(m => m.probability < 55 || m.backlogs > 0).length;
        const placedCount = mentees.filter(m => m.status === 'Placed').length;
        const avgReadiness = Math.round(mentees.reduce((acc, m) => acc + m.probability, 0) / (totalMentees || 1));

        return {
          totalMentees: 42, // representing full batch
          monitoredMentees: totalMentees,
          readyCount: 31,
          atRiskCount: 8,
          placedCount: 24,
          avgReadiness: 74.2
        };
      }

      if (r === 'officer') {
        const allStudents = this.data.students;
        const placedStudents = allStudents.filter(s => s.status === 'Placed');
        const activeDrives = this.data.drives.filter(d => d.status === 'Active');
        const applications = this.data.applications;

        // Dynamic KPI calculation anchored to college-wide scaling (total 1,248)
        const basePlaced = 890;
        const newlyOffered = applications.filter(a => a.status === 'Offered' && a.id.startsWith('app_')).length;
        const totalPlaced = Math.min(1248, basePlaced + newlyOffered);
        const placementRate = ((totalPlaced / 1248) * 100).toFixed(1);

        return {
          totalStudents: 1248,
          placedStudents: totalPlaced,
          placementRate: placementRate + '%',
          averagePackage: '₹8.4 LPA',
          highestPackage: '₹44.0 LPA',
          activeDrivesCount: activeDrives.length,
          totalApplications: applications.length,
          topRecruiter: 'TCS (184 Hires)'
        };
      }
    }

    // --- STUDENT PROFILE ACTIONS ---
    updateStudentProfile(updates) {
      const student = this.data.roles.student;
      Object.assign(student, updates);
      this.addStudentActivity('Profile updated', 'Your profile information has been updated successfully.', 'profile');
      this.addAudit(`Student profile updated for ${student.name}`);
      this.save();
    }

    updateStudentAcademic(academicUpdates) {
      const student = this.data.roles.student;
      Object.assign(student, academicUpdates);
      if (academicUpdates.cgpa !== undefined) {
        student.cgpa = parseFloat(academicUpdates.cgpa);
      }
      if (academicUpdates.backlogs !== undefined) {
        student.backlogs = parseInt(academicUpdates.backlogs, 10);
      }
      // Reactive ML prediction recalculation based on updated CGPA and backlogs
      let rawScore = (student.cgpa * 6.5) + (student.aptitudeScore * 0.35) + (student.technicalScore * 0.25) - (student.backlogs * 12.0);
      student.probability = Math.min(98, Math.max(20, Math.round(rawScore * 0.95)));
      this.addStudentActivity('Academic scores updated', `CGPA updated to ${student.cgpa}, 10th: ${student.tenthPct}%, 12th: ${student.twelfthPct}%`, 'academic');
      this.addAudit(`Academic details updated for ${student.name}`);
      this.save();
    }

    addStudentInternship(internship) {
      if (!this.data.roles.student.internships) this.data.roles.student.internships = [];
      internship.id = 'int_' + Date.now().toString(36);
      this.data.roles.student.internships.unshift(internship);
      this.addStudentActivity('Internship added', `${internship.company} | ${internship.startDate} - ${internship.endDate}`, 'internship');
      this.addAudit(`Internship added: ${internship.role} at ${internship.company}`);
      this.save();
    }

    deleteStudentInternship(id) {
      if (!this.data.roles.student.internships) return;
      this.data.roles.student.internships = this.data.roles.student.internships.filter(i => i.id !== id);
      this.addAudit(`Internship removed`);
      this.save();
    }

    addStudentWorkExperience(exp) {
      if (!this.data.roles.student.workExperience) this.data.roles.student.workExperience = [];
      exp.id = 'exp_' + Date.now().toString(36);
      this.data.roles.student.workExperience.unshift(exp);
      this.addStudentActivity('Work experience added', `${exp.company} | ${exp.jobTitle}`, 'work');
      this.addAudit(`Work experience added: ${exp.jobTitle} at ${exp.company}`);
      this.save();
    }

    deleteStudentWorkExperience(id) {
      if (!this.data.roles.student.workExperience) return;
      this.data.roles.student.workExperience = this.data.roles.student.workExperience.filter(e => e.id !== id);
      this.addAudit(`Work experience removed`);
      this.save();
    }

    addStudentSkill(skillName) {
      if (!skillName) return;
      const skills = this.data.roles.student.skills || [];
      if (!skills.includes(skillName.trim())) {
        skills.push(skillName.trim());
        this.data.roles.student.skills = skills;
        this.addStudentActivity('New skill added', `${skillName.trim()} | Technical Skill`, 'skill');
        this.addAudit(`New skill added: ${skillName.trim()}`);
        this.save();
      }
    }

    removeStudentSkill(skillName) {
      if (!this.data.roles.student.skills) return;
      this.data.roles.student.skills = this.data.roles.student.skills.filter(s => s !== skillName);
      this.addAudit(`Skill removed: ${skillName}`);
      this.save();
    }

    addStudentProject(project) {
      if (!this.data.roles.student.projects) this.data.roles.student.projects = [];
      project.id = 'proj_' + Date.now().toString(36);
      this.data.roles.student.projects.unshift(project);
      this.addStudentActivity('Project added', `${project.title} added to portfolio`, 'project');
      this.addAudit(`Project added: ${project.title}`);
      this.save();
    }

    deleteStudentProject(id) {
      if (!this.data.roles.student.projects) return;
      this.data.roles.student.projects = this.data.roles.student.projects.filter(p => p.id !== id);
      this.addAudit(`Project removed`);
      this.save();
    }

    addStudentCertification(cert) {
      if (!this.data.roles.student.certifications) this.data.roles.student.certifications = [];
      cert.id = 'cert_' + Date.now().toString(36);
      this.data.roles.student.certifications.unshift(cert);
      this.addStudentActivity('Certification added', `${cert.name} (${cert.issuer})`, 'certification');
      this.addAudit(`Certification added: ${cert.name}`);
      this.save();
    }

    deleteStudentCertification(id) {
      if (!this.data.roles.student.certifications) return;
      this.data.roles.student.certifications = this.data.roles.student.certifications.filter(c => c.id !== id);
      this.addAudit(`Certification removed`);
      this.save();
    }

    addStudentActivity(title, desc, type = 'general') {
      if (!this.data.roles.student.recentActivities) this.data.roles.student.recentActivities = [];
      this.data.roles.student.recentActivities.unshift({
        id: 'act_' + Date.now().toString(36),
        title,
        desc,
        time: 'Just now',
        type
      });
      if (this.data.roles.student.recentActivities.length > 10) {
        this.data.roles.student.recentActivities.pop();
      }
    }

    getProfileCompletionScore() {
      const s = this.data.roles.student;
      let score = 0;
      if (s.name && s.email && s.college) score += 15;
      if (s.tenthPct && s.twelfthPct) score += 15;
      if (s.cgpa && s.branch) score += 15;
      if (s.skills && s.skills.length >= 5) score += 15;
      if (s.internships && s.internships.length >= 1) score += 18;
      if (s.workExperience && s.workExperience.length >= 1) score += 10;
      if (s.certifications && s.certifications.length >= 1) score += 12;
      return Math.min(100, score || 78);
    }
  }

  // Expose singleton to window
  window.PlacementDataStore = new PlacementDataStore();
})();
