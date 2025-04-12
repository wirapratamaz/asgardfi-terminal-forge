import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

const SwapRecommendationsView = () => {
  // State for filters
  const [protocol, setProtocol] = useState('kamino');
  const [market, setMarket] = useState('main');
  const [token, setToken] = useState('USDC');
  const [type, setType] = useState('collateral');

  // Mock data for swap recommendations
  const recommendationsData = [
    { token: 'JLP', deposit_rate: 0, endogenous_yield: 0, apy: 41.77, apy_difference: 41.77, difference: 36.168 },
    { token: 'hSOL', deposit_rate: 0.003, endogenous_yield: 0, apy: 8.536, apy_difference: 8.539, difference: 4.938 },
    { token: 'JupSOL', deposit_rate: 0, endogenous_yield: 0, apy: 8.379, apy_difference: 8.379, difference: 4.778 },
    { token: 'MSOL', deposit_rate: 0.001, endogenous_yield: 0, apy: 8.321, apy_difference: 8.322, difference: 4.721 },
    { token: 'bSOL', deposit_rate: 0.015, endogenous_yield: 0, apy: 8.092, apy_difference: 8.107, difference: 4.506 },
    { token: 'bonkSOL', deposit_rate: 0, endogenous_yield: 0, apy: 7.808, apy_difference: 7.808, difference: 4.207 },
    { token: 'hubSOL', deposit_rate: 0, endogenous_yield: 0, apy: 7.757, apy_difference: 7.757, difference: 4.156 },
    { token: 'bbSOL', deposit_rate: 0.001, endogenous_yield: 0, apy: 7.661, apy_difference: 7.662, difference: 4.06 },
    { token: 'JITOSOL', deposit_rate: 0.004, endogenous_yield: 0, apy: 7.645, apy_difference: 7.649, difference: 4.048 },
    { token: 'vSOL', deposit_rate: 0, endogenous_yield: 0, apy: 7.376, apy_difference: 7.376, difference: 3.775 }
  ];

  // Available protocols, markets, tokens, and types (would come from API in a real app)
  const protocols = ['kamino', 'marginfi', 'solend', 'drift'];
  const markets = ['main', 'altcoin', 'JLP'];
  const tokens = ['USDC', 'SOL', 'ETH', 'BTC', 'USDT'];
  const types = ['collateral', 'borrow'];

  // Format number with proper decimal places
  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 3
    });
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">All Recommendations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Protocol Filter */}
        <div>
          <label className="block text-sm text-terminal-text-secondary mb-2">Protocol</label>
          <div className="relative">
            <select
              value={protocol}
              onChange={(e) => setProtocol(e.target.value)}
              className="w-full bg-transparent border border-gray-800 rounded-md p-3 pr-10 appearance-none text-white"
            >
              {protocols.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" />
          </div>
        </div>
        
        {/* Market Filter */}
        <div>
          <label className="block text-sm text-terminal-text-secondary mb-2">Market</label>
          <div className="relative">
            <select
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              className="w-full bg-transparent border border-gray-800 rounded-md p-3 pr-10 appearance-none text-white"
            >
              {markets.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" />
          </div>
        </div>
        
        {/* Token Filter */}
        <div>
          <label className="block text-sm text-terminal-text-secondary mb-2">Token</label>
          <div className="relative">
            <select
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full bg-transparent border border-gray-800 rounded-md p-3 pr-10 appearance-none text-white"
            >
              {tokens.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" />
          </div>
        </div>
        
        {/* Type Filter */}
        <div>
          <label className="block text-sm text-terminal-text-secondary mb-2">Type</label>
          <div className="relative">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-transparent border border-gray-800 rounded-md p-3 pr-10 appearance-none text-white"
            >
              {types.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" />
          </div>
        </div>
      </div>
      
      {/* Recommendations Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-3 text-terminal-text-secondary font-medium">token</th>
              <th className="text-right p-3 text-terminal-text-secondary font-medium">deposit_rate</th>
              <th className="text-right p-3 text-terminal-text-secondary font-medium">endogenous_yield</th>
              <th className="text-right p-3 text-terminal-text-secondary font-medium">apy</th>
              <th className="text-right p-3 text-terminal-text-secondary font-medium">apy_difference</th>
              <th className="text-right p-3 text-terminal-text-secondary font-medium">∆</th>
            </tr>
          </thead>
          <tbody>
            {recommendationsData.map((item, index) => (
              <tr 
                key={index} 
                className={`border-b border-gray-800 hover:bg-terminal-background-secondary`}
              >
                <td className="p-3 font-medium">{item.token}</td>
                <td className="p-3 text-right font-mono">{item.deposit_rate || 0}</td>
                <td className="p-3 text-right font-mono">{item.endogenous_yield || 0}</td>
                <td className="p-3 text-right font-mono">{formatNumber(item.apy)}</td>
                <td className="p-3 text-right font-mono">{formatNumber(item.apy_difference)}</td>
                <td className="p-3 text-right font-mono">
                  <span className="text-green-500">{formatNumber(item.difference)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Summary Card */}
      <div className="mt-8 bg-terminal-background-secondary rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Swap Recommendation Summary</h3>
        <p className="mb-2">Based on current market conditions, we recommend the following swaps:</p>
        <ul className="space-y-2 list-disc pl-5">
          <li>Consider swapping to <span className="font-bold">JLP</span> for the highest APY (41.77%)</li>
          <li>For liquid staked SOL, <span className="font-bold">hSOL</span> currently offers the best yield (8.539%)</li>
          <li>All liquid staked SOL tokens provide 3.7%+ better returns than regular SOL</li>
        </ul>
      </div>
    </div>
  );
};

export default SwapRecommendationsView; 