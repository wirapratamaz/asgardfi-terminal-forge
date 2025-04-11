import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ProtocolView = () => {
  const [selectedProtocol, setSelectedProtocol] = useState('kamino');

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

  return (
    <div className="px-4 py-6">
      <div className="flex items-center mb-6 w-full border border-gray-800 rounded-md p-2">
        <input 
          type="text" 
          value={selectedProtocol} 
          readOnly
          className="flex-grow bg-transparent text-white outline-none"
        />
        <ChevronDown className="text-terminal-text-secondary" />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-2 text-terminal-text-secondary">token</th>
              <th className="text-left p-2 text-terminal-text-secondary">market</th>
              <th className="text-left p-2 text-terminal-text-secondary">deposits_ui</th>
              <th className="text-left p-2 text-terminal-text-secondary">borrows_ui</th>
              <th className="text-left p-2 text-terminal-text-secondary">available_liquidity_ui</th>
              <th className="text-left p-2 text-terminal-text-secondary">endogenous_yield</th>
              <th className="text-left p-2 text-terminal-text-secondary">deposit_rate</th>
              <th className="text-left p-2 text-terminal-text-secondary">borrow_rate</th>
              <th className="text-left p-2 text-terminal-text-secondary">utilization_rate</th>
              <th className="text-left p-2 text-terminal-text-secondary">asset_weight_init</th>
            </tr>
          </thead>
          <tbody>
            {protocolData.map((row, index) => (
              <tr key={index} className="border-b border-gray-800">
                <td className="p-2">{row.token}</td>
                <td className="p-2">{row.market}</td>
                <td className="p-2">{row.deposits_ui}</td>
                <td className="p-2">{row.borrows_ui}</td>
                <td className="p-2">{row.available_liquidity_ui}</td>
                <td className="p-2">{row.endogenous_yield}</td>
                <td className="p-2">{row.deposit_rate}</td>
                <td className="p-2">{row.borrow_rate}</td>
                <td className="p-2">{row.utilization_rate}</td>
                <td className="p-2">{row.asset_weight_init}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProtocolView; 