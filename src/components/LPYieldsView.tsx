import React from 'react';
import { Link as LinkIcon } from 'lucide-react';

const LPYieldsView = () => {
  // Flash LP Yields data
  const flashLPYieldsData = [
    { token: 'FLP.1', daily_apy: null, weekly_apy: 28.543, weekly_apy_value: 11.233 },
    { token: 'FLP.2', daily_apy: null, weekly_apy: 0.791, weekly_apy_value: 30.288 },
    { token: 'FLP.3', daily_apy: null, weekly_apy: 15.397, weekly_apy_value: 43.25 },
    { token: 'FLP.4', daily_apy: null, weekly_apy: 2.74, weekly_apy_value: 10.218 },
    { token: 'FLP.5', daily_apy: null, weekly_apy: 25.855, weekly_apy_value: 67.353 },
    { token: 'FLP.6', daily_apy: null, weekly_apy: 0, weekly_apy_value: 0.877 },
    { token: 'FLP.7', daily_apy: null, weekly_apy: 1.83, weekly_apy_value: 15.993 }
  ];

  // Adrena LP Yields data
  const adrenaLPYieldsData = [
    { token: 'ALP', weekly_apy: 129.767 },
    { token: 'ADX', weekly_apy: 125.878 }
  ];

  // Format APY with color based on value
  const formatApy = (apy: number) => {
    const colorClass = apy < 0 ? 'text-red-500' : apy > 0 ? 'text-green-500' : '';
    return (
      <span className={`${colorClass}`}>
        {apy.toFixed(3)}
      </span>
    );
  };

  return (
    <div className="px-4 py-6 space-y-12">
      {/* Flash LP Yields Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">Flash LP Yields</h2>
          <LinkIcon size={18} className="text-terminal-text-secondary" />
        </div>
        
        <div className="overflow-x-auto bg-terminal-card border border-gray-800 rounded-md">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-3 text-terminal-text-secondary font-medium">token</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">daily_apy</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">weekly_apy</th>
              </tr>
            </thead>
            <tbody>
              {flashLPYieldsData.map((item, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-opacity-50 hover:bg-gray-800">
                  <td className="p-3">{item.token}</td>
                  <td className="p-3 text-right font-mono">
                    {item.daily_apy === null ? '-' : formatApy(item.daily_apy)}
                  </td>
                  <td className="p-3 text-right font-mono">{formatApy(item.weekly_apy_value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adrena LP Yields Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">Adrena LP Yields</h2>
          <LinkIcon size={18} className="text-terminal-text-secondary" />
        </div>
        
        <div className="overflow-x-auto bg-terminal-card border border-gray-800 rounded-md">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-3 text-terminal-text-secondary font-medium">token</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">weekly_apy</th>
              </tr>
            </thead>
            <tbody>
              {adrenaLPYieldsData.map((item, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-opacity-50 hover:bg-gray-800">
                  <td className="p-3">{item.token}</td>
                  <td className="p-3 text-right font-mono">{formatApy(item.weekly_apy)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LPYieldsView; 
 