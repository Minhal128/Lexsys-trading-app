// Mock WebSocket service - simulates real-time updates without backend
class WebSocketService {
  constructor() {
    this.listeners = new Map();
    this.connected = false;
    this.intervals = new Map();
    this.mockData = {
      'BTC/USD': { price: 50000, change: 0 },
      'ETH/USD': { price: 2000, change: 0 },
      'ADA/USD': { price: 0.5, change: 0 },
      'DOT/USD': { price: 25, change: 0 },
      'SOL/USD': { price: 100, change: 0 }
    };
  }

  async connect() {
    console.log('Mock WebSocket connecting...');
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    this.connected = true;
    console.log('Mock WebSocket connected');
    
    // Start sending mock price updates
    this.startMockUpdates();
  }

  startMockUpdates() {
    // Send price updates every 2 seconds
    const priceInterval = setInterval(() => {
      if (!this.connected) {
        clearInterval(priceInterval);
        return;
      }
      
      // Update random prices
      Object.keys(this.mockData).forEach(symbol => {
        const currentPrice = this.mockData[symbol].price;
        const changePercent = (Math.random() - 0.5) * 0.1; // ±5% max change
        const newPrice = currentPrice * (1 + changePercent);
        const change = ((newPrice - currentPrice) / currentPrice) * 100;
        
        this.mockData[symbol] = {
          price: Math.round(newPrice * 100) / 100,
          change: Math.round(change * 100) / 100
        };
        
        this.notifyListeners('price_update', {
          type: 'price_update',
          symbol: symbol,
          price: this.mockData[symbol].price,
          change: this.mockData[symbol].change,
          timestamp: Date.now()
        });
      });
    }, 2000);
    
    this.intervals.set('prices', priceInterval);
    
    // Send order updates every 10 seconds
    const orderInterval = setInterval(() => {
      if (!this.connected) {
        clearInterval(orderInterval);
        return;
      }
      
      this.notifyListeners('order_update', {
        type: 'order_update',
        orderId: Math.floor(Math.random() * 1000),
        status: Math.random() > 0.5 ? 'filled' : 'partial',
        timestamp: Date.now()
      });
    }, 10000);
    
    this.intervals.set('orders', orderInterval);
  }

  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    console.log(`Mock WebSocket subscribed to ${event}`);
    
    return () => {
      this.listeners.get(event).delete(callback);
      console.log(`Mock WebSocket unsubscribed from ${event}`);
    };
  }

  notifyListeners(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((cb) => cb(data));
    }
  }

  send(data) {
    console.log('Mock WebSocket send:', data);
    
    // Simulate server response
    setTimeout(() => {
      if (data.type === 'subscribe') {
        this.notifyListeners('subscription_confirmed', {
          type: 'subscription_confirmed',
          instrumentId: data.instrumentId,
          timestamp: Date.now()
        });
      }
    }, 100);
  }

  subscribeToInstrument(instrumentId) {
    console.log('Mock WebSocket subscribing to instrument:', instrumentId);
    this.send({ type: 'subscribe', instrumentId });
  }

  unsubscribeFromInstrument(instrumentId) {
    console.log('Mock WebSocket unsubscribing from instrument:', instrumentId);
    this.send({ type: 'unsubscribe', instrumentId });
  }

  disconnect() {
    console.log('Mock WebSocket disconnecting...');
    this.connected = false;
    
    // Clear all intervals
    this.intervals.forEach((interval) => {
      clearInterval(interval);
    });
    this.intervals.clear();
    
    console.log('Mock WebSocket disconnected');
  }
}

export default new WebSocketService();
