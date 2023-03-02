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
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import Connected from 'components/admin/main/account/settings/Connected';
import Delete from 'components/admin/main/account/settings/Delete';
import Information from 'components/admin/main/account/settings/Information';
import Newsletter from 'components/admin/main/account/settings/Newsletter';
import Password from 'components/admin/main/account/settings/Password';
import Profile from 'components/admin/main/account/settings/Profile';
import Sessions from 'components/admin/main/account/settings/Sessions';
import Socials from 'components/admin/main/account/settings/Socials';
import TwoFactor from 'components/admin/main/account/settings/TwoFactor';

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* Main Fields */}
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1, lg: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        {/* Column Left */}
        <Flex direction="column">
          <Profile />
          <Information />
          <Socials />
          <Password />
        </Flex>
        {/* Column Right */}
        <Flex direction="column">
          <TwoFactor mb="20px" />
          <Newsletter mb="20px" />
          <Sessions mb="20px" />
          <Connected mb="20px" />
          <Delete />
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
