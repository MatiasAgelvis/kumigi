// import Select from "react-select";
import { DragHandleIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  IconButton,
  Heading,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  EditIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import namer from "color-namer";
import capitalize from "../../../utils/capitalize";

function CardHeader({
  shape,
  color,
  displayLayer,
  setdisplayLayer,
  closeButton,
  isEditorOpen,
  onEditorToggle,
  displayButtons,
  ...props
}) {
  function colorName(color, pick = "basic") {
    try {
      return capitalize(namer(color, { pick: [pick] })[pick][0].name);
    } catch {
      return "";
    }
  }

  function layerName(color, shape) {
    return `${colorName(color, "pantone")} ${capitalize(shape ? shape : "")}`;
  }

  return (
    <HStack {...props}>
      <Center
        className="dragHandle"
        alignSelf="start"
        py="0.7rem"
        // increases the click box
        pr={["0.4rem", "0.5rem"]}
        // gives more room
        mr={["0.1rem", "0.4rem"]}
        _hover={{ cursor: "grab" }}
      >
        <DragHandleIcon />
      </Center>
      <Box w="100%">
        {displayButtons && (
          <HStack float="right" mb="0.7rem" ml="5px">
            <IconButton
              size={useBreakpointValue({ base: "sm", md: "md" })}
              onClick={() => setdisplayLayer(!displayLayer)}
              icon={displayLayer ? <ViewIcon /> : <ViewOffIcon />}
            />
            <IconButton
              size={useBreakpointValue({ base: "sm", md: "md" })}
              onClick={onEditorToggle}
              icon={isEditorOpen ? <LockIcon /> : <EditIcon />}
            />
            <IconButton
              size={useBreakpointValue({ base: "sm", md: "md" })}
              onClick={() => closeButton()}
              icon={<CloseIcon />}
            />
          </HStack>
        )}

        <Heading
          as="h4"
          my="0.5rem"
          p="0.2rem"
          size="md"
          fontSize={["lg", "xl"]}
        >
          {layerName(color, shape)}
        </Heading>
      </Box>
    </HStack>
  );
}

export default CardHeader;
