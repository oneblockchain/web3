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
  Select,
} from "@chakra-ui/react"
import { Chart } from "react-google-charts";
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
  ceiling: number;
}

function calculateCpfContributions(salary: number, age: number, bonus: number, ceiling: number): ICpfContributions {
  let basicSalary = Math.min(salary, ceiling); 
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

  return { cpf_oa, cpf_sa, cpf_ma, cpf_emp, cpf_self, cpf_tot, year_tot, ceiling };
}

const Connected: FC = () => {

  const modalState = useWalletModal()
  const { wallet, connect } = useWallet()

  const [salary, setSalary] = useState<number>(6600);
  const [age, setAge] = useState<number>(25);
  const [bonus, setBonus] = useState<number>(10000);
  const [ceiling, setCeiling] = useState<number>(6300);
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
    ceiling: 6000,
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

    const newCpfContributions = calculateCpfContributions(salary, age, bonus, ceiling);
    setCpfContributions(newCpfContributions);
  }

  // pie chart
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
        <Heading
          as="h3"
          size="xl"
          noOfLines={3}
          textAlign="center"
        >
          Calculate your monthly CPF contribution (Premium ver1.0)
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
          <FormControl id="ceiling">
            <FormLabel>Salary Ceiling:</FormLabel>
            <Select placeholder="Select increased ceiling" value={ceiling} onChange={(event) => setCeiling(parseInt(event.target.value))}>
              <option value="6000">Before 1 September 2023 $6000</option>
              <option value="6300">From 1 September 2023 $6300</option>
              <option value="6800">From 1 January 2024 $6800</option>
              <option value="7400">From 1 January 2025 $7400</option>
              <option value="8000">From 1 January 2026 $8000</option>
            </Select>
          </FormControl>

          {/*    <Button type="submit">Calculate CPF Contributions</Button> */}
          <Button
            bgColor="teal"
            onClick={handleSubmit}
          >
            <HStack>
              <Text>Calculate CPF Contributions</Text>
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
{/*         <Button
          bgColor="violet"
          onClick={handleClick}
        >
          <HStack>
            <Text>Pay 2 tokens to Preview new contribution amounts after changes of 2023</Text>
            <ArrowForwardIcon />
          </HStack>
        </Button> */}
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
