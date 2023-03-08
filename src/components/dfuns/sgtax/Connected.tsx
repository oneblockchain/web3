'use client'
import { FC, MouseEventHandler, useCallback, useState } from "react"
import { Container, Input, Button, Text, Select } from '@chakra-ui/react'
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Chart } from "react-google-charts";
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import Link from "next/link"
import MintToken from "components/dfuns/token/mint"


const Connected: FC = () => {
  const [salary, setSalary] = useState<number>(10000);
  const [bonus, setBonus] = useState<number>(20000);
  const [relief, setRelief] = useState<number>(21400);
  const [income, setIncome] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [tax_afterCpfTopup, setTax_afterCpfTopup] = useState<number>(0);
  const [tax_saved, setTax_saved] = useState<number>(0);
  const [tax_rebate, setTax_rebate] = useState<number>(0);
  const [tax_percent, setTax_percent] = useState<number>(0); 
  const [cpf_year, setCpf_year] = useState<number>(0); 
  const [cpf_topup, setCpf_topup] = useState<number>(5000); 
  const [cash_inhand, setCash_inhand] = useState<number>(0); 

  const modalState = useWalletModal()
  const { wallet, connect } = useWallet()

  //chart
  const data = [
    ["Annual", "Amount"],
    ["CPF contributed by self & employer", cpf_year],
    ["Tax Paid", tax],
    ["Cash In Hand", cash_inhand],

  ];
  const options = {
    title: "Annual Income",
    sliceVisibilityThreshold: 0.005,
  };


  const calculateTax = (async () => {
    let annualSalary = salary * 12;
    let annualBonus = bonus;
    let chargeableIncome = annualSalary + annualBonus - relief;
    let chargeableIncome_afterCpfTopup = annualSalary + annualBonus - relief - cpf_topup;
    let taxAmount = 0;
    let taxAmount_afterCpfTopup = 0;
    let taxSaved = 0;
    let taxPercent = 0;
    let cpf_month = Math.min(salary, 6000) * 0.37;
    let cpf_bonus = bonus * 0.37;
    let cpf_year  = Math.min((cpf_month * 12 + cpf_bonus),37740)
    let cashInHand = 0;
 
    // calculate taxable annual income
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
    } else {
      taxAmount = 29550 + (chargeableIncome - 240000) * 0.22;
    }

    // calculate taxable annual income after cash cpf topup
    if (chargeableIncome_afterCpfTopup <= 20000) {
      taxAmount_afterCpfTopup = 0;
    } else if (chargeableIncome_afterCpfTopup <= 30000) {
      taxAmount_afterCpfTopup = (chargeableIncome_afterCpfTopup - 20000) * 0.02;
    } else if (chargeableIncome_afterCpfTopup <= 40000) {
      taxAmount_afterCpfTopup = 200 + (chargeableIncome_afterCpfTopup - 30000) * 0.035;
    } else if (chargeableIncome_afterCpfTopup <= 80000) {
      taxAmount_afterCpfTopup = 550 + (chargeableIncome_afterCpfTopup - 40000) * 0.07;
    } else if (chargeableIncome_afterCpfTopup <= 120000) {
      taxAmount_afterCpfTopup = 3350 + (chargeableIncome_afterCpfTopup - 80000) * 0.115;
    } else if (chargeableIncome_afterCpfTopup <= 160000) {
      taxAmount_afterCpfTopup = 7950 + (chargeableIncome_afterCpfTopup - 120000) * 0.15;
    } else if (chargeableIncome_afterCpfTopup <= 200000) {
      taxAmount_afterCpfTopup = 13950 + (chargeableIncome_afterCpfTopup - 160000) * 0.18;
    } else if (chargeableIncome_afterCpfTopup <= 240000) {
      taxAmount_afterCpfTopup = 21150 + (chargeableIncome_afterCpfTopup - 200000) * 0.19;
    } else {
      taxAmount_afterCpfTopup = 29550 + (chargeableIncome_afterCpfTopup - 240000) * 0.22;
    }

    // actual tax amount, min is 0 after decuting tax rebate
    taxAmount = Math.max((taxAmount - tax_rebate),0)
    taxAmount_afterCpfTopup = Math.max((taxAmount_afterCpfTopup - tax_rebate),0)
    taxSaved = taxAmount - taxAmount_afterCpfTopup
    taxPercent = Math.round((taxAmount / (annualSalary + annualBonus)) * 100)
    cashInHand = annualSalary + annualBonus - taxAmount - (cpf_year * 20 /37)
    setIncome(chargeableIncome);
    setTax(taxAmount);
    setTax_percent(taxPercent)
    setCpf_year(cpf_year)
    setTax_afterCpfTopup(taxAmount_afterCpfTopup)
    setTax_saved(taxSaved)
    setCash_inhand(cashInHand)

    // add mint token function
    try {
      await MintToken();
    // Token minting was successful, do something here
    } catch (error) {
    // Token minting failed, handle the error here
      console.error(error);
    }  
  });

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(Number(event.target.value));
  };

  const handleBonusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBonus(Number(event.target.value));
  };

  const handleReliefChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRelief(Number(event.target.value));
  };

  const handleRebateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTax_rebate(Number(event.target.value));
  };

  const handleTopupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCpf_topup(Number(event.target.value));
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
    <><Container maxW="md" centerContent>
      <Text fontSize="xl" mb={1}>Singapore Income Tax Estimator</Text>
      <Text fontSize="l" mb={2}>FY2023 standard ver1.0</Text>
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
        borderRadius="md">Enter Some Tax Reliefs (eg. Earned Income $1000, CPF Relief max $20400):</Text>
      <Input type="number" placeholder="Enter tax relief" value={relief} onChange={handleReliefChange} mb={1} />
      <Text textAlign="left"
        w="100%"
        maxW="md"
        px={4}
        py={1}
        borderRadius="md">Enter CPF SA/RA cash Top up (Relief amount up to $8K to yourself & another $8K to family):</Text>
      <Select value={cpf_topup} mb={4} onChange={handleTopupChange}>
        <option value="0">$0</option>
        <option value="1000">$1,000</option>
        <option value="2000">$2,000</option>
        <option value="3000">$3,000</option>
        <option value="4000">$4,000</option>
        <option value="5000">$5,000</option>
        <option value="6000">$6,000</option>
        <option value="7000">$7,000</option>
        <option value="8000">$8,000</option>
        <option value="10000">$10,000</option>
        <option value="12000">$12,000</option>
        <option value="16000">$16,000</option>
      </Select>
      <Text textAlign="left"
        w="100%"
        maxW="md"
        px={4}
        py={1}
        borderRadius="md">Enter Total Tax Rebate (eg. Parenthood Tax Rebate $5000-20000 per child):</Text>
      <Input type="number" placeholder="Enter tax rebate" value={tax_rebate} onChange={handleRebateChange} mb={2} />

      <Button colorScheme="teal" onClick={calculateTax} mb={2}>Calculate Tax and Mint Token</Button>

      <Text textAlign="left" w="100%">Annual Chargeable Income: {formatCurrency(income)}</Text>
      <Text textAlign="left" w="100%">Annual CPF Contributed: {formatCurrency(cpf_year)}</Text>
      <Text textAlign="left" w="100%">Estimated Income Tax Payable Before CPF cash Topup: {formatCurrency(tax)} with actual tax rate {tax_percent}%</Text>
      <Text textAlign="left" w="100%" mb={2}>Do you know, if you top up cash ${cpf_topup} to your or/and family CPF SA/RA you can save $ {tax_saved} tax</Text>

      <Link href="/dfuns/sgtaxP">
        <Button bgColor="violet" as="a">Pay 2 tokens to see detail income composition <ArrowForwardIcon /></Button>
      </Link>

{/*       <Button
        bgColor="violet"
        onClick={handleClick}
      >
        <Text>Pay 2 tokens to see detail income composition </Text>
        <ArrowForwardIcon />
      </Button> */}

    </Container>
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"300px"}
    />
    </>
  );
};

export default Connected;
