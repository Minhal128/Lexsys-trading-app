// Hardcoded segment service - no backend required
const MOCK_SEGMENTS = [
  {
    id: 1,
    name: "CRYPTO",
    displayName: "Cryptocurrency",
    description: "Digital cryptocurrency trading",
    active: true,
    marginMultiplier: 0.5,
    tradingHours: "24/7",
    instruments: 5
  },
  {
    id: 2,
    name: "EQUITY",
    displayName: "Equity Cash",
    description: "Stock market equity trading",
    active: true,
    marginMultiplier: 0.2,
    tradingHours: "9:15 AM - 3:30 PM",
    instruments: 1500
  },
  {
    id: 3,
    name: "FUTURES",
    displayName: "Futures & Options",
    description: "Derivatives trading",
    active: true,
    marginMultiplier: 0.1,
    tradingHours: "9:15 AM - 3:30 PM",
    instruments: 300
  },
  {
    id: 4,
    name: "COMMODITY",
    displayName: "Commodity",
    description: "Commodity futures trading",
    active: true,
    marginMultiplier: 0.15,
    tradingHours: "9:00 AM - 11:30 PM",
    instruments: 150
  },
  {
    id: 5,
    name: "CURRENCY",
    displayName: "Currency",
    description: "Currency derivatives",
    active: true,
    marginMultiplier: 0.05,
    tradingHours: "9:00 AM - 5:00 PM",
    instruments: 50
  }
];

export const segmentService = {
  async getSegments() {
    console.log('Mock getSegments');
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      success: true,
      data: {
        segments: MOCK_SEGMENTS
      }
    };
  },

  async getSegment(id) {
    console.log('Mock getSegment:', id);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const segment = MOCK_SEGMENTS.find(seg => seg.id === parseInt(id));
    
    if (segment) {
      return {
        success: true,
        data: segment
      };
    }
    
    return {
      success: false,
      data: null,
      error: 'Segment not found'
    };
  },
};

export default segmentService;
