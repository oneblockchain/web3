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
  Center,
} from "@chakra-ui/react"
import { Chart } from "react-google-charts";
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import Link from 'components/link/Link';
// send tokan and route to new page
import MintToken from "components/dfuns/token/mint"
import { Connection, PublicKey, Transaction, clusterApiUrl } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, createTransferInstruction, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useRouter } from 'next/navigation'

interface ICpfContributions {
  cpf_oa: number;
  cpf_sa: number;
  cpf_ma: number;
  cpf_emp: number;
  cpf_self: number;
  cpf_tot: number;
  year_tot: number;
}

function calculateCpfContributions(salary: number, age: number, bonus: number): ICpfContributions {
  let basicSalary = Math.min(salary, 6000);
  let cpf_oa = 0.0;
  let cpf_sa = 0.0;
  let cpf_ma = 0.0;
  let rate_emp = 0.17;
  let rate_self = 0.20;
  let cpf_emp, cpf_self, cpf_tot;
  let year_cpf_emp, year_cpf_self, year_tot;

  if (age <= 35) {
    cpf_oa = basicSalary * 0.23;
    cpf_sa = basicSalary * 0.07;
    cpf_ma = basicSalary * 0.07;
    } else if (age <= 45) {
    cpf_oa  = basicSalary * 0.21;
    cpf_sa  = basicSalary * 0.07;
    cpf_ma  = basicSalary * 0.09;
    } else if (age <= 50) {
    cpf_oa  = basicSalary * 0.19;
    cpf_sa  = basicSalary * 0.08;
    cpf_ma  = basicSalary * 0.10;
    } else if (age <= 55) {
    cpf_oa  = basicSalary * 0.15;
    cpf_sa  = basicSalary * 0.115;
    cpf_ma  = basicSalary * 0.105;
    } else if (age <= 60) {
    cpf_oa  = basicSalary * 0.12;
    cpf_sa  = basicSalary * 0.035;
    cpf_ma  = basicSalary * 0.105;
    rate_emp   = 0.13
    rate_self  = 0.13
    } else if (age <= 66) {
    cpf_oa  = basicSalary * 0.035;
    cpf_sa  = basicSalary * 0.025;
    cpf_ma  = basicSalary * 0.105;
    rate_emp   = 0.09
    rate_self  = 0.075
    } else {
    cpf_oa  = basicSalary * 0.01
    cpf_sa  = basicSalary * 0.01
    cpf_ma  = basicSalary * 0.105
    rate_emp   = 0.075
    rate_self  = 0.05
    }
    cpf_emp  = basicSalary * rate_emp
    cpf_self = basicSalary * rate_self
    cpf_tot  = cpf_emp + cpf_self

    year_cpf_emp  = cpf_emp * 12 + bonus * rate_emp
    year_cpf_self = cpf_self * 12 + bonus * rate_self
    year_tot = Math.min((year_cpf_emp + year_cpf_self),37740)

  return { cpf_oa, cpf_sa, cpf_ma, cpf_emp, cpf_self, cpf_tot, year_tot };
}

export async function findAssociatedTokenAddress(
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey,
): Promise<PublicKey> {
  return (
    await PublicKey.findProgramAddressSync(
      [
        walletAddress.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID,
    )
  )[0];
}

const Connected: FC = () => {

  const modalState = useWalletModal()
  const { wallet, connect,  publicKey, sendTransaction  } = useWallet()
  //send
  //const { publicKey, sendTransaction } = useWallet();
  const payer = publicKey ? publicKey.toBase58() : null;
  console.log("PublicKey:", payer)
  const tokenAmount = 1000000000;

 //route to new premium page
  let router= useRouter()

  function redirect() {
    router.push('/dfuns/cpfcalP')
  }

  // send token
  async function sendToken() {
    // Make sure the user is connected to a wallet
    if (!publicKey) return;

    // Connect to the Solana network
    const connection = new Connection(clusterApiUrl("devnet"))

    // Define the from and to token associate account
    const toTokenAccountPubkey = new PublicKey("AZBBr2Kfu91A2JZh7QEQDnnJeTtR5981xvf2vAueE5gb");

    // Specify the wallet address and token mint address  
    const tokenMintAddress = new PublicKey('J31G8vtGg2PeUtC24vriLQ6cUME7bdopJYiafhobR73d');

    //    const walletAddress = publicKey;

    console.log(`walletAddress: ${publicKey}`); 

    // Call the findAssociatedTokenAddress function
    const associatedTokenAddress = await findAssociatedTokenAddress(
      publicKey,
      tokenMintAddress
    );
    console.log(`Associated Token Address: ${associatedTokenAddress.toBase58()}`); 
  
    const transaction = new Transaction().add(
      createTransferInstruction(
        associatedTokenAddress,
        toTokenAccountPubkey,
        publicKey,
        tokenAmount,
        [],
        TOKEN_PROGRAM_ID
      )
    );

    console.log(`transaction: ${transaction}`); 

    const signature = await sendTransaction(transaction, connection);

    // Wait for the transaction to be confirmed
    await connection.confirmTransaction(signature, "confirmed");
    console.log(`Solscan URL: https://solscan.io/tx/${signature}?cluster=devnet`);
  }

  const [salary, setSalary] = useState<number>(5000);
  const [age, setAge] = useState<number>(25);
  const [bonus, setBonus] = useState<number>(10000);
  const [cpfAmount, setCpfAmount] = useState(0);
  const [YearCpfAmount, setYearCpfAmount] = useState(0);
  const [cpf_oa, setcpf_oa] = useState(0);
  const [cpf_ma, setcpf_ma] = useState(0);
  const [cpf_sa, setcpf_sa] = useState(0);
  const [cpf_emp, setcpf_emp] = useState(0);
  const [cpf_self, setcpf_self] = useState(0);
  const [cpfContributions, setCpfContributions] = useState<ICpfContributions>({
    cpf_oa: 0,
    cpf_sa: 0,
    cpf_ma: 0,
    cpf_emp: 0,
    cpf_self: 0,
    cpf_tot: 0,
    year_tot: 0,
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (event.defaultPrevented) {
        return
      }

      if (!wallet) {
        modalState.setVisible(true)
      } else {
        connect().catch(() => {})
      }
    },
    [wallet, connect, modalState]
  )

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    const newCpfContributions = calculateCpfContributions(salary, age, bonus);
    setCpfContributions(newCpfContributions);

    // add mint token function
    try {
      await MintToken();
      // Token minting was successful, do something here
    } catch (error) {
      // Token minting failed, handle the error here
      console.error(error);
    } 
  }

    // add send token function
    async function handleSend() {
      try {
        await sendToken();
    
        console.log(`Payment sucessful, now rediceting...`); 
        // Token transfer was successful, redirect to the '/dfuns/cpfcalP' URL
        redirect();
    
      } catch (error) {
        console.error(error);
      }
    }

  // 2 level pie chart
  const data01 = [
    { name: 'By Employer', value: cpfContributions.cpf_emp },
    { name: 'By Yourself', value: cpfContributions.cpf_self },
  ];
  const data02 = [
    { name: 'OA', value: cpfContributions.cpf_oa },
    { name: 'MA', value: cpfContributions.cpf_ma },
    { name: 'SA', value: cpfContributions.cpf_sa },

  ];
 const data = [
    ["CPF Account", "Month Amount"],
    ["OA", cpfContributions.cpf_oa],
    ["MA", cpfContributions.cpf_ma],
    ["SA/RA", cpfContributions.cpf_sa],

  ];
  const options = {
    title: "Monthly Contribution by Account",
  };

  return (
    <><Container>
      <VStack spacing={10}>
      <Heading whiteSpace="pre-wrap" textAlign="center">
        <Text fontSize="xl">Calculate your monthly CPF contribution</Text>
        {'\n'}
        <Text fontSize="md"> FY2023 standard ver1.0</Text>   
        </Heading>
        <VStack as="form" onClick={handleSubmit} spacing={1} width="100%" maxW="399px">
          <FormControl id="salary">
            <FormLabel>Monthly Salary:</FormLabel>
            <Input type="number" value={salary} onChange={(event) => setSalary(parseFloat(event.target.value))} />
          </FormControl>
          <FormControl id="bonus">
            <FormLabel>Yearly Bonus:</FormLabel>
            <Input type="number" value={bonus} onChange={(event) => setBonus(parseInt(event.target.value))} />
          </FormControl>
          <FormControl id="age">
            <FormLabel>Age:</FormLabel>
            <Input type="number" value={age} onChange={(event) => setAge(parseInt(event.target.value))} />
          </FormControl>
          {/*    <Button type="submit">Calculate CPF Contributions</Button> */}
          <Button
            bgColor="teal"
            onClick={handleSubmit}
          >
            <HStack>
              <Text>Calculate CPF Contributions & Mint Token</Text>
            </HStack>
          </Button>
        </VStack>
        {cpfContributions && (
          <VStack width="100%" maxW="600px" spacing={1}>
            <Text>Monthly CPF by your employer: ${cpfContributions.cpf_emp.toFixed(2)}</Text>
            <Text>Monthly CPF by yourself: ${cpfContributions.cpf_self.toFixed(2)}</Text>
            <Text>Monthly CPF total: ${cpfContributions.cpf_tot.toFixed(2)}</Text>
            <Text>Monthly CPF OA: ${cpfContributions.cpf_oa.toFixed(2)}</Text>
            <Text>Monthly CPF SA: ${cpfContributions.cpf_sa.toFixed(2)}</Text>
            <Text>Monthly CPF MA: ${cpfContributions.cpf_ma.toFixed(2)}</Text>
            <Text>Yearly CPF total: ${cpfContributions.year_tot.toFixed(2)}</Text>
          </VStack>
        )}

      <Button onClick={handleSend} bgColor="violet" as="a">Pay 1 tokens to Preview new contribution amounts after changes of 2023</Button>

{/*       <Link href="/dfuns/cpfcalP">
        <Button bgColor="violet" as="a">Backup</Button>
      </Link> */}

      </VStack>
    </Container>
      <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
    </>
  )
}
export default Connected
