import React, { useState, useMemo } from 'react';
import { ChevronDown, ArrowUpDown, Filter, ChevronRight, BarChart3, TrendingUp, Percent, Search, Sliders, ArrowUpCircle, ArrowDownCircle, Info } from 'lucide-react';

const ProtocolView = () => {
  const [selectedProtocol, setSelectedProtocol] = useState('kamino');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [sortColumn, setSortColumn] = useState('token');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [minUtilization, setMinUtilization] = useState(0);

  // Mock data based on the screenshot
  const protocolData = [
    { token: 'JTO', market: 'altcoin', deposits_ui: '61556.42', borrows_ui: '3.017', available_liquidity_ui: '61553.403', endogenous_yield: '0', deposit_rate: '0', borrow_rate: '0.005', utilization_rate: '0.005', asset_weight_init: '0.2' },
    { token: 'INF', market: 'altcoin', deposits_ui: '34933.022', borrows_ui: '0', available_liquidity_ui: '34933.022', endogenous_yield: '11.265', deposit_rate: '0', borrow_rate: '0', utilization_rate: '0', asset_weight_init: '0' },
    { token: 'WIF', market: 'altcoin', deposits_ui: '8375592.014', borrows_ui: '339.229', available_liquidity_ui: '8375252.786', endogenous_yield: '0', deposit_rate: '0', borrow_rate: '0.004', utilization_rate: '0.004', asset_weight_init: '0.3' },
    { token: 'PYUSD', market: 'altcoin', deposits_ui: '442516.321', borrows_ui: '248041.777', available_liquidity_ui: '194474.545', endogenous_yield: '0', deposit_rate: '2.952', borrow_rate: '6.386', utilization_rate: '56.053', asset_weight_init: '0' },
    { token: 'USDC', market: 'altcoin', deposits_ui: '2977100.244', borrows_ui: '1373314.514', available_liquidity_ui: '1603785.729', endogenous_yield: '0', deposit_rate: '3.394', borrow_rate: '9.467', utilization_rate: '46.129', asset_weight_init: '0.65' },
    { token: 'SOL', market: 'main', deposits_ui: '4990736.211', borrows_ui: '3550106.471', available_liquidity_ui: '1440629.74', endogenous_yield: '0', deposit_rate: '2.798', borrow_rate: '4.67', utilization_rate: '71.134', asset_weight_init: '0.74' },
    { token: 'USDC', market: 'main', deposits_ui: '281932458.086', borrows_ui: '231174016.25', available_liquidity_ui: '50758441.836', endogenous_yield: '0', deposit_rate: '3.739', borrow_rate: '6.157', utilization_rate: '81.996', asset_weight_init: '0.8' },
    { token: 'JITOSOL', market: 'main', deposits_ui: '1055751.234', borrows_ui: '25684.521', available_liquidity_ui: '1030066.713', endogenous_yield: '7.645', deposit_rate: '0.003', borrow_rate: '1.165', utilization_rate: '2.433', asset_weight_init: '0.59' },
    { token: 'USDT', market: 'main', deposits_ui: '35617065.539', borrows_ui: '17583541.268', available_liquidity_ui: '18033524.271', endogenous_yield: '0', deposit_rate: '1.091', borrow_rate: '3.818', utilization_rate: '49.368', asset_weight_init: '0.8' },
    { token: 'USDS', market: 'main', deposits_ui: '64157591.365', borrows_ui: '34244545.407', available_liquidity_ui: '29913045.958', endogenous_yield: '0', deposit_rate: '1.678', borrow_rate: '3.973', utilization_rate: '53.376', asset_weight_init: '0.8' }
  ];

  // Available protocols and markets
  const protocols = ['kamino', 'marginfi', 'solend', 'drift'];
  const markets = useMemo(() => {
    const uniqueMarkets = [...new Set(protocolData.map(item => item.market))];
    return ['all', ...uniqueMarkets];
  }, [protocolData]);

  // Calculate protocol summary data
  const summaryData = useMemo(() => {
    const totalDeposits = protocolData.reduce((acc, curr) => {
      const value = parseFloat(curr.deposits_ui.replace(/,/g, ''));
      return acc + (isNaN(value) ? 0 : value);
    }, 0);
    
    const totalBorrows = protocolData.reduce((acc, curr) => {
      const value = parseFloat(curr.borrows_ui.replace(/,/g, ''));
      return acc + (isNaN(value) ? 0 : value);
    }, 0);
    
    const avgUtilization = totalDeposits > 0 ? (totalBorrows / totalDeposits) * 100 : 0;
    
    const marketTvl: Record<string, number> = {};
    protocolData.forEach(item => {
      if (!marketTvl[item.market]) {
        marketTvl[item.market] = 0;
      }
      marketTvl[item.market] += parseFloat(item.deposits_ui.replace(/,/g, '')) || 0;
    });
    
    const topMarket = Object.entries(marketTvl)
      .sort((a, b) => b[1] - a[1])
      .map(([market]) => market)[0] || "N/A";
      
    const totalMarkets = [...new Set(protocolData.map(item => item.market))].length;
    
    // Calculate weighted average deposit and borrow rates
    let weightedDepositRate = 0;
    let weightedBorrowRate = 0;
    let totalDepositWeight = 0;
    let totalBorrowWeight = 0;
    
    protocolData.forEach(item => {
      const deposit = parseFloat(item.deposits_ui.replace(/,/g, '')) || 0;
      const borrow = parseFloat(item.borrows_ui.replace(/,/g, '')) || 0;
      const depositRate = parseFloat(item.deposit_rate) || 0;
      const borrowRate = parseFloat(item.borrow_rate) || 0;
      
      weightedDepositRate += deposit * depositRate;
      totalDepositWeight += deposit;
      
      weightedBorrowRate += borrow * borrowRate;
      totalBorrowWeight += borrow;
    });
    
    const avgDepositRate = totalDepositWeight > 0 ? weightedDepositRate / totalDepositWeight : 0;
    const avgBorrowRate = totalBorrowWeight > 0 ? weightedBorrowRate / totalBorrowWeight : 0;
    
    return {
      totalDeposits,
      totalBorrows,
      totalLiquidity: totalDeposits - totalBorrows,
      avgUtilization,
      topMarket,
      totalMarkets,
      avgDepositRate,
      avgBorrowRate
    };
  }, [protocolData]);

  // Format numbers for display
  const formatCurrency = (value: number | string) => {
    const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(num)) return '0';
    
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    } else {
      return num.toFixed(3);
    }
  };

  const formatPercent = (value: number | string) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? '0%' : `${num.toFixed(2)}%`;
  };

  // Filter and sort the data
  const filteredAndSortedData = useMemo(() => {
    let filtered = protocolData;
    
    // Apply market filter
    if (selectedMarket !== 'all') {
      filtered = filtered.filter(item => item.market === selectedMarket);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.token.toLowerCase().includes(term) || 
        item.market.toLowerCase().includes(term)
      );
    }
    
    // Apply utilization filter
    if (minUtilization > 0) {
      filtered = filtered.filter(item => parseFloat(item.utilization_rate) >= minUtilization);
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      // Handle numeric values
      if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
        const numA = parseFloat(aValue);
        const numB = parseFloat(bValue);
        return sortDirection === 'asc' ? numA - numB : numB - numA;
      }
      
      // Handle string values
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    });
  }, [selectedMarket, sortColumn, sortDirection, protocolData, searchTerm, minUtilization]);

  // Handle sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Calculate token distribution
  const tokenDistribution = useMemo(() => {
    const tokens: Record<string, number> = {};
    protocolData.forEach(item => {
      if (!tokens[item.token]) {
        tokens[item.token] = 0;
      }
      tokens[item.token] += parseFloat(item.deposits_ui.replace(/,/g, '')) || 0;
    });
    
    // Convert to array and sort by value
    return Object.entries(tokens)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([token, amount]) => ({ token, amount }));
  }, [protocolData]);

  return (
    <div className="px-4 py-6">
      {/* Protocol selector with enhanced UI */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex-1 max-w-md">
          <label className="block text-sm text-terminal-text-secondary mb-2 font-medium">Protocol</label>
          <div className="relative">
            <select
              value={selectedProtocol}
              onChange={(e) => setSelectedProtocol(e.target.value)}
              className="w-full bg-terminal-background border border-gray-800 rounded-md p-3 pr-10 appearance-none text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {protocols.map(p => (
                <option key={p} value={p} className="bg-terminal-background-secondary text-white">{p.charAt(0).toUpperCase() + p.slice(1)}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" />
          </div>
        </div>
        
        <div className="flex-1 max-w-md">
          <label className="block text-sm text-terminal-text-secondary mb-2 font-medium">Market</label>
          <div className="relative">
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="w-full bg-terminal-background border border-gray-800 rounded-md p-3 pr-10 appearance-none text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {markets.map(m => (
                <option key={m} value={m} className="bg-terminal-background-secondary text-white">
                  {m === 'all' ? 'All Markets' : m.charAt(0).toUpperCase() + m.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" />
          </div>
        </div>
      </div>
      
      {/* Enhanced Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-terminal-background-secondary rounded-lg p-5 border border-gray-800 hover:border-blue-500 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm text-terminal-text-secondary">Total Value Locked</h3>
              <p className="text-2xl font-bold mt-1">${formatCurrency(summaryData.totalDeposits)}</p>
              <p className="text-xs text-terminal-text-secondary mt-1">
                Across {summaryData.totalMarkets} markets
              </p>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-full">
              <BarChart3 className="text-blue-400" size={20} />
            </div>
          </div>
          <div className="flex justify-between mt-2 pt-2 border-t border-gray-800">
            <div>
              <p className="text-xs text-terminal-text-secondary">Borrowed</p>
              <p className="text-sm font-medium">${formatCurrency(summaryData.totalBorrows)}</p>
            </div>
            <div>
              <p className="text-xs text-terminal-text-secondary">Available</p>
              <p className="text-sm font-medium">${formatCurrency(summaryData.totalLiquidity)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-terminal-background-secondary rounded-lg p-5 border border-gray-800 hover:border-green-500 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm text-terminal-text-secondary">Utilization</h3>
              <p className="text-2xl font-bold mt-1">{formatPercent(summaryData.avgUtilization)}</p>
              <p className="text-xs text-terminal-text-secondary mt-1">
                Protocol average
              </p>
            </div>
            <div className="p-2 bg-green-500/10 rounded-full">
              <Percent className="text-green-400" size={20} />
            </div>
          </div>
          <div className="flex justify-between mt-2 pt-2 border-t border-gray-800">
            <div>
              <p className="text-xs text-terminal-text-secondary">Top Market</p>
              <p className="text-sm font-medium capitalize">{summaryData.topMarket}</p>
            </div>
            <div>
              <p className="text-xs text-terminal-text-secondary">Markets</p>
              <p className="text-sm font-medium">{summaryData.totalMarkets}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-terminal-background-secondary rounded-lg p-5 border border-gray-800 hover:border-yellow-500 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm text-terminal-text-secondary">Interest Rates</h3>
              <div className="flex items-center mt-1 gap-2">
                <ArrowUpCircle className="text-green-400" size={16} />
                <p className="text-lg font-bold">{formatPercent(summaryData.avgDepositRate)}</p>
              </div>
              <div className="flex items-center mt-1 gap-2">
                <ArrowDownCircle className="text-red-400" size={16} />
                <p className="text-lg font-bold">{formatPercent(summaryData.avgBorrowRate)}</p>
              </div>
            </div>
            <div className="p-2 bg-yellow-500/10 rounded-full">
              <TrendingUp className="text-yellow-400" size={20} />
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-800">
            <p className="text-xs text-terminal-text-secondary">Spread</p>
            <p className="text-sm font-medium">{formatPercent(summaryData.avgBorrowRate - summaryData.avgDepositRate)}</p>
          </div>
        </div>
        
        <div className="bg-terminal-background-secondary rounded-lg p-5 border border-gray-800 hover:border-purple-500 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm text-terminal-text-secondary">Top Tokens</h3>
              <p className="text-2xl font-bold mt-1">
                {tokenDistribution[0]?.token || ''}
              </p>
              <p className="text-xs text-terminal-text-secondary mt-1">
                ${formatCurrency(tokenDistribution[0]?.amount || 0)} deposited
              </p>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-full">
              <TrendingUp className="text-purple-400" size={20} />
            </div>
          </div>
          <div className="space-y-2 mt-2 pt-2 border-t border-gray-800">
            {tokenDistribution.slice(1, 4).map((item, index) => (
              <div key={index} className="flex justify-between">
                <p className="text-sm">{item.token}</p>
                <p className="text-sm font-medium">${formatCurrency(item.amount)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Advanced filters */}
      <div className="mb-6">
        <div className="flex items-center justify-between bg-terminal-background-secondary rounded-lg p-4 border border-gray-800">
          <div className="flex items-center">
            <Filter size={16} className="mr-2 text-terminal-text-secondary" />
            <h2 className="text-lg font-medium">Market Data</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" size={16} />
              <input
                type="text"
                placeholder="Search by token or market..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-terminal-background border border-gray-800 rounded-md py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-terminal-background px-3 py-2 rounded-md border border-gray-800 hover:bg-terminal-background-secondary transition-all"
            >
              <Sliders size={16} />
              <span className="text-sm">Filters</span>
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="bg-terminal-background-secondary rounded-lg p-4 mt-2 border border-gray-800">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm text-terminal-text-secondary mb-2">Min. Utilization Rate (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={minUtilization}
                  onChange={(e) => setMinUtilization(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-terminal-text-secondary mt-1">
                  <span>0%</span>
                  <span>{minUtilization}%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex gap-2 items-center">
                  <Info size={14} className="text-terminal-text-secondary" />
                  <p className="text-sm text-terminal-text-secondary">
                    {filteredAndSortedData.length} results after filtering
                  </p>
                </div>
                
                <button 
                  onClick={() => {setMinUtilization(0); setSearchTerm('');}}
                  className="text-sm text-blue-400 hover:text-blue-300 mt-2"
                >
                  Reset filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Enhanced Data table */}
      <div className="overflow-x-auto bg-terminal-background-secondary rounded-lg p-4 border border-gray-800">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="border-b border-gray-800">
              <th 
                className="text-left p-3 text-terminal-text-secondary font-medium cursor-pointer" 
                onClick={() => handleSort('token')}
              >
                <div className="flex items-center">
                  <span>Token</span>
                  {sortColumn === 'token' && (
                    <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th 
                className="text-left p-3 text-terminal-text-secondary font-medium cursor-pointer"
                onClick={() => handleSort('market')}
              >
                <div className="flex items-center">
                  <span>Market</span>
                  {sortColumn === 'market' && (
                    <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th 
                className="text-right p-3 text-terminal-text-secondary font-medium cursor-pointer"
                onClick={() => handleSort('deposits_ui')}
              >
                <div className="flex items-center justify-end">
                  <span>Deposits</span>
                  {sortColumn === 'deposits_ui' && (
                    <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th 
                className="text-right p-3 text-terminal-text-secondary font-medium cursor-pointer"
                onClick={() => handleSort('borrows_ui')}
              >
                <div className="flex items-center justify-end">
                  <span>Borrows</span>
                  {sortColumn === 'borrows_ui' && (
                    <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th 
                className="text-right p-3 text-terminal-text-secondary font-medium cursor-pointer"
                onClick={() => handleSort('available_liquidity_ui')}
              >
                <div className="flex items-center justify-end">
                  <span>Available</span>
                  {sortColumn === 'available_liquidity_ui' && (
                    <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th 
                className="text-right p-3 text-terminal-text-secondary font-medium cursor-pointer"
                onClick={() => handleSort('endogenous_yield')}
              >
                <div className="flex items-center justify-end">
                  <span>Yield</span>
                  {sortColumn === 'endogenous_yield' && (
                    <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th 
                className="text-right p-3 text-terminal-text-secondary font-medium cursor-pointer"
                onClick={() => handleSort('deposit_rate')}
              >
                <div className="flex items-center justify-end">
                  <span>Deposit Rate</span>
                  {sortColumn === 'deposit_rate' && (
                    <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th 
                className="text-right p-3 text-terminal-text-secondary font-medium cursor-pointer"
                onClick={() => handleSort('borrow_rate')}
              >
                <div className="flex items-center justify-end">
                  <span>Borrow Rate</span>
                  {sortColumn === 'borrow_rate' && (
                    <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th 
                className="text-right p-3 text-terminal-text-secondary font-medium cursor-pointer"
                onClick={() => handleSort('utilization_rate')}
              >
                <div className="flex items-center justify-end">
                  <span>Utilization</span>
                  {sortColumn === 'utilization_rate' && (
                    <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th 
                className="text-right p-3 text-terminal-text-secondary font-medium cursor-pointer"
                onClick={() => handleSort('asset_weight_init')}
              >
                <div className="flex items-center justify-end">
                  <span>Weight</span>
                  {sortColumn === 'asset_weight_init' && (
                    <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.length > 0 ? (
              filteredAndSortedData.map((row, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-terminal-background-secondary/80 transition-colors">
                  <td className="p-3 font-medium">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2 text-xs font-bold">
                        {row.token.substring(0, 2)}
                      </div>
                      {row.token}
                    </div>
                  </td>
                  <td className="p-3 capitalize">{row.market}</td>
                  <td className="p-3 text-right font-mono text-green-400">${formatCurrency(row.deposits_ui)}</td>
                  <td className="p-3 text-right font-mono text-red-400">${formatCurrency(row.borrows_ui)}</td>
                  <td className="p-3 text-right font-mono">${formatCurrency(row.available_liquidity_ui)}</td>
                  <td className="p-3 text-right font-mono">
                    {parseFloat(row.endogenous_yield) > 0 
                      ? <span className="text-green-400">{formatPercent(row.endogenous_yield)}</span> 
                      : formatPercent(row.endogenous_yield)}
                  </td>
                  <td className="p-3 text-right font-mono">
                    {parseFloat(row.deposit_rate) > 0 
                      ? <span className="text-green-400">{formatPercent(row.deposit_rate)}</span> 
                      : formatPercent(row.deposit_rate)}
                  </td>
                  <td className="p-3 text-right font-mono">
                    {parseFloat(row.borrow_rate) > 0 
                      ? <span className="text-yellow-400">{formatPercent(row.borrow_rate)}</span> 
                      : formatPercent(row.borrow_rate)}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end">
                      <div className="w-20 bg-gray-700 h-2 rounded-full mr-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full ${
                            parseFloat(row.utilization_rate) > 80 ? 'bg-red-500' : 
                            parseFloat(row.utilization_rate) > 50 ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${Math.min(parseFloat(row.utilization_rate), 100)}%` }}
                        ></div>
                      </div>
                      <span className="font-mono">{formatPercent(row.utilization_rate)}</span>
                    </div>
                  </td>
                  <td className="p-3 text-right font-mono">{parseFloat(row.asset_weight_init) > 0.5 
                    ? <span className="text-green-400">{row.asset_weight_init}</span> 
                    : row.asset_weight_init}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="p-6 text-center text-terminal-text-secondary">
                  No data found matching your filters. Try adjusting your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Table footer with pagination (simplified for demo) */}
      <div className="flex justify-between items-center mt-4 text-sm text-terminal-text-secondary">
        <div>
          Showing {filteredAndSortedData.length} of {protocolData.length} tokens
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-800 rounded-md hover:bg-terminal-background-secondary disabled:opacity-50" disabled>
            Previous
          </button>
          <span className="px-3 py-1 bg-blue-500 rounded-md">1</span>
          <button className="px-3 py-1 border border-gray-800 rounded-md hover:bg-terminal-background-secondary disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProtocolView; 