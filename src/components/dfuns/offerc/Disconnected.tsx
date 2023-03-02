'use client'
import { FC, MouseEventHandler, useCallback, useState } from "react"
import { Container, Input, Button, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"

const Disconnected = () => {
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
  const { wallet, connect } = useWallet()

  const calculateTax = () => {
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
  };

  let increase_b4tax = income_b4tax_offer1 - income_b4tax;
  let increase_aftax = income_aftax_offer1 - income_aftax;

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

  function formatCurrency(num: number): string {
    return new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(num).replace(/\.\d{2}/, '');
  }

  return (
    <Container maxW="lg" centerContent>
      <Text fontSize="xl" mb={1}>Singapore Job Offer Compare</Text>
      <Text fontSize="l" mb={2}>FY2023 basic ver1.0</Text>
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
      <Text mb={4}>Income Increment Before/After tax: {formatCurrency(increase_b4tax)} / {formatCurrency(increase_aftax)}</Text>
      <Button
          bgColor="purple"
          color="black"
          onClick={handleClick}
          >
        <Text>Link your wallet to see more</Text>
        <ArrowForwardIcon />
      
    </Button>
    </Container>
  );
};

export default Disconnected;
