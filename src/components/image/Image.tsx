'use client'
import { Box, ChakraComponent } from '@chakra-ui/react';
import NextImage, { ImageProps } from 'next/image';
import { ComponentProps } from 'react';

interface ChakraNextImageProps
  extends ComponentProps<ChakraComponent<'div', {}>> {
  nextProps?: Partial<ImageProps>;
}

function parseAssetPrefix(image: string) {
  const alreadyHasHttp = image.match('http');
  if (alreadyHasHttp) return image;

  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const alreadyHasPrefix = image.match(prefix);

  const finalUrl = alreadyHasPrefix ? image : `${prefix}${image}`;
  return finalUrl;
}

export function Image(props: ChakraNextImageProps) {
  const { src, alt, nextProps, ...rest } = props;

  const imageUrl = typeof src === 'string' ? src : src?.src;
  return (
    <Box overflow={'hidden'} position="relative" {...rest}>
      <NextImage
        objectFit="fill"
        layout="fill"
        src={parseAssetPrefix(imageUrl)}
        alt={alt}
        {...(nextProps || {})}
      />
    </Box>
  );
}
