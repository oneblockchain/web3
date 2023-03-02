'use client'
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

type LinkProps = ChakraLinkProps & NextLinkProps;

function Link({ href, children, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  );
}

export default Link;
