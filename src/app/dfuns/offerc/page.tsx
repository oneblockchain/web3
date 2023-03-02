'use client'
import { Box, Center, Spacer, Stack } from "@chakra-ui/react";
import type { NextPage } from "next"
// import NavBar from "components/dfuns/NavBar";
import { useWallet } from "@solana/wallet-adapter-react";
import Disconnected from 'components/dfuns/offerc/Disconnected';
import Connected from "components/dfuns/offerc/Connected";


 const Home: NextPage = () => {
  const { connected } = useWallet(); 

  return (
      <Box
      >
        <Stack w="full" height="100vh" justify="center">
          {/* NavBar */}

          {/* If connected, the second view, otherwise the first */}
          <Center>
            {connected ? <Connected /> : <Disconnected />}           
          </Center>
       </Stack>
</Box>
);
}

export default Home;