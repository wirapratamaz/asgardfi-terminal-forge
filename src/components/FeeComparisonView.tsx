import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const FeeComparisonView = () => {
  // State for position settings
  const [initialCapital, setInitialCapital] = useState(10000);
  const [leverage, setLeverage] = useState(2.0);
  const [timeUnit, setTimeUnit] = useState('Week');
  const [asset, setAsset] = useState('SOL');
  const [borrowAsset, setBorrowAsset] = useState('USDC');
  const [numberOfWeeks, setNumberOfWeeks] = useState(1);

  // State for custom fee settings
  const [customOpenFee, setCustomOpenFee] = useState(0.05);
  const [customCloseFee, setCustomCloseFee] = useState(0.05);

  // Mock data for fee comparison table
  const feeComparisonData = [
    { exchange: 'Drift', type: 'perp', discount: '75%', openFees: 5, variableFees: 0, closeFees: -65.8729, totalFees: -65.8729 },
    { exchange: 'Flash Trade', type: 'perp', discount: 'None', openFees: 16, variableFees: 0, closeFees: 64.8028, totalFees: 96.8028 },
    { exchange: 'Jup Perps', type: 'perp', discount: 'None', openFees: 12, variableFees: 0, closeFees: 69.2171, totalFees: 93.2171 },
    { exchange: 'MarginFi', type: 'lending', discount: 'None', openFees: 10, variableFees: 0, closeFees: -343.2078, totalFees: -323.2078 },
    { exchange: 'Kamino', type: 'lending', discount: 'None', openFees: 10, variableFees: 0, closeFees: 98.1393, totalFees: 118.1393 },
    { exchange: 'Drift Lending', type: 'lending', discount: 'None', openFees: 10, variableFees: 0, closeFees: -618.0388, totalFees: -596.0388 }
  ];

  // Handler functions for inputs
  const handleIncreaseCapital = () => setInitialCapital(prev => prev + 1000);
  const handleDecreaseCapital = () => setInitialCapital(prev => Math.max(1000, prev - 1000));
  
  const handleIncreaseLeverage = () => setLeverage(prev => parseFloat((prev + 0.1).toFixed(1)));
  const handleDecreaseLeverage = () => setLeverage(prev => Math.max(1, parseFloat((prev - 0.1).toFixed(1))));
  
  const handleIncreaseWeeks = () => setNumberOfWeeks(prev => prev + 1);
  const handleDecreaseWeeks = () => setNumberOfWeeks(prev => Math.max(1, prev - 1));
  
  const handleIncreaseOpenFee = () => setCustomOpenFee(prev => parseFloat((prev + 0.01).toFixed(2)));
  const handleDecreaseOpenFee = () => setCustomOpenFee(prev => Math.max(0, parseFloat((prev - 0.01).toFixed(2))));
  
  const handleIncreaseCloseFee = () => setCustomCloseFee(prev => parseFloat((prev + 0.01).toFixed(2)));
  const handleDecreaseCloseFee = () => setCustomCloseFee(prev => Math.max(0, parseFloat((prev - 0.01).toFixed(2))));

  // Format number for display
  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 4
    });
  };

  return (
    <div className="px-4 py-6">
      {/* Position Settings Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Position Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm text-terminal-text-secondary mb-2">Initial Capital (USD)</label>
            <div className="flex items-center">
              <input
                type="text"
                value={initialCapital.toLocaleString()}
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, '');
                  if (/^\d*$/.test(value)) {
                    setInitialCapital(parseInt(value) || 0);
                  }
                }}
                className="w-full bg-transparent border border-gray-800 rounded-md p-3 appearance-none text-white"
              />
              <button 
                onClick={handleDecreaseCapital}
                className="ml-2 p-3 border border-gray-800 rounded-md text-terminal-text-secondary hover:bg-gray-800"
              >
                <Minus size={16} />
              </button>
              <button 
                onClick={handleIncreaseCapital}
                className="ml-2 p-3 border border-gray-800 rounded-md text-terminal-text-secondary hover:bg-gray-800"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-terminal-text-secondary mb-2">Leverage</label>
            <div className="flex items-center">
              <input
                type="text"
                value={leverage}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*\.?\d*$/.test(value)) {
                    setLeverage(parseFloat(value) || 1);
                  }
                }}
                className="w-full bg-transparent border border-gray-800 rounded-md p-3 appearance-none text-white"
              />
              <button 
                onClick={handleDecreaseLeverage}
                className="ml-2 p-3 border border-gray-800 rounded-md text-terminal-text-secondary hover:bg-gray-800"
              >
                <Minus size={16} />
              </button>
              <button 
                onClick={handleIncreaseLeverage}
                className="ml-2 p-3 border border-gray-800 rounded-md text-terminal-text-secondary hover:bg-gray-800"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-terminal-text-secondary mb-2">Time Unit</label>
            <div className="relative">
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                className="w-full bg-transparent border border-gray-800 rounded-md p-3 pr-10 appearance-none text-white"
              >
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-terminal-text-secondary mb-2">Asset</label>
            <div className="relative">
              <select
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                className="w-full bg-transparent border border-gray-800 rounded-md p-3 pr-10 appearance-none text-white"
              >
                <option value="SOL">SOL</option>
                <option value="ETH">ETH</option>
                <option value="BTC">BTC</option>
                <option value="USDC">USDC</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-terminal-text-secondary mb-2">Borrow Asset</label>
            <div className="relative">
              <select
                value={borrowAsset}
                onChange={(e) => setBorrowAsset(e.target.value)}
                className="w-full bg-transparent border border-gray-800 rounded-md p-3 pr-10 appearance-none text-white"
              >
                <option value="USDC">USDC</option>
                <option value="SOL">SOL</option>
                <option value="ETH">ETH</option>
                <option value="BTC">BTC</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-terminal-text-secondary" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-terminal-text-secondary mb-2">Number of Weeks</label>
            <div className="flex items-center">
              <input
                type="text"
                value={numberOfWeeks}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setNumberOfWeeks(parseInt(value) || 1);
                  }
                }}
                className="w-full bg-transparent border border-gray-800 rounded-md p-3 appearance-none text-white"
              />
              <button 
                onClick={handleDecreaseWeeks}
                className="ml-2 p-3 border border-gray-800 rounded-md text-terminal-text-secondary hover:bg-gray-800"
              >
                <Minus size={16} />
              </button>
              <button 
                onClick={handleIncreaseWeeks}
                className="ml-2 p-3 border border-gray-800 rounded-md text-terminal-text-secondary hover:bg-gray-800"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Fee Settings Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Custom Fee Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-terminal-text-secondary mb-2">Custom Open Fee (%)</label>
            <div className="flex items-center">
              <input
                type="text"
                value={customOpenFee.toFixed(2)}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*\.?\d*$/.test(value)) {
                    setCustomOpenFee(parseFloat(value) || 0);
                  }
                }}
                className="w-full bg-transparent border border-gray-800 rounded-md p-3 appearance-none text-white"
              />
              <button 
                onClick={handleDecreaseOpenFee}
                className="ml-2 p-3 border border-gray-800 rounded-md text-terminal-text-secondary hover:bg-gray-800"
              >
                <Minus size={16} />
              </button>
              <button 
                onClick={handleIncreaseOpenFee}
                className="ml-2 p-3 border border-gray-800 rounded-md text-terminal-text-secondary hover:bg-gray-800"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-terminal-text-secondary mb-2">Custom Close Fee (%)</label>
            <div className="flex items-center">
              <input
                type="text"
                value={customCloseFee.toFixed(2)}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*\.?\d*$/.test(value)) {
                    setCustomCloseFee(parseFloat(value) || 0);
                  }
                }}
                className="w-full bg-transparent border border-gray-800 rounded-md p-3 appearance-none text-white"
              />
              <button 
                onClick={handleDecreaseCloseFee}
                className="ml-2 p-3 border border-gray-800 rounded-md text-terminal-text-secondary hover:bg-gray-800"
              >
                <Minus size={16} />
              </button>
              <button 
                onClick={handleIncreaseCloseFee}
                className="ml-2 p-3 border border-gray-800 rounded-md text-terminal-text-secondary hover:bg-gray-800"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fee Comparison Table */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Fee Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-3 text-terminal-text-secondary font-medium">Exchange</th>
                <th className="text-left p-3 text-terminal-text-secondary font-medium">Type</th>
                <th className="text-left p-3 text-terminal-text-secondary font-medium">Discount</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">Open Fees</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">Variable Fees</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">Close Fees</th>
                <th className="text-right p-3 text-terminal-text-secondary font-medium">Total Fees</th>
              </tr>
            </thead>
            <tbody>
              {feeComparisonData.map((item, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-opacity-50 hover:bg-gray-800">
                  <td className="p-3 font-medium">{item.exchange}</td>
                  <td className="p-3">{item.type}</td>
                  <td className="p-3">{item.discount}</td>
                  <td className="p-3 text-right font-mono">{item.openFees}</td>
                  <td className="p-3 text-right font-mono">{item.variableFees}</td>
                  <td className="p-3 text-right font-mono" style={{ color: item.closeFees < 0 ? '#ff4d4d' : 'inherit' }}>
                    {formatNumber(item.closeFees)}
                  </td>
                  <td className="p-3 text-right font-mono font-bold" style={{ color: item.totalFees < 0 ? '#ff4d4d' : 'inherit' }}>
                    {formatNumber(item.totalFees)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeeComparisonView; 