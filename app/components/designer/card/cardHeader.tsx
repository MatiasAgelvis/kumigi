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
  Stack,
  useBreakpointValue,
  ButtonGroup,
  Spacer,
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
import Popovero from "app/components/popover";
import { FaEllipsisH } from "react-icons/fa";

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
  shape: Shape;
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

  const buttons = (
    <ButtonGroup flexGrow={0}>
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
    </ButtonGroup>
  );

  const popoverButtons = (
    <Center>
      <Popovero
        triggerer={
          <IconButton icon={<FaEllipsisH />} aria-label={"show card options"} />
        }
        body={buttons}
        contentProps={{ w: "full" }}
        placement="left"
      />
    </Center>
  );

  const optionButtons = useBreakpointValue([popoverButtons, buttons]);

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
      <Flex w="100%" gap={4}>
        <Heading
          as="h4"
          my="0.5rem"
          p="0.2rem"
          size="md"
          fontSize={["lg", "xl"]}
          flexGrow={1}
        >
          {layerName(color, shape)}
        </Heading>
        <Spacer />
        {displayButtons && optionButtons}
      </Flex>
    </HStack>
  );
}

export default CardHeader;
