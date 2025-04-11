
import React from 'react';
import { cn } from '@/lib/utils';
import { getTokenIcon } from '@/lib/tokenIcons';

type TokenSelectorProps = {
  tokens: string[];
  selectedToken: string;
  onSelect: (token: string) => void;
};

const TokenSelector: React.FC<TokenSelectorProps> = ({ tokens, selectedToken, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tokens.map((token) => {
        const IconComponent = getTokenIcon(token);
        const isSelected = selectedToken === token;
        
        return (
          <button
            key={token}
            className={cn(
              "px-6 py-3 border rounded-md transition-all duration-200 flex items-center gap-2",
              isSelected 
                ? "bg-terminal-card border-primary text-white shadow-sm scale-105" 
                : "border-gray-800 text-terminal-text-secondary hover:border-primary/50 hover:bg-terminal-card/50"
            )}
            onClick={() => onSelect(token)}
          >
            <IconComponent className={cn(
              "h-4 w-4",
              isSelected ? "text-primary" : "text-terminal-text-secondary"
            )} />
            <span>{token}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TokenSelector;
