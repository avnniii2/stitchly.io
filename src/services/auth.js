import { getStoredUsers, saveStoredUsers, getStoredSession, setStoredSession } from './storage';

// Simulated latency helper
const delay = (ms = 350) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  /**
   * Get currently logged-in user from storage
   */
  async getCurrentUser() {
    await delay(100);
    return getStoredSession();
  },

  /**
   * Step 1 of Login: check email/phone & password
   */
  async initiateLogin({ identifier, password }) {
    await delay(400);
    const users = getStoredUsers();
    const cleanId = identifier.trim().toLowerCase();

    // Look for user by email or phone
    const user = users.find(u => 
      u.email.toLowerCase() === cleanId || 
      u.phone?.replace(/\s+/g, '') === cleanId.replace(/\s+/g, '')
    );

    if (!user) {
      // For friendly demo experience, if user typed anything else, return helpful error
      throw new Error('No account found with this email or phone. Please check details or use Demo Quick Login.');
    }

    // Passwords accepted for demo: either role123 or password or whatever entered if demo
    if (password.length < 4) {
      throw new Error('Password must be at least 4 characters.');
    }

    return {
      success: true,
      identifier: user.email,
      maskedPhone: user.phone ? user.phone.slice(-4).padStart(10, '•') : '••••4321',
      userId: user.id,
      role: user.role
    };
  },

  /**
   * Step 2 of Login: Verify OTP
   * Prompt specifies: "code 123456 always works, resend timer 30 seconds"
   */
  async verifyOtp({ identifier, otp }) {
    await delay(450);
    if (otp !== '123456') {
      throw new Error('Invalid OTP. Please enter code 123456 for this demo.');
    }

    const users = getStoredUsers();
    const cleanId = identifier.trim().toLowerCase();
    const user = users.find(u => 
      u.email.toLowerCase() === cleanId || 
      u.phone?.replace(/\s+/g, '') === cleanId.replace(/\s+/g, '') ||
      u.id === identifier
    );

    if (!user) {
      throw new Error('Session expired or user not found. Please try again.');
    }

    setStoredSession(user);
    return user;
  },

  /**
   * Signup
   * Handles Customer or Tailor role.
   * If Tailor: city, specialty, and KYC document upload (saved as base64 in mock DB with status=pending)
   */
  async signup({ name, emailOrPhone, password, role, city, specialty, kycDocument }) {
    await delay(500);
    if (!name?.trim()) throw new Error('Please enter your full name.');
    if (!emailOrPhone?.trim()) throw new Error('Please enter your email or phone.');
    if (!password || password.length < 6) throw new Error('Password must be at least 6 characters.');
    if (!['customer', 'tailor'].includes(role)) throw new Error('Please select either Customer or Tailor role.');

    const users = getStoredUsers();
    const cleanId = emailOrPhone.trim().toLowerCase();
    const isEmail = cleanId.includes('@');

    const existing = users.find(u => 
      u.email?.toLowerCase() === cleanId || 
      u.phone?.replace(/\s+/g, '') === cleanId.replace(/\s+/g, '')
    );

    if (existing) {
      throw new Error('An account with this email/phone already exists. Please log in.');
    }

    const newUser = {
      id: `user-${role}-${Date.now()}`,
      name: name.trim(),
      email: isEmail ? cleanId : `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      phone: !isEmail ? emailOrPhone.trim() : '+91 98000 00000',
      role,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
      createdAt: new Date().toISOString(),
      orders: [],
    };

    if (role === 'tailor') {
      if (!city?.trim()) throw new Error('Tailors must specify their operating city.');
      if (!specialty?.trim()) throw new Error('Tailors must provide their primary specialty.');

      newUser.city = city.trim();
      newUser.primarySpecialty = specialty.trim();
      newUser.specialties = [specialty.trim(), 'Custom Measurements', 'Ethnic Wear'];
      newUser.verified = false;
      newUser.kycStatus = 'pending';
      newUser.kycDocument = kycDocument || 'data:application/pdf;base64,MOCK_KYC_DOCUMENT_DATA...';
      newUser.badge = 'Under Review';
      newUser.rating = 5.0;
      newUser.reviewCount = 0;
      newUser.completedOutfits = 0;
      newUser.experienceYears = 3;
      newUser.bio = `Master craftsman based in ${city}, specializing in ${specialty}.`;
      newUser.responseTime = '< 3 hours';
    }

    users.push(newUser);
    saveStoredUsers(users);
    setStoredSession(newUser);
    return newUser;
  },

  /**
   * One-click demo login buttons
   */
  async quickLogin(role) {
    await delay(300);
    const users = getStoredUsers();
    let targetUser = null;

    if (role === 'admin') {
      targetUser = users.find(u => u.role === 'admin');
    } else if (role === 'tailor') {
      targetUser = users.find(u => u.role === 'tailor' && u.verified);
    } else {
      targetUser = users.find(u => u.role === 'customer');
    }

    if (!targetUser) {
      throw new Error(`Demo ${role} account could not be found.`);
    }

    setStoredSession(targetUser);
    return targetUser;
  },

  /**
   * Logout
   */
  async logout() {
    await delay(150);
    setStoredSession(null);
    return true;
  }
};
