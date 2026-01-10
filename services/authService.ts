
import { User, UserPlanType, PlanFeatures } from '../types';

const USERS_KEY = 'jewelai_users';
const CURRENT_USER_KEY = 'jewelai_current_user';

// Yardımcı Fonksiyon: Plan tipine göre yetkileri döndürür
const getPlanFeatures = (type: UserPlanType): PlanFeatures => {
  switch (type) {
    case UserPlanType.FREE:
      return { maxBatchSize: 1, highResOutput: false, removeWatermark: false, priorityProcessing: false, commercialLicense: false, apiAccess: false };
    case UserPlanType.STARTER:
      return { maxBatchSize: 3, highResOutput: true, removeWatermark: true, priorityProcessing: false, commercialLicense: false, apiAccess: false };
    case UserPlanType.PRO:
      return { maxBatchSize: 5, highResOutput: true, removeWatermark: true, priorityProcessing: true, commercialLicense: true, apiAccess: false };
    case UserPlanType.STUDIO:
      return { maxBatchSize: 10, highResOutput: true, removeWatermark: true, priorityProcessing: true, commercialLicense: true, apiAccess: false };
    case UserPlanType.ENTERPRISE:
      return { maxBatchSize: 20, highResOutput: true, removeWatermark: true, priorityProcessing: true, commercialLicense: true, apiAccess: true };
    default:
      return { maxBatchSize: 1, highResOutput: false, removeWatermark: false, priorityProcessing: false, commercialLicense: false, apiAccess: false };
  }
};

export const authService = {
  /**
   * Test Mode: Auto-login or create admin user
   */
  getOrCreateAdmin: (): User => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
    const adminEmail = 'akraphy@akraphy.com';
    
    if (!users[adminEmail]) {
      const planType = UserPlanType.STUDIO;
      const adminUser: User = {
        id: 'admin_id',
        email: adminEmail,
        name: 'Akraphy Admin',
        credits: 999,
        planName: 'Studio Plan',
        planType: planType,
        features: getPlanFeatures(planType)
      };
      users[adminEmail] = adminUser;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    
    // Legacy user migration check (if old user struct exists without features)
    if (!users[adminEmail].features) {
       users[adminEmail].planType = UserPlanType.STUDIO;
       users[adminEmail].features = getPlanFeatures(UserPlanType.STUDIO);
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
          // Migration check for existing users
          if (!user.features) {
            user.planType = user.planType || UserPlanType.FREE;
            user.features = getPlanFeatures(user.planType);
            users[email] = user;
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
          }

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

        const planType = UserPlanType.FREE;
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          credits: 5,
          planName: 'Free Trial',
          planType: planType,
          features: getPlanFeatures(planType)
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
      
      // Map display name to logic type roughly
      let newType = UserPlanType.FREE;
      const lowerName = newPlanName.toLowerCase();
      
      if (lowerName.includes('starter')) newType = UserPlanType.STARTER;
      else if (lowerName.includes('pro')) newType = UserPlanType.PRO;
      else if (lowerName.includes('studio')) newType = UserPlanType.STUDIO;
      else if (lowerName.includes('enterprise')) newType = UserPlanType.ENTERPRISE;
      
      // Upgrade features if package changes
      users[email].planType = newType;
      users[email].features = getPlanFeatures(newType);
    }
    
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return users[email];
  }
};
