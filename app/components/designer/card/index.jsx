// import Select from "react-select";
import { Box, SimpleGrid, useDisclosure, Collapse } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ColorPicker from "./colorPicker";
import OptionSelect from "./optionSelect";
import TextInput from "./textInput";
import boxOptions from "../../../utils/boxOptions";
import CardHeader from "./cardHeader";
import { useColorModeValue } from "@chakra-ui/react";
import emoji from "node-emoji";
import useDidMountEffect from "app/hooks/useDidMountEffect";

function Card({
  index,
  layer,
  updateLayer,
  options,
  fonts,
  deleteLayer,
  dragEvent,
  dragTarget,
  ...props
}) {
  const { shape, color, text, font } = layer;

  function setProp(key, value) {
    updateLayer({ shape, color, text, font, [key]: value });
  }

  const [displayLayer, setdisplayLayer] = useState(true);
  const { isOpen: isEditorOpen, onToggle: onEditorToggle } = useDisclosure({
    defaultIsOpen: true,
  });

  const backgroundColor = useColorModeValue("whiteAlpha.900", "gray.800");
  const backgroundColorOnDrag = useColorModeValue("teal.50", "teal.900");

  return (
    <Box
      {...boxOptions}
      my={3}
      p={["0.7rem", 5]}
      backgroundColor={backgroundColor}
      {...(dragTarget && { backgroundColor: backgroundColorOnDrag })}
      {...props}
    >
      <CardHeader
        shape={shape}
        color={color}
        displayLayer={displayLayer}
        setdisplayLayer={setdisplayLayer}
        closeButton={deleteLayer}
        onEditorToggle={onEditorToggle}
        isEditorOpen={isEditorOpen}
        displayButtons={!dragEvent && !dragTarget}
      />
      {!dragTarget && (
        <Collapse in={isEditorOpen && !dragEvent}>
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
    </Box>
  );
}

export default Card;
