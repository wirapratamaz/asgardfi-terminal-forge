import React, { useEffect, useRef } from 'react';

const LiquidationsView = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  // Mock data for the liquidations chart
  const liquidationData = {
    dates: ['Mar 16 2025', 'Mar 23', 'Mar 30', 'Apr 6', 'Apr 13'],
    protocols: [
      {
        name: 'drift',
        color: '#0067FF',
        values: [300, 600, 1200, 25000, 500]
      },
      {
        name: 'marginfi',
        color: '#4DA6FF',
        values: [200, 400, 800, 15000, 300]
      },
      {
        name: 'kamino',
        color: '#FF3131',
        values: [100, 200, 300, 6000, 200]
      }
    ]
  };

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

      // Get canvas dimensions
      const width = rect.width;
      const height = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Chart area dimensions
      const padding = { top: 30, right: 120, bottom: 60, left: 60 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;

      // Draw background
      ctx.fillStyle = '#111111';
      ctx.fillRect(0, 0, width, height);

      // Grid settings
      const gridColor = 'rgba(50, 50, 50, 0.8)';
      const textColor = 'rgba(180, 180, 180, 0.9)';

      // Calculate max value for scaling (add some padding for readability)
      const maxValue = Math.max(...liquidationData.protocols.flatMap(p => p.values)) * 1.1;
      
      // Y-axis ticks
      const yTicks = [0, 5000, 10000, 15000, 20000, 25000];
      
      // Draw horizontal grid lines and labels
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.textAlign = 'right';
      ctx.font = '11px Inter, system-ui, sans-serif';
      ctx.fillStyle = textColor;

      yTicks.forEach(tick => {
        const y = padding.top + chartHeight - (tick / maxValue * chartHeight);
        
        // Draw grid line
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + chartWidth, y);
        ctx.stroke();
        
        // Draw y-axis label
        const formattedTick = tick === 0 ? '0' : 
                             tick < 1000 ? tick.toString() :
                             `${Math.round(tick / 1000)}k`;
        ctx.fillText(formattedTick, padding.left - 10, y + 4);
      });
      
      // X-axis ticks and labels
      const xStep = chartWidth / (liquidationData.dates.length - 1);
      
      // Draw x-axis grid and labels
      liquidationData.dates.forEach((date, i) => {
        const x = padding.left + i * xStep;
        
        // Draw vertical grid line
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, padding.top + chartHeight);
        ctx.stroke();
        
        // Draw x-axis label
        ctx.textAlign = 'center';
        ctx.fillText(date, x, padding.top + chartHeight + 20);
      });
      
      // Axis labels
      ctx.font = '12px Inter, system-ui, sans-serif';
      ctx.fillStyle = textColor;
      
      // Y-axis title
      ctx.save();
      ctx.translate(15, height / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText('Number of Liquidations', 0, 0);
      ctx.restore();
      
      // X-axis title
      ctx.textAlign = 'center';
      ctx.fillText('Date', width / 2, height - 15);
      
      // Draw data lines
      liquidationData.protocols.forEach(protocol => {
        ctx.strokeStyle = protocol.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        protocol.values.forEach((value, i) => {
          const x = padding.left + i * xStep;
          const y = padding.top + chartHeight - (value / maxValue * chartHeight);
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          
          // Draw data points
          ctx.fillStyle = protocol.color;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        });
        
        ctx.stroke();
      });
      
      // Draw legend
      const legendY = padding.top + 20;
      const legendSpacing = 25;
      
      liquidationData.protocols.forEach((protocol, i) => {
        const legendX = width - padding.right + 10;
        const itemY = legendY + i * legendSpacing;
        
        // Legend line
        ctx.strokeStyle = protocol.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(legendX, itemY);
        ctx.lineTo(legendX + 20, itemY);
        ctx.stroke();
        
        // Legend text
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Inter, system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(protocol.name, legendX + 30, itemY + 4);
      });
    }
  }, [chartRef]);

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Protocol Liquidations Over Time</h1>
      
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Liquidations by Protocol Over Time</h2>
        <div className="bg-terminal-background-secondary rounded-lg p-6 h-96">
          <canvas 
            ref={chartRef} 
            className="w-full h-full"
          ></canvas>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-terminal-background-secondary rounded-lg p-6">
          <h3 className="text-lg font-medium mb-3">Total Liquidations</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Drift</p>
              <p className="text-2xl font-bold">27,600</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">% of All</p>
              <p className="text-2xl font-bold">54.1%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-terminal-background-secondary rounded-lg p-6">
          <h3 className="text-lg font-medium mb-3">Total Liquidations</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">MarginFi</p>
              <p className="text-2xl font-bold">16,700</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">% of All</p>
              <p className="text-2xl font-bold">32.7%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-terminal-background-secondary rounded-lg p-6">
          <h3 className="text-lg font-medium mb-3">Total Liquidations</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Kamino</p>
              <p className="text-2xl font-bold">6,800</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">% of All</p>
              <p className="text-2xl font-bold">13.3%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidationsView; 