
import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

type IndicatorProps = {
  platform: string;
  isPositive?: boolean;
};

const Indicator: React.FC<IndicatorProps> = ({ platform, isPositive = true }) => {
  return (
    <div className={isPositive ? "green-indicator" : "red-indicator"}>
      {isPositive ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      <span className="text-sm">on {platform}</span>
    </div>
  );
};

type TokenOverviewProps = {
  token: string;
  data: {
    totalDeposits: string;
    totalBorrows: string;
    avgUtilization: string;
    bestDepositRate: {
      rate: string;
      platform: string;
    };
    bestBorrowRate: {
      rate: string;
      platform: string;
    };
  };
};

const TokenOverview: React.FC<TokenOverviewProps> = ({ token, data }) => {
  return (
    <div className="terminal-card p-6 mb-8 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{token}</h2>
        <ChevronDown className="h-5 w-5 text-terminal-text-secondary" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <p className="text-terminal-text-secondary mb-1">Total Deposits</p>
          <p className="text-2xl font-bold">{data.totalDeposits}</p>
        </div>
        
        <div>
          <p className="text-terminal-text-secondary mb-1">Total Borrows</p>
          <p className="text-2xl font-bold">{data.totalBorrows}</p>
        </div>
        
        <div>
          <p className="text-terminal-text-secondary mb-1">Avg Utilization</p>
          <p className="text-2xl font-bold">{data.avgUtilization}</p>
        </div>
        
        <div>
          <p className="text-terminal-text-secondary mb-1">Best Deposit Rate</p>
          <p className="text-2xl font-bold">{data.bestDepositRate.rate}</p>
          <Indicator platform={data.bestDepositRate.platform} isPositive={true} />
        </div>
        
        <div>
          <p className="text-terminal-text-secondary mb-1">Best Borrow Rate</p>
          <p className="text-2xl font-bold">{data.bestBorrowRate.rate}</p>
          <Indicator platform={data.bestBorrowRate.platform} isPositive={false} />
        </div>
      </div>
    </div>
  );
};

export default TokenOverview;
