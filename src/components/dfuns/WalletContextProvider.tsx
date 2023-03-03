'use client'
import { FC, ReactNode } from "react"
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import { PhantomWalletAdapter, SolflareWalletAdapter, MathWalletAdapter, ExodusWalletAdapter } from "@solana/wallet-adapter-wallets"
import { useMemo } from "react"
require("@solana/wallet-adapter-react-ui/styles.css")

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const url = useMemo(() => clusterApiUrl("devnet"), [])
  const phantom = new PhantomWalletAdapter()
  const solflare = new SolflareWalletAdapter()
  const mathwallet = new MathWalletAdapter()
  const exodus = new ExodusWalletAdapter()

  return (
    <ConnectionProvider endpoint={url}>
      <WalletProvider wallets={[phantom, solflare, mathwallet, exodus]}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletContextProvider