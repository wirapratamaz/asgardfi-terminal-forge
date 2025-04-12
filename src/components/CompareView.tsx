import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowUpDown, TrendingUp, ChevronRight } from 'lucide-react';

const CompareView = () => {
  const [depositToken, setDepositToken] = useState('SOL');
  const [borrowToken, setBorrowToken] = useState('ETH');
  const chartRef = useRef<HTMLCanvasElement>(null);
  
  // Mock data for comparison
  const compareData = [
    { protocol: 'Kamino', market: 'main', deposits_ui: 4979678.484, borrows_ui: 1839.968, deposit_asset_utilization: 74.478, borrow_asset_utilization: 67.718, effective_ltv: 0.592, max_leverage: 2.451, deposit_apy: 3.163, deposit_endogenous_yield: 0, borrow_apy: 3.278, borrow_endogenous_yield: 0, net_apy: -0.115, leveraged_apy: 2.996 },
    { protocol: 'Marginfi', market: 'main', deposits_ui: 2281439.689, borrows_ui: 171.396, deposit_asset_utilization: 68.519, borrow_asset_utilization: 54.43, effective_ltv: 0.432, max_leverage: 1.762, deposit_apy: 4.5, deposit_endogenous_yield: 0, borrow_apy: 8.485, borrow_endogenous_yield: 0, net_apy: -3.985, leveraged_apy: 1.463 },
    { protocol: 'Solend', market: 'main', deposits_ui: 3162703.645, borrows_ui: 60.843, deposit_asset_utilization: 53.199, borrow_asset_utilization: 29.591, effective_ltv: 0.65, max_leverage: 2.857, deposit_apy: 2.306, deposit_endogenous_yield: 0, borrow_apy: 2.777, borrow_endogenous_yield: 0, net_apy: -0.471, leveraged_apy: 1.431 }
  ];
  
  // Chart data
  const chartData = [
    { 
      protocol: 'Kamino', 
      color: '#0067FF', 
      values: [
        { x: 1, y: 3.1 },
        { x: 1.2, y: 3.05 },
        { x: 1.4, y: 2.95 },
        { x: 1.6, y: 2.85 },
        { x: 1.8, y: 2.7 },
        { x: 2, y: 1.5 },
        { x: 2.2, y: 1.45 },
        { x: 2.4, y: 1.4 },
        { x: 2.6, y: 1.38 },
        { x: 2.8, y: 1.35 }
      ]
    },
    { 
      protocol: 'Marginfi', 
      color: '#1F75FE', 
      values: [
        { x: 1, y: 2.2 },
        { x: 1.2, y: 2.15 },
        { x: 1.4, y: 2.05 },
        { x: 1.6, y: 1.95 },
        { x: 1.8, y: 1.85 },
        { x: 2, y: 1.6 },
        { x: 2.2, y: 1.5 },
        { x: 2.4, y: 1.45 },
        { x: 2.6, y: 1.4 },
        { x: 2.8, y: 1.35 }
      ]
    },
    { 
      protocol: 'Solend', 
      color: '#FF3131', 
      values: [
        { x: 1, y: 2.1 },
        { x: 1.2, y: 2.05 },
        { x: 1.4, y: 2.0 },
        { x: 1.6, y: 1.9 },
        { x: 1.8, y: 1.8 },
        { x: 2, y: 1.7 },
        { x: 2.2, y: 1.65 },
        { x: 2.4, y: 1.6 },
        { x: 2.6, y: 1.5 },
        { x: 2.8, y: 1.4 }
      ]
    }
  ];
  
  // Sort data by leveraged APY
  const sortedData = [...compareData].sort((a, b) => b.leveraged_apy - a.leveraged_apy);
  
  // Find highest values
  const highestLtv = Math.max(...compareData.map(item => item.effective_ltv));
  const bestNetApy = Math.max(...compareData.map(item => item.net_apy));
  const highestDepositApy = Math.max(...compareData.map(item => item.deposit_apy));
  
  // Protocol with highest value
  const highestLtvProtocol = compareData.find(item => item.effective_ltv === highestLtv)?.protocol;
  const bestNetApyProtocol = compareData.find(item => item.net_apy === bestNetApy)?.protocol;
  const highestDepositApyProtocol = compareData.find(item => item.deposit_apy === highestDepositApy)?.protocol;
  
  // Format number with commas for thousands
  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 3
    });
  };
  
  // Format APY with % sign
  const formatAPY = (apy: number) => {
    return `${apy.toFixed(2)}%`;
  };
  
  // Draw chart
  useEffect(() => {
    if (chartRef.current) {
      const canvas = chartRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set high DPI canvas for better rendering
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      // Reset canvas styles
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Get canvas dimensions (in CSS pixels)
      const width = rect.width;
      const height = rect.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Chart area dimensions
      const padding = { top: 30, right: 40, bottom: 40, left: 55 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;
      
      // Draw background
      ctx.fillStyle = '#111111';
      ctx.fillRect(0, 0, width, height);
      
      // Grid settings
      const gridColor = 'rgba(50, 50, 50, 0.8)';
      const axisColor = 'rgba(80, 80, 80, 1)';
      const textColor = 'rgba(180, 180, 180, 0.9)';
      
      // Draw grid
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      const yTicks = [1, 2, 3, 4];
      yTicks.forEach(tick => {
        const y = height - padding.bottom - ((tick / 4) * chartHeight);
        
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        
        // Y-axis labels
        ctx.fillStyle = textColor;
        ctx.font = '11px Inter, system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`${tick}%`, padding.left - 10, y + 4);
      });
      
      // Vertical grid lines
      const xTicks = [1, 1.2, 1.4, 1.6, 1.8, 2, 2.2, 2.4, 2.6, 2.8];
      xTicks.forEach(tick => {
        const x = padding.left + ((tick - 1) / 1.8 * chartWidth);
        
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, height - padding.bottom);
        ctx.stroke();
        
        // X-axis labels
        ctx.fillStyle = textColor;
        ctx.font = '11px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(tick.toString(), x, height - padding.bottom + 15);
      });
      
      // Draw axis labels
      ctx.fillStyle = textColor;
      ctx.font = '12px Inter, system-ui, sans-serif';
      
      // Y-axis label
      ctx.save();
      ctx.translate(15, height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText('APY (%)', 0, 0);
      ctx.restore();
      
      // X-axis label
      ctx.textAlign = 'center';
      ctx.fillText('Leverage', width / 2, height - 10);
      
      // Draw lines for each protocol with smooth curve
      chartData.forEach(series => {
        const { values } = series;
        const points = values.map(point => ({
          x: padding.left + ((point.x - 1) / 1.8 * chartWidth),
          y: height - padding.bottom - (point.y / 4 * chartHeight)
        }));
        
        // Draw line
        ctx.strokeStyle = series.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // Start at the first point
        if (points.length > 0) {
          ctx.moveTo(points[0].x, points[0].y);
          
          // Curved line using bezier curves
          for (let i = 0; i < points.length - 1; i++) {
            const curr = points[i];
            const next = points[i + 1];
            const xc = (curr.x + next.x) / 2;
            const yc = (curr.y + next.y) / 2;
            
            ctx.quadraticCurveTo(curr.x, curr.y, xc, yc);
          }
          
          // End at the last point
          ctx.quadraticCurveTo(
            points[points.length - 2].x, 
            points[points.length - 2].y, 
            points[points.length - 1].x, 
            points[points.length - 1].y
          );
        }
        
        ctx.stroke();
      });
      
      // Draw legend
      const legendY = padding.top + 15;
      const legendSpacing = 20;
      
      chartData.forEach((series, i) => {
        const legendX = width - padding.right - 130;
        const itemY = legendY + i * legendSpacing;
        
        // Legend line
        ctx.strokeStyle = series.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(legendX, itemY);
        ctx.lineTo(legendX + 20, itemY);
        ctx.stroke();
        
        // Legend text
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Inter, system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${series.protocol} main`, legendX + 30, itemY + 4);
      });
    }
  }, [chartRef, chartData]);
  
  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm text-terminal-text-secondary mb-2">Deposit Token</label>
          <div className="relative">
            <select
              value={depositToken}
              onChange={(e) => setDepositToken(e.target.value)}
              className="w-full bg-transparent border border-gray-800 rounded-md p-3 pr-10 appearance-none text-white"
            >
              <option value="SOL">SOL</option>
              <option value="USDC">USDC</option>
              <option value="ETH">ETH</option>
              <option value="BTC">BTC</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-terminal-text-secondary mb-2">Borrow Token</label>
          <div className="relative">
            <select
              value={borrowToken}
              onChange={(e) => setBorrowToken(e.target.value)}
              className="w-full bg-transparent border border-gray-800 rounded-md p-3 pr-10 appearance-none text-white"
            >
              <option value="ETH">ETH</option>
              <option value="SOL">SOL</option>
              <option value="USDC">USDC</option>
              <option value="BTC">BTC</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-terminal-background-secondary rounded-lg p-6">
          <p className="text-sm text-terminal-text-secondary">Highest LTV</p>
          <div className="flex items-baseline mt-2">
            <h2 className="text-3xl font-bold">{highestLtv.toFixed(2)}</h2>
          </div>
          <p className="flex items-center text-green-500 mt-2">
            <TrendingUp size={16} className="mr-1" /> on {highestLtvProtocol} main
          </p>
        </div>
        
        <div className="bg-terminal-background-secondary rounded-lg p-6">
          <p className="text-sm text-terminal-text-secondary">Best Net APY</p>
          <div className="flex items-baseline mt-2">
            <h2 className="text-3xl font-bold">{formatAPY(bestNetApy)}</h2>
          </div>
          <p className="flex items-center text-green-500 mt-2">
            <TrendingUp size={16} className="mr-1" /> on {bestNetApyProtocol} main
          </p>
        </div>
        
        <div className="bg-terminal-background-secondary rounded-lg p-6">
          <p className="text-sm text-terminal-text-secondary">Highest Deposit APY</p>
          <div className="flex items-baseline mt-2">
            <h2 className="text-3xl font-bold">{formatAPY(highestDepositApy)}</h2>
          </div>
          <p className="flex items-center text-green-500 mt-2">
            <TrendingUp size={16} className="mr-1" /> on {highestDepositApyProtocol} main
          </p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-3 text-terminal-text-secondary font-medium">protocol</th>
              <th className="text-left p-3 text-terminal-text-secondary font-medium">market</th>
              <th className="text-right p-3 text-terminal-text-secondary font-medium flex items-center justify-end">
                deposits_ui <ArrowUpDown size={14} className="ml-1" />
              </th>
              <th className="text-right p-3 text-terminal-text-secondary font-medium">borrows_ui</th>
              <th className="text-right p-3 text-terminal-text-secondary font-medium">deposit_asset_utilization</th>
              <th className="text-right p-3 text-terminal-text-secondary font-medium">borrow_asset_utilization</th>
              <th className="text-right p-3 text-terminal-text-secondary font-medium">effective_ltv</th>
              <th className="text-right p-3 text-terminal-text-secondary font-medium">max_leverage</th>
              <th className="text-right p-3 text-terminal-text-secondary font-medium">deposit_apy</th>
              <th className="text-right p-3 text-terminal-text-secondary font-medium">borrow_apy</th>
              <th className="text-right p-3 text-terminal-text-secondary font-medium">net_apy</th>
              <th className="text-right p-3 text-terminal-text-secondary font-medium">leveraged_apy</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr 
                key={index} 
                className={`border-b border-gray-800 hover:bg-opacity-50 hover:bg-gray-800 ${index === 0 ? 'bg-green-900 bg-opacity-20' : ''}`}
              >
                <td className="p-3 font-medium">{item.protocol}</td>
                <td className="p-3">{item.market}</td>
                <td className="p-3 text-right font-mono">{formatNumber(item.deposits_ui)}</td>
                <td className="p-3 text-right font-mono">{formatNumber(item.borrows_ui)}</td>
                <td className="p-3 text-right font-mono">{item.deposit_asset_utilization.toFixed(3)}</td>
                <td className="p-3 text-right font-mono">{item.borrow_asset_utilization.toFixed(3)}</td>
                <td className="p-3 text-right font-mono">{item.effective_ltv.toFixed(3)}</td>
                <td className="p-3 text-right font-mono">{item.max_leverage.toFixed(3)}</td>
                <td className="p-3 text-right font-mono">{item.deposit_apy.toFixed(3)}</td>
                <td className="p-3 text-right font-mono">{item.borrow_apy.toFixed(3)}</td>
                <td className="p-3 text-right font-mono">{parseFloat(item.net_apy.toFixed(3)) < 0 
                  ? <span className="text-red-500">{item.net_apy.toFixed(3)}</span> 
                  : item.net_apy.toFixed(3)}
                </td>
                <td className="p-3 text-right font-mono font-bold">{item.leveraged_apy.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Leverage Analysis</h2>
        <div className="bg-terminal-background-secondary rounded-lg p-6 h-72 mb-6">
          <h3 className="text-lg font-semibold mb-2">Leveraged APY by Market</h3>
          <canvas 
            ref={chartRef} 
            className="w-full h-[250px]"
          ></canvas>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-terminal-background-secondary rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Leverage Recommendations</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <ChevronRight size={16} className="text-green-500" />
                </div>
                <div className="ml-2">
                  <p><span className="font-semibold">Best strategy:</span> Deposit SOL on Kamino main, borrow ETH for a 2.996% leveraged APY</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <ChevronRight size={16} className="text-green-500" />
                </div>
                <div className="ml-2">
                  <p><span className="font-semibold">Optimal leverage:</span> 2.451x for maximum returns</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <ChevronRight size={16} className="text-green-500" />
                </div>
                <div className="ml-2">
                  <p><span className="font-semibold">Risk level:</span> Medium - maintain a safe distance from liquidation threshold</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-terminal-background-secondary rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Risk Analysis</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <ChevronRight size={16} className="text-yellow-500" />
                </div>
                <div className="ml-2">
                  <p><span className="font-semibold">Liquidation risk:</span> Low with current market volatility</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <ChevronRight size={16} className="text-yellow-500" />
                </div>
                <div className="ml-2">
                  <p><span className="font-semibold">Market depth:</span> High liquidity for both SOL and ETH</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <ChevronRight size={16} className="text-yellow-500" />
                </div>
                <div className="ml-2">
                  <p><span className="font-semibold">Protocol risk:</span> Kamino has robust security measures and insurance</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareView; 