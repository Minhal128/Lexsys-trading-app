// Hardcoded instrument service - no backend required
const MOCK_INSTRUMENTS = [
  // CRYPTO Instruments
  {
    id: 1,
    symbol: "BTC/USD",
    name: "Bitcoin USD",
    exchange: "CRYPTO",
    segment: "CRYPTO",
    instrumentType: "CRYPTO",
    lotSize: 0.001,
    tickSize: 0.01,
    multiplier: 1,
    expiry: null,
    strike: null,
    optionType: null,
    lastPrice: 50000,
    change: 1250,
    changePercent: 2.56,
    volume: 1250000,
    openInterest: null,
    high: 51000,
    low: 48500,
    open: 49000,
    close: 50000
  },
  {
    id: 2,
    symbol: "ETH/USD",
    name: "Ethereum USD",
    exchange: "CRYPTO",
    segment: "CRYPTO",
    instrumentType: "CRYPTO",
    lotSize: 0.01,
    tickSize: 0.01,
    multiplier: 1,
    expiry: null,
    strike: null,
    optionType: null,
    lastPrice: 2000,
    change: -24,
    changePercent: -1.19,
    volume: 850000,
    openInterest: null,
    high: 2050,
    low: 1980,
    open: 2024,
    close: 2000
  },
  {
    id: 3,
    symbol: "ADA/USD",
    name: "Cardano USD",
    exchange: "CRYPTO",
    segment: "CRYPTO",
    instrumentType: "CRYPTO",
    lotSize: 1,
    tickSize: 0.001,
    multiplier: 1,
    expiry: null,
    strike: null,
    optionType: null,
    lastPrice: 0.5,
    change: 0.029,
    changePercent: 6.16,
    volume: 2500000,
    openInterest: null,
    high: 0.52,
    low: 0.47,
    open: 0.471,
    close: 0.5
  },
  {
    id: 4,
    symbol: "DOT/USD",
    name: "Polkadot USD",
    exchange: "CRYPTO",
    segment: "CRYPTO",
    instrumentType: "CRYPTO",
    lotSize: 0.1,
    tickSize: 0.01,
    multiplier: 1,
    expiry: null,
    strike: null,
    optionType: null,
    lastPrice: 25,
    change: 0.75,
    changePercent: 3.09,
    volume: 450000,
    openInterest: null,
    high: 25.5,
    low: 24.2,
    open: 24.25,
    close: 25
  },
  {
    id: 5,
    symbol: "SOL/USD",
    name: "Solana USD",
    exchange: "CRYPTO",
    segment: "CRYPTO",
    instrumentType: "CRYPTO",
    lotSize: 0.01,
    tickSize: 0.01,
    multiplier: 1,
    expiry: null,
    strike: null,
    optionType: null,
    lastPrice: 100,
    change: -0.5,
    changePercent: -0.50,
    volume: 680000,
    openInterest: null,
    high: 102,
    low: 98.5,
    open: 100.5,
    close: 100
  },
  {
    id: 6,
    symbol: "BTC/USDT",
    name: "Bitcoin Tether",
    exchange: "CRYPTO",
    segment: "CRYPTO",
    instrumentType: "CRYPTO",
    lotSize: 0.001,
    tickSize: 0.01,
    multiplier: 1,
    expiry: null,
    strike: null,
    optionType: null,
    lastPrice: 49950,
    change: 1200,
    changePercent: 2.46,
    volume: 1180000,
    openInterest: null,
    high: 50800,
    low: 48400,
    open: 48750,
    close: 49950
  },

  // NSE Instruments
  {
    id: 101,
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    exchange: "NSE",
    segment: "NSE",
    instrumentType: "EQUITY",
    lotSize: 1,
    tickSize: 0.05,
    multiplier: 1,
    expiry: null,
    strike: null,
    optionType: null,
    lastPrice: 2450.75,
    change: 35.20,
    changePercent: 1.46,
    volume: 2850000,
    openInterest: null,
    high: 2465.80,
    low: 2420.30,
    open: 2425.50,
    close: 2450.75
  },
  {
    id: 102,
    symbol: "TCS",
    name: "Tata Consultancy Services",
    exchange: "NSE",
    segment: "NSE",
    instrumentType: "EQUITY",
    lotSize: 1,
    tickSize: 0.05,
    multiplier: 1,
    expiry: null,
    strike: null,
    optionType: null,
    lastPrice: 3850.40,
    change: -28.60,
    changePercent: -0.74,
    volume: 1650000,
    openInterest: null,
    high: 3890.20,
    low: 3835.75,
    open: 3879.00,
    close: 3850.40
  },
  {
    id: 103,
    symbol: "INFY",
    name: "Infosys Limited",
    exchange: "NSE",
    segment: "NSE",
    instrumentType: "EQUITY",
    lotSize: 1,
    tickSize: 0.05,
    multiplier: 1,
    expiry: null,
    strike: null,
    optionType: null,
    lastPrice: 1675.30,
    change: 22.85,
    changePercent: 1.38,
    volume: 3250000,
    openInterest: null,
    high: 1685.90,
    low: 1658.40,
    open: 1662.75,
    close: 1675.30
  },
  {
    id: 104,
    symbol: "HDFC",
    name: "HDFC Bank Limited",
    exchange: "NSE",
    segment: "NSE",
    instrumentType: "EQUITY",
    lotSize: 1,
    tickSize: 0.05,
    multiplier: 1,
    expiry: null,
    strike: null,
    optionType: null,
    lastPrice: 1580.65,
    change: -12.40,
    changePercent: -0.78,
    volume: 4150000,
    openInterest: null,
    high: 1595.20,
    low: 1575.80,
    open: 1593.05,
    close: 1580.65
  },
  {
    id: 105,
    symbol: "ICICIBANK",
    name: "ICICI Bank Limited",
    exchange: "NSE",
    segment: "NSE",
    instrumentType: "EQUITY",
    lotSize: 1,
    tickSize: 0.05,
    multiplier: 1,
    expiry: null,
    strike: null,
    optionType: null,
    lastPrice: 1125.80,
    change: 18.45,
    changePercent: 1.67,
    volume: 5250000,
    openInterest: null,
    high: 1135.60,
    low: 1118.25,
    open: 1120.40,
    close: 1125.80
  },

  // MCX2 Instruments (Commodities)
  {
    id: 201,
    symbol: "GOLD",
    name: "Gold 1KG",
    exchange: "MCX",
    segment: "6946a6bb2056b8e4a5319327", // MCX2 segment ID
    instrumentType: "COMMODITY",
    lotSize: 1,
    tickSize: 1,
    multiplier: 1000,
    expiry: "2024-04-05T00:00:00Z",
    strike: null,
    optionType: null,
    lastPrice: 65850,
    change: 320,
    changePercent: 0.49,
    volume: 125000,
    openInterest: 45000,
    high: 66100,
    low: 65420,
    open: 65530,
    close: 65850
  },
  {
    id: 202,
    symbol: "SILVER",
    name: "Silver 30KG",
    exchange: "MCX",
    segment: "6946a6bb2056b8e4a5319327",
    instrumentType: "COMMODITY",
    lotSize: 30,
    tickSize: 1,
    multiplier: 30,
    expiry: "2024-03-05T00:00:00Z",
    strike: null,
    optionType: null,
    lastPrice: 75420,
    change: -180,
    changePercent: -0.24,
    volume: 85000,
    openInterest: 32000,
    high: 75850,
    low: 75200,
    open: 75600,
    close: 75420
  },
  {
    id: 203,
    symbol: "CRUDE",
    name: "Crude Oil",
    exchange: "MCX",
    segment: "6946a6bb2056b8e4a5319327",
    instrumentType: "COMMODITY",
    lotSize: 100,
    tickSize: 1,
    multiplier: 100,
    expiry: "2024-02-19T00:00:00Z",
    strike: null,
    optionType: null,
    lastPrice: 6850,
    change: 45,
    changePercent: 0.66,
    volume: 195000,
    openInterest: 78000,
    high: 6890,
    low: 6820,
    open: 6825,
    close: 6850
  },
  {
    id: 204,
    symbol: "COPPER",
    name: "Copper",
    exchange: "MCX",
    segment: "6946a6bb2056b8e4a5319327",
    instrumentType: "COMMODITY",
    lotSize: 2500,
    tickSize: 0.05,
    multiplier: 2500,
    expiry: "2024-01-31T00:00:00Z",
    strike: null,
    optionType: null,
    lastPrice: 720.85,
    change: 8.40,
    changePercent: 1.18,
    volume: 65000,
    openInterest: 28000,
    high: 725.60,
    low: 715.20,
    open: 717.45,
    close: 720.85
  },

  // Forex Instruments
  {
    id: 301,
    symbol: "USDINR",
    name: "USD/INR",
    exchange: "NSE",
    segment: "Forex",
    instrumentType: "CURRENCY",
    lotSize: 1000,
    tickSize: 0.0025,
    multiplier: 1000,
    expiry: "2024-01-26T00:00:00Z",
    strike: null,
    optionType: null,
    lastPrice: 83.2450,
    change: 0.1250,
    changePercent: 0.15,
    volume: 450000,
    openInterest: 125000,
    high: 83.3200,
    low: 83.1800,
    open: 83.1200,
    close: 83.2450
  },
  {
    id: 302,
    symbol: "EURINR",
    name: "EUR/INR",
    exchange: "NSE",
    segment: "Forex",
    instrumentType: "CURRENCY",
    lotSize: 1000,
    tickSize: 0.0025,
    multiplier: 1000,
    expiry: "2024-01-26T00:00:00Z",
    strike: null,
    optionType: null,
    lastPrice: 91.1850,
    change: -0.2150,
    changePercent: -0.24,
    volume: 185000,
    openInterest: 65000,
    high: 91.4500,
    low: 91.0200,
    open: 91.4000,
    close: 91.1850
  },
  {
    id: 303,
    symbol: "GBPINR",
    name: "GBP/INR",
    exchange: "NSE",
    segment: "Forex",
    instrumentType: "CURRENCY",
    lotSize: 1000,
    tickSize: 0.0025,
    multiplier: 1000,
    expiry: "2024-01-26T00:00:00Z",
    strike: null,
    optionType: null,
    lastPrice: 105.8750,
    change: 0.3250,
    changePercent: 0.31,
    volume: 125000,
    openInterest: 42000,
    high: 106.1200,
    low: 105.6500,
    open: 105.5500,
    close: 105.8750
  },
  {
    id: 304,
    symbol: "JPYINR",
    name: "JPY/INR",
    exchange: "NSE",
    segment: "Forex",
    instrumentType: "CURRENCY",
    lotSize: 1000,
    tickSize: 0.0025,
    multiplier: 1000,
    expiry: "2024-01-26T00:00:00Z",
    strike: null,
    optionType: null,
    lastPrice: 57.4250,
    change: -0.1850,
    changePercent: -0.32,
    volume: 95000,
    openInterest: 28000,
    high: 57.6800,
    low: 57.3200,
    open: 57.6100,
    close: 57.4250
  }
];

const MOCK_TOP_MOVERS = [
  { ...MOCK_INSTRUMENTS[2], changePercent: 6.16 }, // ADA
  { ...MOCK_INSTRUMENTS[3], changePercent: 3.09 }, // DOT
  { ...MOCK_INSTRUMENTS[0], changePercent: 2.56 }, // BTC
  { ...MOCK_INSTRUMENTS[12], changePercent: 1.67 }, // ICICIBANK
  { ...MOCK_INSTRUMENTS[10], changePercent: 1.46 }, // RELIANCE
  { ...MOCK_INSTRUMENTS[17], changePercent: 1.18 }, // COPPER
  { ...MOCK_INSTRUMENTS[4], changePercent: -0.50 }, // SOL
  { ...MOCK_INSTRUMENTS[1], changePercent: -1.19 }  // ETH
];

const instrumentService = {
  async getInstruments(params = {}) {
    console.log('Mock getInstruments:', params);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let instruments = [...MOCK_INSTRUMENTS];
    
    // Filter by segment if provided
    if (params.segment) {
      instruments = instruments.filter(inst => inst.segment === params.segment);
    }
    
    // Filter by search query if provided
    if (params.search) {
      const query = params.search.toLowerCase();
      instruments = instruments.filter(inst => 
        inst.symbol.toLowerCase().includes(query) ||
        inst.name.toLowerCase().includes(query) ||
        inst.exchange.toLowerCase().includes(query) ||
        inst.segment.toLowerCase().includes(query) ||
        inst.instrumentType.toLowerCase().includes(query)
      );
    }
    
    // Filter by exchange if provided
    if (params.exchange) {
      instruments = instruments.filter(inst => inst.exchange === params.exchange);
    }
    
    return {
      success: true,
      data: instruments,
      meta: {
        page: 1,
        limit: 50,
        total: instruments.length,
        totalPages: 1
      }
    };
  },

  async getInstrument(id) {
    console.log('Mock getInstrument:', id);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const instrument = MOCK_INSTRUMENTS.find(inst => inst.id === parseInt(id));
    
    if (instrument) {
      return {
        success: true,
        data: instrument
      };
    }
    
    return {
      success: false,
      data: null,
      error: 'Instrument not found'
    };
  },

  async getBySymbol(symbol) {
    console.log('Mock getBySymbol:', symbol);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const instrument = MOCK_INSTRUMENTS.find(inst => inst.symbol === symbol);
    
    return {
      success: true,
      data: instrument || null
    };
  },

  async searchInstruments(query) {
    console.log('Mock searchInstruments:', query);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const searchQuery = query.toLowerCase();
    const results = MOCK_INSTRUMENTS.filter(inst =>
      inst.symbol.toLowerCase().includes(searchQuery) ||
      inst.name.toLowerCase().includes(searchQuery) ||
      inst.exchange.toLowerCase().includes(searchQuery) ||
      inst.segment.toLowerCase().includes(searchQuery) ||
      inst.instrumentType.toLowerCase().includes(searchQuery)
    );
    
    return {
      success: true,
      data: results
    };
  },

  async getTopMovers() {
    console.log('Mock getTopMovers');
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      success: true,
      data: MOCK_TOP_MOVERS
    };
  },

  async getExpiringInstruments() {
    console.log('Mock getExpiringInstruments');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return instruments with expiry dates (futures/options)
    const expiringInstruments = MOCK_INSTRUMENTS.filter(inst => inst.expiry !== null);
    
    return {
      success: true,
      data: expiringInstruments
    };
  },

  async getQuote(id) {
    console.log('Mock getQuote:', id);
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const instrument = MOCK_INSTRUMENTS.find(inst => inst.id === parseInt(id));
    
    if (instrument) {
      // Add some random variation to simulate live quotes
      const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
      const currentPrice = instrument.lastPrice * (1 + variation);
      
      return {
        success: true,
        data: {
          instrumentId: instrument.id,
          symbol: instrument.symbol,
          lastPrice: Math.round(currentPrice * 100) / 100,
          bid: Math.round((currentPrice * 0.999) * 100) / 100,
          ask: Math.round((currentPrice * 1.001) * 100) / 100,
          bidSize: Math.floor(Math.random() * 1000) + 100,
          askSize: Math.floor(Math.random() * 1000) + 100,
          change: Math.round((currentPrice - instrument.lastPrice) * 100) / 100,
          changePercent: Math.round(((currentPrice - instrument.lastPrice) / instrument.lastPrice) * 100 * 100) / 100,
          volume: instrument.volume + Math.floor(Math.random() * 10000),
          timestamp: new Date().toISOString()
        }
      };
    }
    
    return {
      success: false,
      data: null,
      error: 'Instrument not found'
    };
  },

  async getOHLC(id) {
    console.log('Mock getOHLC:', id);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const instrument = MOCK_INSTRUMENTS.find(inst => inst.id === parseInt(id));
    
    if (instrument) {
      // Generate mock OHLC data for the last 30 days
      const ohlcData = [];
      const basePrice = instrument.lastPrice;
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        const open = basePrice * (0.95 + Math.random() * 0.1);
        const high = open * (1 + Math.random() * 0.05);
        const low = open * (1 - Math.random() * 0.05);
        const close = low + Math.random() * (high - low);
        const volume = Math.floor(Math.random() * 1000000) + 100000;
        
        ohlcData.push({
          date: date.toISOString().split('T')[0],
          open: Math.round(open * 100) / 100,
          high: Math.round(high * 100) / 100,
          low: Math.round(low * 100) / 100,
          close: Math.round(close * 100) / 100,
          volume: volume
        });
      }
      
      return {
        success: true,
        data: ohlcData
      };
    }
    
    return {
      success: false,
      data: [],
      error: 'Instrument not found'
    };
  },
};

export { instrumentService };
export default instrumentService;
