// import Select from "react-select";
import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Switch,
  CloseButton,
  Divider,
  Center,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import namer from "color-namer";
import ColorPicker from "../components/colorPicker";
import TextInput from "../components/textInput";
import OptionSelect from "../components/optionSelect";

function Card({ index, updateLayer, options, fonts, deleteLayer }) {
  const [shape, setShape] = useState(null);
  const [color, setColor] = useState("rgba(1,1,1,1)");
  const [text, setText] = useState("");
  const [font, setFont] = useState("");
  const [displayLayer, setdisplayLayer] = useState(true);

  useEffect(() => {
    updateLayer({
      shape: displayLayer ? shape : null,
      color: color,
      text: text,
      font: font ? font : "pt",
    });
  }, [shape, color, text, font, displayLayer]);

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function colorName(color, pick = "basic") {
    return capitalize(namer(color, { pick: [pick] })[pick][0].name);
  }

  return (
    <Box
      borderWidth="3px"
      borderRadius="lg"
      p={5}
      shadow="md"
      my={3}
      bg="white"
    >
      <Flex justify="space-between" gap={4}>
        <Switch
          id="displayLayer"
          defaultChecked
          onChange={() => setdisplayLayer(!displayLayer)}
        />
        <CloseButton onClick={() => deleteLayer()} />
      </Flex>
      <Heading as="h4" size="md" pl='0.2rem'>{`Layer ${index + 1}: ${colorName(
        color,
        "pantone"
      )} ${capitalize(shape ? shape : "")}`}</Heading>

      <Center height="20px">
        <Divider
          orientation="horizontal"
          border={2}
          borderColor="gray.300"
          borderRadius="8"
        />
      </Center>

      <SimpleGrid columns={[1,2]} spacing={10}>
        <OptionSelect
          options={options}
          state={shape}
          setState={setShape}
          placeholder="Select a shape"
        />
        <ColorPicker color={color} setColor={setColor} />

        {shape == "text" && (
          <Center>
            <TextInput text={text} setText={setText} />
          </Center>
        )}

        {shape == "text" && (
          <OptionSelect
            options={fonts}
            state={font}
            setState={setFont}
            placeholder="Select a Font"
          />
        )}
      </SimpleGrid>
    </Box>
  );
}

export default Card;