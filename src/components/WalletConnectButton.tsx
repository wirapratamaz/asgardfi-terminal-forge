
import React from 'react';
import { Button } from '@/components/ui/button';
import { usePhantomWallet } from '@/contexts/PhantomWalletContext';
import { Wallet, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WalletConnectButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({ 
  variant = 'default', 
  size = 'default',
  className
}) => {
  const { connected, connecting, publicKey, connect, disconnect } = usePhantomWallet();

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      connect();
    }
  };

  // Format the public key for display
  const formattedPublicKey = publicKey 
    ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}` 
    : '';

  return (
    <Button
      variant={connected ? 'outline' : variant}
      size={size}
      onClick={handleClick}
      className={cn(
        connected && "border-primary text-primary hover:bg-primary/10",
        className
      )}
      disabled={connecting}
    >
      {connecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : connected ? (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          {formattedPublicKey}
        </>
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </>
      )}
    </Button>
  );
};

export default WalletConnectButton;
