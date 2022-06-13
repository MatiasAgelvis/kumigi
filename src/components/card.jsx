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
import ColorPicker from "../components/colorPicker";
import OptionSelect from "../components/optionSelect";
import TextInput from "../components/textInput";
import boxOptions from "../utils/boxOptions";
import CardHeader from "./cardHeader";

function Card({ index, updateLayer, options, fonts, deleteLayer, ...props }) {
  const [shape, setShape] = useState("");
  const [color, setColor] = useState("rgba(0,0,0,1)");
  const [text, setText] = useState("");
  const [font, setFont] = useState("");
  const [displayLayer, setdisplayLayer] = useState(true);
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  useEffect(() => {
    updateLayer({
      shape: displayLayer ? shape : null,
      color: color,
      text: text,
      font: font ? font : text && "pt",
    });
  }, [shape, color, text, font, displayLayer]);

  return (
    <Box {...boxOptions} my={3} bg="white" {...props} p={["0.7rem", 5]}>
      <CardHeader
        shape={shape}
        color={color}
        setdisplayLayer={setdisplayLayer}
        closeButton={deleteLayer}
        onToggle={onToggle}
        isOpen={isOpen}
      />
      <Collapse in={isOpen}>
        <Center height="20px">
          <Divider
            orientation="horizontal"
            border={2}
            borderColor="gray.300"
            borderRadius="8"
          />
        </Center>

        <SimpleGrid columns={[1, 2]} spacing={[5, 5, 7]}>
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
    </Box>
  );
}

export default Card;
