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
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import MintToken from "components/dfuns/token/mint"

import axios, { AxiosError } from 'axios';

const Disconnected: FC = () => {
  const modalState = useWalletModal()
  const { wallet, connect } = useWallet()

  const [prompt, setPrompt] = useState(''); 
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenai= async () => {
    setIsLoading(true);
    try {
      const fullPrompt = `Generate 5 interview questions for ${prompt} role`;
      const response = await axios.post('/api/OpenAI', { prompt: fullPrompt, max_tokens: 150});
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
        <Text fontSize="xl"> Basic ver1.0</Text>  
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
        {isLoading ? 'Generating...' : 'Generate 5 questions and Mint Token'}
      </Button>

      {answer && (
        <FormControl  id="interview-questions">
          <FormLabel>Common Interview Questions:</FormLabel>
          <Textarea value={answer} readOnly />
        </FormControl>
      )}

      <Button
          bgColor="violet"
          onClick={handleClick}
          >
      <HStack>
        <Text>Link your wallet to see more</Text>
        <ArrowForwardIcon />
      </HStack>
    </Button>
    </VStack>
  </Box>

);
}
export default Disconnected