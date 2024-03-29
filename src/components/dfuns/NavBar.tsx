'use client'
import { HStack, Spacer } from "@chakra-ui/react"
import { FC } from "react"
import styles from "styles/Home.module.css";
import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
	async () =>
		(await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
	{ ssr: false }
);
// <WalletMultiButtonDynamic className={styles["wallet-adapter-button-trigger"]}
const NavBar: FC = () => {
  return (
    <HStack  padding={1}>
			<WalletMultiButtonDynamic />
    </HStack>
  )
}

export default NavBar