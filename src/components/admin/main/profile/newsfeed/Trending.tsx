'use client'
// Chakra imports
import {
  AspectRatio,
  AvatarGroup,
  Box,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'components/link/Link';

// Custom components
import Follow from 'components/actions/Follow';
import Card from 'components/card/Card';
// Assets
import avatar1 from '/public/img/avatars/avatar1.png';
import avatar10 from '/public/img/avatars/avatar10.png';
import avatar2 from '/public/img/avatars/avatar2.png';
import avatar3 from '/public/img/avatars/avatar3.png';
import avatar4 from '/public/img/avatars/avatar4.png';
import avatar5 from '/public/img/avatars/avatar5.png';
import avatar6 from '/public/img/avatars/avatar6.png';
import avatar7 from '/public/img/avatars/avatar7.png';
import avatar8 from '/public/img/avatars/avatar8.png';
import avatar9 from '/public/img/avatars/avatar9.png';
import image1 from '/public/img/profile/image1.png';
import image2 from '/public/img/profile/image2.png';
import image3 from '/public/img/profile/image3.png';
import image4 from '/public/img/profile/image4.png';
import image5 from '/public/img/profile/image5.png';
import image6 from '/public/img/profile/image6.png';
import { NextAvatar } from 'components/image/Avatar';
import { Image } from 'components/image/Image';

export default function Trending(props: { [x: string]: any }) {
  const { ...rest } = props;

  // Chakra Color Modev
  const boxBg = useColorModeValue('#F4F7FE !important', '#1B254B !important');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.700', 'white');
  return (
    <Card height="max-content" {...rest}>
      <Text fontSize="lg" color={textColor} fontWeight="700" mb="20px">
        Trending Feeds
      </Text>
      <SimpleGrid columns={3} mb="40px" gap="8px">
        <Link href="#">
          <AspectRatio w={'100%'} ratio={10 / 9}>
            <Image
              h={'100%'}
              w={'100%'}
              borderRadius="8px"
              src={image1}
              alt=""
            />
          </AspectRatio>
        </Link>
        <Link href="#">
          <AspectRatio w={'100%'} ratio={10 / 9}>
            <Image borderRadius="8px" src={image2} alt="" />
          </AspectRatio>
        </Link>
        <Link href="#">
          <AspectRatio w={'100%'} ratio={10 / 9}>
            <Image borderRadius="8px" src={image3} alt="" />
          </AspectRatio>
        </Link>
        <Link href="#">
          <AspectRatio w={'100%'} ratio={10 / 9}>
            <Image borderRadius="8px" src={image4} alt="" />
          </AspectRatio>
        </Link>
        <Link href="#">
          <AspectRatio w={'100%'} ratio={10 / 9}>
            <Image borderRadius="8px" src={image5} alt="" />
          </AspectRatio>
        </Link>
        <Link href="#">
          <AspectRatio w={'100%'} ratio={10 / 9}>
            <Image borderRadius="8px" src={image6} alt="" />
          </AspectRatio>
        </Link>
      </SimpleGrid>
      <Text fontSize="lg" color={textColor} fontWeight="700" mb="20px">
        Suggestions for you
      </Text>
      <Follow
        mb="26px"
        name="Dragos Markus"
        username="@dragos_markus024"
        sum="-$15.50"
        avatar={avatar1}
      />
      <Follow
        mb="26px"
        name="Emily James"
        username="@james.cox.official"
        sum="-$11.37"
        avatar={avatar9}
      />
      <Follow
        mb="26px"
        name="Iaon Dint"
        username="@iaondint_0943"
        sum="-$34.90"
        avatar={avatar2}
      />
      <Follow
        mb="26px"
        name="William Jackson"
        username="@wllm.jackson"
        sum="-$5.21"
        avatar={avatar10}
      />
      <Follow
        mb="40px"
        name="Marius Ionescu"
        username="@marius_balauru97"
        sum="-$5.21"
        avatar={avatar7}
      />
      <Text fontSize="lg" color={textColor} fontWeight="700" mb="20px">
        Profile Activity
      </Text>
      <Box borderRadius="20px" bg={boxBg} p="30px">
        <AvatarGroup flexWrap="wrap" mb="20px">
          <NextAvatar
            h="42px"
            w="42px"
            border="3px solid"
            borderColor={boxBg}
            src={avatar1}
          />
          <NextAvatar
            h="42px"
            w="42px"
            border="3px solid"
            borderColor={boxBg}
            src={avatar2}
          />
          <NextAvatar
            h="42px"
            w="42px"
            border="3px solid"
            borderColor={boxBg}
            src={avatar3}
          />
          <NextAvatar
            h="42px"
            w="42px"
            border="3px solid"
            borderColor={boxBg}
            src={avatar4}
          />
          <NextAvatar
            h="42px"
            w="42px"
            border="3px solid"
            borderColor={boxBg}
            src={avatar5}
          />
          <NextAvatar
            h="42px"
            w="42px"
            border="3px solid"
            borderColor={boxBg}
            src={avatar6}
          />
          <NextAvatar
            h="42px"
            w="42px"
            border="3px solid"
            borderColor={boxBg}
            src={avatar7}
          />
          <NextAvatar
            h="42px"
            w="42px"
            border="3px solid"
            borderColor={boxBg}
            src={avatar8}
          />
          <NextAvatar
            h="44px"
            w="44px"
            border="3px solid"
            borderColor={boxBg}
            src={avatar9}
          />
        </AvatarGroup>

        <Text fontSize="xl" color={textColor} fontWeight="700" mb="10px">
          2,9k Followers Active
        </Text>
        <Text
          pe="20px"
          fontSize="sm"
          color={textColorSecondary}
          fontWeight="500"
        >
          Now is the perfect time for uploading your new social media post!
          <Link href={'#'} ms="4px" color={brandColor}>
            Create a new post!
          </Link>
        </Text>
      </Box>
    </Card>
  );
}
