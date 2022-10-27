import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Spacer,
  useBreakpointValue,
  Wrap,
} from "@chakra-ui/react";
import { randomLayers } from "app/lib/avatara";
import boxOptions from "app/utils/boxOptions";
import { idCard, layers__Default } from "app/utils/createLayer";

export default function Toolbar({ layerState, ...props }) {
  const [
    { present: layers },
    {
      set: setLayers,
      reset: resetLayers,
      undo: undoLayers,
      redo: redoLayers,
      canUndo,
      canRedo,
    },
  ] = layerState;

  const size = useBreakpointValue({ base: "sm", md: "md" });
  return (
    <Flex {...props}>
      <HStack spacing={4}>
        <IconButton
          icon={<ArrowBackIcon />}
          size={size}
          aria-label="Undo"
          disabled={!canUndo}
          colorScheme="teal"
          onClick={undoLayers}
        />
        <IconButton
          icon={<ArrowForwardIcon />}
          size={size}
          aria-label="Redo"
          disabled={!canRedo}
          colorScheme="teal"
          onClick={redoLayers}
        />
      </HStack>
      <Spacer />
      <HStack spacing={4}>
        <Button
          size={size}
          colorScheme="blue"
          onClick={() =>
            setLayers(randomLayers().map((layer) => idCard(layer)))
          }
        >
          Randomize
        </Button>
        <Button
          size={size}
          colorScheme="red"
          onClick={() => {
            resetLayers(layers__Default);
          }}
        >
          Reset
        </Button>
      </HStack>
    </Flex>
  );
}
