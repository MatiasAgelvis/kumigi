import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { randomLayers } from "app/lib/avatara";
import { buttonSize } from "app/utils/buttonOptions";
import { idCard, layers__Default } from "app/utils/createLayer";
import { Suspense } from "react";
import SaveButton from "app/components/functionButtons/saveButton";
import { useRecoilState } from "recoil";
import { imageAtom, nameAtom } from "app/utils/store";
import { Layer, UseUndoType } from "app/types/avatara";

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
        <Suspense>
          <SaveButton layers={layers} />
        </Suspense>
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
