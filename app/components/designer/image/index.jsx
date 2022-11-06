import boxOptions from "../../../utils/boxOptions";
import { Box, Flex, VStack } from "@chakra-ui/react";
import ImageBox from "./imageBox";
import DownloadButton from "./downloadButton";

function Image({ image, alt, canvas, ...props }) {
  return (
    <Flex justify={"center"} {...props}>
      <Box
        sx={{ alignSelf: "stretch" }}
        w="clamp(1px,min-content,1000px)"
        mx={["auto", "auto", "auto", "4"]}
      >
        <Box
          {...boxOptions}
          sx={{ position: "-webkit-sticky", position: "sticky", top: "2%" }}
          w="fit-content"
          h="fit-content"
          maxW="100%"
        >
          <VStack gap={4}>
            <ImageBox image={image} alt={alt} />
            <DownloadButton canvas={canvas} />
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}

export default Image;
