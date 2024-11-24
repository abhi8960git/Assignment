import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { ethers } from 'ethers';
import { authAtom } from '../store/auth';

export function useWallet() {
  const [auth, setAuth] = useAtom(authAtom);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to use this application');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length > 0) {
        setAuth(prev => ({
          ...prev,
          wallet: accounts[0]
        }));
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  }, [setAuth]);

  const disconnectWallet = useCallback(() => {
    setAuth(prev => ({
      ...prev,
      wallet: null,
      isAdmin: false
    }));
  }, [setAuth]);

  return {
    wallet: auth.wallet,
    isConnected: !!auth.wallet,
    connectWallet,
    disconnectWallet
  };
}