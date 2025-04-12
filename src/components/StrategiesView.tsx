import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const StrategiesView = () => {
  // Mock data for Kamino strategies based on the screenshot
  const strategiesData = [
    { market: 'kamino', deposit_token: 'hSOL', borrow_token: 'SOL', deposits_ui: 43226.13, borrows_ui: 3708777.018, deposit_asset_utilization: 2.538, borrow_asset_utilization: 74.478, effective_ltv: 0.87, max_leverage: 7.692, deposit_apy: 0.003, borrow_apy: 5.041, leverage_apy: 8.536 },
    { market: 'kamino', deposit_token: 'JupSOL', borrow_token: 'SOL', deposits_ui: 2297056, borrows_ui: 3708777.018, deposit_asset_utilization: 0.16, borrow_asset_utilization: 74.478, effective_ltv: 0.87, max_leverage: 7.692, deposit_apy: 0, borrow_apy: 5.041, leverage_apy: 8.379 },
    { market: 'kamino', deposit_token: 'mSOL', borrow_token: 'SOL', deposits_ui: 474618.645, borrows_ui: 3708777.018, deposit_asset_utilization: 1.508, borrow_asset_utilization: 74.478, effective_ltv: 0.87, max_leverage: 7.692, deposit_apy: 0.001, borrow_apy: 5.041, leverage_apy: 8.321 },
    { market: 'kamino', deposit_token: 'ezSOL', borrow_token: 'SOL', deposits_ui: 354437.765, borrows_ui: 687995.911, deposit_asset_utilization: 0, borrow_asset_utilization: 82.646, effective_ltv: 0.9, max_leverage: 10, deposit_apy: 0, borrow_apy: 6.192, leverage_apy: 8.575 },
    { market: 'kamino', deposit_token: 'bSOL', borrow_token: 'SOL', deposits_ui: 185820.207, borrows_ui: 3708777.018, deposit_asset_utilization: 5.445, borrow_asset_utilization: 74.478, effective_ltv: 0.87, max_leverage: 7.692, deposit_apy: 0.015, borrow_apy: 5.041, leverage_apy: 8.092 },
    { market: 'kamino', deposit_token: 'bonkSOL', borrow_token: 'SOL', deposits_ui: 32506.346, borrows_ui: 3708777.018, deposit_asset_utilization: 0.831, borrow_asset_utilization: 74.478, effective_ltv: 0.87, max_leverage: 7.692, deposit_apy: 0, borrow_apy: 5.041, leverage_apy: 7.808 },
    { market: 'kamino', deposit_token: 'hubSOL', borrow_token: 'SOL', deposits_ui: 24769.566, borrows_ui: 3708777.018, deposit_asset_utilization: 0.449, borrow_asset_utilization: 74.478, effective_ltv: 0.87, max_leverage: 7.692, deposit_apy: 0, borrow_apy: 5.041, leverage_apy: 7.757 },
    { market: 'kamino', deposit_token: 'bbSOL', borrow_token: 'SOL', deposits_ui: 8321.252, borrows_ui: 3708777.018, deposit_asset_utilization: 1.447, borrow_asset_utilization: 74.478, effective_ltv: 0.87, max_leverage: 7.692, deposit_apy: 0.001, borrow_apy: 5.041, leverage_apy: 7.661 },
    { market: 'kamino', deposit_token: 'JITOSOL', borrow_token: 'SOL', deposits_ui: 1068063.864, borrows_ui: 3708777.018, deposit_asset_utilization: 2.76, borrow_asset_utilization: 74.478, effective_ltv: 0.87, max_leverage: 7.692, deposit_apy: 0.004, borrow_apy: 5.041, leverage_apy: 7.645 },
    { market: 'kamino', deposit_token: 'vSOL', borrow_token: 'SOL', deposits_ui: 416850.793, borrows_ui: 3708777.018, deposit_asset_utilization: 0.211, borrow_asset_utilization: 74.478, effective_ltv: 0.87, max_leverage: 7.692, deposit_apy: 0, borrow_apy: 5.041, leverage_apy: 7.376 }
  ];

  // Format number with commas for thousands
  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 3
    });
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Kamino Strategies</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-2 text-terminal-text-secondary">market</th>
              <th className="text-left p-2 text-terminal-text-secondary">deposit_token</th>
              <th className="text-left p-2 text-terminal-text-secondary">borrow_token</th>
              <th className="text-right p-2 text-terminal-text-secondary">deposits_ui</th>
              <th className="text-right p-2 text-terminal-text-secondary">borrows_ui</th>
              <th className="text-right p-2 text-terminal-text-secondary">deposit_asset_utilization</th>
              <th className="text-right p-2 text-terminal-text-secondary">borrow_asset_utilization</th>
              <th className="text-right p-2 text-terminal-text-secondary">effective_ltv</th>
              <th className="text-right p-2 text-terminal-text-secondary">max_leverage</th>
              <th className="text-right p-2 text-terminal-text-secondary">deposit_apy</th>
              <th className="text-right p-2 text-terminal-text-secondary">borrow_apy</th>
              <th className="text-right p-2 text-terminal-text-secondary">leverage_apy</th>
            </tr>
          </thead>
          <tbody>
            {strategiesData.map((item, index) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-terminal-background-secondary">
                <td className="p-2">{item.market}</td>
                <td className="p-2">{item.deposit_token}</td>
                <td className="p-2">{item.borrow_token}</td>
                <td className="p-2 text-right font-mono">{formatNumber(item.deposits_ui)}</td>
                <td className="p-2 text-right font-mono">{formatNumber(item.borrows_ui)}</td>
                <td className="p-2 text-right font-mono">{item.deposit_asset_utilization.toFixed(3)}</td>
                <td className="p-2 text-right font-mono">{item.borrow_asset_utilization.toFixed(3)}</td>
                <td className="p-2 text-right font-mono">{item.effective_ltv.toFixed(2)}</td>
                <td className="p-2 text-right font-mono">{item.max_leverage.toFixed(3)}</td>
                <td className="p-2 text-right font-mono">{item.deposit_apy.toFixed(3)}</td>
                <td className="p-2 text-right font-mono">{item.borrow_apy.toFixed(3)}</td>
                <td className="p-2 text-right font-mono">{item.leverage_apy.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mb-6 mt-10">Fixed Yields</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-2 text-terminal-text-secondary">protocol</th>
              <th className="text-left p-2 text-terminal-text-secondary">market</th>
              <th className="text-left p-2 text-terminal-text-secondary">token</th>
              <th className="text-right p-2 text-terminal-text-secondary">apy</th>
              <th className="text-left p-2 text-terminal-text-secondary">expiry_date</th>
              <th className="text-left p-2 text-terminal-text-secondary">status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { protocol: 'Rate-x', market: 'USDe-2503', token: 'USDe', apy: 38.318, expiry_date: '27 Mar 2025 11:59 PM', status: 'Active' },
              { protocol: 'Rate-x', market: 'fragJTO-2508', token: 'fragJTO', apy: 23.621, expiry_date: '28 Aug 2025 11:59 PM', status: 'Active' },
              { protocol: 'Rate-x', market: 'kyJTO-2507', token: 'kyJTO', apy: 21.496, expiry_date: '28 Jul 2025 11:59 PM', status: 'Active' },
              { protocol: 'Rate-x', market: 'sonicsSOL-2503', token: 'sonicsSOL', apy: 21.475, expiry_date: '28 Mar 2025 11:59 PM', status: 'Active' },
              { protocol: 'Rate-x', market: 'JLP-2506', token: 'JLP', apy: 21.311, expiry_date: '28 Jun 2025 11:59 PM', status: 'Active' },
              { protocol: 'Rate-x', market: 'fragSOL-2508', token: 'fragSOL', apy: 16.688, expiry_date: '28 Aug 2025 11:59 PM', status: 'Active' },
              { protocol: 'Exponent', market: 'jito restaking', token: 'FRAGSOL', apy: 16.555, expiry_date: '10 Jul 2025 03:00 PM', status: 'Active' },
              { protocol: 'Exponent', market: 'jito restaking', token: 'kySOL', apy: 16.479, expiry_date: '14 Jun 2025 03:00 PM', status: 'Active' },
              { protocol: 'Rate-x', market: 'sUSDe-2503', token: 'sUSDe', apy: 16.139, expiry_date: '27 Mar 2025 11:59 PM', status: 'Active' },
              { protocol: 'Rate-x', market: 'kySOL-2506', token: 'kySOL', apy: 16.008, expiry_date: '28 Jun 2025 11:59 PM', status: 'Active' }
            ].map((item, index) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-terminal-background-secondary">
                <td className="p-2">{item.protocol}</td>
                <td className="p-2">{item.market}</td>
                <td className="p-2">{item.token}</td>
                <td className="p-2 text-right font-mono">{item.apy.toFixed(3)}</td>
                <td className="p-2">{item.expiry_date}</td>
                <td className="p-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StrategiesView; 