// import Select from "react-select";
import {
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Code,
  VStack,
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
  SimpleGrid,
  Wrap,
} from "@chakra-ui/react";
import { textLength } from "app/lib/avatara";
import { useEffect, useState, useRef, useMemo } from "react";
import icons from "public/fonts/icons.json";
import useFuzzy from "app/hooks/useFuzzy";

function TextInput({ text, setText, maxLength = 3 }) {
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");

  function insertTextAtCursor(ref, text, insert) {
    const curr = ref.current;
    if (!("selectionStart" in curr) || !("selectionEnd" in curr)) {
      return text;
    }
    const textBeforeCursorPosition = text.substring(0, curr.selectionStart);
    const textAfterCursorPosition = text.substring(curr.selectionEnd);

    return textBeforeCursorPosition + insert + textAfterCursorPosition;
  }

  const handleClick = (insert) => {
    setText(insertTextAtCursor(inputRef, text, insert));
    setSearch("");
  };

  function filterIcons(key, value, index) {
    return { id: index, label: value.label, unicode: value.unicode };
  }

  const iconList = useMemo(
    () =>
      Object.entries(icons).map(([key, value], index) =>
        filterIcons(key, value, index)
      ),
    [icons]
  );

  const results = useFuzzy(
    iconList,
    ["label"],
    search,
    {
      caseSensitive: false,
      sort: true,
    },
    true
  );
  console.log(results);

  return (
    <HStack>
      <Input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Input your text"
        ref={inputRef}
      />

      <Popover isLazy>
        <PopoverTrigger>
          <Button>Icons</Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <Input
                w="90%"
                placeholder="Search Icons"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </PopoverHeader>
            <PopoverBody
              overflow={"scroll"}
              maxHeight={["100px", "150px", "200px"]}
            >
              <Wrap spacing={[6, null, 4]}>
                {results.map((icon) => (
                  <Button
                    fontFamily={`"Solid Icons", "Brand Icons", "Regular Icons"`}
                    fontSize={"2rem"}
                    fontWeight={"400"}
                    aria-label={icon.label + " icon"}
                    onClick={() => handleClick(`:${icon.unicode}:`)}
                  >
                    {String.fromCharCode(parseInt(icon.unicode, 16))}
                  </Button>
                ))}
              </Wrap>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </HStack>
  );
}

export default TextInput;
