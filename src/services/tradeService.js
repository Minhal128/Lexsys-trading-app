// Hardcoded trade service - no backend required
const MOCK_TRADES = [
  {
    id: 1,
    symbol: "BTC/USD",
    side: "buy",
    quantity: 0.1,
    price: 49500,
    value: 4950,
    pnl: 250,
    pnlPercent: 5.05,
    timestamp: "2024-01-15T10:30:00Z",
    orderId: 1,
    commission: 4.95
  },
  {
    id: 2,
    symbol: "ETH/USD",
    side: "sell",
    quantity: 5,
    price: 1950,
    value: 9750,
    pnl: -100,
    pnlPercent: -1.01,
    timestamp: "2024-01-14T15:30:00Z",
    orderId: 6,
    commission: 9.75
  },
  {
    id: 3,
    symbol: "ADA/USD",
    side: "buy",
    quantity: 500,
    price: 0.48,
    value: 240,
    pnl: 10,
    pnlPercent: 4.17,
    timestamp: "2024-01-14T16:20:00Z",
    orderId: 3,
    commission: 0.24
  },
  {
    id: 4,
    symbol: "BTC/USD",
    side: "sell",
    quantity: 0.05,
    price: 48000,
    value: 2400,
    pnl: 150,
    pnlPercent: 6.67,
    timestamp: "2024-01-13T09:15:00Z",
    orderId: 5,
    commission: 2.40
  }
];

const MOCK_TODAYS_TRADES = MOCK_TRADES.filter(trade => 
  new Date(trade.timestamp).toDateString() === new Date().toDateString()
);

export const tradeService = {
  async getTrades(params = {}) {
    console.log('Mock getTrades:', params);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let trades = [...MOCK_TRADES];
    
    // Filter by symbol if provided
    if (params.symbol) {
      trades = trades.filter(trade => trade.symbol.includes(params.symbol));
    }
    
    // Filter by side if provided
    if (params.side) {
      trades = trades.filter(trade => trade.side === params.side);
    }
    
    // Sort by timestamp (newest first)
    trades.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    return {
      success: true,
      data: trades,
      meta: {
        page: 1,
        limit: 50,
        total: trades.length,
        totalPages: 1
      }
    };
  },

  async getTodaysTrades() {
    console.log('Mock getTodaysTrades');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      data: MOCK_TODAYS_TRADES
    };
  },

  async getTradeSummary() {
    console.log('Mock getTradeSummary');
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const totalTrades = MOCK_TRADES.length;
    const totalValue = MOCK_TRADES.reduce((sum, trade) => sum + trade.value, 0);
    const totalPnL = MOCK_TRADES.reduce((sum, trade) => sum + trade.pnl, 0);
    const totalCommission = MOCK_TRADES.reduce((sum, trade) => sum + trade.commission, 0);
    const winningTrades = MOCK_TRADES.filter(trade => trade.pnl > 0).length;
    const losingTrades = MOCK_TRADES.filter(trade => trade.pnl < 0).length;
    
    return {
      success: true,
      data: {
        totalTrades,
        totalValue: Math.round(totalValue * 100) / 100,
        totalPnL: Math.round(totalPnL * 100) / 100,
        totalCommission: Math.round(totalCommission * 100) / 100,
        winningTrades,
        losingTrades,
        winRate: Math.round((winningTrades / totalTrades) * 100 * 100) / 100,
        averagePnL: Math.round((totalPnL / totalTrades) * 100) / 100,
        bestTrade: Math.max(...MOCK_TRADES.map(t => t.pnl)),
        worstTrade: Math.min(...MOCK_TRADES.map(t => t.pnl))
      }
    };
  },

  async getTradesByInstrument(instrumentId) {
    console.log('Mock getTradesByInstrument:', instrumentId);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Mock: filter by symbol (assuming instrumentId maps to symbol)
    const symbolMap = {
      '1': 'BTC/USD',
      '2': 'ETH/USD',
      '3': 'ADA/USD',
      '4': 'DOT/USD',
      '5': 'SOL/USD'
    };
    
    const symbol = symbolMap[instrumentId] || 'BTC/USD';
    const trades = MOCK_TRADES.filter(trade => trade.symbol === symbol);
    
    return {
      success: true,
      data: trades
    };
  },

  async getTradesByDateRange(startDate, endDate) {
    console.log('Mock getTradesByDateRange:', startDate, endDate);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const trades = MOCK_TRADES.filter(trade => {
      const tradeDate = new Date(trade.timestamp);
      return tradeDate >= start && tradeDate <= end;
    });
    
    return {
      success: true,
      data: trades
    };
  },

  async getPnlReport() {
    console.log('Mock getPnlReport');
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const dailyPnL = {};
    const monthlyPnL = {};
    
    MOCK_TRADES.forEach(trade => {
      const date = new Date(trade.timestamp);
      const dayKey = date.toISOString().split('T')[0];
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      dailyPnL[dayKey] = (dailyPnL[dayKey] || 0) + trade.pnl;
      monthlyPnL[monthKey] = (monthlyPnL[monthKey] || 0) + trade.pnl;
    });
    
    return {
      success: true,
      data: {
        totalPnL: MOCK_TRADES.reduce((sum, trade) => sum + trade.pnl, 0),
        dailyPnL: Object.entries(dailyPnL).map(([date, pnl]) => ({
          date,
          pnl: Math.round(pnl * 100) / 100
        })),
        monthlyPnL: Object.entries(monthlyPnL).map(([month, pnl]) => ({
          month,
          pnl: Math.round(pnl * 100) / 100
        })),
        currentStreak: 3, // Mock winning streak
        longestWinStreak: 5,
        longestLossStreak: 2,
        profitableDays: Object.values(dailyPnL).filter(pnl => pnl > 0).length,
        totalTradingDays: Object.keys(dailyPnL).length
      }
    };
  },
};

export default tradeService;
