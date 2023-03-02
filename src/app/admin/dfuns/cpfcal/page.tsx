'use client'
import type { AppProps, AppInitialProps } from "next/app";
import { Box, Center, Spacer, Stack } from "@chakra-ui/react";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import WalletContextProvider from 'components/dfuns/cpfcal/WalletContextProvider';
import type { NextPage } from "next"
import NavBar from "components/dfuns/cpfcal//NavBar";
import Disconnected from 'components/dfuns/cpfcal/Disconnected';
import styles from "styles/Home.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
import Connected from "components/dfuns/cpfcal/Connected";


//function MyApp({ Component, pageProps }: AppProps) {
/*   function MyApp({ Component, pageProps }: AppProps & AppInitialProps) {
  return (
    <ChakraProvider theme={theme}>
      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
    </ChakraProvider>
  );
}  */

 const Home: NextPage = () => {
  const { connected } = useWallet(); 

  return (
      <Box
      >
        <Stack w="full" h="calc(100vh)" justify="center">
          {/* NavBar */}
          <Spacer />
          <NavBar />
          <Spacer />
          {/* If connected, the second view, otherwise the first */}
          <Center>
            {connected ? <Connected /> : <Disconnected />}           
          </Center>
          <Spacer />
</Stack>
</Box>
);
}

export default Home;