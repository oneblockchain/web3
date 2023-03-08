'use client'
import { FC, MouseEventHandler, useCallback, useState } from "react"
import { Container, Input, Button, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import MintToken from "components/dfuns/token/mint"

const Disconnected = () => {
  const [salary, setSalary] = useState<number>(10000);
  const [bonus, setBonus] = useState<number>(20000);
  const [relief, setRelief] = useState<number>(21400);
  const [income, setIncome] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);

  const modalState = useWalletModal()
  const { wallet, connect } = useWallet()

  const calculateTax = () => {
    let annualSalary = salary * 12;
    let annualBonus = bonus;
    let chargeableIncome = annualSalary + annualBonus - relief;
    let taxAmount = 0;

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

    setIncome(chargeableIncome);
    setTax(taxAmount);
  };

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(Number(event.target.value));
  };

  const handleBonusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBonus(Number(event.target.value));
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

  return (
    <Container maxW="sm" centerContent>
      <Text fontSize="xl" mb={1}>Singapore Income Tax Estimator</Text>
      <Text fontSize="l" mb={2}>FY2023 basic ver1.0</Text>
      <Text textAlign="left"
        w="100%"
        maxW="md"
        px={4}
        py={1}
        borderRadius="md">Enter Monthly Salary:</Text>
      <Input type="number" placeholder="Enter monthly salary" value={salary} onChange={handleSalaryChange} mb={1} />
      <Text textAlign="left"
        w="100%"
        maxW="md"
        px={4}
        py={1}
        borderRadius="md">Enter Annual Bonus:</Text>
      <Input type="number" placeholder="Enter annual bonus" value={bonus} onChange={handleBonusChange} mb={1} />
      <Text textAlign="left"
        w="100%"
        maxW="md"
        px={4}
        py={1}
        borderRadius="md">Enter Total Tax Relief:</Text>
      <Input type="number" placeholder="Enter tax relief" value={relief} onChange={handleReliefChange} mb={2} />
      <Button colorScheme="teal" onClick={calculateTax} mb={4}>Calculate Tax and Mint Token</Button>
      <Text>Annual Chargeable Income: {new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(income)}</Text>
      <Text mb={4}>Estimated Income Tax Payable: {new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(tax)}</Text>
      <Button
          bgColor="violet"
          onClick={handleClick}
          >
        <Text>Link your wallet to see more</Text>
        <ArrowForwardIcon />
      
    </Button>
    </Container>
  );
};

export default Disconnected;
