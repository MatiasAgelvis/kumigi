import {
  HStack,
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  chakra,
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
  const ChakraHexColorInput = chakra(({ col0r, ...props }) => (
    <HexColorInput color={col0r} {...props} />
  ));

  return (
    <Popover isLazy>
      <HStack>
        <PopoverTrigger>
          <Button bg={color} border="1px" borderColor="gray.200"></Button>
        </PopoverTrigger>
        <Input
          as={ChakraHexColorInput}
          col0r={rgba2hex(color)}
          onChange={(color) => setColor(hex2rgba(color))}
          prefixed
          alpha
        />
      </HStack>
      <PopoverContent w="fit-content" mx={5}>
        <RgbaStringColorPicker color={color} onChange={setColor} />
      </PopoverContent>
    </Popover>
  );
}

export default ColorPicker;
