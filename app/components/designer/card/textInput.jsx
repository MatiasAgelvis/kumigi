// import Select from "react-select";
import {
  Input,
  InputGroup,
  InputRightAddon,
  Code,
  Highlight,
  Text,
  Box,
  Button,
  InputRightElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
} from "@chakra-ui/react";
import { textLength } from "app/lib/avatara";
import { useEffect, useRef } from "react";

function TextInput({ text, setText, maxLength = 3 }) {
  const inputRef = useRef(null);

  function insertTextAtCursor(ref, text, insert) {
    const curr = ref.current;
    if (!("selectionStart" in curr) || !("selectionEnd" in curr)) {
      return text;
    }
    const textBeforeCursorPosition = text.substring(0, curr.selectionStart);
    const textAfterCursorPosition = text.substring(curr.selectionEnd);

    return textBeforeCursorPosition + insert + textAfterCursorPosition;
  }

  let handleClick = (insert) =>
    setText(insertTextAtCursor(inputRef, text, insert));

  return (
    <Popover>
      <InputGroup>
        <Input
          value={text}
          onChange={(event) => setText(event.target.value)}
          // maxLength={maxLength}
          placeholder="Input your text"
          ref={inputRef}
        />
        <InputRightElement w="fit-content">
          <PopoverTrigger>
            <Button>Icons</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>HI</PopoverHeader>
              <PopoverBody>
                <Button onClick={() => handleClick(":f123:")}>
                  INSERT ':f123:'
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </InputRightElement>
        {/*<InputRightAddon children={} />*/}
      </InputGroup>
    </Popover>
  );
}

export default TextInput;
