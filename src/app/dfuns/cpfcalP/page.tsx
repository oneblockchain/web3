'use client'
import { Box, Center, Spacer, Stack } from "@chakra-ui/react";
import type { NextPage } from "next"
// import NavBar from "components/dfuns/NavBar";
import { useWallet } from "@solana/wallet-adapter-react";
import Premium   from 'components/dfuns/cpfcal/Premium';
import Disconnected from "components/dfuns/cpfcal/Disconnected";


 const Home: NextPage = () => {
  const { connected } = useWallet(); 

  return (
      <Box
      >
        <Stack w="full" height="100vh" justify="center">
          {/* NavBar */}

          {/* If connected, the Premium view, otherwise the first */}
          <Center>
            {connected ? <Premium /> : <Disconnected />}           
          </Center>
       </Stack>
</Box>
);
}

export default Home;