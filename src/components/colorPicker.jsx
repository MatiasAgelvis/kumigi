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

function rgba2hex(color) {
  return colorString.to.hex(colorString.get.rgb(color));
}

function hex2rgba(color) {
  return colorString.to.rgb(colorString.get.rgb(color));
}

function ColorPicker({ color, setColor }) {
  return (
    <Popover>
      <HStack>
        <PopoverTrigger>
          <Button bg={color} />
        </PopoverTrigger>
        <Input
          value={rgba2hex(color)}
          onChange={(e) => {
            if (colorString.get(e.target.value)) {
              setColor(hex2rgba(e.target.value));
            }
          }}
        />
      </HStack>

      <PopoverContent style={{ width: "fit-content" }}>
        <RgbaStringColorPicker color={color} onChange={setColor} />
      </PopoverContent>
    </Popover>
  );
}

export default ColorPicker;
