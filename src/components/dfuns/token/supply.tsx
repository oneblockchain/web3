'use client'
import * as web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"
import { useState, useEffect } from 'react';

const connection = new web3.Connection(web3.clusterApiUrl("devnet"))

const TokenSupply = ({ mintAddress }) => {
  const [tokenSupply, setTokenSupply] = useState(null);
  const [mint, setMint] = useState(null);

  useEffect(() => {
    const fetchMintInfo = async () => {
      const mintAddress = 'J31G8vtGg2PeUtC24vriLQ6cUME7bdopJYiafhobR73d'
      const mintPublicKey = new web3.PublicKey(mintAddress);
      const mintInfo = await token.getMint(connection, mintPublicKey);
      const supply = Number(mintInfo.supply)  / 1000000000; 
      setMint(mintInfo.address.toString());
      setTokenSupply(supply);
    };

    fetchMintInfo();

    const interval = setInterval(fetchMintInfo, 10000);

    return () => clearInterval(interval);
  }, [mintAddress]);

  return tokenSupply;
/*   return (
    <div>
       Token: {mint} 
    {tokenSupply}
    </div>
  ); */
};

export default TokenSupply;