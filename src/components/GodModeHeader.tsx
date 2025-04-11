
import React from 'react';
import { ChevronDown } from 'lucide-react';

const GodModeHeader = () => {
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold mb-6">Asgard God Mode</h1>
      
      <div className="mb-4">
        <p className="text-sm text-terminal-text-secondary mb-2">View</p>
        <div className="flex flex-wrap gap-3">
          {[
            { name: 'Token', active: true },
            { name: 'Protocol', active: false },
            { name: 'Drift Vaults', active: false },
            { name: 'Compare', active: false },
            { name: 'Strategies', active: false },
            { name: 'Stablecoin Yields', active: false },
            { name: 'Sol Yields', active: false },
            { name: 'JLP Yields', active: false },
            { name: 'LP Yields', active: false },
            { name: 'Fee Comparison', active: false },
            { name: 'Liquidations', active: false },
            { name: 'Swap Recommendations', active: false },
          ].map((item) => (
            <button
              key={item.name}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                item.active
                  ? 'bg-primary text-white'
                  : 'text-terminal-text-secondary hover:bg-accent'
              }`}
            >
              <span className={`h-3 w-3 rounded-full ${item.active ? 'bg-white' : 'border border-terminal-text-secondary'}`}></span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GodModeHeader;
