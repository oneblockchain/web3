'use client'
// Chakra imports
import { Button, Flex, Text } from '@chakra-ui/react';
import Link from 'components/link/Link';

// Assets
import banner from '/public/img/nfts/NftBanner1.png';

export default function Banner() {
  // Chakra Color Mode
  return (
    <Flex
      direction="column"
      bgImage={banner?.src}
      bgSize="cover"
      py={{ base: '30px', md: '56px' }}
      px={{ base: '30px', md: '64px' }}
      borderRadius="30px"
    >
      <Text
        fontSize={{ base: '24px', md: '34px' }}
        color="white"
        mb="14px"
        maxW={{
          base: '100%',
          md: '64%',
          lg: '46%',
          xl: '70%',
          '2xl': '50%',
          '3xl': '42%',
        }}
        fontWeight="700"
        lineHeight={{ base: '32px', md: '42px' }}
      >
        Utilize & Build Web3 Functions and get rewarded
      </Text>
      <Text
        fontSize="md"
        color="#E3DAFF"
        maxW={{
          base: '100%',
          md: '64%',
          lg: '40%',
          xl: '56%',
          '2xl': '46%',
          '3xl': '34%',
        }}
        fontWeight="500"
        mb="40px"
        lineHeight="28px"
      >
        Best decentralized & digital solution marketplace available! 
        Access basic and standard functions for free and earn token. 
        Pay tokens to enjoy premium functions!
      </Text>
      <Flex align="center">
        <Button
          bg="white"
          color="black"
          _hover={{ bg: 'whiteAlpha.900' }}
          _active={{ bg: 'white' }}
          _focus={{ bg: 'white' }}
          fontWeight="500"
          fontSize="14px"
          py="20px"
          px="27"
          me="38px"
        >
          Discover now
        </Button>
        <Link href="https://youtu.be/KC9pMN0pToI">
          <Text color="white" fontSize="sm" fontWeight="500">
            Watch video
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
}
