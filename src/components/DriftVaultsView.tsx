import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  Search, 
  Filter, 
  Sliders, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  ArrowUpDown,
  Wallet,
  CircleDollarSign,
  ShieldCheck,
  Info,
  Copy,
  ExternalLink
} from 'lucide-react';

const DriftVaultsView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('total_shares');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [minShares, setMinShares] = useState(0);
  const [showOnlyPositiveDeposits, setShowOnlyPositiveDeposits] = useState(false);
  
  // Mock data based on the screenshot
  const vaultsData = [
    { name: 'YouZongTestVault0', public_key: '3JVvLGnuZtwdcSPU4dZuwyywup67CuWLgUVAAPsHNqDp', manager: '82EKgy8xkd4PYxUaamzxtkKiocI6BrCv5qFWrHjErRs', total_shares: 0, net_deposits: 0 },
    { name: 'USDn1', public_key: '9kwoKmpNtPEK4fESLf7YnrGtZqvHcnYoN7aVWWdvkhSP', manager: 'EBbqr8p8e4uDcu2UhNxTZrsPMXuYktvSiuX9hRRqLjRG', total_shares: 100000000, net_deposits: 100 },
    { name: 'Funding Rate Reversion Vault V2', public_key: 'DYL61pGcLfoGNQ6JjwZ2Yzc6m3YLkCZAS8yaL5QWMR', manager: '8KX7LUPnn94R2nXgufRJwyiDHFob4AS8DrNDYX7H3o5', total_shares: 1042117750, net_deposits: 1040 },
    { name: 'BTC-Dominance-NeutralTrade', public_key: '5BCDLjnQXv92AYvSpdEpENgYhABaVt92fym1MYNyhVuo', manager: 'C77bxLHWjnAVeG9HdMxu1gunFnjRCcWUDZYfa7xbacHr', total_shares: 1000000000, net_deposits: 1000 },
    { name: 'Lucky Vault 02', public_key: 'Bbydi4XqY493dCNyHNm8xjRUtxbxovKL5qQPEbxEcxMMv', manager: '7n1eiW6LWRCsa7cggUcnM9gnutwVJc8Xrs41ELGwGbE', total_shares: 1036801276283, net_deposits: 1042038 },
    { name: 'USDC gain (Hedge+Leverage JLP)', public_key: 'EyFonJT7uzMk5zrWWTuXdUyDVZ5fdBN8yaLUusoqyy', manager: '45Lc4Hw1bmUoPGPYK1tV9kuzgv7va7ZmuybqdLsXVYLQ', total_shares: 0, net_deposits: 0 },
    { name: 'ALT3 Capital ETH yield', public_key: 'FSs89oVMX1GjxaPuH64uwFuuzAxVAeUaAxDPfe6UYmpm', manager: '45Lc4Hw1bmUoPGPYK1tV9kuzgv7va7ZmuybqdLsXVYLQ', total_shares: 0, net_deposits: 0 },
    { name: 'Active-Vault-testing_6_Nov', public_key: 'DDg8C1p6QCixjZSfD2RFMWwLWyrkhcbeUnc9jYJtz9b5', manager: '6HmPq4hU2BQqkogVuohggZwaqNFQRpRQ6MSE6bcKxCEa', total_shares: 10229360, net_deposits: -23 },
    { name: 'ALT3 Capital SOL yield', public_key: '6L2VV9ngPXfg9aXLuTVGdvYmekkPhWDaEZ3BG6nfLKp', manager: '45Lc4Hw1bmUoPGPYK1tV9kuzgv7va7ZmuybqdLsXVYLQ', total_shares: 0, net_deposits: 0 },
    { name: 'p4_test_vault_1', public_key: 'Ax2zyyvPMigf1ksedUfjUMPqJbaauuJ1gMnaNULNgC8f', manager: 'BqAVx7wxHwakobUe8PyNxxEzahY3Vdx6euDgbiXGda3p', total_shares: 5000000, net_deposits: 5 },
    { name: 'ALT3 Capital USDC yield', public_key: '9xTngFMR4LfMW1XWnG9Ns9hTgCVVENCAZPdKDkcMU1id', manager: '45Lc4Hw1bmUoPGPYK1tV9kuzgv7va7ZmuybqdLsXVYLQ', total_shares: 0, net_deposits: 0 },
    { name: 'VIP14-NeutralTrade', public_key: 'ES2C16XjnMer2YSoMdAHS1UCKtjEB64FRqp9NXLGpuZU', manager: 'ppDcV4UNoje5rHSsTx5i83YCwpjajh1mSNvDjL8QMpR', total_shares: 0, net_deposits: 0 },
    { name: 'CapyMaxMainnet', public_key: '4ceP3ATKInUZjq1MaNYtbhQcpXWdrhj2XbCKwSW2G4G1', manager: 'CqboUp2DW2HTQsAZ8mB7tyZiFNncTwfsuYCHKDJPWyYa', total_shares: 9000000, net_deposits: -1 },
    { name: 'Neutral Hedged JLP NX', public_key: 'mc1UFoEpaiyPVY4njGGerwLL7XzTVCOiwx6eUtuoDfR', manager: '2uxkEppqWT3GX1Ym1kU6iHgBeF7TVRXjFpaNx425PND3', total_shares: 19999991604, net_deposits: 200000 },
    { name: 'USDC gain (Hedge + Leverage JLP)', public_key: 'EKmh5iYyouaczpnAjhcUSueU4UXcpLoDaRziPUeTSTAW', manager: '45Lc4Hw1bmUoPGPYK1tV9kuzgv7va7ZmuybqdLsXVYLQ', total_shares: 1000000000, net_deposits: 1000 },
    { name: 'BTC gain (Hedge + Leverage JLP )', public_key: 'GRqeK4TiKwvPMST6pa9f7Ah1ZGEtrkK7mwBbUeNMUuJSE', manager: '45Lc4Hw1bmUoPGPYK1tV9kuzgv7va7ZmuybqdLsXVYLQ', total_shares: 1446782, net_deposits: 1 },
    { name: 'Team-NeutralTrade', public_key: 'FBYp9toQEqNiGeP8BzyvRD1FUauJBFk5eYUEkgqvigZ5', manager: 'C77bxLHWjnAVeG9HdMxu1gunFnjRCcWUDZYfa7xbacHr', total_shares: 80015652230, net_deposits: 80020 },
    { name: 'USDC-Earn-NeutralTrade', public_key: '4i2L5zvzUM5LXqUYm35Ytv4BGSmhFVTqG5xtFJJesm14', manager: 'C77bxLHWjnAVeG9HdMxu1gunFnjRCcWUDZYfa7xbacHr', total_shares: 372874870574, net_deposits: 372906 },
    { name: 'SOL gain (Hedge + Leverage JLP )', public_key: '3EXe9uzf3trp4oiqa2n7wnc1UD4VCRrU1mrps1PKQ9Jx', manager: '45Lc4Hw1bmUoPGPYK1tV9kuzgv7va7ZmuybqdLsXVYLQ', total_shares: 0, net_deposits: 0 },
    { name: 'Vectis-dSOL__Anchor', public_key: 'CNFFhKqGXZWhSHbt2BSh26mcQei1UZkUXiBdVc82TyQm', manager: '6HmPq4hU2BQqkogVuohggZwaqNFQRpRQ6MSE6bcKxCEa', total_shares: 4000000000, net_deposits: 4000 },
    { name: 'dSOL Plus', public_key: '6aowo7AoE6rw8CS6knd746XiRysuiEjs9YpZyHRAMnor', manager: 'G6L1NE8tLYYzvMHYHbkHZqPFvfEsfRAaHSvyNQ2hut3o', total_shares: 60495868550, net_deposits: 6046783 }
  ];

  // Calculate summary data
  const summaryData = useMemo(() => {
    let totalVaults = vaultsData.length;
    let activeVaults = vaultsData.filter(vault => vault.total_shares > 0).length;
    let totalShares = vaultsData.reduce((sum, vault) => sum + vault.total_shares, 0);
    let totalDeposits = vaultsData.reduce((sum, vault) => sum + vault.net_deposits, 0);
    
    // Calculate top managers
    const managerCounts = vaultsData.reduce((acc, vault) => {
      acc[vault.manager] = (acc[vault.manager] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topManagers = Object.entries(managerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([manager, count]) => ({ manager, count }));
      
    // Get largest vault by shares
    const largestVault = vaultsData.reduce((largest, vault) => 
      vault.total_shares > largest.total_shares ? vault : largest, 
      vaultsData[0]
    );
    
    // Get positive/negative deposit counts
    const positiveDeposits = vaultsData.filter(vault => vault.net_deposits > 0).length;
    const negativeDeposits = vaultsData.filter(vault => vault.net_deposits < 0).length;
    
    return {
      totalVaults,
      activeVaults,
      totalShares,
      totalDeposits,
      topManagers,
      largestVault,
      positiveDeposits,
      negativeDeposits
    };
  }, [vaultsData]);

  // Format numbers with commas for display
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  // Format numbers in a readable way (K, M, B)
  const formatCompactNumber = (num: number) => {
    if (num === 0) return '0';
    
    if (Math.abs(num) >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(2) + 'B';
    }
    
    if (Math.abs(num) >= 1_000_000) {
      return (num / 1_000_000).toFixed(2) + 'M';
    }
    
    if (Math.abs(num) >= 1_000) {
      return (num / 1_000).toFixed(2) + 'K';
    }
    
    return num.toString();
  };

  // Truncate public key display
  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Copy address to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };
  
  // Open explorer link
  const openExplorer = (address: string) => {
    window.open(`https://solscan.io/account/${address}`, '_blank');
  };
  
  // Get token type from vault name for UI enhancement
  const getVaultType = (name: string) => {
    name = name.toLowerCase();
    if (name.includes('sol')) return 'SOL';
    if (name.includes('usdc') || name.includes('usdn')) return 'USDC';
    if (name.includes('btc')) return 'BTC';
    if (name.includes('eth')) return 'ETH';
    if (name.includes('neutral')) return 'NEUTRAL';
    return 'OTHER';
  };
  
  // Generate a color for a vault type
  const getVaultTypeColor = (type: string) => {
    switch (type) {
      case 'SOL': return 'from-purple-500 to-blue-500';
      case 'USDC': return 'from-green-500 to-teal-500';
      case 'BTC': return 'from-orange-500 to-yellow-500';
      case 'ETH': return 'from-blue-400 to-indigo-500';
      case 'NEUTRAL': return 'from-gray-500 to-gray-600';
      default: return 'from-pink-500 to-rose-500';
    }
  };

  // Handle sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = vaultsData;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(vault => 
        vault.name.toLowerCase().includes(term) || 
        vault.public_key.toLowerCase().includes(term) ||
        vault.manager.toLowerCase().includes(term)
      );
    }
    
    // Apply minimum shares filter
    if (minShares > 0) {
      filtered = filtered.filter(vault => vault.total_shares >= minShares);
    }
    
    // Apply positive deposits filter
    if (showOnlyPositiveDeposits) {
      filtered = filtered.filter(vault => vault.net_deposits > 0);
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      // For numeric columns
      if (sortColumn === 'total_shares' || sortColumn === 'net_deposits') {
        return sortDirection === 'asc' 
          ? a[sortColumn] - b[sortColumn]
          : b[sortColumn] - a[sortColumn];
      }
      
      // For string columns
      return sortDirection === 'asc'
        ? a[sortColumn].localeCompare(b[sortColumn])
        : b[sortColumn].localeCompare(a[sortColumn]);
    });
  }, [vaultsData, searchTerm, sortColumn, sortDirection, minShares, showOnlyPositiveDeposits]);

  return (
    <div className="px-4 py-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-terminal-background-secondary rounded-lg p-5 border border-gray-800 hover:border-blue-500 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm text-terminal-text-secondary">Vault Statistics</h3>
              <p className="text-2xl font-bold mt-1">{summaryData.totalVaults}</p>
              <p className="text-xs text-terminal-text-secondary mt-1">
                Total vaults tracked
              </p>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-full">
              <BarChart3 className="text-blue-400" size={20} />
            </div>
          </div>
          <div className="flex justify-between mt-2 pt-2 border-t border-gray-800">
            <div>
              <p className="text-xs text-terminal-text-secondary">Active</p>
              <p className="text-sm font-medium">{summaryData.activeVaults}</p>
            </div>
            <div>
              <p className="text-xs text-terminal-text-secondary">Inactive</p>
              <p className="text-sm font-medium">{summaryData.totalVaults - summaryData.activeVaults}</p>
            </div>
          </div>
        </div>

        <div className="bg-terminal-background-secondary rounded-lg p-5 border border-gray-800 hover:border-green-500 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm text-terminal-text-secondary">Total Deposits</h3>
              <p className="text-2xl font-bold mt-1">{formatCompactNumber(summaryData.totalDeposits)}</p>
              <p className="text-xs text-terminal-text-secondary mt-1">
                Net deposits across vaults
              </p>
            </div>
            <div className="p-2 bg-green-500/10 rounded-full">
              <Wallet className="text-green-400" size={20} />
            </div>
          </div>
          <div className="flex justify-between mt-2 pt-2 border-t border-gray-800">
            <div>
              <p className="text-xs text-terminal-text-secondary">Positive</p>
              <p className="text-sm font-medium text-green-400">{summaryData.positiveDeposits}</p>
            </div>
            <div>
              <p className="text-xs text-terminal-text-secondary">Negative</p>
              <p className="text-sm font-medium text-red-400">{summaryData.negativeDeposits}</p>
            </div>
          </div>
        </div>

        <div className="bg-terminal-background-secondary rounded-lg p-5 border border-gray-800 hover:border-purple-500 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm text-terminal-text-secondary">Total Shares</h3>
              <p className="text-2xl font-bold mt-1">{formatCompactNumber(summaryData.totalShares)}</p>
              <p className="text-xs text-terminal-text-secondary mt-1">
                Across all vaults
              </p>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-full">
              <PieChart className="text-purple-400" size={20} />
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-800">
            <p className="text-xs text-terminal-text-secondary">Largest Vault</p>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
              <p className="text-sm font-medium truncate">{summaryData.largestVault.name}</p>
            </div>
            <p className="text-xs text-terminal-text-secondary mt-1">
              {formatCompactNumber(summaryData.largestVault.total_shares)} shares
            </p>
          </div>
        </div>

        <div className="bg-terminal-background-secondary rounded-lg p-5 border border-gray-800 hover:border-yellow-500 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm text-terminal-text-secondary">Top Managers</h3>
              <p className="text-2xl font-bold mt-1">{summaryData.topManagers.length}</p>
              <p className="text-xs text-terminal-text-secondary mt-1">
                Most active vault managers
              </p>
            </div>
            <div className="p-2 bg-yellow-500/10 rounded-full">
              <ShieldCheck className="text-yellow-400" size={20} />
            </div>
          </div>
          <div className="space-y-2 mt-2 pt-2 border-t border-gray-800">
            {summaryData.topManagers.map((manager, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  <p className="text-xs font-mono">{truncateAddress(manager.manager)}</p>
                </div>
                <p className="text-xs font-medium">{manager.count} vaults</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="mb-6">
        <div className="flex items-center justify-between bg-terminal-background-secondary rounded-lg p-4 border border-gray-800">
          <div className="flex items-center">
            <Filter size={16} className="mr-2 text-terminal-text-secondary" />
            <h2 className="text-lg font-medium">Drift Vaults</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" size={16} />
              <input
                type="text"
                placeholder="Search by name, key, or manager..."
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
                <label className="block text-sm text-terminal-text-secondary mb-2">Min. Total Shares</label>
                <input
                  type="range"
                  min="0"
                  max="1000000000"
                  step="1000000"
                  value={minShares}
                  onChange={(e) => setMinShares(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-terminal-text-secondary mt-1">
                  <span>0</span>
                  <span>{formatCompactNumber(minShares)}</span>
                  <span>1B+</span>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    id="positiveDeposits"
                    checked={showOnlyPositiveDeposits}
                    onChange={(e) => setShowOnlyPositiveDeposits(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="positiveDeposits" className="text-sm text-terminal-text-secondary">
                    Show only vaults with positive deposits
                  </label>
                </div>
                
                <div className="flex gap-2 items-center">
                  <Info size={14} className="text-terminal-text-secondary" />
                  <p className="text-sm text-terminal-text-secondary">
                    {filteredAndSortedData.length} results after filtering
                  </p>
                </div>
                
                <button 
                  onClick={() => {setMinShares(0); setShowOnlyPositiveDeposits(false); setSearchTerm('');}}
                  className="text-sm text-blue-400 hover:text-blue-300 mt-2"
                >
                  Reset filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced data table */}
      <div className="overflow-x-auto bg-terminal-background-secondary rounded-lg p-4 border border-gray-800">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="border-b border-gray-800">
              <th 
                className="text-left p-3 text-terminal-text-secondary font-medium cursor-pointer" 
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  <span>Name</span>
                  {sortColumn === 'name' && (
                    <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th 
                className="text-left p-3 text-terminal-text-secondary font-medium cursor-pointer"
                onClick={() => handleSort('public_key')}
              >
                <div className="flex items-center">
                  <span>Public Key</span>
                  {sortColumn === 'public_key' && (
                    <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th 
                className="text-left p-3 text-terminal-text-secondary font-medium cursor-pointer"
                onClick={() => handleSort('manager')}
              >
                <div className="flex items-center">
                  <span>Manager</span>
                  {sortColumn === 'manager' && (
                    <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th 
                className="text-right p-3 text-terminal-text-secondary font-medium cursor-pointer"
                onClick={() => handleSort('total_shares')}
              >
                <div className="flex items-center justify-end">
                  <span>Total Shares</span>
                  {sortColumn === 'total_shares' && (
                    <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th 
                className="text-right p-3 text-terminal-text-secondary font-medium cursor-pointer"
                onClick={() => handleSort('net_deposits')}
              >
                <div className="flex items-center justify-end">
                  <span>Net Deposits</span>
                  {sortColumn === 'net_deposits' && (
                    <ChevronDown className={`ml-1 h-4 w-4 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </th>
              <th className="text-right p-3 text-terminal-text-secondary font-medium">
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.length > 0 ? (
              filteredAndSortedData.map((vault, index) => {
                const vaultType = getVaultType(vault.name);
                const bgColor = getVaultTypeColor(vaultType);
                
                return (
                  <tr key={index} className="border-b border-gray-800 hover:bg-terminal-background-secondary/80 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${bgColor} flex items-center justify-center mr-2 text-xs font-bold`}>
                          {vaultType.substring(0, 2)}
                        </div>
                        <span className="font-medium">{vault.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs">{truncateAddress(vault.public_key)}</span>
                        <button 
                          onClick={() => copyToClipboard(vault.public_key)}
                          className="text-terminal-text-secondary hover:text-white transition-colors"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs">{truncateAddress(vault.manager)}</span>
                        <button 
                          onClick={() => copyToClipboard(vault.manager)}
                          className="text-terminal-text-secondary hover:text-white transition-colors"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="p-3 text-right font-mono">
                      {vault.total_shares > 0 ? formatNumber(vault.total_shares) : 
                        <span className="text-terminal-text-secondary">0</span>}
                    </td>
                    <td className="p-3 text-right font-mono">
                      <span className={
                        vault.net_deposits > 0 ? 'text-green-400' : 
                        vault.net_deposits < 0 ? 'text-red-400' : 
                        'text-terminal-text-secondary'
                      }>
                        {formatNumber(vault.net_deposits)}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => openExplorer(vault.public_key)}
                          className="p-1 rounded-full hover:bg-terminal-background transition-colors"
                          title="View on Solscan"
                        >
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="p-6 text-center text-terminal-text-secondary">
                  No vaults found matching your filters. Try adjusting your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Table footer with pagination (simplified for demo) */}
      <div className="flex justify-between items-center mt-4 text-sm text-terminal-text-secondary">
        <div>
          Showing {filteredAndSortedData.length} of {vaultsData.length} vaults
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

export default DriftVaultsView; 