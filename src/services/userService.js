import api from './api';

// Mock user data and transactions
const MOCK_BALANCE_HISTORY = [
  {
    id: 1,
    type: 'CREDIT',
    amount: 10000,
    description: 'Initial deposit',
    category: 'DEPOSIT',
    timestamp: '2024-01-01T10:00:00Z',
    balance: 10000
  },
  {
    id: 2,
    type: 'DEBIT',
    amount: 500,
    description: 'BTC purchase',
    category: 'TRADE',
    timestamp: '2024-01-02T14:30:00Z',
    balance: 9500
  },
  {
    id: 3,
    type: 'CREDIT',
    amount: 5000,
    description: 'Deposit funds',
    category: 'DEPOSIT',
    timestamp: '2024-01-03T09:15:00Z',
    balance: 14500
  },
  {
    id: 4,
    type: 'DEBIT',
    amount: 1000,
    description: 'ETH purchase',
    category: 'TRADE',
    timestamp: '2024-01-04T16:45:00Z',
    balance: 13500
  }
];

const userService = {
  async getDashboard() {
    console.log('Mock getDashboard');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: {
        totalBalance: 50000,
        totalPnL: 2500,
        totalPnLPercent: 5.26,
        activePositions: 3,
        todayPnL: 150,
        todayPnLPercent: 0.3,
        portfolioValue: 52500,
        availableBalance: 25000,
        marginUsed: 25000,
        recentTrades: [
          { symbol: 'BTC/USD', side: 'buy', amount: 0.1, price: 49500, timestamp: '2024-01-15T10:30:00Z' },
          { symbol: 'ETH/USD', side: 'sell', amount: 2, price: 2050, timestamp: '2024-01-15T09:15:00Z' }
        ]
      }
    };
  },

  async getProfile() {
    console.log('Mock getProfile');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Get user from auth service
    const authService = require('./authService').default;
    const user = await authService.getUser();
    
    if (user) {
      return {
        success: true,
        data: user
      };
    }
    
    return {
      success: false,
      error: 'User not found'
    };
  },

  async updateProfile(data) {
    console.log('Mock updateProfile:', data);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Use auth service to update profile
    const authService = require('./authService').default;
    return await authService.updateProfile(data);
  },

  async getUser(id) {
    console.log('Mock getUser:', id);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      data: {
        id: id,
        name: 'Mock User',
        email: 'user@lexsys.com',
        balance: 50000,
        verified: true
      }
    };
  },

  async getBalanceHistory() {
    console.log('Mock getBalanceHistory');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: MOCK_BALANCE_HISTORY
    };
  },

  async depositFunds(amount, remarks) {
    console.log('Mock depositFunds:', amount, remarks);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful deposit
    const newEntry = {
      id: MOCK_BALANCE_HISTORY.length + 1,
      type: 'CREDIT',
      amount: parseFloat(amount),
      description: remarks || 'Deposit funds',
      category: 'DEPOSIT',
      timestamp: new Date().toISOString(),
      balance: 50000 + parseFloat(amount)
    };
    
    MOCK_BALANCE_HISTORY.push(newEntry);
    
    return {
      success: true,
      data: {
        transaction: newEntry,
        newBalance: newEntry.balance,
        message: 'Deposit successful'
      }
    };
  },

  async withdrawFunds(amount, remarks) {
    console.log('Mock withdrawFunds:', amount, remarks);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const withdrawAmount = parseFloat(amount);
    const currentBalance = 50000; // Mock current balance
    
    if (withdrawAmount > currentBalance) {
      return {
        success: false,
        error: 'Insufficient balance'
      };
    }
    
    // Simulate successful withdrawal
    const newEntry = {
      id: MOCK_BALANCE_HISTORY.length + 1,
      type: 'DEBIT',
      amount: withdrawAmount,
      description: remarks || 'Withdraw funds',
      category: 'WITHDRAWAL',
      timestamp: new Date().toISOString(),
      balance: currentBalance - withdrawAmount
    };
    
    MOCK_BALANCE_HISTORY.push(newEntry);
    
    return {
      success: true,
      data: {
        transaction: newEntry,
        newBalance: newEntry.balance,
        message: 'Withdrawal successful'
      }
    };
  },
};

export { userService };
export default userService;
