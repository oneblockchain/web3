'use client'
import { FC, ReactNode } from "react"
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
//import { PhantomWalletAdapter, SolflareWalletAdapter, MathWalletAdapter, ExodusWalletAdapter } from "@solana/wallet-adapter-wallets"
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { GlowWalletAdapter } from '@solana/wallet-adapter-glow';
import { BraveWalletAdapter } from '@solana/wallet-adapter-brave';
import { useMemo } from "react"
require("@solana/wallet-adapter-react-ui/styles.css")

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const url = useMemo(() => clusterApiUrl("devnet"), [])
  const brave = new BraveWalletAdapter()
  const phantom = new PhantomWalletAdapter()
  const solflare = new SolflareWalletAdapter()
  const glow = new GlowWalletAdapter()
/*   const mathwallet = new MathWalletAdapter()
  const exodus = new ExodusWalletAdapter() */

  return (
    <ConnectionProvider endpoint={url}>
      <WalletProvider wallets={[brave, phantom, solflare, glow]}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletContextProvider