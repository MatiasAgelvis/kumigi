// import Select from "react-select";
import { DragHandleIcon } from "@chakra-ui/icons";
import {
  Center,
  IconButton,
  Heading,
  HStack,
  SimpleGrid,
  Flex,
  StackProps,
  CenterProps,
} from "@chakra-ui/react";
import {
  EditIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import namer, { Palette } from "color-namer";
import capitalize from "../../../utils/capitalize";
import { buttonSize } from "app/utils/buttonOptions";
import { Shape } from "app/types/avatara";
import { Dispatch } from "react";

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
}: {
  shape: Shape | null;
  color: string;
  displayLayer: boolean;
  setdisplayLayer: Dispatch<boolean>;
  closeButton: () => void;
  isEditorOpen: boolean;
  onEditorToggle: () => void;
  displayButtons: boolean;
  dragHandleProps: CenterProps;
} & StackProps) {
  function colorName(color: string, pick: Palette = "basic") {
    const namero = namer(color, { pick: [pick] })[pick];
    return namero[0] ? capitalize(namero[0].name) : "";
  }

  function layerName(color: string, shape: Shape) {
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
                aria-label={`${displayLayer ? "hide" : "show"} this layer`}
                size={size}
                onClick={() => setdisplayLayer(!displayLayer)}
                icon={displayLayer ? <ViewIcon /> : <ViewOffIcon />}
              />
              <IconButton
                aria-label={`lock this layer`}
                size={size}
                onClick={onEditorToggle}
                icon={isEditorOpen ? <LockIcon /> : <EditIcon />}
              />
              <IconButton
                aria-label={`remove this layer`}
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
