
import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
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
    if (chartData.length < 2) return '#9b87f5';
    return chartData[0].price < chartData[chartData.length - 1].price 
      ? '#10b981' // Green for price increase
      : '#ef4444'; // Red for price decrease
  }, [chartData]);

  return (
    <div className="p-6 mb-6 bg-terminal-card rounded-lg border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{token} Price Chart</h2>
        <div className="flex gap-2">
          {TIME_PERIODS.map((period, index) => (
            <Button
              key={period.label}
              variant={selectedPeriod === index ? "default" : "outline"}
              className="px-3 py-1.5 h-auto"
              onClick={() => setSelectedPeriod(index)}
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ChartContainer 
          config={{ 
            price: { 
              color: priceColor 
            }
          }}
        >
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
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
            />
            <Tooltip content={<CustomTooltip token={token} />} />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={priceColor} 
              strokeWidth={2} 
              dot={false} 
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  token: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, token }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const price = payload[0].value;
  const date = new Date(label);
  const formattedDate = date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric'
  });

  return (
    <div className="bg-terminal-card p-3 border border-gray-800 rounded-md shadow-lg">
      <p className="font-medium text-white">{formattedDate}</p>
      <p className="text-terminal-text-secondary">
        <span className="font-bold">{token}: </span>
        <span className="font-mono">{formatCurrency(price)}</span>
      </p>
    </div>
  );
};

export default PriceChart;
