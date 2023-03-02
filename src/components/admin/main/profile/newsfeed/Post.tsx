'use client'
import {
  AspectRatio,
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Image } from 'components/image/Image';
// Assets
import { FaRegCommentDots } from 'react-icons/fa';
import {} from 'react-icons/io';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import {
  MdBookmarkBorder,
  MdImage,
  MdOutlineAttachment,
  MdOutlineFavoriteBorder,
  MdOutlineTagFaces,
  MdShare,
} from 'react-icons/md';

// Custom components
import Card from 'components/card/Card';
import { HSeparator } from 'components/separator/Separator';

import SeeStory from 'components/actions/SeeStory';
import { NextAvatar } from 'components/image/Avatar';
import TransparentMenu from 'components/menu/TransparentMenu';

export default function Post(props: {
  avatar: string;
  name: string;
  username: string;
  image: string;
  likes: string | number;
  comments: string | number;
  shares: string | number;
  saves: string | number;
  commentBlocks: JSX.Element;
  you: string;
  [x: string]: any;
}) {
  const {
    avatar,
    name,
    username,
    image,
    likes,
    comments,
    shares,
    saves,
    commentBlocks,
    you,
    ...rest
  } = props;
  // Chakra color mode
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Card p={{ base: '15px', md: '30px' }} {...rest}>
      <Box mb="45px" w="100%">
        <Flex justify="space-between" align="center" w="100%">
          <Flex>
            <SeeStory
              action={() => console.log('Story seen!')}
              ps="0px"
              avatar={avatar}
              w="40px"
              h="40px"
              borderRadius="12px"
            />
            <Flex direction="column">
              <Text fontSize="md" color={textColor} fontWeight="700">
                {name}
              </Text>
              <Text fontSize="sm" color="gray.500" fontWeight="500">
                {username}
              </Text>
            </Flex>
          </Flex>
          <TransparentMenu
            icon={
              <Icon
                as={IoEllipsisHorizontal}
                w="24px"
                h="24px"
                color={textColor}
              />
            }
          />
        </Flex>
      </Box>

      <Flex direction="column">
        <AspectRatio width={'100%'} ratio={567 / 352}>
          <Image
            src={image}
            minW={{ sm: '270px' }}
            h="auto"
            borderRadius="16px"
            mb="30px"
            alt=""
          />
        </AspectRatio>
        <Box px={{ md: '20px' }} mt={'30px'}>
          <Flex justify="space-between" align="center" mb="30px">
            <Flex align="center" color={textColor}>
              <Icon
                as={MdOutlineFavoriteBorder}
                w="18px"
                h="18px"
                me="4px"
                cursor="pointer"
              />
              <Text fontSize="md" fontWeight="500">
                {likes}
                <Text
                  as="span"
                  display={{ base: 'none', md: 'unset' }}
                  fontSize="md"
                  fontWeight="500"
                >
                  {' '}
                  Likes
                </Text>
              </Text>
            </Flex>
            <Flex align="center" color={textColor}>
              <Icon
                as={FaRegCommentDots}
                w="18px"
                h="18px"
                me="4px"
                cursor="pointer"
              />
              <Text fontSize="md" fontWeight="500">
                {comments}
                <Text
                  as="span"
                  display={{ base: 'none', md: 'unset' }}
                  fontSize="md"
                  fontWeight="500"
                >
                  {' '}
                  Comments
                </Text>
              </Text>
            </Flex>
            <Flex align="center" color={textColor}>
              <Icon as={MdShare} w="18px" h="18px" me="4px" cursor="pointer" />
              <Text fontSize="md" fontWeight="500">
                {shares}
                <Text
                  as="span"
                  display={{ base: 'none', md: 'unset' }}
                  fontSize="md"
                  fontWeight="500"
                >
                  {' '}
                  Shares
                </Text>
              </Text>
            </Flex>
            <Flex align="center" color={textColor}>
              <Icon
                as={MdBookmarkBorder}
                w="18px"
                h="18px"
                me="4px"
                cursor="pointer"
              />
              <Text fontSize="md" fontWeight="500" me="3px">
                {saves}
                <Text
                  as="span"
                  display={{ base: 'none', md: 'unset' }}
                  fontSize="md"
                  fontWeight="500"
                >
                  {' '}
                  Saves
                </Text>
              </Text>
            </Flex>
          </Flex>
          <HSeparator mb="26px" />
          {commentBlocks}
          <Flex align="center" position="relative">
            <NextAvatar
              display={{ base: 'none', md: 'unset' }}
              src={you}
              w="50px"
              h="50px"
              me="15px"
            />
            <Input
              variant="social"
              placeholder="Write your comment..."
              style={{ background: 'transparent', borderRadius: 30 }}
              border={'1px solid'}
              _focus={{ borderColor: 'blue.500' }}
            />
            <Box position="absolute" right="0px">
              {' '}
              <IconButton
                aria-label="attach"
                me="2px"
                px="0px"
                variant="no-hover"
                bg="transparent"
              >
                <Icon
                  as={MdOutlineAttachment}
                  h="20px"
                  w="20px"
                  color="secondaryGray.700"
                  transform="rotate(270deg)"
                />
              </IconButton>
              <IconButton
                aria-label="faces"
                me="2px"
                px="0px"
                variant="no-hover"
                bg="transparent"
              >
                <Icon
                  as={MdOutlineTagFaces}
                  h="20px"
                  w="20px"
                  color="secondaryGray.700"
                />
              </IconButton>
              <IconButton
                aria-label="image"
                me="2px"
                px="0px"
                variant="no-hover"
                bg="transparent"
              >
                <Icon
                  as={MdImage}
                  h="20px"
                  w="20px"
                  color="secondaryGray.700"
                />
              </IconButton>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}
