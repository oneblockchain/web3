'use client'
import { FC, MouseEventHandler, useCallback, useState } from "react"
import { Container, Input, Button, Text } from '@chakra-ui/react'
import Link from "next/link"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import MintToken from "components/dfuns/token/mint"
// send tokan and route to new page
import { Connection, PublicKey, Transaction, clusterApiUrl } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, createTransferInstruction, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useRouter } from 'next/navigation'

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

const Connected = () => {
  const [salary, setSalary] = useState<number>(10000);
  const [bonus, setBonus] = useState<number>(20000);
  const [salary_offer1, setSalary_salary_offer1] = useState<number>(12000);
  const [bonus_offer1, setBonus_offer1] = useState<number>(24000);
  const [relief, setRelief] = useState<number>(21400);
  const [income_b4tax, setIncome_b4tax] = useState<number>(0);
  const [income_aftax, setIncome_aftax] = useState<number>(0);
  const [income_b4tax_offer1, setIncome_b4tax_offer1] = useState<number>(0);
  const [income_aftax_offer1, setIncome_aftax_offer1] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [tax_offer1, setTax_offer1] = useState<number>(0);

  const modalState = useWalletModal()
  // send token 
  const { wallet, connect,  publicKey, sendTransaction  } = useWallet()
  const payer = publicKey ? publicKey.toBase58() : null;
  console.log("PublicKey:", payer)
  const tokenAmount = 3000000000;

  //route to new premium page
  let router= useRouter()

  function redirect() {
    router.push('/dfuns/sgtaxP')
  }

  // send token function
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

  const calculateTax = (async () => {
    let annualSalary = salary * 12;
    let annualSalaryOffer1 = salary_offer1 * 12;
    let annualBonus = bonus;
    let annualBonusOffer1 = bonus_offer1;
    let chargeableIncome = annualSalary + annualBonus - relief;
    let chargeableIncomeOffer1 = annualSalaryOffer1 + annualBonusOffer1 - relief;
    let incomeB4tax = annualSalary + annualBonus;
    let incomeAftax =0;
    let incomeB4taxOffer1 = annualSalaryOffer1 + annualBonusOffer1;
    let incomeAftaxOffer1 =0;
    let taxAmount = 0;
    let taxAmountOffer1 = 0;

    if (chargeableIncome <= 20000) {
      taxAmount = 0;
    } else if (chargeableIncome <= 30000) {
      taxAmount = (chargeableIncome - 20000) * 0.02;
    } else if (chargeableIncome <= 40000) {
      taxAmount = 200 + (chargeableIncome - 30000) * 0.035;
    } else if (chargeableIncome <= 80000) {
      taxAmount = 550 + (chargeableIncome - 40000) * 0.07;
    } else if (chargeableIncome <= 120000) {
      taxAmount = 3350 + (chargeableIncome - 80000) * 0.115;
    } else if (chargeableIncome <= 160000) {
      taxAmount = 7950 + (chargeableIncome - 120000) * 0.15;
    } else if (chargeableIncome <= 200000) {
      taxAmount = 13950 + (chargeableIncome - 160000) * 0.18;
    } else if (chargeableIncome <= 240000) {
      taxAmount = 21150 + (chargeableIncome - 200000) * 0.19;
    } else if (chargeableIncome <= 280000) {
      taxAmount = 28750 + (chargeableIncome - 240000) * 0.195;
    } else if (chargeableIncome <= 320000) {
      taxAmount = 36550 + (chargeableIncome - 280000) * 0.20;
    } else {
      taxAmount = 44500 + (chargeableIncome - 320000) * 0.22;
    }

    incomeAftax = incomeB4tax - taxAmount;
    setIncome_b4tax(incomeB4tax)
    setIncome_aftax(incomeAftax);
    setTax(taxAmount);
// Offer1 tax
    if (chargeableIncomeOffer1 <= 20000) {
      taxAmountOffer1 = 0;
    } else if (chargeableIncomeOffer1 <= 30000) {
      taxAmountOffer1 = (chargeableIncomeOffer1 - 20000) * 0.02;
    } else if (chargeableIncomeOffer1 <= 40000) {
      taxAmountOffer1 = 200 + (chargeableIncomeOffer1 - 30000) * 0.035;
    } else if (chargeableIncomeOffer1 <= 80000) {
      taxAmountOffer1 = 550 + (chargeableIncomeOffer1 - 40000) * 0.07;
    } else if (chargeableIncomeOffer1 <= 120000) {
      taxAmountOffer1 = 3350 + (chargeableIncomeOffer1 - 80000) * 0.115;
    } else if (chargeableIncomeOffer1 <= 160000) {
      taxAmountOffer1 = 7950 + (chargeableIncomeOffer1 - 120000) * 0.15;
    } else if (chargeableIncomeOffer1 <= 200000) {
      taxAmountOffer1 = 13950 + (chargeableIncomeOffer1 - 160000) * 0.18;
    } else if (chargeableIncomeOffer1 <= 240000) {
      taxAmountOffer1 = 21150 + (chargeableIncomeOffer1 - 200000) * 0.19;
    } else if (chargeableIncomeOffer1 <= 280000) {
      taxAmountOffer1 = 28750 + (chargeableIncomeOffer1 - 240000) * 0.195;
    } else if (chargeableIncomeOffer1 <= 320000) {
      taxAmountOffer1 = 36550 + (chargeableIncomeOffer1 - 280000) * 0.20;
    } else {
      taxAmountOffer1 = 44500 + (chargeableIncomeOffer1 - 320000) * 0.22;
    }

    incomeAftaxOffer1 = incomeB4taxOffer1 - taxAmountOffer1;
    setIncome_b4tax_offer1(incomeB4taxOffer1);
    setIncome_aftax_offer1(incomeAftaxOffer1)
    setTax_offer1(taxAmountOffer1);

    // add mint token function
    try {
      await MintToken();
    // Token minting was successful, do something here
    } catch (error) {
    // Token minting failed, handle the error here
      console.error(error);
    }

  });

  let increase_b4tax = income_b4tax_offer1 - income_b4tax;
  let increase_aftax = income_aftax_offer1 - income_aftax;
  let per_b4tax = Math.round((increase_b4tax / income_b4tax) * 100)
  let per_aftax = Math.round((increase_aftax / income_aftax) * 100)

// bar chart
const data = [
  {
    name: 'Before Tax',
    current: income_b4tax,
    new: income_b4tax_offer1,
  },
  {
    name: 'After Tax',
    current: income_aftax,
    new: income_aftax_offer1,
  },
];

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(Number(event.target.value));
  };

  const handleBonusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBonus(Number(event.target.value));
  };

  const handleSalaryOffer1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalary_salary_offer1(Number(event.target.value));
  };

  const handleBonusOffer1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBonus_offer1(Number(event.target.value));
  };

  const handleReliefChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRelief(Number(event.target.value));
  };

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
 //  send token handler
  async function handleSend() {
      try {
        await sendToken();
    
        console.log(`Payment sucessful, now rediceting...`); 
        // Token transfer was successful, redirect to the '/dfuns/xxxxxxP' URL
        redirect();
    
      } catch (error) {
        console.error(error);
      }
    }

  function formatCurrency(num: number): string {
    return new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(num).replace(/\.\d{2}/, '');
  }

  return (
    <><Container maxW="lg" centerContent>
      <Text fontSize="xl" mb={1}>Singapore Job Offer Compare</Text>
      <Text fontSize="l" mb={2}>FY2023 standard ver1.0</Text>
      <Text textAlign="left"
        w="100%"
        maxW="md"
        px={4}
        py={1}
        borderRadius="md">Current Monthly Salary:</Text>
      <Input type="number" placeholder="Enter monthly salary" value={salary} onChange={handleSalaryChange} mb={1} />
      <Text textAlign="left"
        w="100%"
        maxW="md"
        px={4}
        py={1}
        borderRadius="md">Current Annual Bonus:</Text>
      <Input type="number" placeholder="Enter annual bonus" value={bonus} onChange={handleBonusChange} mb={1} />
      <Text textAlign="left"
        w="100%"
        maxW="md"
        px={4}
        py={1}
        borderRadius="md">New Offer Monthly Salary:</Text>
      <Input type="number" placeholder="Offer1 monthly salary" value={salary_offer1} onChange={handleSalaryOffer1Change} mb={1} />
      <Text textAlign="left"
        w="100%"
        maxW="md"
        px={4}
        py={1}
        borderRadius="md">New Offer Annual Bonus:</Text>
      <Input type="number" placeholder="Offer1 bonus" value={bonus_offer1} onChange={handleBonusOffer1Change} mb={1} />
      <Text textAlign="left"
        w="100%"
        maxW="md"
        px={4}
        py={1}
        borderRadius="md">Enter Total Tax Relief:</Text>
      <Input type="number" placeholder="Enter tax relief" value={relief} onChange={handleReliefChange} mb={2} />

      <Button colorScheme="teal" onClick={calculateTax} mb={4}>Compare Increment and Mint Token</Button>

      <Text>Current Annual Income Before/After tax: {formatCurrency(income_b4tax)} / {formatCurrency(income_aftax)}</Text>
      <Text>New Offer Annual Income Before/After tax: {formatCurrency(income_b4tax_offer1)} / {formatCurrency(income_aftax_offer1)}</Text>
      <Text mb={4}>Income Increment Before/After tax: {formatCurrency(increase_b4tax)} ({per_b4tax}%) / {formatCurrency(increase_aftax)} ({per_aftax}%)</Text>

      <Button onClick={handleSend}mb={2} bgColor="violet" as="a">Pay 3 tokens to see total annual compensation</Button>

      <Link href="/dfuns/offercP">
        <Button bgColor="violet" as="a">Backup</Button>
      </Link>
      
    </Container>
    <ResponsiveContainer width="100%" height={300}>
        <BarChart 
        data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="current" fill="#8884d8" />
          <Bar dataKey="new" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
</>
  );
};

export default Connected;
