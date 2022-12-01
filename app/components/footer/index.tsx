import { Box, BoxProps, Flex, HStack, VStack } from "@chakra-ui/react";
import APIurl from "./apiUrl";
import boxOptions from "app/utils/boxOptions";

import { NextComponentType } from "next";
import buttonOptions from "app/utils/buttonOptions";
import SizeFormatted from "../size/sizeFormatted";
import Modalo from "../modal";

const Footer: NextComponentType = ({ ...props }: BoxProps) => {
  return (
    <Box {...props}>
      <Box {...boxOptions} m="1rem">
        <HStack spacing={2}>
          {/*<APIButton
            message="Copy Equivalent Link"
            layers={layers}
            parameters={{ height, width }}
          />*/}
          <Modalo
            open={"Size Options"}
            buttonProps={{ variant: "outline", colorScheme: "blue" }}
            body={<SizeFormatted />}
            modalProps={boxOptions}
          />
        </HStack>
      </Box>
      {/*<Center>
        <Text mr={2}>by</Text>
        <Heading size={"lg"}>
          <Link href="https://matiasagelvis.com">Matias Agelvis</Link>
        </Heading>
      </Center>*/}
    </Box>
  );
};

export default Footer;
