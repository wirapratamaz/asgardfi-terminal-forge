
import { Bitcoin, Coins, DollarSign } from 'lucide-react';

export const getTokenIcon = (token: string) => {
  switch (token) {
    case 'BTC':
    case 'WBTC':
      return Bitcoin;
    case 'USDC':
    case 'USDT':
    case 'PYUSD':
    case 'USDS':
      return DollarSign;
    default:
      return Coins;
  }
};
