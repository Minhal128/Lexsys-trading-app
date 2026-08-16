// Hardcoded order service - no backend required
const MOCK_ORDERS = [
  {
    id: 1,
    symbol: "BTC/USD",
    type: "buy",
    side: "long",
    quantity: 0.1,
    price: 49500,
    status: "completed",
    filledQuantity: 0.1,
    averagePrice: 49500,
    timestamp: "2024-01-15T10:30:00Z",
    orderType: "limit"
  },
  {
    id: 2,
    symbol: "ETH/USD",
    type: "sell",
    side: "short",
    quantity: 2,
    price: 2050,
    status: "pending",
    filledQuantity: 0,
    averagePrice: 0,
    timestamp: "2024-01-15T11:45:00Z",
    orderType: "limit"
  },
  {
    id: 3,
    symbol: "ADA/USD",
    type: "buy",
    side: "long",
    quantity: 500,
    price: 0.48,
    status: "completed",
    filledQuantity: 500,
    averagePrice: 0.48,
    timestamp: "2024-01-14T16:20:00Z",
    orderType: "market"
  },
  {
    id: 4,
    symbol: "DOT/USD",
    type: "sell",
    side: "short",
    quantity: 10,
    price: 25.5,
    status: "cancelled",
    filledQuantity: 0,
    averagePrice: 0,
    timestamp: "2024-01-14T14:10:00Z",
    orderType: "limit"
  }
];

const MOCK_ORDER_HISTORY = [
  {
    id: 5,
    symbol: "BTC/USD",
    type: "buy",
    side: "long",
    quantity: 0.05,
    price: 48000,
    status: "completed",
    filledQuantity: 0.05,
    averagePrice: 48000,
    timestamp: "2024-01-13T09:15:00Z",
    orderType: "market"
  },
  {
    id: 6,
    symbol: "ETH/USD",
    type: "sell",
    side: "short",
    quantity: 5,
    price: 1950,
    status: "completed",
    filledQuantity: 5,
    averagePrice: 1950,
    timestamp: "2024-01-12T15:30:00Z",
    orderType: "limit"
  }
];

const orderService = {
  async getOrders(params = {}) {
    console.log('Mock getOrders:', params);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let orders = [...MOCK_ORDERS];
    
    // Filter by status if provided
    if (params.status) {
      orders = orders.filter(order => order.status === params.status);
    }
    
    // Filter by symbol if provided
    if (params.symbol) {
      orders = orders.filter(order => order.symbol.includes(params.symbol));
    }
    
    return {
      success: true,
      data: orders,
      meta: {
        page: 1,
        limit: 50,
        total: orders.length,
        totalPages: 1
      }
    };
  },

  async getOrderHistory() {
    console.log('Mock getOrderHistory');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: [...MOCK_ORDER_HISTORY, ...MOCK_ORDERS.filter(o => o.status === 'completed')],
      meta: {
        page: 1,
        limit: 50,
        total: MOCK_ORDER_HISTORY.length + 2,
        totalPages: 1
      }
    };
  },

  async getPendingSummary() {
    console.log('Mock getPendingSummary');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const pendingOrders = MOCK_ORDERS.filter(o => o.status === 'pending');
    
    return {
      success: true,
      data: {
        totalPending: pendingOrders.length,
        totalValue: pendingOrders.reduce((sum, order) => sum + (order.price * order.quantity), 0),
        buyOrders: pendingOrders.filter(o => o.type === 'buy').length,
        sellOrders: pendingOrders.filter(o => o.type === 'sell').length
      }
    };
  },

  async placeOrder(data) {
    console.log('Mock placeOrder:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newOrder = {
      id: MOCK_ORDERS.length + 1,
      symbol: data.symbol,
      type: data.type,
      side: data.side,
      quantity: data.quantity,
      price: data.price,
      status: data.orderType === 'market' ? 'completed' : 'pending',
      filledQuantity: data.orderType === 'market' ? data.quantity : 0,
      averagePrice: data.orderType === 'market' ? data.price : 0,
      timestamp: new Date().toISOString(),
      orderType: data.orderType || 'limit'
    };
    
    MOCK_ORDERS.push(newOrder);
    
    return {
      success: true,
      data: newOrder
    };
  },

  async placeBracketOrder(data) {
    console.log('Mock placeBracketOrder:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mainOrder = {
      id: MOCK_ORDERS.length + 1,
      symbol: data.symbol,
      type: data.type,
      side: data.side,
      quantity: data.quantity,
      price: data.price,
      status: 'pending',
      filledQuantity: 0,
      averagePrice: 0,
      timestamp: new Date().toISOString(),
      orderType: 'bracket',
      stopLoss: data.stopLoss,
      target: data.target
    };
    
    MOCK_ORDERS.push(mainOrder);
    
    return {
      success: true,
      data: mainOrder
    };
  },

  async placeCoverOrder(data) {
    console.log('Mock placeCoverOrder:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const coverOrder = {
      id: MOCK_ORDERS.length + 1,
      symbol: data.symbol,
      type: data.type,
      side: data.side,
      quantity: data.quantity,
      price: data.price,
      status: 'pending',
      filledQuantity: 0,
      averagePrice: 0,
      timestamp: new Date().toISOString(),
      orderType: 'cover',
      stopLoss: data.stopLoss
    };
    
    MOCK_ORDERS.push(coverOrder);
    
    return {
      success: true,
      data: coverOrder
    };
  },

  async modifyOrder(id, data) {
    console.log('Mock modifyOrder:', id, data);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const orderIndex = MOCK_ORDERS.findIndex(o => o.id === parseInt(id));
    if (orderIndex !== -1) {
      MOCK_ORDERS[orderIndex] = { ...MOCK_ORDERS[orderIndex], ...data };
      return {
        success: true,
        data: MOCK_ORDERS[orderIndex]
      };
    }
    
    return {
      success: false,
      error: { code: 'NOT_FOUND', message: 'Order not found' }
    };
  },

  async cancelOrder(id) {
    console.log('Mock cancelOrder:', id);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const orderIndex = MOCK_ORDERS.findIndex(o => o.id === parseInt(id));
    if (orderIndex !== -1) {
      MOCK_ORDERS[orderIndex].status = 'cancelled';
      return {
        success: true,
        data: MOCK_ORDERS[orderIndex]
      };
    }
    
    return {
      success: false,
      error: { code: 'NOT_FOUND', message: 'Order not found' }
    };
  },

  async cancelAllOrders() {
    console.log('Mock cancelAllOrders');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const pendingOrders = MOCK_ORDERS.filter(o => o.status === 'pending');
    pendingOrders.forEach(order => {
      order.status = 'cancelled';
    });
    
    return {
      success: true,
      data: {
        cancelledCount: pendingOrders.length,
        message: `${pendingOrders.length} orders cancelled`
      }
    };
  },
};

export { orderService };
export default orderService;
