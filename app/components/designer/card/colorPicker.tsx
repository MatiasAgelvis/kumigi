import {
  HStack,
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { HexColorPicker } from "react-colorful";
import { Dispatch, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Color from "color";
import { canParseColor } from "app/utils/color";

export default function ColorPicker({
  color,
  setColor,
}: {
  color: string;
  setColor: Dispatch<string>;
}) {
  const [text, setText] = useState(color);
  const debounced = useDebouncedCallback((value) => {
    if (canParseColor(value)) {
      setColor(Color(value).hex());
    }
  }, 1000);

  useEffect(() => setText(color), [color]);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      debounced.flush();
    }
  }

  function handleOnBlur() {
    debounced.flush();
    if (!canParseColor(text)) {
      setText(color);
    }
  }

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
          onBlur={handleOnBlur}
        />
      </HStack>
      <PopoverContent w="fit-content" mx={5}>
        <HexColorPicker color={color} onChange={debounced} />
      </PopoverContent>
    </Popover>
  );
}
