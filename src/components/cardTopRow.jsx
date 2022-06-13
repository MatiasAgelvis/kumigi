// import Select from "react-select";
import { DragHandleIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  CloseButton,
  Flex,
  Heading,
  HStack,
  Switch,
} from "@chakra-ui/react";
import namer from "color-namer";
import {
  mobileOnly,
  desktopOnly,
  chakraViewportSplit,
} from "../utils/responsiveLayouts";

function CardTopRow({ shape, color, setdisplayLayer, ...props }) {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function colorName(color, pick = "basic") {
    return capitalize(namer(color, { pick: [pick] })[pick][0].name);
  }

  return (
    <HStack {...props}>
      <Center
        className="dragHandle"
        py="0.7rem"
        // increases the click box
        pr={["0.4rem", "0.5rem"]}
        // gives more room
        mr={["0.1rem", "0.4rem"]}
      >
        <DragHandleIcon />
      </Center>
      <Box w="100%">
        <Flex justify="space-between" gap={4}>
          <HStack>
            <Switch
              id="displayLayer"
              defaultChecked
              onChange={() => setdisplayLayer(!displayLayer)}
            />
            {/*<Heading as="h4" size="md" pl="0.2rem" fontSize={["lg", "xl"]}>
                {`Layer ${index + 1}`}
              </Heading>*/}
            <Heading
              as="h4"
              size="md"
              pl="0.2rem"
              fontSize={["lg", "xl"]}
              display={desktopOnly}
            >{`${colorName(color, "pantone")} ${capitalize(
              shape ? shape : ""
            )}`}</Heading>
          </HStack>
          <CloseButton onClick={() => deleteLayer()} />
        </Flex>

        <Heading
          as="h4"
          size="md"
          pl="0.2rem"
          display={mobileOnly}
          fontSize={["lg", "xl"]}
        >{`${colorName(color, "pantone")} ${capitalize(
          shape ? shape : ""
        )}`}</Heading>
      </Box>
    </HStack>
  );
}

export default CardTopRow;
