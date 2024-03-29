'use client'
// Chakra imports
import { Box, Flex, Text, Badge, LightMode } from '@chakra-ui/react';
import LineChart from 'components/charts/LineChart';
// Custom components
import {
  lineChartDataSidebar,
  lineChartOptionsSidebar,
} from 'variables/charts';
import TokenSupply from 'components/dfuns/token/supply';


export default function SidebarDocs() {
  const bgColor = 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)';

  return (
    <Flex
      justify="center"
      direction="column"
      align="center"
      bg={bgColor}
      borderRadius="30px"
      me="20px"
      position="relative"
    >
      <Flex
        direction="column"
        mb="12px"
        align="center"
        justify="center"
        px="15px"
        pt="30px"
      >
        <Text
          fontSize={{ base: 'lg', xl: '2xl' }}
          color="white"
          fontWeight="bold"
          lineHeight="150%"
          textAlign="center"
          px="10px"
        >
         <TokenSupply mintAddress />
        </Text>
        <Text
          fontSize="sm"
          color="white"
          px="10px"
          mb="14px"
          textAlign="center"
        >
          Total Token Minted
        </Text>
        {/* @ts-ignore */}
        <LightMode>
          <Badge
            colorScheme="green"
            color="green.500"
            size="lg"
            borderRadius="58px"
          >
            +11%
          </Badge>
        </LightMode>
        <Box h="160px">
          <LineChart
            chartData={lineChartDataSidebar}
            chartOptions={lineChartOptionsSidebar}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
