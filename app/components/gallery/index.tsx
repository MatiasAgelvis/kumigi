import boxOptions from "app/utils/boxOptions";
import { Box, Flex, VStack } from "@chakra-ui/react";

function Dummy() {
  return <Box>'HIHIHIHIHIHIHI'</Box>;
}

function Gallery({ image, canvas, ...props }) {
  return (
    <Flex justify={"center"} {...props}>
      <Box
        w="clamp(1px,min-content,1000px)"
        {...boxOptions}
        w="fit-content"
        h="fit-content"
        maxW="100%"
      >
        InfiniteScroll
      </Box>
    </Flex>
  );
}

export default Gallery;
