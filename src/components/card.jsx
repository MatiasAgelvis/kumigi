// import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Grid,
  GridItem,
  Select,
  HStack,
  PinInputField,
  PinInput,
  Switch,
  CloseButton,
} from "@chakra-ui/react";
import namer from "color-namer";
import ColorPicker from "../components/colorPicker";
import TextInput from "../components/textInput";
import FontSelect from "../components/fontSelect";

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
          <h2>{`Layer ${index + 1}: ${colorName(color, "pantone")} ${capitalize(
            shape ? shape : ""
          )}`}</h2>
        </GridItem>
        <GridItem colSpan={1}>
          <CloseButton onClick={() => deleteLayer()} />
        </GridItem>
      </Grid>
      <br />
      <Grid templateColumns="repeat(2, 2fr)" gap={4}>
        <GridItem>
          <Select
            placeholder="Select a shape"
            onChange={(e) => setShape(event.target.value)}
          >
            {options.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </Select>
        </GridItem>
        <GridItem>
          <ColorPicker color={color} setColor={setColor} />
        </GridItem>

        {shape == "text" ? (
          <GridItem colSpan={1}>
            <TextInput text={text} setText={setText} />
          </GridItem>
        ) : null}
        {shape == "text" ? (
          <GridItem colSpan={1}>
            <FontSelect fontOptions={fonts} font={font} setFont={setFont} />
          </GridItem>
        ) : null}
      </Grid>
    </Box>
  );
}

export default Card;
