'use client'
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Transaction, clusterApiUrl } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, createTransferInstruction, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
//import NavBar from "../components/NavBar"
//import { useNavigate } from 'react-router-dom';


export async function findAssociatedTokenAddress(
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey,
): Promise<PublicKey> {
  return (
    await PublicKey.findProgramAddressSync(
      [
        walletAddress.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID,
    )
  )[0];
}

function SendToken() {
  const { publicKey, sendTransaction } = useWallet();
  const payer = publicKey ? publicKey.toBase58() : null;
  console.log("PublicKey:", payer)

// page redirect
 // const navigate = useNavigate();

  // Define the amount of tokens to send
  const tokenAmount = 1000000000;

  async function sendToken() {
    // Make sure the user is connected to a wallet
    if (!publicKey) return;

    // Connect to the Solana network
    const connection = new Connection(clusterApiUrl("devnet"))

    // Define the from and to token associate account
 //   const fromTokenAccountPubkey = new PublicKey("2rSXXRW2ckuX79Ef2HLS9rt5Quze7GDWKy1bbB35JUbx");
    const toTokenAccountPubkey = new PublicKey("AZBBr2Kfu91A2JZh7QEQDnnJeTtR5981xvf2vAueE5gb");

    // Specify the wallet address and token mint address
 //   const walletAddress = new PublicKey('Ce4Qziid1saku1S934LgaHGcAEDXgtpqSrdJS8sc4b9M');
    const tokenMintAddress = new PublicKey('J31G8vtGg2PeUtC24vriLQ6cUME7bdopJYiafhobR73d');

//    const walletAddress = publicKey;

    console.log(`walletAddress: ${publicKey}`); 

    // Call the findAssociatedTokenAddress function
    const associatedTokenAddress = await findAssociatedTokenAddress(
      publicKey,
      tokenMintAddress
    );
    console.log(`Associated Token Address: ${associatedTokenAddress.toBase58()}`); 
  
    const transaction = new Transaction().add(
      createTransferInstruction(
        associatedTokenAddress,
        toTokenAccountPubkey,
        publicKey,
        tokenAmount,
        [],
        TOKEN_PROGRAM_ID
      )
    );

    console.log(`transaction: ${transaction}`); 

    const signature = await sendTransaction(transaction, connection);

    // Wait for the transaction to be confirmed
    await connection.confirmTransaction(signature, "confirmed");
    console.log(`Solscan URL: https://solscan.io/tx/${signature}?cluster=devnet`);
  
    // Redirect to the desired page upon successful token transfer
  //  navigate("/dfuns/cpfcalP");

  }

/*   // Render the component's UI
  return (
     <><NavBar /><button onClick={SendToken}>Send Token</button></>
  );*/

} 
export default SendToken;
