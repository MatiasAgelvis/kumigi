import {
  HStack,
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  chakra,
} from "@chakra-ui/react";
import {
  RgbaStringColorPicker,
  HexColorInput,
  HexAlphaColorPicker,
} from "react-colorful";
import colorString from "color-string";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Color from "color";

function rgba2hex(color) {
  return colorString.to.hex(colorString.get.rgb(color));
}

function hex2rgba(color) {
  return colorString.to.rgb(colorString.get.rgb(color));
}

export default function ColorPicker({ color, setColor }) {
  const [text, setText] = useState(color);
  const debounced = useDebouncedCallback((value) => {
    setColor(Color(value).hex());
    // setText(Color(value).hex());
  }, 1000);

  useEffect(() => setText(color), [color]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      debounced.flush();
    }
  };

  return (
    <Popover isLazy onClose={() => debounced.flush()}>
      <HStack>
        <PopoverTrigger>
          <Button
            bg={color}
            border="1px"
            borderColor="gray.200"
            _dark={{ borderColor: "gray.600" }}
          ></Button>
        </PopoverTrigger>
        <Input
          value={text}
          fontFamily="mono"
          onChange={(e) => {
            setText(e.target.value);
            debounced(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </HStack>
      <PopoverContent w="fit-content" mx={5}>
        <HexAlphaColorPicker color={color} onChange={debounced} />
      </PopoverContent>
    </Popover>
  );
}
