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
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import TypingText from "components/dfuns/TypingText"

import axios, { AxiosError } from 'axios';

const Premium: FC = () => {
  const modalState = useWalletModal()
  const { wallet, connect } = useWallet()

  const [prompt, setPrompt] = useState(''); 
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenai= async () => {
    setIsLoading(true);
    try {
      const fullPrompt = `Generate 5 English names for ${prompt}, and explain why, also generate 5 Chinese names for ${prompt} and explain in Chinese`;
      const response = await axios.post('/api/OpenAI', { prompt: fullPrompt, max_tokens: 600});
//        console.log(response);
      const answerData = response.data.text;
      setAnswer(answerData);
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage = axiosError.response.data.error.message ?? 'Error generating answer';
        alert(errorMessage);
      }
    setIsLoading(false);
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
      <Text>OpenAI English & Chinese Name for new borns</Text>
        {'\n'}
        <Text fontSize="xl"> Premium ver1.0</Text>  
      </Heading>
      <Input 
        variant="main"
        type="text"
        placeholder="Enter some hints, ie. brave girl in September"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button
        colorScheme="blue"
        onClick={handleOpenai}
        isLoading={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate 5 ENG&CN names'}
      </Button>

      {answer && (
        <FormControl>
          <FormLabel>Suggested names for the new born: {prompt}</FormLabel>
          <Text>
            {answer.split('\n').map((line, index) => (
              <TypingText key={index} text={line} />
            ))}
          </Text>
        </FormControl>
      )}

    </VStack>
  </Box>

);
}
export default Premium