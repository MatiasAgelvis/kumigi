// import Select from "react-select";
import {
  Box,
  Center,
  Divider,
  SimpleGrid,
  useDisclosure,
  Collapse,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { dragged } from "sortablejs";
import ColorPicker from "../components/colorPicker";
import OptionSelect from "../components/optionSelect";
import TextInput from "../components/textInput";
import boxOptions from "../utils/boxOptions";
import CardHeader from "./cardHeader";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    updateLayer({
      shape: displayLayer ? shape : null,
      color: color,
      text: text,
      font: font ? font : text && "pt",
    });
  }, [shape, color, text, font, displayLayer]);

  return (
    <Box {...boxOptions} my={3} {...props} p={["0.7rem", 5]}>
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
              setState={setShape}
              placeholder="Select a shape"
            />
            <ColorPicker color={color} setColor={setColor} />

            {shape == "text" && <TextInput text={text} setText={setText} />}
            {shape == "text" && (
              <OptionSelect
                options={fonts}
                state={font}
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
