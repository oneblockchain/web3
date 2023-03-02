'use client'
import type { AppProps } from "next/app";
import { Box, Center, Spacer, Stack } from "@chakra-ui/react";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import WalletContextProvider from 'components/dfuns/cpfcal/WalletContextProvider';
import { Html, Head, Main, NextScript } from "next/document";
import NavBar from "components/dfuns/cpfcal//NavBar";
import Disconnected from 'components/dfuns/cpfcal/Disconnected';
import styles from "styles/Home.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
import Connected from "components/dfuns/cpfcal/Connected";

const colors = {
  background: "#1F1F1F",
  accent: "#833BBE",
  bodyText: "rgba(255, 255, 255, 0.75)",
};

const theme = extendTheme({ colors });

function CombinedApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
    </ChakraProvider>
  );
}

class Document extends Html {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>dFun CPF Calculator</title>
          <meta name="Web3 CPF Calculator" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

function CombinedHome() {
  const { connected } = useWallet();

  return (
    <div className={styles.container}>
      <Box
        w="full"
        h="calc(100vh)"
        bgImage={"url(/home-background.jpg)"}
        backgroundPosition="center"
      >
        <Stack w="full" h="calc(100vh)" justify="center">
          {/* NavBar */}
          <NavBar />

          <Spacer />
          {/* If connected, the second view, otherwise the first */}
          <Center>
            {connected ? <Connected /> : <Disconnected />}
          </Center>
          <Spacer />

          <Center>
            <Box marginBottom={4} color="white">
              <a
                href="https://oneblockchain.sg/"
                target="_blank"
                rel="noopener noreferrer"
              >
               </a>
</Box>
</Center>
</Stack>
</Box>
</div>
);
}

export default CombinedHome;
export { Document };
