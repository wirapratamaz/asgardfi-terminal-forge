import React, { useState, useMemo } from 'react';
import { ChevronDown, Link as LinkIcon } from 'lucide-react';

const SolYieldsView = () => {
  // SOL Lending Rates data
  const lendingRatesData = [
    { protocol: 'solend', market: 'TURBO SOL', deposit_rate: 5.385 },
    { protocol: 'kamino', market: 'JITO', deposit_rate: 4.7 },
    { protocol: 'solend', market: 'JLP/SOL/USDC', deposit_rate: 4.588 },
    { protocol: 'drift', market: 'main', deposit_rate: 4.004 },
    { protocol: 'marginfi', market: 'main', deposit_rate: 3.04 },
    { protocol: 'kamino', market: 'main', deposit_rate: 2.798 },
    { protocol: 'solend', market: 'main', deposit_rate: 2.335 }
  ];

  // Staking Yields data
  const stakingYieldsData = [
    { token: 'STEAKSOL', apy: 20.635, total_sol_staked: 2067.883 },
    { token: 'XSOL', apy: 20.099, total_sol_staked: 2795.038 },
    { token: 'LUMISOL', apy: 13.082, total_sol_staked: 10871.254 },
    { token: 'YONTASOL', apy: 12.476, total_sol_staked: 9099.323 },
    { token: 'STKSOL', apy: 11.319, total_sol_staked: 25.734 },
    { token: 'INF', apy: 11.265, total_sol_staked: 627255.963 },
    { token: 'POLARSOL', apy: 10.467, total_sol_staked: 50593.57 },
    { token: 'RKSOL', apy: 10.423, total_sol_staked: 79003.769 },
    { token: 'PRGNSOL', apy: 10.211, total_sol_staked: 6040.196 },
    { token: 'SCTMSOL', apy: 10.183, total_sol_staked: 50442.252 }
  ];

  // Interest Rate Differentials data
  const differentialsData = [
    { protocol: 'Kamino', market: 'emode', deposit_token: 'hSOL', borrow_token: 'SOL', deposits_ui: 41743.533, borrows_ui: 3550106.471, deposit_asset_utilization: 2.628, borrow_asset_utilization: 71.134, effective_ltv: 0.87, max_leverage: 7 },
    { protocol: 'Kamino', market: 'emode', deposit_token: 'JupSOL', borrow_token: 'SOL', deposits_ui: 2148960.87, borrows_ui: 3550106.471, deposit_asset_utilization: 0.165, borrow_asset_utilization: 71.134, effective_ltv: 0.87, max_leverage: 7 },
    { protocol: 'Kamino', market: 'emode', deposit_token: 'MSOL', borrow_token: 'SOL', deposits_ui: 469210.497, borrows_ui: 3550106.471, deposit_asset_utilization: 1.529, borrow_asset_utilization: 71.134, effective_ltv: 0.87, max_leverage: 7 },
    { protocol: 'Kamino', market: 'emode', deposit_token: 'bSOL', borrow_token: 'SOL', deposits_ui: 185887.4, borrows_ui: 3550106.471, deposit_asset_utilization: 5.448, borrow_asset_utilization: 71.134, effective_ltv: 0.87, max_leverage: 7 },
    { protocol: 'Kamino', market: 'emode', deposit_token: 'ezSOL', borrow_token: 'SOL', deposits_ui: 355734.783, borrows_ui: 690073.977, deposit_asset_utilization: 0, borrow_asset_utilization: 84.496, effective_ltv: 0.9, max_leverage: 7 },
    { protocol: 'Kamino', market: 'emode', deposit_token: 'bonkSOL', borrow_token: 'SOL', deposits_ui: 32243.07, borrows_ui: 3550106.471, deposit_asset_utilization: 0.838, borrow_asset_utilization: 71.134, effective_ltv: 0.87, max_leverage: 7 },
    { protocol: 'Kamino', market: 'emode', deposit_token: 'hubSOL', borrow_token: 'SOL', deposits_ui: 17171.198, borrows_ui: 3550106.471, deposit_asset_utilization: 0.647, borrow_asset_utilization: 71.134, effective_ltv: 0.87, max_leverage: 7 },
    { protocol: 'Kamino', market: 'emode', deposit_token: 'bbSOL', borrow_token: 'SOL', deposits_ui: 8321.252, borrows_ui: 3550106.471, deposit_asset_utilization: 1.447, borrow_asset_utilization: 71.134, effective_ltv: 0.87, max_leverage: 7 },
    { protocol: 'Kamino', market: 'emode', deposit_token: 'JITOSOL', borrow_token: 'SOL', deposits_ui: 1055751.234, borrows_ui: 3550106.471, deposit_asset_utilization: 2.433, borrow_asset_utilization: 71.134, effective_ltv: 0.87, max_leverage: 7 },
    { protocol: 'Kamino', market: 'emode', deposit_token: 'vSOL', borrow_token: 'SOL', deposits_ui: 415165.178, borrows_ui: 3550106.471, deposit_asset_utilization: 0.212, borrow_asset_utilization: 71.134, effective_ltv: 0.87, max_leverage: 7 }
  ];

  // State for filter in Interest Rate Differentials
  const [minYieldFilter, setMinYieldFilter] = useState<string>('All');
  const [protocolFilter, setProtocolFilter] = useState<string>('All');
  const [marketFilter, setMarketFilter] = useState<string>('All');

  // Get unique values for filters
  const protocols = useMemo(() => ['All', ...new Set(differentialsData.map(item => item.protocol))], []);
  const markets = useMemo(() => ['All', ...new Set(differentialsData.map(item => item.market))], []);

  // Filter data based on selected filters
  const filteredDifferentialsData = useMemo(() => {
    return differentialsData.filter(item => 
      (protocolFilter === 'All' || item.protocol === protocolFilter) &&
      (marketFilter === 'All' || item.market === marketFilter)
    );
  }, [protocolFilter, marketFilter]);

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    } else {
      return num.toFixed(3);
    }
  };

  return (
    <div className="px-4 py-6 space-y-12">
      {/* SOL Lending Rates Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">SOL Lending Rates</h2>
          <LinkIcon size={18} className="text-terminal-text-secondary" />
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-terminal-text-secondary">Market Filter</span>
            <div className="relative w-48">
              <select className="w-full bg-terminal-background border border-gray-800 rounded-md p-2 pr-8 appearance-none">
                <option>All</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" size={16} />
            </div>
          </div>
          
          <div className="overflow-x-auto bg-terminal-card border border-gray-800 rounded-md">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-3 text-terminal-text-secondary font-medium">protocol</th>
                  <th className="text-left p-3 text-terminal-text-secondary font-medium">market</th>
                  <th className="text-right p-3 text-terminal-text-secondary font-medium">deposit_rate</th>
                </tr>
              </thead>
              <tbody>
                {lendingRatesData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-800 hover:bg-opacity-50 hover:bg-gray-800">
                    <td className="p-3">{item.protocol}</td>
                    <td className="p-3">{item.market}</td>
                    <td className="p-3 text-right font-mono">{item.deposit_rate.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Staking Yields Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">Staking Yields</h2>
          <LinkIcon size={18} className="text-terminal-text-secondary" />
        </div>
        
        <div className="overflow-x-auto bg-terminal-card border border-gray-800 rounded-md">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-3 text-terminal-text-secondary font-medium">token</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">apy</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">total_sol_staked</th>
              </tr>
            </thead>
            <tbody>
              {stakingYieldsData.map((item, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-opacity-50 hover:bg-gray-800">
                  <td className="p-3">{item.token}</td>
                  <td className="p-3 text-right font-mono">{item.apy.toFixed(3)}</td>
                  <td className="p-3 text-right font-mono">{formatNumber(item.total_sol_staked)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interest Rate Differentials Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold">Interest Rate Differentials</h2>
          <LinkIcon size={18} className="text-terminal-text-secondary" />
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-sm text-terminal-text-secondary mb-1">Min Yield</label>
            <div className="relative">
              <select 
                className="bg-terminal-background border border-gray-800 rounded-md p-2 pr-8 appearance-none w-[150px]"
                value={minYieldFilter}
                onChange={(e) => setMinYieldFilter(e.target.value)}
              >
                <option value="All">All</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" size={16} />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-terminal-text-secondary mb-1">Protocol</label>
            <div className="relative">
              <select 
                className="bg-terminal-background border border-gray-800 rounded-md p-2 pr-8 appearance-none w-[150px]"
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
            <label className="text-sm text-terminal-text-secondary mb-1">Market</label>
            <div className="relative">
              <select 
                className="bg-terminal-background border border-gray-800 rounded-md p-2 pr-8 appearance-none w-[150px]"
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
        </div>
        
        <div className="overflow-x-auto bg-terminal-card border border-gray-800 rounded-md">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-3 text-terminal-text-secondary font-medium">protocol</th>
                <th className="text-left p-3 text-terminal-text-secondary font-medium">market</th>
                <th className="text-left p-3 text-terminal-text-secondary font-medium">deposit_token</th>
                <th className="text-left p-3 text-terminal-text-secondary font-medium">borrow_token</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">deposits_ui</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">borrows_ui</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">deposit_asset_utilization</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">borrow_asset_utilization</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">effective_ltv</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">max_leverage</th>
              </tr>
            </thead>
            <tbody>
              {filteredDifferentialsData.map((item, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-opacity-50 hover:bg-gray-800">
                  <td className="p-3">{item.protocol}</td>
                  <td className="p-3">{item.market}</td>
                  <td className="p-3">{item.deposit_token}</td>
                  <td className="p-3">{item.borrow_token}</td>
                  <td className="p-3 text-right font-mono">{formatNumber(item.deposits_ui)}</td>
                  <td className="p-3 text-right font-mono">{formatNumber(item.borrows_ui)}</td>
                  <td className="p-3 text-right font-mono">{item.deposit_asset_utilization.toFixed(3)}</td>
                  <td className="p-3 text-right font-mono">{item.borrow_asset_utilization.toFixed(3)}</td>
                  <td className="p-3 text-right font-mono">{item.effective_ltv.toFixed(2)}</td>
                  <td className="p-3 text-right font-mono">{item.max_leverage.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SolYieldsView; 