// import Select from "react-select";
import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Switch,
  CloseButton,
  Divider,
  Center
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
      <Grid templateColumns="repeat(12, 2fr)" gap={4}>
        <GridItem colSpan={1}>
          <Switch
            id="displayLayer"
            defaultChecked
            onChange={() => setdisplayLayer(!displayLayer)}
          />
        </GridItem>
        <GridItem colSpan={10}>
          <Heading as="h4" size="md">{`Layer ${index + 1}: ${colorName(
            color,
            "pantone"
          )} ${capitalize(shape ? shape : "")}`}</Heading>
        </GridItem>
        <GridItem colSpan={1}>
          <CloseButton onClick={() => deleteLayer()} />
        </GridItem>
      </Grid>

      <Center height="20px">
        <Divider orientation="horizontal" border={2} borderColor='gray.300' borderRadius='8'/>
      </Center>

      <Grid templateColumns="repeat(2, 2fr)" gap={4}>
        <GridItem>
          <OptionSelect
            options={options}
            state={shape}
            setState={setShape}
            placeholder="Select a shape"
          />
        </GridItem>
        <GridItem>
          <ColorPicker color={color} setColor={setColor} />
        </GridItem>

        {shape == "text" && (
          <GridItem colSpan={1}>
            <TextInput text={text} setText={setText} />
          </GridItem>
        )}
        {shape == "text" && (
          <GridItem colSpan={1}>
            <OptionSelect
              options={fonts}
              state={font}
              setState={setFont}
              placeholder="Select a Font"
            />
          </GridItem>
        )}
      </Grid>
    </Box>
  );
}

export default Card;
