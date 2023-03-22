'use client'
import { FC, MouseEventHandler, useCallback, useState } from "react"
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  VStack,
  Text,
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
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    setIsLoading(true);
    try {
      const avatarPrompt = `${prompt} avatar`;
      const response = await axios.post('/api/AiAvatar', { prompt: avatarPrompt,num_images: 1 });
      const imageData = response.data.data[0];
      setGeneratedImage(imageData.url);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response.data.error.message ?? 'Error generating image';
      alert(errorMessage);
    }
    setIsLoading(false);

    // add mint token function
    try {
      await MintToken();
      // Token minting was successful, do something here
    } catch (error) {
      // Token minting failed, handle the error here
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
      <Text> OpenAI Avatar Generator</Text>
        {'\n'}
        <Text fontSize="xl"> Basic ver1.0</Text>  
      </Heading>
      <Input 
        variant="main"
        type="text"
        placeholder="Enter a prompt, ie cat"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button
        colorScheme="blue"
        onClick={generateImage}
        isLoading={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate Image and Mint Token'}
      </Button>
      {generatedImage && (
        <Box mt="8">
          <Heading as="h2" size="xl" mb="4">
            Generated Image:
          </Heading>
          <Image
            src={generatedImage}
            alt="Generated"
            borderWidth="1px"
            borderColor="gray.300"
          />
        </Box>
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