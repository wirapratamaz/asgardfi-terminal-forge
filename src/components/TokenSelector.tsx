
import React from 'react';
import { cn } from '@/lib/utils';
import { getTokenIcon } from '@/lib/tokenIcons';
import { useIsMobile } from '@/hooks/use-mobile';

type TokenSelectorProps = {
  tokens: string[];
  selectedToken: string;
  onSelect: (token: string) => void;
};

const TokenSelector: React.FC<TokenSelectorProps> = ({ tokens, selectedToken, onSelect }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex flex-wrap gap-2 mb-4 md:mb-6 ${isMobile ? 'justify-center' : ''}`}>
      {tokens.map((token) => {
        const IconComponent = getTokenIcon(token);
        const isSelected = selectedToken === token;
        
        return (
          <button
            key={token}
            className={cn(
              "px-3 py-2 md:px-6 md:py-3 border rounded-md transition-all duration-200 flex items-center gap-2",
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
