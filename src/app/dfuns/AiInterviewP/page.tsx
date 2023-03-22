'use client'
import { Box, Center, Spacer, Stack } from "@chakra-ui/react";
import type { NextPage } from "next"
import Disconnected from 'components/dfuns/AiInterview/Disconnected';
import { useWallet } from "@solana/wallet-adapter-react";
import Premium from "components/dfuns/AiInterview/Premium";


 const Home: NextPage = () => {
  const { connected } = useWallet(); 

  return (
      <Box
      >
        <Stack w="full" h="calc(100vh)" justify="center">
          <Spacer />
          <Spacer />
          {/* If connected, the second view, otherwise the first */}
          <Center>
            {connected ? <Premium /> : <Disconnected />}           
          </Center>
          <Spacer />
</Stack>
</Box>
);
}

export default Home;