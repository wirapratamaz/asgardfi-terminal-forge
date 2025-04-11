import React, { useState, useMemo, useCallback } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { getPriceHistoryData } from '@/lib/mockPriceData';
import { Button } from '@/components/ui/button';

type PriceChartProps = {
  token: string;
};

const TIME_PERIODS = [
  { label: '1D', days: 1 },
  { label: '7D', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
];

const formatCurrency = (value: number) => {
  // Special formatting for stablecoins
  const stablecoins = ['USDC', 'USDT', 'PYUSD', 'USDS'];
  if (stablecoins.includes(value.toString())) {
    return `$${value.toFixed(4)}`;
  }
  
  return value >= 1000 
    ? `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}` 
    : `$${value.toFixed(2)}`;
};

const PriceChart: React.FC<PriceChartProps> = ({ token }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(2); // Default to 1M
  const [hoveredData, setHoveredData] = useState<any>(null);

  const chartData = useMemo(() => {
    const period = TIME_PERIODS[selectedPeriod]?.days || 30;
    return getPriceHistoryData(token, period);
  }, [token, selectedPeriod]);

  const minPrice = useMemo(() => {
    if (!chartData.length) return 0;
    return Math.floor(Math.min(...chartData.map(d => d.price)) * 0.98);
  }, [chartData]);

  const maxPrice = useMemo(() => {
    if (!chartData.length) return 0;
    return Math.ceil(Math.max(...chartData.map(d => d.price)) * 1.02);
  }, [chartData]);

  const priceColor = useMemo(() => {
    if (chartData.length < 2) return '#10b981';
    return chartData[0].price < chartData[chartData.length - 1].price 
      ? '#10b981' // Green for price increase
      : '#ef4444'; // Red for price decrease
  }, [chartData]);

  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : 0;
  const displayPrice = hoveredData ? hoveredData.price : currentPrice;
  const displayDate = hoveredData ? 
    (typeof hoveredData.date === 'string' && hoveredData.date.includes(' ') ? 
      hoveredData.date : // Handle 1D view with time format
      new Date(hoveredData.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    ) : 
    new Date().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });

  const handleMouseMove = useCallback((data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      setHoveredData(data.activePayload[0].payload);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredData(null);
  }, []);

  return (
    <div className="p-6 mb-6 bg-terminal-card rounded-lg border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">{token} Price Chart</h2>
          <div className="mt-2 flex items-baseline">
            <span className="text-2xl font-mono text-white mr-2">${displayPrice.toFixed(2)}</span>
            <span className="text-sm text-terminal-text-secondary">{displayDate}</span>
          </div>
        </div>
        <div className="flex gap-2">
          {TIME_PERIODS.map((period, index) => (
            <Button
              key={period.label}
              variant={selectedPeriod === index ? "default" : "outline"}
              className={`px-3 py-1.5 h-auto`}
              onClick={() => setSelectedPeriod(index)}
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={priceColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={priceColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="#666"
              tickFormatter={(value) => {
                const period = TIME_PERIODS[selectedPeriod]?.days || 30;
                // For 1D, show time instead of date
                if (period === 1) {
                  return value.split(' ')[1] || value;
                }
                
                // For periods <= 7 days, show day of week
                if (period <= 7) {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { weekday: 'short' });
                }
                
                // For 1M, show short date
                if (period === 30) {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }
                
                // For 3M, show month
                return new Date(value).toLocaleDateString('en-US', { month: 'short' });
              }}
            />
            <YAxis 
              domain={[minPrice, maxPrice]} 
              tickFormatter={(value) => formatCurrency(value)}
              stroke="#666"
              axisLine={false}
              tickLine={false}
              width={60}
            />
            <Tooltip 
              content={<></>} // We handle tooltip display manually
              cursor={{ stroke: '#666', strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={priceColor} 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)" 
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2, fill: priceColor }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
