import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

const StablecoinYieldsView = () => {
  // Yield-Bearing Stablecoins data
  const yieldBearingData = [
    { token: 'SUSDE', apy: 4.873 },
    { token: 'USDY', apy: 4.35 }
  ];

  // Stablecoin Lending Yields data
  const lendingYieldsData = [
    { protocol: 'kamino', market: 'main', token: 'FDUSD', deposit_rate: 16.202, endogenous_yield: 0 },
    { protocol: 'solend', market: 'Limited USDC Debt', token: 'USDC', deposit_rate: 14.216, endogenous_yield: 0 },
    { protocol: 'drift', market: 'JLP', token: 'USDC', deposit_rate: 5.183, endogenous_yield: 0 },
    { protocol: 'solend', market: 'JLP', token: 'USDS', deposit_rate: 4.004, endogenous_yield: 0 },
    { protocol: 'marginfi', market: 'main', token: 'USDS', deposit_rate: 3.826, endogenous_yield: 0 },
    { protocol: 'kamino', market: 'main', token: 'USDC', deposit_rate: 3.739, endogenous_yield: 0 },
    { protocol: 'drift', market: 'main', token: 'USDC', deposit_rate: 3.724, endogenous_yield: 0 },
    { protocol: 'kamino', market: 'JLP', token: 'USDC', deposit_rate: 3.568, endogenous_yield: 0 },
    { protocol: 'kamino', market: 'altcoin', token: 'USDC', deposit_rate: 3.394, endogenous_yield: 0 },
    { protocol: 'marginfi', market: 'main', token: 'PYUSD', deposit_rate: 3.348, endogenous_yield: 0 }
  ];

  // State for filters
  const [protocolFilter, setProtocolFilter] = useState<string>('All');
  const [marketFilter, setMarketFilter] = useState<string>('All');
  const [tokenFilter, setTokenFilter] = useState<string>('All');

  // Get unique values for filters
  const protocols = useMemo(() => ['All', ...new Set(lendingYieldsData.map(item => item.protocol))], []);
  const markets = useMemo(() => ['All', ...new Set(lendingYieldsData.map(item => item.market))], []);
  const tokens = useMemo(() => ['All', ...new Set(lendingYieldsData.map(item => item.token))], []);

  // Filter data based on selected filters
  const filteredLendingData = useMemo(() => {
    return lendingYieldsData.filter(item => 
      (protocolFilter === 'All' || item.protocol === protocolFilter) &&
      (marketFilter === 'All' || item.market === marketFilter) &&
      (tokenFilter === 'All' || item.token === tokenFilter)
    );
  }, [protocolFilter, marketFilter, tokenFilter]);

  return (
    <div className="px-4 py-6">
      {/* Yield-Bearing Stablecoins */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Yield-Bearing Stablecoins</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-2 text-terminal-text-secondary font-medium">token</th>
                <th className="text-right p-2 text-terminal-text-secondary font-medium">apy</th>
              </tr>
            </thead>
            <tbody>
              {yieldBearingData.map((item, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-terminal-background-secondary">
                  <td className="p-2">{item.token}</td>
                  <td className="p-2 text-right">{item.apy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stablecoin Lending Yields */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Stablecoin Lending Yields</h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-sm text-terminal-text-secondary mb-1">Protocol Filter</label>
            <div className="relative">
              <select 
                className="bg-terminal-background border border-gray-800 rounded-md p-2 pr-8 appearance-none w-[200px]"
                value={protocolFilter}
                onChange={(e) => setProtocolFilter(e.target.value)}
              >
                {protocols.map(protocol => (
                  <option key={protocol} value={protocol}>{protocol}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" size={16} />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-terminal-text-secondary mb-1">Market Filter</label>
            <div className="relative">
              <select 
                className="bg-terminal-background border border-gray-800 rounded-md p-2 pr-8 appearance-none w-[200px]"
                value={marketFilter}
                onChange={(e) => setMarketFilter(e.target.value)}
              >
                {markets.map(market => (
                  <option key={market} value={market}>{market}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" size={16} />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-terminal-text-secondary mb-1">Token Filter</label>
            <div className="relative">
              <select 
                className="bg-terminal-background border border-gray-800 rounded-md p-2 pr-8 appearance-none w-[200px]"
                value={tokenFilter}
                onChange={(e) => setTokenFilter(e.target.value)}
              >
                {tokens.map(token => (
                  <option key={token} value={token}>{token}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" size={16} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-2 text-terminal-text-secondary font-medium">protocol</th>
                <th className="text-left p-2 text-terminal-text-secondary font-medium">market</th>
                <th className="text-left p-2 text-terminal-text-secondary font-medium">token</th>
                <th className="text-right p-2 text-terminal-text-secondary font-medium">deposit_rate</th>
                <th className="text-right p-2 text-terminal-text-secondary font-medium">endogenous_yield</th>
              </tr>
            </thead>
            <tbody>
              {filteredLendingData.map((item, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-terminal-background-secondary">
                  <td className="p-2">{item.protocol}</td>
                  <td className="p-2">{item.market}</td>
                  <td className="p-2">{item.token}</td>
                  <td className="p-2 text-right">{item.deposit_rate}</td>
                  <td className="p-2 text-right">{item.endogenous_yield}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StablecoinYieldsView; 