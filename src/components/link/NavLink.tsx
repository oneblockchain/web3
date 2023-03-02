'use client'
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { CSSProperties, PropsWithChildren } from 'react';

type NavLinkProps = NextLinkProps &
  PropsWithChildren & {
    styles?: CSSProperties;
  };

function NavLink({ children, styles, ...props }: NavLinkProps) {
  return (
    <NextLink style={styles} {...props}>
      {children}
    </NextLink>
  );
}

export default NavLink;
