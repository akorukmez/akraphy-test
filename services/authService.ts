
import { User } from '../types';

const USERS_KEY = 'jewelai_users';
const CURRENT_USER_KEY = 'jewelai_current_user';

// Mock database interactions using LocalStorage
export const authService = {
  /**
   * Test Mode: Auto-login or create admin user
   */
  getOrCreateAdmin: (): User => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    const adminEmail = 'akraphy@akraphy.com';
    
    if (!users[adminEmail]) {
      const adminUser: User = {
        id: 'admin_id',
        email: adminEmail,
        name: 'Akraphy Admin',
        credits: 999,
        planName: 'Studio'
      };
      users[adminEmail] = adminUser;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    
    localStorage.setItem(CURRENT_USER_KEY, adminEmail);
    return users[adminEmail];
  },

  login: async (email: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
        const user = users[email];
        
        if (user) {
          localStorage.setItem(CURRENT_USER_KEY, email);
          resolve(user);
        } else {
          reject(new Error('Kullanıcı bulunamadı. Lütfen kayıt olun.'));
        }
      }, 500);
    });
  },

  register: async (email: string, name: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
        
        if (users[email]) {
          reject(new Error('Bu e-posta zaten kayıtlı.'));
          return;
        }

        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          credits: 5,
          planName: 'Free Trial'
        };

        users[email] = newUser;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        localStorage.setItem(CURRENT_USER_KEY, email);
        
        resolve(newUser);
      }, 800);
    });
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser: (): User | null => {
    const email = localStorage.getItem(CURRENT_USER_KEY);
    if (!email) return null;
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    return users[email] || null;
  },

  updateCredits: (amount: number, newPlanName?: string): User | null => {
    const email = localStorage.getItem(CURRENT_USER_KEY);
    if (!email) return null;
    
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    if (!users[email]) return null;

    users[email].credits += amount;
    if (newPlanName) {
      users[email].planName = newPlanName;
    }
    
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return users[email];
  }
};
