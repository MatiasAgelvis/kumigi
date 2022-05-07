// import Select from "react-select";
import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import namer from "color-namer";

function Card({ index, updateLayer, options }) {
  const [shape, setShape] = useState(null);
  const [color, setColor] = useState("rgba(1,1,1,1)");

  useEffect(() => {
    updateLayer({ shape: shape, color: color });
  }, [shape, color]);

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function colorName(color) {
    return capitalize(namer(color).basic[0].name);
  }

  return (
    <Box borderWidth="3px" borderRadius="lg" p={5} shadow="md" my={3} bg='white'>
      <Grid templateColumns="repeat(2, 2fr)" gap={4}>
        <GridItem colSpan={2}>
          <h2>{`Layer ${index + 1}: ${colorName(color)} ${capitalize(
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
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {colorName(color)}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <RgbaStringColorPicker color={color} onChange={setColor} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Card;
