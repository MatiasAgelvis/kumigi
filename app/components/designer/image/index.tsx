import boxOptions from "../../../utils/boxOptions";
import { Box, ButtonGroup, Flex, FlexProps, VStack } from "@chakra-ui/react";
import ImageBox from "./imageBox";
import DownloadButton from "app/components/functionButtons/downloadButton";
import CopyButton from "app/components/functionButtons/copyButton";
import Avatara from "app/lib/avatara";
import { Layer } from "app/types/avatara";
import applyLayers from "app/utils/applyLayers";
import makeApiUrl from "app/utils/makeApiUrl";
import { useLocation } from "app/hooks/useLocation";
import { buttonSize } from "app/utils/buttonOptions";
import { CopyIcon } from "@chakra-ui/icons";

export default function Image({
  layers,
  dimensions,
  alt,
  ...props
}: {
  layers: Layer[];
  dimensions: { height: number; width: number };
  alt?: string;
} & FlexProps) {
  const { height, width } = dimensions;
  const avatar = new Avatara(width, height);
  applyLayers(avatar, layers);
  const image = avatar.toDataURL();
  const location = useLocation();

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
            <ButtonGroup
              variant={"outline"}
              size={buttonSize}
              colorScheme={"teal"}
            >
              <DownloadButton image={image} />
              <CopyButton
                leftIcon={<CopyIcon />}
                message="Copy URL"
                value={makeApiUrl(
                  location ? location.origin : "",
                  layers,
                  dimensions
                )}
              />
            </ButtonGroup>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
