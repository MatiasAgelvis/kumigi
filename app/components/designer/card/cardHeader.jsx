// import Select from "react-select";
import { DragHandleIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  IconButton,
  Heading,
  HStack,
  useBreakpointValue,
  Wrap,
  Grid,
  SimpleGrid,
  Flex,
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
import { buttonSize } from "app/utils/buttonOptions";

function CardHeader({
  shape,
  color,
  displayLayer,
  setdisplayLayer,
  closeButton,
  isEditorOpen,
  onEditorToggle,
  displayButtons,
  dragHandleProps,
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

  const size = buttonSize;

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
        {...dragHandleProps}
      >
        <DragHandleIcon />
      </Center>
      <SimpleGrid w="100%" columns={[1, null, 2]}>
        <Heading
          as="h4"
          my="0.5rem"
          p="0.2rem"
          size="md"
          fontSize={["lg", "xl"]}
        >
          {layerName(color, shape)}
        </Heading>
        {displayButtons && (
          <Flex alignItems="start" justifyContent="end">
            <HStack float="right" mb="0.7rem" ml="5px">
              <IconButton
                size={size}
                onClick={() => setdisplayLayer(!displayLayer)}
                icon={displayLayer ? <ViewIcon /> : <ViewOffIcon />}
              />
              <IconButton
                size={size}
                onClick={onEditorToggle}
                icon={isEditorOpen ? <LockIcon /> : <EditIcon />}
              />
              <IconButton
                size={size}
                onClick={() => closeButton()}
                icon={<CloseIcon />}
              />
            </HStack>
          </Flex>
        )}
      </SimpleGrid>
    </HStack>
  );
}

export default CardHeader;
