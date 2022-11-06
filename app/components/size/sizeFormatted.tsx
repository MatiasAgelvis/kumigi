import { Box, BoxProps, StackProps, VStack } from "@chakra-ui/react";
import FullWidth from "../formatting/fullWidth";
import sizeComponents from "./sizeComponents";

interface Props {
  boxProps?: BoxProps;
  vstackProps?: StackProps;
}

export default function sizeFormatted({ boxProps, vstackProps }: Props = {}) {
  return (
    <Box {...boxProps}>
      <VStack align="stretch" {...vstackProps}>
        {Array.from(sizeComponents()).map((option, i) => (
          <FullWidth key={i} name={option.name} input={option.input} />
        ))}
      </VStack>
    </Box>
  );
}
