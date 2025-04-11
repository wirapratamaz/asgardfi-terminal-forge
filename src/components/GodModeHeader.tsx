import React from 'react';
import { ChevronDown } from 'lucide-react';

type GodModeHeaderProps = {
  activeView: string;
  onViewChange: (view: string) => void;
};

const GodModeHeader: React.FC<GodModeHeaderProps> = ({ activeView, onViewChange }) => {
  const views = [
    { name: 'Token', id: 'token' },
    { name: 'Protocol', id: 'protocol' },
    { name: 'Drift Vaults', id: 'drift-vaults' },
    { name: 'Compare', id: 'compare' },
    { name: 'Strategies', id: 'strategies' },
    { name: 'Stablecoin Yields', id: 'stablecoin-yields' },
    { name: 'Sol Yields', id: 'sol-yields' },
    { name: 'JLP Yields', id: 'jlp-yields' },
    { name: 'LP Yields', id: 'lp-yields' },
    { name: 'Fee Comparison', id: 'fee-comparison' },
    { name: 'Liquidations', id: 'liquidations' },
    { name: 'Swap Recommendations', id: 'swap-recommendations' },
  ];

  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold mb-6">Asgard God Mode</h1>
      
      <div className="mb-4">
        <p className="text-sm text-terminal-text-secondary mb-2">View</p>
        <div className="flex flex-wrap gap-3">
          {views.map((item) => (
            <button
              key={item.id}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                activeView === item.id
                  ? 'bg-primary text-white'
                  : 'text-terminal-text-secondary hover:bg-accent'
              }`}
              onClick={() => onViewChange(item.id)}
            >
              <span className={`h-3 w-3 rounded-full ${activeView === item.id ? 'bg-white' : 'border border-terminal-text-secondary'}`}></span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GodModeHeader;
