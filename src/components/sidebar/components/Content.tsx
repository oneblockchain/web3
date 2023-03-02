'use client'
// chakra imports
import { Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
//   Custom components
import avatar4 from '/public/img/avatars/avatar4.png';
import { NextAvatar } from 'components/image/Avatar';
import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';
import SidebarCard from 'components/sidebar/components/SidebarCard';
import { PropsWithChildren } from 'react';
import { IRoute } from 'types/navigation';

// FUNCTIONS

interface SidebarContent extends PropsWithChildren {
  routes: IRoute[];
}

function SidebarContent(props: SidebarContent) {
  const { routes } = props;
  const textColor = useColorModeValue('navy.700', 'white');
  // SIDEBAR
  return (
    <Flex direction="column" height="100%" pt="25px" borderRadius="30px">
      <Brand />
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px" pe={{ md: '16px', '2xl': '1px' }}>
          <Links routes={routes} />
        </Box>
      </Stack>

      <Box
        // ps="20px"
        // pe={{ md: '16px', '2xl': '0px' }}
        // borderRadius="30px"
        mt="60px"
        width={'100%'}
        display={'flex'}
        justifyContent={'center'}
      >
        <SidebarCard />
      </Box>
{/*       <Flex mt="75px" mb="56px" justifyContent="center" alignItems="center">
        <NextAvatar h="48px" w="48px" src={avatar4} me="20px" />
        <Box>
          <Text color={textColor} fontSize="md" fontWeight="700">
            Adela Parkson
          </Text>
          <Text color="secondaryGray.600" fontSize="sm" fontWeight="400">
            Product Designer1
          </Text>
        </Box>
      </Flex> */}
    </Flex>
  );
}

export default SidebarContent;
