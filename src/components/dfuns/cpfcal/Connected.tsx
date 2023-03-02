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
} from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"

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

const Connected: FC = () => {

  const modalState = useWalletModal()
  const { wallet, connect } = useWallet()

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

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    const newCpfContributions = calculateCpfContributions(salary, age, bonus);
    setCpfContributions(newCpfContributions);
  }

  return (
    <Container>
      <VStack spacing={10}>
        <Heading
          color="black"
          as="h3"
          size="xl"
          noOfLines={3}
          textAlign="center"
        >
          Calculate your monthly CPF contribution (standard ver1.0)
        </Heading>
        <VStack as="form" onClick={handleSubmit} spacing={1} width="100%" maxW="399px" color="blue">
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
          color="white"
          maxW="380px"
          onClick={handleSubmit}
          >
      <HStack>
        <Text>Calculate CPF Contributions & Mint Token</Text>
      </HStack>
    </Button>
        </VStack>
        {cpfContributions && (
          <VStack width="100%" maxW="600px" spacing={1} color="black">
            <Text>Monthly CPF by your employer: ${cpfContributions.cpf_emp.toFixed(2)}</Text>
            <Text>Monthly CPF by yourself: ${cpfContributions.cpf_self.toFixed(2)}</Text>
            <Text>Monthly CPF total: ${cpfContributions.cpf_tot.toFixed(2)}</Text>
            <Text>Monthly CPF OA: ${cpfContributions.cpf_oa.toFixed(2)}</Text>
            <Text>Monthly CPF SA: ${cpfContributions.cpf_sa.toFixed(2)}</Text>
            <Text>Monthly CPF MA: ${cpfContributions.cpf_ma.toFixed(2)}</Text>
            <Text>Yearly CPF total: ${cpfContributions.year_tot.toFixed(2)}</Text>
      </VStack>
    )}
        <Button
          bgColor="purple"
          color="white"

          onClick={handleClick}
          >
      <HStack>
        <Text>Pay 2 tokens to Preview new contribution amounts after changes of 2023</Text>
        <ArrowForwardIcon />
      </HStack>
    </Button>
  </VStack>
</Container>
  )
}
export default Connected
