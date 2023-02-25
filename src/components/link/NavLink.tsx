import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { CSSProperties, PropsWithChildren } from 'react';

type NavLinkProps = NextLinkProps &
  PropsWithChildren & {
    styles?: CSSProperties;
  };

function NavLink({ children, styles, ...props }: NavLinkProps) {
  return (
    <NextLink {...props}>
      <a style={styles}>{children}</a>
    </NextLink>
  );
}

export default NavLink;
