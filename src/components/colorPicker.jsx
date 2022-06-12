import {
  HStack,
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { RgbaStringColorPicker } from "react-colorful";
import colorString from "color-string";
import { useEffect, useState } from "react";

function rgba2hex(color) {
  return colorString.to.hex(colorString.get.rgb(color));
}

function hex2rgba(color) {
  return colorString.to.rgb(colorString.get.rgb(color));
}

function ColorPicker({ color, setColor }) {
  const [hexPicker, setHexPicker] = useState(rgba2hex(color));
  const [attached, setAttached] = useState(true);

  useEffect(() => {
    // if the current input is a valid color update color
    setAttached(false);
    if (colorString.get(hexPicker) && !attached) {
      setColor(hex2rgba(hexPicker));
    }
  }, [hexPicker]);

  useEffect(() => {
    setAttached(true);
    if (attached) {
      setHexPicker(rgba2hex(color));
    }
  }, [color]);

  return (
    <Popover>
      <HStack>
        <PopoverTrigger>
          <Button bg={color} border="1px" borderColor="gray.200" />
        </PopoverTrigger>
        <Input
          value={hexPicker}
          textTransform="uppercase"
          onChange={(e) => setHexPicker(e.target.value)}
          fontSize={["md", "md", "sm", "md"]}
        />
      </HStack>

      <PopoverContent style={{ width: "fit-content" }} mx={5}>
        <RgbaStringColorPicker color={color} onChange={setColor} />
      </PopoverContent>
    </Popover>
  );
}

export default ColorPicker;
