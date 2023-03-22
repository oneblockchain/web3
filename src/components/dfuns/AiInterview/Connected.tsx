'use client'
import { FC, MouseEventHandler, useCallback, useState } from "react"
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  VStack,
  Text,
  Textarea,
  FormControl, 
  FormLabel,
} from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import axios, { AxiosError } from 'axios';
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import MintToken from "components/dfuns/token/mint"
// send tokan and route to new page
import { Connection, PublicKey, Transaction, clusterApiUrl } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, createTransferInstruction, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useRouter } from 'next/navigation'

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

const Connected: FC = () => {

  const modalState = useWalletModal()
  const { wallet, connect,  publicKey, sendTransaction  } = useWallet()
  //send
  const payer = publicKey ? publicKey.toBase58() : null;
  console.log("PublicKey:", payer)
  const tokenAmount = 1000000000;

 //route to new premium page
  let router= useRouter()

  function redirect() {
    router.push('/dfuns/AiInterviewP')
  }
  // send token
  async function sendToken() {
    // Make sure the user is connected to a wallet
    if (!publicKey) return;

    // Connect to the Solana network
    const connection = new Connection(clusterApiUrl("devnet"))

    // Define the from and to token associate account
    const toTokenAccountPubkey = new PublicKey("AZBBr2Kfu91A2JZh7QEQDnnJeTtR5981xvf2vAueE5gb");

    // Specify the wallet address and token mint address  
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
  }

  const [prompt, setPrompt] = useState(''); 
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenai= async () => {
    setIsLoading(true);
    try {
      const fullPrompt = `Generate 9 interview questions for ${prompt} role and answer them`;
      const response = await axios.post('/api/OpenAI', { prompt: fullPrompt, max_tokens: 300});
//        console.log(response);
      const answerData = response.data.text;
      setAnswer(answerData);
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage = axiosError.response.data.error.message ?? 'Error generating answer';
        alert(errorMessage);
      }
    setIsLoading(false);

   // add mint token function
   try {
    await MintToken();
  } catch (error) {
    console.error(error);
  } 

  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (event.defaultPrevented) {
        return
      }

      if (!wallet) {
        modalState.setVisible(true)
        console.log('Wallet not connected!', wallet);
      } else {
        connect().catch(() => {})
        console.log('Wallet connected!', wallet);
      }
    },
    [wallet, connect, modalState]
  )

  // add send token function
  async function handleSend() {
      try {
        await sendToken();
        console.log(`Payment sucessful, now rediceting...`); 
        // Token transfer was successful, redirect to the '/dfuns/xxx' URL
        redirect();
      } catch (error) {
        console.error(error);
      }
    }

  return (
  <Box
    className="container mx-auto px-4 py-10"
    maxW="container.md"
    px="4"
    py="10"
  >
    <VStack spacing={6}>
    <Heading whiteSpace="pre-wrap" textAlign="center" as="h1" size="2xl">
      <Text> OpenAI Interview Questions</Text>
        {'\n'}
        <Text fontSize="xl"> Standard ver1.0</Text>  
      </Heading>
      <Input 
        variant="main"
        type="text"
        placeholder="Enter your job role applied, ie, software engineer"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button
        colorScheme="blue"
        onClick={handleOpenai}
        isLoading={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate 10 questions and Mint Token'}
      </Button>

      {answer && (
        <FormControl  id="interview-questions">
          <FormLabel>Common Interview Questions:</FormLabel>
          <Textarea value={answer} readOnly />
        </FormControl>
      )}

      <Button onClick={handleSend} bgColor="violet" as="a">Pay 5 tokens to get all questions answered!</Button>

    </VStack>
  </Box>

);
}
export default Connected