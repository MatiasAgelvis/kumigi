// import Select from "react-select";
import { DragHandleIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  IconButton,
  Flex,
  Heading,
  HStack,
} from "@chakra-ui/react";
import {
  EditIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import namer from "color-namer";
// import {
//   mobileOnly,
//   desktopOnly,
//   chakraViewportSplit,
// } from "../utils/responsiveLayouts";

function CardHeader({
  shape,
  color,
  displayLayer,
  setdisplayLayer,
  closeButton,
  isEditorOpen,
  onEditorToggle,
  ...props
}) {
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
            <Heading
              as="h4"
              size="md"
              pl="0.2rem"
              fontSize={["lg", "xl"]}
              display={["none", "block"]}
            >{`${colorName(color, "pantone")} ${capitalize(
              shape ? shape : ""
            )}`}</Heading>
          </HStack>

          <HStack>
            <IconButton
              onClick={() => setdisplayLayer(!displayLayer)}
              icon={displayLayer ? <ViewIcon /> : <ViewOffIcon />}
            />
            <IconButton
              onClick={onEditorToggle}
              icon={isEditorOpen ? <LockIcon /> : <EditIcon />}
            />
            <IconButton onClick={() => closeButton()} icon={<CloseIcon />} />
          </HStack>
        </Flex>

        <Heading
          as="h4"
          size="md"
          pl="0.2rem"
          display={["block", "none"]}
          fontSize={["lg", "lg", "xl"]}
        >{`${colorName(color, "pantone")} ${capitalize(
          shape ? shape : ""
        )}`}</Heading>
      </Box>
    </HStack>
  );
}

export default CardHeader;
