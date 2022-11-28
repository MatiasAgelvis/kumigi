// import Select from "react-select";
import {
  Box,
  SimpleGrid,
  useDisclosure,
  Collapse,
  BoxProps,
  HStack,
  VStack,
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

function Card({
  index,
  layer,
  updateLayer,
  options,
  fonts,
  deleteLayer,
  isOverlay = false,
  ...props
}: {
  index: number;
  layer: Layer;
  updateLayer: Dispatch<Layer>;
  options: string[];
  fonts: string[];
  deleteLayer: () => void;
  isOverlay?: boolean;
} & BoxProps) {
  const { shape, color, text, font, ...rest } = layer;

  function setProp(key: OKey, value: any) {
    updateLayer({ ...rest, shape, color, text, font, [key]: value });
  }

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
      <VStack spacing={4}>
        <CardHeader
          shape={shape}
          color={color}
          w="full"
          displayLayer={layer.display}
          setdisplayLayer={(value) => setProp("display", value)}
          closeButton={deleteLayer}
          onEditorToggle={onEditorToggle}
          isEditorOpen={isEditorOpen}
          displayButtons={!isSorting && !isDragging && !isOverlay}
          dragHandleProps={{ ...attributes, ...listeners }}
        />
        {!isDragging && !isOverlay && (
          <Collapse in={isEditorOpen && !isSorting}>
            <SimpleGrid columns={[1, 2]} spacing={[5, null, 7]}>
              <OptionSelect
                options={options}
                state={shape}
                setState={(value) => setProp("shape", value)}
                placeholder="Select a shape"
              />
              <ColorPicker
                color={color}
                setColor={(value) => setProp("color", value)}
              />

              {shape == "text" && (
                <TextInput
                  text={text}
                  setText={(value) => setProp("text", value)}
                />
              )}
              {shape == "text" && (
                <OptionSelect
                  options={fonts}
                  state={font}
                  setState={(value) => setProp("font", value)}
                  placeholder="Select a Font"
                />
              )}
            </SimpleGrid>
          </Collapse>
        )}
      </VStack>
    </Box>
  );
}

export default Card;
