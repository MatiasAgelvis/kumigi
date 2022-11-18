import { BoxProps, Flex, VStack } from "@chakra-ui/react";
import APIurl from "./apiUrl";
import boxOptions from "app/utils/boxOptions";
import { baseAtom, urlAtom } from "app/utils/store";
import { useRecoilState } from "recoil";

import { Box, Heading, Text, Link, Center } from "@chakra-ui/react";
import { NextComponentType } from "next";
import { useEffect } from "react";

const Footer: NextComponentType = ({ ...props }: BoxProps) => {
  const [url, _] = useRecoilState(urlAtom);
  const [BASE, setBASE] = useRecoilState(baseAtom);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBASE(window.location.origin + "/api");
    }
  });

  return (
    <Box {...props}>
      <Box {...boxOptions} m="1rem">
        <VStack spacing={2} align={"start"}>
          <Text fontSize={"x-small"}>Equivalent API call</Text>
          <Text wordBreak="break-all">
            <APIurl href={url}>{url}</APIurl>
          </Text>
        </VStack>
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
