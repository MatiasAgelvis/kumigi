import {
  HStack,
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { RgbaStringColorPicker, HexColorInput } from "react-colorful";
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

  useEffect(() => {
    // if the current input is a valid color update color
    if (colorString.get(hexPicker)) {
      setColor(hex2rgba(hexPicker));
    }
  }, [hexPicker]);

  return (
    <Popover>
      <HStack>
        <PopoverTrigger>
          <Button bg={color} border="1px" borderColor="gray.200" />
        </PopoverTrigger>
        <Input
          value={hexPicker}
          onChange={(e) => setHexPicker(e.target.value)}
        />
      </HStack>

      <PopoverContent style={{ width: "fit-content" }}>
        <RgbaStringColorPicker color={color} onChange={setColor} />
      </PopoverContent>
    </Popover>
  );
}

export default ColorPicker;
