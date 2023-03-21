'use client'
import { FC, MouseEventHandler, useCallback, useState } from "react"
import {
  Button,
  Container,
  Heading,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Text,
  Box,
  Stack,
} from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import MintToken from "components/dfuns/token/mint"

import axios from 'axios';
import { generateImage } from 'api/openai';

const Disconnected: FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateImage = async () => {
    setIsLoading(true);
    try {
      const imageData = await generateImage(prompt);
      setGeneratedImage(imageData.url);
    } catch (error) {
      alert('Error generating image');
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl mb-6">OpenAI Image Generator</h1>
      <input
        type="text"
        className="w-full p-2 mb-4 border border-gray-300"
        placeholder="Enter a prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold"
          onClick={handleGenerateImage}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Image'}
        </button>
        {generatedImage && (
          <div className="mt-8">
            <h2 className="text-2xl mb-4">Generated Image:</h2>
            <img src={generatedImage} alt="Generated" className="border border-gray-300" />
          </div>
        )}
      </div>
);
}
export default Disconnected