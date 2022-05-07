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
import { RgbaStringColorPicker, HexColorInput } from "react-colorful";
import colorString from "color-string";

function rgba2hex(color) {
  return colorString.to.hex(colorString.get.rgb(color));
}

function hex2rgba(color) {
  return colorString.to.rgb(colorString.get.rgb(color));
}

function ColorPicker({color, setColor}) {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <HexColorInput
              color={rgba2hex(color)}
              onChange={(hex) => {
                if (colorString.get(hex)) {
                  setColor(hex2rgba(hex));
                }
              }}
            />
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={4}>
          <RgbaStringColorPicker color={color} onChange={setColor} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default ColorPicker;
