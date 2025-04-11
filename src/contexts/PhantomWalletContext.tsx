
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/hooks/use-toast";

// Simulated wallet interface
interface PhantomWallet {
  isPhantom: boolean;
  connect: () => Promise<{ publicKey: string }>;
  disconnect: () => Promise<void>;
  signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
}

// Window with Phantom
interface WindowWithPhantom extends Window {
  phantom?: {
    solana?: PhantomWallet;
  };
}

interface WalletContextType {
  wallet: PhantomWallet | null;
  connected: boolean;
  publicKey: string | null;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const PhantomWalletContext = createContext<WalletContextType | undefined>(undefined);

export function PhantomWalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<PhantomWallet | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<boolean>(false);

  // Check if Phantom is available
  useEffect(() => {
    const checkForPhantom = async () => {
      // This is a simulation for demo purposes
      // In a real app, you would check for window.phantom?.solana
      const simulatedPhantom: PhantomWallet = {
        isPhantom: true,
        connect: async () => {
          // Simulate connection delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          // Return a simulated public key
          return { publicKey: "GoodLuckGoodSizeXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" };
        },
        disconnect: async () => {
          // Simulate disconnection delay
          await new Promise(resolve => setTimeout(resolve, 500));
        },
        signMessage: async (message: Uint8Array) => {
          // Simulate signing delay
          await new Promise(resolve => setTimeout(resolve, 800));
          // Return a simulated signature
          return { signature: new Uint8Array(64).fill(1) };
        }
      };

      setWallet(simulatedPhantom);
    };

    checkForPhantom();
  }, []);

  const connect = async () => {
    if (!wallet) {
      toast({
        title: "Phantom not installed",
        description: "Please install Phantom wallet extension first",
        variant: "destructive",
      });
      return;
    }

    try {
      setConnecting(true);
      const { publicKey } = await wallet.connect();
      setConnected(true);
      setPublicKey(publicKey);
      toast({
        title: "Connected to Phantom",
        description: `Wallet ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`,
      });
    } catch (error) {
      console.error("Connection error:", error);
      toast({
        title: "Connection failed",
        description: "Could not connect to Phantom wallet",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async () => {
    if (wallet) {
      try {
        await wallet.disconnect();
        setConnected(false);
        setPublicKey(null);
        toast({
          title: "Disconnected",
          description: "Wallet disconnected successfully",
        });
      } catch (error) {
        console.error("Disconnection error:", error);
        toast({
          title: "Disconnection failed",
          description: "Could not disconnect from Phantom wallet",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <PhantomWalletContext.Provider value={{ wallet, connected, publicKey, connecting, connect, disconnect }}>
      {children}
    </PhantomWalletContext.Provider>
  );
}

export function usePhantomWallet() {
  const context = useContext(PhantomWalletContext);
  if (context === undefined) {
    throw new Error('usePhantomWallet must be used within a PhantomWalletProvider');
  }
  return context;
}
