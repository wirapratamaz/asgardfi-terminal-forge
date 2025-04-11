
import React from 'react';

type TokenSelectorProps = {
  tokens: string[];
  selectedToken: string;
  onSelect: (token: string) => void;
};

const TokenSelector: React.FC<TokenSelectorProps> = ({ tokens, selectedToken, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tokens.map((token) => (
        <button
          key={token}
          className={`px-6 py-3 border rounded-md transition-colors ${
            selectedToken === token
              ? 'bg-terminal-card border-gray-700 text-white'
              : 'border-gray-800 text-terminal-text-secondary hover:border-gray-700'
          }`}
          onClick={() => onSelect(token)}
        >
          {token}
        </button>
      ))}
    </div>
  );
};

export default TokenSelector;
