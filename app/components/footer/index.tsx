import { BoxProps, Flex, VStack } from "@chakra-ui/react";
import APIurl from "./apiUrl";
import boxOptions from "app/utils/boxOptions";
import { urlAtom } from "app/utils/store";
import { useRecoilState } from "recoil";

import { Box, Heading, Text, Link, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import animationOptions from "app/utils/animationOptions";
import { NextComponentType } from "next";

const Footer: NextComponentType = ({ ...props }: BoxProps) => {
  const [url, _] = useRecoilState(urlAtom);

  return (
    <Box {...props}>
      <Box {...boxOptions} m="1rem">
        <Text wordBreak="break-all">
          <APIurl url={url} />
        </Text>
      </Box>
      <Center>
        <Text mr={2}>by</Text>
        <Heading size={"lg"}>
          <Link href="https://matiasagelvis.com">Matias Agelvis</Link>
        </Heading>
      </Center>
    </Box>
  );
};

export default Footer;
