import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Hardcoded user data
const MOCK_USERS = [
  {
    id: 1,
    email: 'demo@lexsys.com',
    password: 'demo123',
    name: 'Demo User',
    phone: '+1234567890',
    balance: 50000,
    verified: true
  },
  {
    id: 2,
    email: 'admin@lexsys.com',
    password: 'admin123',
    name: 'Admin User',
    phone: '+1234567891',
    balance: 100000,
    verified: true
  }
];

export const authService = {
  async login(email, password) {
    console.log('Mock login attempt:', email);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock data
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      const token = `mock-token-${user.id}-${Date.now()}`;
      const refreshToken = `mock-refresh-${user.id}-${Date.now()}`;
      
      await api.setToken(token);
      await api.setRefreshToken(refreshToken);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      return {
        success: true,
        data: {
          accessToken: token,
          refreshToken: refreshToken,
          user: user
        }
      };
    } else {
      return {
        success: false,
        error: { code: 'AUTHENTICATION_ERROR', message: 'Invalid credentials' }
      };
    }
  },

  async register(data) {
    console.log('Mock register:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const existingUser = MOCK_USERS.find(u => u.email === data.email);
    if (existingUser) {
      return {
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Email already exists' }
      };
    }
    
    // Create new user
    const newUser = {
      id: MOCK_USERS.length + 1,
      email: data.email,
      password: data.password,
      name: data.name || 'New User',
      phone: data.phone || '',
      balance: 10000,
      verified: false
    };
    
    MOCK_USERS.push(newUser);
    
    return {
      success: true,
      data: {
        user: newUser,
        message: 'Registration successful'
      }
    };
  },

  async logout() {
    console.log('Mock logout');
    await api.clearTokens();
    return { success: true };
  },

  async forgotPassword(email) {
    console.log('Mock forgot password:', email);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = MOCK_USERS.find(u => u.email === email);
    if (user) {
      return {
        success: true,
        message: 'Password reset email sent (mock)'
      };
    } else {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Email not found' }
      };
    }
  },

  async resetPassword(token, password) {
    console.log('Mock reset password');
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      message: 'Password reset successful (mock)'
    };
  },

  async changePassword(currentPassword, newPassword) {
    console.log('Mock change password');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = await this.getUser();
    if (user && user.password === currentPassword) {
      user.password = newPassword;
      await AsyncStorage.setItem('user', JSON.stringify(user));
      return {
        success: true,
        message: 'Password changed successfully'
      };
    } else {
      return {
        success: false,
        error: { code: 'AUTHENTICATION_ERROR', message: 'Current password incorrect' }
      };
    }
  },

  async refreshToken() {
    console.log('Mock refresh token');
    const user = await this.getUser();
    if (user) {
      const newToken = `mock-token-${user.id}-${Date.now()}`;
      await api.setToken(newToken);
      return {
        success: true,
        data: { token: newToken }
      };
    }
    return {
      success: false,
      error: { code: 'AUTHENTICATION_ERROR', message: 'No user found' }
    };
  },

  async getUser() {
    const cachedUser = await AsyncStorage.getItem('user');
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }
    return null;
  },

  async getProfile() {
    console.log('Mock get profile');
    const user = await this.getUser();
    if (user) {
      return user;
    }
    return null;
  },

  async updateProfile(data) {
    console.log('Mock update profile:', data);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = await this.getUser();
    if (user) {
      const updatedUser = { ...user, ...data };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      return {
        success: true,
        data: { user: updatedUser }
      };
    }
    return {
      success: false,
      error: { code: 'AUTHENTICATION_ERROR', message: 'User not found' }
    };
  },

  async isLoggedIn() {
    const token = await api.getToken();
    return !!token;
  },
};

export default authService;
