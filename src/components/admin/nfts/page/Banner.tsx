'use client'
import React, { useState } from 'react';

// Chakra imports
import { Button, Box, Icon } from '@chakra-ui/react';
import { Image } from 'components/image/Image';
// Assets
import { IoHeart, IoHeartOutline } from 'react-icons/io5';

export default function Banner(props: { image: string }) {
  const [like, setLike] = useState(false);
  const { image } = props;

  // Chakra Color Mode
  return (
    <Box maxW="100%" mb="20px" position="relative" w="100%" h="100%" flex={1}>
      <Image src={image} w="100%" h="100%" borderRadius="20px" alt="" />
      <Button
        position="absolute"
        bg="linear-gradient(138.87deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 94.09%)"
        _hover={{
          bg: 'linear-gradient(138.87deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 94.09%)',
        }}
        _active={{
          bg: 'linear-gradient(138.87deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 94.09%)',
        }}
        _focus={{
          bg: 'linear-gradient(138.87deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 94.09%)',
        }}
        p="0px !important"
        top="30px"
        right="30px"
        borderRadius="50%"
        minW="60px"
        h="60px"
        onClick={() => {
          setLike(!like);
        }}
      >
        <Icon
          transition="0.2s linear"
          w="28px"
          h="28px"
          as={like ? IoHeart : IoHeartOutline}
          color="white"
        />
      </Button>
    </Box>
  );
}
