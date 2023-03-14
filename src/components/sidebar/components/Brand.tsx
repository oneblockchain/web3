'use client'
// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components
//import { OneLogo } from 'components/icons/Icons';
// 			<OneLogo h='26px' w='175px' my='32px' color={logoColor} /> 
import Image from 'next/image';
import { OneLogo } from 'components/icons/OneLogo.svg';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
 			<Image src="/svg/OneLogo.svg" alt="Logo" width={256} height={188} />
		</Flex>
	);
}

export default SidebarBrand;
