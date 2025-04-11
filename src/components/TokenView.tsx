import React, { useState } from 'react';
import TokenSelector from '@/components/TokenSelector';
import TokenOverview from '@/components/TokenOverview';
import MarketTable from '@/components/MarketTable';
import PriceChart from '@/components/PriceChart';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data - in a real application, this would come from an API
const TOKENS = ['SOL', 'ETH', 'BTC', 'WBTC', 'USDC', 'USDT', 'PYUSD', 'USDS'];

const TOKEN_DATA = {
  SOL: {
    totalDeposits: '6.65M',
    totalBorrows: '4.70M',
    avgUtilization: '55.49%',
    bestDepositRate: {
      rate: '5.38%',
      platform: 'solend'
    },
    bestBorrowRate: {
      rate: '4.68%',
      platform: 'kamino'
    }
  },
  // Mock data for other tokens
  ETH: {
    totalDeposits: '12.34M',
    totalBorrows: '8.92M',
    avgUtilization: '72.29%',
    bestDepositRate: {
      rate: '4.21%',
      platform: 'marginfi'
    },
    bestBorrowRate: {
      rate: '5.84%',
      platform: 'solend'
    }
  },
  BTC: {
    totalDeposits: '9.87M',
    totalBorrows: '6.54M',
    avgUtilization: '66.26%',
    bestDepositRate: {
      rate: '3.92%',
      platform: 'kamino'
    },
    bestBorrowRate: {
      rate: '5.17%',
      platform: 'marginfi'
    }
  },
  WBTC: {
    totalDeposits: '8.76M',
    totalBorrows: '5.43M',
    avgUtilization: '61.99%',
    bestDepositRate: {
      rate: '3.71%',
      platform: 'solend'
    },
    bestBorrowRate: {
      rate: '5.25%',
      platform: 'kamino'
    }
  },
  USDC: {
    totalDeposits: '15.43M',
    totalBorrows: '12.87M',
    avgUtilization: '83.41%',
    bestDepositRate: {
      rate: '6.12%',
      platform: 'marginfi'
    },
    bestBorrowRate: {
      rate: '7.34%',
      platform: 'solend'
    }
  },
  USDT: {
    totalDeposits: '11.23M',
    totalBorrows: '9.45M',
    avgUtilization: '84.15%',
    bestDepositRate: {
      rate: '5.98%',
      platform: 'kamino'
    },
    bestBorrowRate: {
      rate: '7.12%',
      platform: 'marginfi'
    }
  },
  PYUSD: {
    totalDeposits: '4.32M',
    totalBorrows: '2.65M',
    avgUtilization: '61.34%',
    bestDepositRate: {
      rate: '4.87%',
      platform: 'solend'
    },
    bestBorrowRate: {
      rate: '6.23%',
      platform: 'kamino'
    }
  },
  USDS: {
    totalDeposits: '5.87M',
    totalBorrows: '3.92M',
    avgUtilization: '66.78%',
    bestDepositRate: {
      rate: '5.21%',
      platform: 'marginfi'
    },
    bestBorrowRate: {
      rate: '6.45%',
      platform: 'solend'
    }
  }
};

const KAMINO_MARKETS = [
  {
    market: 'main',
    token: 'SOL',
    deposits_ui: 4989297.369,
    borrows_ui: 3554052.745,
    available_liquidity_ui: 1435244.624,
    endogenous_yield: 0,
    deposit_rate: 2.809,
    borrow_rate: 4.681,
    utilization_rate: 71.234,
    asset_weight_init: 0.74,
    asset_weight_maint: 0.8
  },
  {
    market: 'JLP',
    token: 'SOL',
    deposits_ui: 0.001,
    borrows_ui: 0,
    available_liquidity_ui: 0.001,
    endogenous_yield: 0,
    deposit_rate: 0,
    borrow_rate: 11.752,
    utilization_rate: 0,
    asset_weight_init: 0,
    asset_weight_maint: 0
  },
  {
    market: 'JITO',
    token: 'SOL',
    deposits_ui: 816284.537,
    borrows_ui: 690007.97,
    available_liquidity_ui: 126276.567,
    endogenous_yield: 0,
    deposit_rate: 4.702,
    borrow_rate: 6.226,
    utilization_rate: 84.53,
    asset_weight_init: 0,
    asset_weight_maint: 0
  }
];

const MARGINFI_MARKETS = [
  {
    market: 'v2',
    token: 'SOL',
    deposits_ui: 3562984.721,
    borrows_ui: 3123456.891,
    available_liquidity_ui: 439527.83,
    endogenous_yield: 0,
    deposit_rate: 3.125,
    borrow_rate: 5.437,
    utilization_rate: 87.66,
    asset_weight_init: 0.8
  },
  {
    market: 'v2',
    token: 'USDC',
    deposits_ui: 8236457.982,
    borrows_ui: 7123654.327,
    available_liquidity_ui: 1112803.655,
    endogenous_yield: 0,
    deposit_rate: 6.12,
    borrow_rate: 8.25,
    utilization_rate: 86.49,
    asset_weight_init: 0.9
  },
  {
    market: 'v2',
    token: 'ETH',
    deposits_ui: 5421367.854,
    borrows_ui: 4632158.721,
    available_liquidity_ui: 789209.133,
    endogenous_yield: 0,
    deposit_rate: 4.21,
    borrow_rate: 6.35,
    utilization_rate: 85.44,
    asset_weight_init: 0.75
  }
];

const TokenView = () => {
  const [selectedToken, setSelectedToken] = useState('SOL');
  const isMobile = useIsMobile();

  return (
    <div className="px-4 py-6">
      <TokenSelector 
        tokens={TOKENS} 
        selectedToken={selectedToken}
        onSelect={setSelectedToken}
      />
      
      <TokenOverview 
        token={selectedToken}
        data={TOKEN_DATA[selectedToken as keyof typeof TOKEN_DATA]}
      />
      
      <PriceChart token={selectedToken} />
      
      <div className={`${isMobile ? 'space-y-8' : 'grid grid-cols-1 lg:grid-cols-2 gap-6'}`}>
        <MarketTable 
          title="Kamino Markets"
          data={KAMINO_MARKETS.filter(market => market.token === selectedToken)}
        />
        
        <MarketTable 
          title="Marginfi Markets"
          data={MARGINFI_MARKETS.filter(market => market.token === selectedToken)}
        />
      </div>
    </div>
  );
};

export default TokenView; 