// import Select from "react-select";
import {
  Box,
  SimpleGrid,
  useDisclosure,
  Collapse,
  BoxProps,
} from "@chakra-ui/react";
import ColorPicker from "./colorPicker";
import OptionSelect from "./optionSelect";
import TextInput from "./textInput";
import boxOptions from "../../../utils/boxOptions";
import CardHeader from "./cardHeader";
import { useColorModeValue } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Layer, OKey } from "app/types/avatara";
import { Dispatch } from "react";

export default function DummyCard({
  index,
  layer,
  isOverlay = true,
  ...props
}: {
  index: number;
  layer: Layer;

  isOverlay?: boolean;
} & BoxProps) {
  const { shape, color, text, font, ...rest } = layer;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isSorting,
  } = useSortable({
    id: layer.id!,
  });

  const { isOpen: isEditorOpen, onToggle: onEditorToggle } = useDisclosure({
    defaultIsOpen: true,
  });

  const backgroundColor = useColorModeValue("whiteAlpha.900", "gray.800");
  const backgroundColorOnDrag = useColorModeValue("teal.50", "teal.900");
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : undefined,
  };
  // console.log(attributes);

  return (
    <Box
      style={style}
      my={3}
      {...boxOptions}
      ref={setNodeRef}
      p={["0.7rem", 5]}
      backgroundColor={
        isDragging || isOverlay ? backgroundColorOnDrag : backgroundColor
      }
      _dark={{
        backgroundColor:
          isDragging || isOverlay ? backgroundColorOnDrag : backgroundColor,
      }}
      {...props}
    >
      <CardHeader
        shape={shape}
        color={color}
        displayLayer={layer.display}
        setdisplayLayer={() => {}}
        closeButton={() => {}}
        onEditorToggle={onEditorToggle}
        isEditorOpen={isEditorOpen}
        displayButtons={!isSorting && !isDragging && !isOverlay}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </Box>
  );
}
