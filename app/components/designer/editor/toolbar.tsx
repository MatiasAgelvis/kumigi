import {
  Button,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { randomLayers } from "app/lib/avatara";
import { buttonSize } from "app/utils/buttonOptions";
import { idCard, layers__Default } from "app/utils/createLayer";
import SaveButton from "app/components/functionButtons/saveButton";
import { useRecoilState } from "recoil";
import { imageAtom, nameAtom } from "app/utils/store";
import { Layer, UseUndoType } from "app/types/avatara";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Toolbar({
  layerState,
  ...props
}: { layerState: UseUndoType<Layer[]> } & FlexProps) {
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

  const [name, setName] = useRecoilState(nameAtom);
  const [image, setImage] = useRecoilState(imageAtom);

  const size = buttonSize;
  return (
    <Flex {...props} wrap="wrap" gap={4}>
      <HStack spacing={4}>
        <IconButton
          icon={<FaArrowLeft />}
          size={size}
          fontSize={"2em"}
          aria-label="Undo"
          disabled={!canUndo}
          colorScheme="teal"
          onClick={undoLayers}
        />
        <IconButton
          icon={<FaArrowRight />}
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
            setImage("");
            setName("Name");
          }}
        >
          Reset
        </Button>
      </HStack>
    </Flex>
  );
}
