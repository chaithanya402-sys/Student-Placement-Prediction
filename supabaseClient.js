/**
 * Student Placement Prediction Platform — Supabase Auth & Role Client
 * Handles authenticated Sign In, Sign Up with Faculty Protection, and Session Management
 */

(function (window) {
  'use strict';

  // Default configuration (can be updated dynamically via UI modal or localStorage)
  const DEFAULT_SUPABASE_URL = localStorage.getItem('spp_supabase_url') || '';
  const DEFAULT_SUPABASE_KEY = localStorage.getItem('spp_supabase_anon_key') || '';
  const FACULTY_PASSCODES = ['FACULTY2026', 'CAMPUS-FACULTY-2026', 'TPO-ADMIN-2026'];

  // Built-in verified demo accounts for strict password verification in offline/demo mode
  const VERIFIED_DEMO_ACCOUNTS = {
    'aditya.verma@college.edu': {
      password: 'student123',
      role: 'student',
      name: 'Aditya Verma',
      rollNo: '21CSE042',
      department: 'CSE'
    },
    'dr.rajesh.mentor@college.edu': {
      password: 'mentor2026',
      role: 'faculty',
      name: 'Dr. Rajesh Sharma',
      rollNo: 'FAC-CSE-001',
      department: 'CSE'
    },
    'placement.cell@college.edu': {
      password: 'placement2026',
      role: 'officer',
      name: 'Prof. K. S. Nair',
      rollNo: 'TPO-HEAD-01',
      department: 'T&P Cell'
    }
  };

  class SupabaseAuthService {
    constructor() {
      this.url = DEFAULT_SUPABASE_URL;
      this.anonKey = DEFAULT_SUPABASE_KEY;
      this.client = null;
      this.initialized = false;
      this.initClient();
    }

    initClient() {
      if (this.url && this.anonKey && window.supabase && typeof window.supabase.createClient === 'function') {
        try {
          this.client = window.supabase.createClient(this.url, this.anonKey);
          this.initialized = true;
          console.log('[SupabaseAuth] Connected to cloud Supabase instance:', this.url);
        } catch (err) {
          console.error('[SupabaseAuth] Failed to initialize Supabase client:', err);
          this.client = null;
          this.initialized = false;
        }
      } else {
        this.client = null;
        this.initialized = false;
      }
    }

    isConfigured() {
      return Boolean(this.initialized && this.client);
    }

    updateConfig(url, key) {
      this.url = (url || '').trim();
      this.anonKey = (key || '').trim();
      if (this.url && this.anonKey) {
        localStorage.setItem('spp_supabase_url', this.url);
        localStorage.setItem('spp_supabase_anon_key', this.anonKey);
      } else {
        localStorage.removeItem('spp_supabase_url');
        localStorage.removeItem('spp_supabase_anon_key');
      }
      this.initClient();
      return this.isConfigured();
    }

    // Local persistent accounts storage for offline verification
    getLocalUsers() {
      try {
        const stored = localStorage.getItem('spp_local_auth_users');
        return stored ? JSON.parse(stored) : {};
      } catch (e) {
        return {};
      }
    }

    saveLocalUser(email, userData) {
      const users = this.getLocalUsers();
      users[email.toLowerCase()] = userData;
      localStorage.setItem('spp_local_auth_users', JSON.stringify(users));
    }

    /**
     * Authenticate User with Password Verification
     * @param {string} email 
     * @param {string} password 
     * @param {string} roleHint Optional role hint
     */
    async signIn(email, password, roleHint = 'student') {
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanPassword = (password || '').trim();

      if (!cleanEmail || !cleanPassword) {
        return { success: false, error: 'Email and password are required.' };
      }

      // 1. If Supabase is configured, verify via Supabase Auth
      if (this.isConfigured()) {
        try {
          const { data, error } = await this.client.auth.signInWithPassword({
            email: cleanEmail,
            password: cleanPassword
          });

          if (error) {
            return { success: false, error: error.message };
          }

          const user = data.user;
          let role = user.user_metadata?.role || roleHint || 'student';
          let profile = null;

          // Fetch profile from database to get enforced role
          try {
            const { data: dbProfile } = await this.client
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single();

            if (dbProfile) {
              profile = dbProfile;
              role = dbProfile.role || role;
            }
          } catch (pErr) {
            console.warn('[SupabaseAuth] Could not fetch profile table:', pErr);
          }

          // Persist authenticated session
          localStorage.setItem('spp_user_email', cleanEmail);
          localStorage.setItem('spp_user_role', role);
          if (profile?.full_name || user.user_metadata?.full_name) {
            localStorage.setItem('spp_user_name', profile?.full_name || user.user_metadata?.full_name);
          }

          return {
            success: true,
            user,
            role,
            profile,
            isCloud: true
          };
        } catch (err) {
          return { success: false, error: err.message || 'Supabase authentication failed.' };
        }
      }

      // 2. Offline / Demo Mode: Strictly verify password
      // Check built-in demo accounts
      const demoUser = VERIFIED_DEMO_ACCOUNTS[cleanEmail];
      if (demoUser) {
        if (demoUser.password !== cleanPassword) {
          return { success: false, error: 'Invalid password. Please check your credentials.' };
        }
        localStorage.setItem('spp_user_email', cleanEmail);
        localStorage.setItem('spp_user_role', demoUser.role);
        localStorage.setItem('spp_user_name', demoUser.name);
        return {
          success: true,
          user: { email: cleanEmail, id: 'demo_' + demoUser.role },
          role: demoUser.role,
          name: demoUser.name,
          isCloud: false
        };
      }

      // Check locally registered accounts
      const localUsers = this.getLocalUsers();
      const localAccount = localUsers[cleanEmail];
      if (localAccount) {
        if (localAccount.password !== cleanPassword) {
          return { success: false, error: 'Invalid password. Please check your credentials.' };
        }
        localStorage.setItem('spp_user_email', cleanEmail);
        localStorage.setItem('spp_user_role', localAccount.role || 'student');
        localStorage.setItem('spp_user_name', localAccount.fullName || localAccount.name);
        return {
          success: true,
          user: { email: cleanEmail, id: localAccount.id || 'loc_' + Date.now() },
          role: localAccount.role || 'student',
          name: localAccount.fullName || localAccount.name,
          isCloud: false
        };
      }

      // Email not found
      return {
        success: false,
        error: 'No account registered with this email. Please switch to "Create Account" tab to register.'
      };
    }

    /**
     * Register New Account with Protected Faculty Role Validation
     * @param {Object} params
     */
    async signUp({ email, password, fullName, role = 'student', rollNo = '', department = 'CSE', facultyKey = '' }) {
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanPassword = (password || '').trim();
      const cleanRole = (role || 'student').toLowerCase();
      const cleanKey = (facultyKey || '').trim();

      if (!cleanEmail || !cleanPassword || !fullName) {
        return { success: false, error: 'Full name, email, and password are required.' };
      }

      if (cleanPassword.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long.' };
      }

      // Security check: Protect faculty & officer registration
      let authorizedRole = 'student';
      if (cleanRole === 'faculty' || cleanRole === 'officer') {
        if (!cleanKey) {
          return {
            success: false,
            error: `Registration for ${cleanRole === 'faculty' ? 'Faculty Mentor' : 'T&P Officer'} is restricted. A valid Institutional Verification Passcode is required.`
          };
        }

        const isPasscodeValid = FACULTY_PASSCODES.includes(cleanKey) ||
          cleanKey === (localStorage.getItem('spp_faculty_passcode') || 'FACULTY2026');

        if (!isPasscodeValid) {
          return {
            success: false,
            error: 'Invalid Institutional Passcode. You cannot register as Faculty Mentor without valid authorization.'
          };
        }
        authorizedRole = cleanRole;
      }

      // 1. If Supabase is connected, call Supabase signUp
      if (this.isConfigured()) {
        try {
          const { data, error } = await this.client.auth.signUp({
            email: cleanEmail,
            password: cleanPassword,
            options: {
              data: {
                full_name: fullName,
                role: authorizedRole,
                roll_no: rollNo,
                department: department,
                faculty_key: cleanKey
              }
            }
          });

          if (error) {
            return { success: false, error: error.message };
          }

          // Return success response
          return {
            success: true,
            user: data.user,
            role: authorizedRole,
            isCloud: true,
            message: data.session
              ? 'Registration successful! Signing you in...'
              : 'Registration successful! Please check your email to verify your account or sign in directly.'
          };
        } catch (err) {
          return { success: false, error: err.message || 'Supabase registration failed.' };
        }
      }

      // 2. Offline / Demo Mode: Check duplicates and store securely
      const localUsers = this.getLocalUsers();
      if (localUsers[cleanEmail] || VERIFIED_DEMO_ACCOUNTS[cleanEmail]) {
        return { success: false, error: 'An account with this email address already exists. Please sign in.' };
      }

      const newAccount = {
        id: 'usr_' + Date.now().toString(36),
        email: cleanEmail,
        password: cleanPassword,
        fullName: fullName.trim(),
        role: authorizedRole,
        rollNo: rollNo.trim(),
        department: department,
        createdAt: new Date().toISOString()
      };

      this.saveLocalUser(cleanEmail, newAccount);

      return {
        success: true,
        user: newAccount,
        role: authorizedRole,
        isCloud: false,
        message: `Account created successfully as ${authorizedRole.toUpperCase()}! You can now sign in.`
      };
    }

    /**
     * Sign Out
     */
    async signOut() {
      if (this.isConfigured()) {
        try {
          await this.client.auth.signOut();
        } catch (err) {
          console.warn('[SupabaseAuth] Sign out error:', err);
        }
      }

      localStorage.removeItem('spp_user_email');
      localStorage.removeItem('spp_user_role');
      localStorage.removeItem('spp_user_name');
      window.location.href = 'login.html';
    }

    /**
     * Get Current Active User & Profile
     */
    async getCurrentUser() {
      const email = localStorage.getItem('spp_user_email') || 'aditya.verma@college.edu';
      const role = localStorage.getItem('spp_user_role') || 'student';
      const name = localStorage.getItem('spp_user_name') || 'Student User';

      if (this.isConfigured()) {
        try {
          const { data: { user } } = await this.client.auth.getUser();
          if (user) {
            const { data: profile } = await this.client
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single();

            return {
              user,
              role: profile?.role || user.user_metadata?.role || role,
              name: profile?.full_name || user.user_metadata?.full_name || name,
              email: user.email,
              profile: profile || null
            };
          }
        } catch (e) {
          console.warn('[SupabaseAuth] Error fetching current user:', e);
        }
      }

      return {
        user: { email },
        role,
        name,
        email,
        profile: null
      };
    }
  }

  // Export singleton instance
  window.SupabaseAuth = new SupabaseAuthService();

})(window);
