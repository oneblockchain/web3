'use client'
import { initializeKeypair } from "components/dfuns/token/initializeKeypair"
import * as web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"

async function MintToken() {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"))
  const user = await initializeKeypair(connection)
  const payer = user.publicKey.toBase58()
  console.log("PublicKey:", payer) 

  // mintAddr is our mint token addr
  const mintAddress = 'J31G8vtGg2PeUtC24vriLQ6cUME7bdopJYiafhobR73d'
  const mintPublicKey =new web3.PublicKey(mintAddress);
  const mintInfo = await token.getMint(connection, mintPublicKey);
  const mint = mintInfo.address

  console.log("Current token supply is: " + mintInfo.supply);

// dest is token account for the mint addr
  const destinationAddress =  'FDmEEsr4Y22BhQoTxmsf77v5H5Z6Pqj152H4aw7r7PhU'
  const destinationPublicKey = new web3.PublicKey(destinationAddress); 
// mint 1 token 
  try {
    await token.mintTo(
      connection,
      user,
      mint,
      destinationPublicKey,
      user,
      1 * 10 ** mintInfo.decimals,
    );
    console.log("1 token minted");
  } catch (error) {
    console.error("Minting failed:", error);
  }
  
}
export default MintToken; 

/* mint()
  .then(() => {
    console.log("Finished successfully")
    process.exit(0)
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  }) */