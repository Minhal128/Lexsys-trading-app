// Hardcoded watchlist service - no backend required
const MOCK_WATCHLISTS = [
  {
    id: 1,
    name: "My Favorites",
    isDefault: true,
    instruments: [
      {
        id: 1,
        symbol: "BTC/USD",
        name: "Bitcoin USD",
        lastPrice: 50000,
        change: 1250,
        changePercent: 2.56,
        volume: 1250000
      },
      {
        id: 2,
        symbol: "ETH/USD",
        name: "Ethereum USD",
        lastPrice: 2000,
        change: -24,
        changePercent: -1.19,
        volume: 850000
      },
      {
        id: 3,
        symbol: "ADA/USD",
        name: "Cardano USD",
        lastPrice: 0.5,
        change: 0.029,
        changePercent: 6.16,
        volume: 2500000
      }
    ],
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-15T12:30:00Z"
  },
  {
    id: 2,
    name: "Top Movers",
    isDefault: false,
    instruments: [
      {
        id: 3,
        symbol: "ADA/USD",
        name: "Cardano USD",
        lastPrice: 0.5,
        change: 0.029,
        changePercent: 6.16,
        volume: 2500000
      },
      {
        id: 4,
        symbol: "DOT/USD",
        name: "Polkadot USD",
        lastPrice: 25,
        change: 0.75,
        changePercent: 3.09,
        volume: 450000
      }
    ],
    createdAt: "2024-01-12T14:20:00Z",
    updatedAt: "2024-01-15T09:45:00Z"
  }
];

const MOCK_MOST_TRADED = [
  {
    id: 1,
    symbol: "BTC/USD",
    name: "Bitcoin USD",
    lastPrice: 50000,
    change: 1250,
    changePercent: 2.56,
    volume: 1250000,
    rank: 1
  },
  {
    id: 2,
    symbol: "ETH/USD",
    name: "Ethereum USD",
    lastPrice: 2000,
    change: -24,
    changePercent: -1.19,
    volume: 850000,
    rank: 2
  },
  {
    id: 3,
    symbol: "ADA/USD",
    name: "Cardano USD",
    lastPrice: 0.5,
    change: 0.029,
    changePercent: 6.16,
    volume: 2500000,
    rank: 3
  },
  {
    id: 5,
    symbol: "SOL/USD",
    name: "Solana USD",
    lastPrice: 100,
    change: -0.5,
    changePercent: -0.50,
    volume: 680000,
    rank: 4
  },
  {
    id: 4,
    symbol: "DOT/USD",
    name: "Polkadot USD",
    lastPrice: 25,
    change: 0.75,
    changePercent: 3.09,
    volume: 450000,
    rank: 5
  }
];

export const watchlistService = {
  async getWatchlists() {
    console.log('Mock getWatchlists');
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      success: true,
      data: MOCK_WATCHLISTS
    };
  },

  async getWatchlist(id) {
    console.log('Mock getWatchlist:', id);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const watchlist = MOCK_WATCHLISTS.find(wl => wl.id === parseInt(id));
    
    if (watchlist) {
      return {
        success: true,
        data: watchlist
      };
    }
    
    return {
      success: false,
      data: null,
      error: 'Watchlist not found'
    };
  },

  async getDefaultWatchlist() {
    console.log('Mock getDefaultWatchlist');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const defaultWatchlist = MOCK_WATCHLISTS.find(wl => wl.isDefault);
    
    return {
      success: true,
      data: defaultWatchlist || MOCK_WATCHLISTS[0]
    };
  },

  async createWatchlist(name, isDefault = false) {
    console.log('Mock createWatchlist:', name, isDefault);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // If setting as default, unset other defaults
    if (isDefault) {
      MOCK_WATCHLISTS.forEach(wl => {
        wl.isDefault = false;
      });
    }
    
    const newWatchlist = {
      id: MOCK_WATCHLISTS.length + 1,
      name: name,
      isDefault: isDefault,
      instruments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    MOCK_WATCHLISTS.push(newWatchlist);
    
    return {
      success: true,
      data: newWatchlist
    };
  },

  async updateWatchlist(id, data) {
    console.log('Mock updateWatchlist:', id, data);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const watchlistIndex = MOCK_WATCHLISTS.findIndex(wl => wl.id === parseInt(id));
    
    if (watchlistIndex !== -1) {
      // If setting as default, unset other defaults
      if (data.isDefault) {
        MOCK_WATCHLISTS.forEach(wl => {
          wl.isDefault = false;
        });
      }
      
      MOCK_WATCHLISTS[watchlistIndex] = {
        ...MOCK_WATCHLISTS[watchlistIndex],
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      return {
        success: true,
        data: MOCK_WATCHLISTS[watchlistIndex]
      };
    }
    
    return {
      success: false,
      error: { code: 'NOT_FOUND', message: 'Watchlist not found' }
    };
  },

  async deleteWatchlist(id) {
    console.log('Mock deleteWatchlist:', id);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const watchlistIndex = MOCK_WATCHLISTS.findIndex(wl => wl.id === parseInt(id));
    
    if (watchlistIndex !== -1) {
      const deletedWatchlist = MOCK_WATCHLISTS.splice(watchlistIndex, 1)[0];
      
      return {
        success: true,
        data: {
          message: 'Watchlist deleted successfully',
          deletedWatchlist: deletedWatchlist
        }
      };
    }
    
    return {
      success: false,
      error: { code: 'NOT_FOUND', message: 'Watchlist not found' }
    };
  },

  async addInstrument(watchlistId, instrumentId) {
    console.log('Mock addInstrument:', watchlistId, instrumentId);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const watchlist = MOCK_WATCHLISTS.find(wl => wl.id === parseInt(watchlistId));
    
    if (watchlist) {
      // Mock instrument data (in real app, would fetch from instrument service)
      const mockInstrument = {
        id: parseInt(instrumentId),
        symbol: `MOCK${instrumentId}/USD`,
        name: `Mock Instrument ${instrumentId}`,
        lastPrice: Math.random() * 1000,
        change: (Math.random() - 0.5) * 100,
        changePercent: (Math.random() - 0.5) * 10,
        volume: Math.floor(Math.random() * 1000000)
      };
      
      // Check if instrument already exists
      const existingInstrument = watchlist.instruments.find(inst => inst.id === parseInt(instrumentId));
      
      if (!existingInstrument) {
        watchlist.instruments.push(mockInstrument);
        watchlist.updatedAt = new Date().toISOString();
        
        return {
          success: true,
          data: {
            message: 'Instrument added to watchlist',
            instrument: mockInstrument
          }
        };
      } else {
        return {
          success: false,
          error: { code: 'ALREADY_EXISTS', message: 'Instrument already in watchlist' }
        };
      }
    }
    
    return {
      success: false,
      error: { code: 'NOT_FOUND', message: 'Watchlist not found' }
    };
  },

  async removeInstrument(watchlistId, instrumentId) {
    console.log('Mock removeInstrument:', watchlistId, instrumentId);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const watchlist = MOCK_WATCHLISTS.find(wl => wl.id === parseInt(watchlistId));
    
    if (watchlist) {
      const instrumentIndex = watchlist.instruments.findIndex(inst => inst.id === parseInt(instrumentId));
      
      if (instrumentIndex !== -1) {
        const removedInstrument = watchlist.instruments.splice(instrumentIndex, 1)[0];
        watchlist.updatedAt = new Date().toISOString();
        
        return {
          success: true,
          data: {
            message: 'Instrument removed from watchlist',
            removedInstrument: removedInstrument
          }
        };
      } else {
        return {
          success: false,
          error: { code: 'NOT_FOUND', message: 'Instrument not found in watchlist' }
        };
      }
    }
    
    return {
      success: false,
      error: { code: 'NOT_FOUND', message: 'Watchlist not found' }
    };
  },

  async searchInstruments(query) {
    console.log('Mock searchInstruments:', query);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Mock search results
    const searchResults = [
      {
        id: 1,
        symbol: "BTC/USD",
        name: "Bitcoin USD",
        lastPrice: 50000,
        change: 1250,
        changePercent: 2.56
      },
      {
        id: 2,
        symbol: "ETH/USD",
        name: "Ethereum USD",
        lastPrice: 2000,
        change: -24,
        changePercent: -1.19
      }
    ].filter(inst => 
      inst.symbol.toLowerCase().includes(query.toLowerCase()) ||
      inst.name.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      success: true,
      data: searchResults
    };
  },

  async getMostTraded() {
    console.log('Mock getMostTraded');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      data: MOCK_MOST_TRADED
    };
  },
};

export default watchlistService;
