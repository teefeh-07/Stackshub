'use client';

import { ReactNode } from 'react';
import { ReownProvider } from '@/context/ReownContext';
import { WalletProvider } from '@/context/WalletContext';
import { ToastProvider } from '@/context/ToastContext';

/**
 * Application Global Provider
 * Wraps the app with Reown (AppKit), Wallet, and Toast contexts.
 * Handles initial cookie state for server-side rendering support.
 */
export function ContextProvider({ 
  children, 
  cookies 
}: { 
  children: ReactNode; 
  cookies: string | null;
}) {
  return (
    <ReownProvider cookies={cookies}>
      <WalletProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </WalletProvider>
    </ReownProvider>
  );
}
