// Hardcoded data service - no backend required
class ApiService {
  constructor() {
    this.mockData = {
      user: {
        id: 1,
        name: "John Doe",
        email: "john.doe@lexsys.com",
        balance: 50000,
        portfolio: [
          { symbol: "BTC", amount: 0.5, value: 25000 },
          { symbol: "ETH", amount: 10, value: 20000 },
          { symbol: "ADA", amount: 1000, value: 500 }
        ]
      },
      markets: [
        { symbol: "BTC/USD", price: 50000, change: 2.5 },
        { symbol: "ETH/USD", price: 2000, change: -1.2 },
        { symbol: "ADA/USD", price: 0.5, change: 5.8 },
        { symbol: "DOT/USD", price: 25, change: 3.1 },
        { symbol: "SOL/USD", price: 100, change: -0.5 }
      ],
      orders: [
        { id: 1, symbol: "BTC/USD", type: "buy", amount: 0.1, price: 49500, status: "completed" },
        { id: 2, symbol: "ETH/USD", type: "sell", amount: 2, price: 2050, status: "pending" },
        { id: 3, symbol: "ADA/USD", type: "buy", amount: 500, price: 0.48, status: "completed" }
      ],
      history: [
        { id: 1, date: "2024-01-15", type: "buy", symbol: "BTC/USD", amount: 0.5, price: 48000 },
        { id: 2, date: "2024-01-14", type: "sell", symbol: "ETH/USD", amount: 5, price: 1950 },
        { id: 3, date: "2024-01-13", type: "buy", symbol: "ADA/USD", amount: 1000, price: 0.45 }
      ]
    };
  }

  async getToken() {
    return "mock-token-12345";
  }

  async setToken(token) {
    console.log("Mock: Token set", token);
  }

  async setRefreshToken(token) {
    console.log("Mock: Refresh token set", token);
  }

  async clearTokens() {
    console.log("Mock: Tokens cleared");
  }

  async request(endpoint, options = {}) {
    console.log('Mock API Request:', endpoint);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock responses based on endpoint
    if (endpoint.includes('/auth/login')) {
      return {
        success: true,
        token: "mock-token-12345",
        user: this.mockData.user
      };
    }
    
    if (endpoint.includes('/user/profile')) {
      return {
        success: true,
        data: this.mockData.user
      };
    }
    
    if (endpoint.includes('/markets')) {
      return {
        success: true,
        data: this.mockData.markets
      };
    }
    
    if (endpoint.includes('/orders')) {
      return {
        success: true,
        data: this.mockData.orders
      };
    }
    
    if (endpoint.includes('/history')) {
      return {
        success: true,
        data: this.mockData.history
      };
    }
    
    // Default response
    return {
      success: true,
      data: {},
      message: "Mock response"
    };
  }

  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, body) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(body) });
  }

  put(endpoint, body) {
    return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body) });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export default new ApiService();
