// import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import { RgbaStringColorPicker } from "react-colorful";
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
  Input, IconButton, EditIcon
} from "@chakra-ui/react";
import namer from "color-namer";

function Card({ index, updateLayer, options }) {
  const [shape, setShape] = useState(null);
  const [color, setColor] = useState("rgba(1,1,1,1)");
  const [text, setText] = useState("");
  const [font, setFont] = useState("");
  const textRef = useRef(null);

  useEffect(() => {
    console.log(text);
    updateLayer({ shape: shape, color: color, text: text, font: 'pt' });
  }, [shape, color, text, font]);

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
      <Grid templateColumns="repeat(2, 2fr)" gap={4}>
        <GridItem colSpan={2}>
          <h2>{`Layer ${index + 1}: ${colorName(color, "pantone")} ${capitalize(
            shape ? shape : ""
          )}`}</h2>
        </GridItem>

        <GridItem>
          <Select
            placeholder="Select a shape"
            onChange={(e) => setShape(event.target.value)}
          >
            {options.map((op) => (
              <option value={op.value}>{op.label}</option>
            ))}
          </Select>
        </GridItem>
        <GridItem>
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {colorName(color, "basic")}
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <RgbaStringColorPicker color={color} onChange={setColor} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </GridItem>

        {shape == "text" ? (
          <GridItem>
            <PinInput type="alphanumeric" ref={textRef} value={text} autoFocus onChange={setText} onClick={console.log}>
            <PinInputField/>
            <PinInputField/>
            <PinInputField/>
            </PinInput>

          </GridItem>
        ) : null}
      </Grid>
    </Box>
  );
}

export default Card;
