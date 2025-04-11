import React from 'react';
import { Link as LinkIcon } from 'lucide-react';

const JLPYieldsView = () => {
  // JLP Yields data
  const jlpYieldsData = [
    { token: 'JLP', apy: 41.77 }
  ];

  // JLP Drift Vaults data
  const jlpDriftVaultsData = [
    { name: 'NeutralizedJLP-Neutral-Trade', total_deposits: 1538648, total_withdraws: 1247105, net_deposits: 291543, min_deposit_amount: 1, apy_7d: 80.18, apy_30d: 5.831, apy_90d: 329.966 },
    { name: 'Gauntlet - hJLP (In Kind)', total_deposits: 975161, total_withdraws: 524549, net_deposits: 450612, min_deposit_amount: 25, apy_7d: -1.628, apy_30d: 2.924, apy_90d: 17.464 },
    { name: 'Lucky Vault 02', total_deposits: 1139257, total_withdraws: 97218, net_deposits: 1042038, min_deposit_amount: 10, apy_7d: -4.029, apy_30d: -4.472, apy_90d: -0.903 },
    { name: 'Lucky Vault 11', total_deposits: 100000, total_withdraws: 0, net_deposits: 100000, min_deposit_amount: 10, apy_7d: -100, apy_30d: -100, apy_90d: -100 }
  ];

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

  // Format large numbers
  const formatNumber = (num: number | null) => {
    if (num === null) return 'N/A';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    } else {
      return num.toFixed(num % 1 === 0 ? 0 : 3);
    }
  };

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
      {/* JLP Yields Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">JLP Yields</h2>
        </div>
        
        <div className="overflow-x-auto bg-terminal-card border border-gray-800 rounded-md">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-3 text-terminal-text-secondary font-medium">token</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">apy</th>
              </tr>
            </thead>
            <tbody>
              {jlpYieldsData.map((item, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-opacity-50 hover:bg-gray-800">
                  <td className="p-3">{item.token}</td>
                  <td className="p-3 text-right font-mono">{item.apy.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* JLP Drift Vaults Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">JLP Drift Vaults</h2>
          <LinkIcon size={18} className="text-terminal-text-secondary" />
        </div>
        
        <div className="overflow-x-auto bg-terminal-card border border-gray-800 rounded-md">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-3 text-terminal-text-secondary font-medium">name</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">total_deposits</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">total_withdraws</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">net_deposits</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">min_deposit_amount</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">apy_7d</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">apy_30d</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">apy_90d</th>
              </tr>
            </thead>
            <tbody>
              {jlpDriftVaultsData.map((item, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-opacity-50 hover:bg-gray-800">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3 text-right font-mono">{formatNumber(item.total_deposits)}</td>
                  <td className="p-3 text-right font-mono">{formatNumber(item.total_withdraws)}</td>
                  <td className="p-3 text-right font-mono">{formatNumber(item.net_deposits)}</td>
                  <td className="p-3 text-right font-mono">{item.min_deposit_amount}</td>
                  <td className="p-3 text-right font-mono">{formatApy(item.apy_7d)}</td>
                  <td className="p-3 text-right font-mono">{formatApy(item.apy_30d)}</td>
                  <td className="p-3 text-right font-mono">{formatApy(item.apy_90d)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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

export default JLPYieldsView; 