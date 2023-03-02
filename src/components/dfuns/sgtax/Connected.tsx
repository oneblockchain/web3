'use client'
import { FC, MouseEventHandler, useCallback, useState } from "react"
import { Container, Input, Button, Text, Select } from '@chakra-ui/react'
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { PieChart, Pie, Sector, Cell, Legend, ResponsiveContainer } from 'recharts';
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"

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

  const modalState = useWalletModal()
  const { wallet, connect } = useWallet()

  //chart
  const data = [
    { name: 'CPF Contributed', value: cpf_year },
    { name: 'Tax Paid', value: tax },
    { name: 'Income', value: income },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }

  const calculateTax = () => {
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
    setIncome(chargeableIncome);
    setTax(taxAmount);
    setTax_percent(taxPercent)
    setCpf_year(cpf_year)
    setTax_afterCpfTopup(taxAmount_afterCpfTopup)
    setTax_saved(taxSaved)
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

      <Button colorScheme="teal" onClick={calculateTax} mb={4}>Calculate Tax and Mint Token</Button>

      <Text textAlign="left" w="100%">Annual Chargeable Income: {new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(income)}</Text>
      <Text textAlign="left" w="100%">Annual CPF Contributed: {new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(cpf_year)}</Text>
      <Text textAlign="left" w="100%">Estimated Income Tax Payable: {new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD' }).format(tax)} with actual tax rate {tax_percent}%</Text>
      <Text textAlign="left" w="100%">Do you know, if you top up cash ${cpf_topup} to your CPF SA/RA you can save $ {tax_saved}</Text>


      <Button
        bgColor="purple"
        color="black"
        onClick={handleClick}
      >
        <Text>Pay 2 tokens to view more</Text>
        <ArrowForwardIcon />

      </Button>
    </Container>
    <ResponsiveContainer width="100%" height="100%">
        <PieChart width={666} height={666}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          </Pie>
        </PieChart></ResponsiveContainer></>
  );
};

export default Connected;
