// This simulates price data for tokens
// In a real application, this would come from an API

// Helper to generate realistic-looking price data with some volatility
const generatePriceData = (
  basePrice: number, 
  days: number, 
  volatility: number = 0.05
) => {
  const data = [];
  const now = new Date();
  
  let price = basePrice;
  
  // For 1-day view, generate hourly data points
  if (days === 1) {
    for (let i = 24; i >= 0; i--) {
      const date = new Date(now);
      date.setHours(date.getHours() - i);
      
      // Add some random movement to simulate price changes
      const change = price * (Math.random() * volatility * 2 - volatility) * 0.4;
      price += change;
      
      const formattedDate = `${date.toLocaleDateString()} ${date.getHours()}:00`;
      
      data.push({
        date: formattedDate,
        price: parseFloat(price.toFixed(2))
      });
    }
  } else {
    // For multi-day views, generate daily data points
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Add some random movement to simulate price changes
      const change = price * (Math.random() * volatility * 2 - volatility);
      price += change;
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: parseFloat(price.toFixed(2))
      });
    }
  }
  
  return data;
};

// Base prices and volatility for different tokens
const TOKEN_BASE_PRICES: Record<string, { price: number; volatility: number }> = {
  SOL: { price: 145.32, volatility: 0.09 },
  ETH: { price: 3452.67, volatility: 0.06 },
  BTC: { price: 62489.54, volatility: 0.05 },
  WBTC: { price: 62387.23, volatility: 0.055 },
  USDC: { price: 1.00, volatility: 0.001 },
  USDT: { price: 1.00, volatility: 0.002 },
  PYUSD: { price: 1.00, volatility: 0.002 },
  USDS: { price: 1.00, volatility: 0.001 }
};

// Cache generated data to avoid regenerating it on every render
const priceDataCache: Record<string, any[]> = {};

export const getPriceHistoryData = (token: string, days: number = 30) => {
  const cacheKey = `${token}-${days}`;
  
  if (priceDataCache[cacheKey]) {
    return priceDataCache[cacheKey];
  }
  
  const baseInfo = TOKEN_BASE_PRICES[token] || { price: 10, volatility: 0.05 };
  const data = generatePriceData(baseInfo.price, days, baseInfo.volatility);
  
  // Save to cache
  priceDataCache[cacheKey] = data;
  
  return data;
};
