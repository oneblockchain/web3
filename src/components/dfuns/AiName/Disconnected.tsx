'use client'
import { FC, MouseEventHandler, useCallback, useState, useEffect } from "react"
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
import TypingText from "components/dfuns/TypingText"

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
      const fullPrompt = `Generate 3 English names for ${prompt}, and explain why.`;
      const response = await axios.post('/api/OpenAI', { prompt: fullPrompt, max_tokens: 150});
//        console.log(response);
      const answerData = response.data.text;
      setAnswer(answerData)
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

  const handleWallet: MouseEventHandler<HTMLButtonElement> = useCallback(
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
      <Text> OpenAI English & Chinese Name for new borns</Text>
        {'\n'}
        <Text fontSize="xl"> Basic ver1.0</Text>  
      </Heading>
      <Input 
        isRequired
        variant="main"
        type="text"
        placeholder="Enter some hints, ie. boy in September" 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button
        colorScheme="blue"
        onClick={handleOpenai} 
        isLoading={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate 3 English names and Mint Token'}
      </Button>

      {answer && (
        <FormControl>
          <FormLabel>Suggested names for the new born:</FormLabel>
{/*           <Textarea value={answer} readOnly /> */}
        <Text>
        {answer.split('\n').map((line, index) => (
          <TypingText key={index} text={line} />
        ))}
      </Text>
        </FormControl>
      )}

      <Button
          bgColor="violet"
          onClick={handleWallet}
          >
      <HStack>
        <Text>Link your wallet to see Chinese names</Text>
        <ArrowForwardIcon />
      </HStack>
    </Button>
    </VStack>
  </Box>

);
}
export default Disconnected