// Hardcoded position service - no backend required
const MOCK_POSITIONS = [
  {
    id: 1,
    instrumentId: 1,
    symbol: "BTC/USD",
    side: "long",
    quantity: 0.5,
    averagePrice: 48000,
    currentPrice: 50000,
    marketValue: 25000,
    pnl: 1000,
    pnlPercent: 4.17,
    unrealizedPnl: 1000,
    realizedPnl: 0,
    margin: 12000,
    marginPercent: 48,
    timestamp: "2024-01-13T09:15:00Z",
    status: "open"
  },
  {
    id: 2,
    instrumentId: 2,
    symbol: "ETH/USD",
    side: "long",
    quantity: 10,
    averagePrice: 1950,
    currentPrice: 2000,
    marketValue: 20000,
    pnl: 500,
    pnlPercent: 2.56,
    unrealizedPnl: 500,
    realizedPnl: 0,
    margin: 9750,
    marginPercent: 48.75,
    timestamp: "2024-01-14T15:30:00Z",
    status: "open"
  },
  {
    id: 3,
    instrumentId: 3,
    symbol: "ADA/USD",
    side: "short",
    quantity: 1000,
    averagePrice: 0.52,
    currentPrice: 0.5,
    marketValue: 500,
    pnl: 20,
    pnlPercent: 3.85,
    unrealizedPnl: 20,
    realizedPnl: 0,
    margin: 260,
    marginPercent: 52,
    timestamp: "2024-01-15T11:45:00Z",
    status: "open"
  }
];

const MOCK_POSITION_HISTORY = [
  {
    id: 4,
    instrumentId: 4,
    symbol: "DOT/USD",
    side: "long",
    quantity: 20,
    averagePrice: 24,
    exitPrice: 25.5,
    marketValue: 510,
    pnl: 30,
    pnlPercent: 6.25,
    unrealizedPnl: 0,
    realizedPnl: 30,
    margin: 480,
    openTimestamp: "2024-01-10T10:00:00Z",
    closeTimestamp: "2024-01-12T14:30:00Z",
    status: "closed"
  }
];

const positionService = {
  async getPositions(params = {}) {
    console.log('Mock getPositions:', params);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let positions = [...MOCK_POSITIONS];
    
    // Filter by status if provided
    if (params.status) {
      positions = positions.filter(pos => pos.status === params.status);
    }
    
    // Filter by side if provided
    if (params.side) {
      positions = positions.filter(pos => pos.side === params.side);
    }
    
    // Filter by symbol if provided
    if (params.symbol) {
      positions = positions.filter(pos => pos.symbol.includes(params.symbol));
    }
    
    return {
      success: true,
      data: positions,
      meta: {
        page: 1,
        limit: 50,
        total: positions.length,
        totalPages: 1
      }
    };
  },

  async getPosition(id) {
    console.log('Mock getPosition:', id);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const position = MOCK_POSITIONS.find(pos => pos.id === parseInt(id));
    
    if (position) {
      return {
        success: true,
        data: position
      };
    }
    
    return {
      success: false,
      data: null,
      error: 'Position not found'
    };
  },

  async getPositionSummary() {
    console.log('Mock getPositionSummary');
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const totalPositions = MOCK_POSITIONS.length;
    const totalValue = MOCK_POSITIONS.reduce((sum, pos) => sum + pos.marketValue, 0);
    const totalPnL = MOCK_POSITIONS.reduce((sum, pos) => sum + pos.pnl, 0);
    const totalMargin = MOCK_POSITIONS.reduce((sum, pos) => sum + pos.margin, 0);
    const longPositions = MOCK_POSITIONS.filter(pos => pos.side === 'long').length;
    const shortPositions = MOCK_POSITIONS.filter(pos => pos.side === 'short').length;
    
    return {
      success: true,
      data: {
        totalPositions,
        totalValue: Math.round(totalValue * 100) / 100,
        totalPnL: Math.round(totalPnL * 100) / 100,
        totalMargin: Math.round(totalMargin * 100) / 100,
        longPositions,
        shortPositions,
        availableMargin: 50000 - totalMargin, // Mock available margin
        marginUtilization: Math.round((totalMargin / 50000) * 100 * 100) / 100
      }
    };
  },

  async getPositionPnL() {
    console.log('Mock getPositionPnL');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const unrealizedPnL = MOCK_POSITIONS.reduce((sum, pos) => sum + pos.unrealizedPnl, 0);
    const realizedPnL = MOCK_POSITION_HISTORY.reduce((sum, pos) => sum + pos.realizedPnl, 0);
    const totalPnL = unrealizedPnL + realizedPnL;
    
    return {
      success: true,
      data: {
        unrealizedPnL: Math.round(unrealizedPnL * 100) / 100,
        realizedPnL: Math.round(realizedPnL * 100) / 100,
        totalPnL: Math.round(totalPnL * 100) / 100,
        dayPnL: Math.round((totalPnL * 0.3) * 100) / 100, // Mock day PnL
        dayPnLPercent: Math.round((totalPnL * 0.3 / 45000) * 100 * 100) / 100
      }
    };
  },

  async getNetPositionValue() {
    console.log('Mock getNetPositionValue');
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const totalValue = MOCK_POSITIONS.reduce((sum, pos) => sum + pos.marketValue, 0);
    const totalMargin = MOCK_POSITIONS.reduce((sum, pos) => sum + pos.margin, 0);
    
    return {
      success: true,
      data: {
        netValue: Math.round(totalValue * 100) / 100,
        totalMargin: Math.round(totalMargin * 100) / 100,
        freeMargin: Math.round((50000 - totalMargin) * 100) / 100,
        exposureRatio: Math.round((totalValue / 50000) * 100 * 100) / 100
      }
    };
  },

  async getPositionHistory() {
    console.log('Mock getPositionHistory');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: MOCK_POSITION_HISTORY
    };
  },

  async squareOff(id, quantity = null) {
    console.log('Mock squareOff:', id, quantity);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const positionIndex = MOCK_POSITIONS.findIndex(pos => pos.id === parseInt(id));
    
    if (positionIndex !== -1) {
      const position = MOCK_POSITIONS[positionIndex];
      const squareOffQuantity = quantity || position.quantity;
      
      if (squareOffQuantity >= position.quantity) {
        // Full square off - move to history
        const closedPosition = {
          ...position,
          exitPrice: position.currentPrice,
          realizedPnl: position.pnl,
          closeTimestamp: new Date().toISOString(),
          status: 'closed'
        };
        
        MOCK_POSITION_HISTORY.push(closedPosition);
        MOCK_POSITIONS.splice(positionIndex, 1);
      } else {
        // Partial square off
        position.quantity -= squareOffQuantity;
        position.marketValue = position.quantity * position.currentPrice;
        position.pnl = (position.currentPrice - position.averagePrice) * position.quantity;
        position.margin = position.marketValue * 0.5; // 50% margin
      }
      
      return {
        success: true,
        data: {
          message: `Successfully squared off ${squareOffQuantity} units`,
          squaredOffQuantity: squareOffQuantity,
          remainingQuantity: squareOffQuantity >= position.quantity ? 0 : position.quantity
        }
      };
    }
    
    return {
      success: false,
      error: { code: 'NOT_FOUND', message: 'Position not found' }
    };
  },

  async squareOffAll() {
    console.log('Mock squareOffAll');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const positionsToClose = [...MOCK_POSITIONS];
    
    positionsToClose.forEach(position => {
      const closedPosition = {
        ...position,
        exitPrice: position.currentPrice,
        realizedPnl: position.pnl,
        closeTimestamp: new Date().toISOString(),
        status: 'closed'
      };
      
      MOCK_POSITION_HISTORY.push(closedPosition);
    });
    
    const totalSquaredOff = positionsToClose.length;
    MOCK_POSITIONS.length = 0; // Clear all positions
    
    return {
      success: true,
      data: {
        message: `Successfully squared off all ${totalSquaredOff} positions`,
        squaredOffCount: totalSquaredOff,
        totalPnL: positionsToClose.reduce((sum, pos) => sum + pos.pnl, 0)
      }
    };
  },
};

export { positionService };
export default positionService;
