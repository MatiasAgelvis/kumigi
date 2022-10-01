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
  const [shape, setShape] = useState(layer.shape);
  const [color, setColor] = useState(layer.color);
  const [text, setText] = useState(layer.text ? layer.text : "");
  const [font, setFont] = useState(layer.font ? layer.font : "");
  const [displayLayer, setdisplayLayer] = useState(true);
  const { isOpen: isEditorOpen, onToggle: onEditorToggle } = useDisclosure({
    defaultIsOpen: true,
  });

  const backgroundColor = useColorModeValue("whiteAlpha.900", "gray.800");
  const backgroundColorOnDrag = useColorModeValue("teal.50", "teal.900");

  useDidMountEffect(() => {
    updateLayer({
      shape: displayLayer ? shape : null,
      color: color,
      text: emoji.unemojify(text),
      font: font ? font : text && "pt",
    });
  }, [shape, color, text, font, displayLayer]);

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
        shape={layer.shape}
        color={layer.color}
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
              state={layer.shape}
              setState={setShape}
              placeholder="Select a shape"
            />
            <ColorPicker color={color} setColor={setColor} />

            {shape == "text" && (
              <TextInput text={layer.text} setText={setText} />
            )}
            {shape == "text" && (
              <OptionSelect
                options={fonts}
                state={layer.font}
                setState={setFont}
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
