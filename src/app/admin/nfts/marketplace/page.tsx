'use client'
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react';
import Link from 'components/link/Link';

// Custom components
import Banner from 'components/admin/nfts/marketplace/Banner';
import TableTopCreators from 'components/admin/nfts/marketplace/TableTopCreators';
import HistoryItem from 'components/admin/nfts/marketplace/HistoryItem';
import NFT from 'components/card/NFT';
import Card from 'components/card/Card';

// Assets
import Nft1 from '/public/img/nfts/Nft1.png';
import Nft2 from '/public/img/nfts/Nft2.png';
import Nft3 from '/public/img/nfts/Nft3.png';
import Nft4 from '/public/img/nfts/Nft4.png';
import Nft5 from '/public/img/nfts/Nft5.png';
import Nft6 from '/public/img/nfts/Nft6.png';
import Avatar1 from '/public/img/avatars/avatar1.png';
import Avatar2 from '/public/img/avatars/avatar2.png';
import Avatar3 from '/public/img/avatars/avatar3.png';
import Avatar4 from '/public/img/avatars/avatar4.png';
import tableDataTopCreators from 'variables/nfts/marketplace/tableDataTopCreators';

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
        gap={{ base: '20px', xl: '20px' }}
        display={{ base: 'block', xl: 'grid' }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}
        >
          <Banner />
          <Flex direction="column">
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'start', md: 'center' }}
            >
              <Text
                color={textColor}
                fontSize="2xl"
                ms="24px"
                fontWeight="700"
              >
                Trending dFunctions
              </Text>
              <Flex
                align="center"
                me="20px"
                ms={{ base: '24px', md: '0px' }}
                mt={{ base: '20px', md: '0px' }}
              >
                <Link
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: '34px', md: '44px' }}
                  href={''}
                >
                  Personal Finance
                </Link>
                <Link
                  href={''}
                  color={textColorBrand}
                  me={{ base: '34px', md: '44px' }}>
                  AI
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: '34px', md: '44px' }}
                  href="/admin/nfts#collectibles"
                >
                  Useful Tooks
                </Link>
                <Link color={textColorBrand} fontWeight="500" href="/admin/nfts#sports">
                  Small Business
                </Link>
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              <NFT
                name="CPF Contribution Calulator"
                author="By The One"
                bidders={[
                  Avatar1,
                  Avatar2,
                ]}
                image={Nft1}
                currentbid="2000"
                download="https://demo-cpfcal.oneblockchain.sg/"
              />
              <NFT
                name="Income Tax Estimator"
                author="By The One"
                bidders={[
                  Avatar1,
                  Avatar2,
                ]}
                image={Nft2}
                currentbid="1999"
                download="https://demo-sgtax.oneblockchain.sg/"
              />
              <NFT
                name="Compare Job Offer"
                author="By The One"
                bidders={[
                  Avatar1,
                  Avatar2,
                ]}
                image={Nft3}
                currentbid="1888"
                download="https://demo-offerc.oneblockchain.sg/"
              />
            </SimpleGrid>
            <Text
              mt="45px"
              mb="36px"
              color={textColor}
              fontSize="2xl"
              ms="24px"
              fontWeight="700"
            >
              Recently Added
            </Text>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap="20px"
              mb={{ base: '20px', xl: '0px' }}
            >
              <NFT
                name="URL2QR"
                author="By Peter Will"
                bidders={[
                  Avatar1,
                  Avatar2,
                ]}
                image={Nft4}
                currentbid="1111"
                download="#"
              />
              <NFT
                name="Image"
                author="By Mark Benjamin"
                bidders={[
                  Avatar3,
                  Avatar4,
                ]}
                image={Nft5}
                currentbid="999"
                download="#"
              />
              <NFT
                name="3D Cubes Art"
                author="By Manny Gates"
                bidders={[
                  Avatar3,
                  Avatar4,
                ]}
                image={Nft6}
                currentbid="888"
                download="#"
              />
            </SimpleGrid>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          gridArea={{ xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3' }}
        >
          <Card px="0px" mb="20px">
            <TableTopCreators tableData={tableDataTopCreators} />
          </Card>
          <Card p="0px">
            <Flex
              align={{ sm: 'flex-start', lg: 'center' }}
              justify="space-between"
              w="100%"
              px="22px"
              py="18px"
            >
              <Text color={textColor} fontSize="xl" fontWeight="600">
                Premium Function Paid
              </Text>
              <Button variant="action">See all</Button>
            </Flex>

            <HistoryItem
              name="CPF Contribution Calulator"
              author="By The One"
              date="30s ago"
              image={Nft5}
              price="2 Token"
            />
            <HistoryItem
              name="Income Tax Estimator"
              author="By The One"
              date="58s ago"
              image={Nft1}
              price="3 Token"
            />
            <HistoryItem
              name="Compare Job Offer"
              author="By The One"
              date="1m ago"
              image={Nft2}
              price="5 Token"
            />
          </Card>
        </Flex>
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
