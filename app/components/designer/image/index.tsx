import boxOptions from "../../../utils/boxOptions";
import { Box, Flex, FlexProps, VStack } from "@chakra-ui/react";
import ImageBox from "./imageBox";
import DownloadButton from "app/components/functionButtons/downloadButton";
import { Canvas } from "canvas";

function Image({
  image,
  alt,
  canvas,
  ...props
}: { image?: string | null; alt?: string; canvas: Canvas } & FlexProps) {
  return (
    <Flex justify={"center"} {...props}>
      <Box
        sx={{ alignSelf: "stretch" }}
        w="clamp(1px,min-content,1000px)"
        mx={["auto", "auto", "auto", "4"]}
      >
        <Box
          {...boxOptions}
          sx={{ position: "sticky", top: "2%" }}
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
