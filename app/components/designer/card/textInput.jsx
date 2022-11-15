// import Select from "react-select";
import {
  HStack,
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  Wrap,
} from "@chakra-ui/react";
import { useEffect, useState, useRef, useMemo } from "react";
import icons from "public/fonts/icons.json";
import useFuzzy from "app/hooks/useFuzzy";

function TextInput({ text, setText, maxLength = 3 }) {
  const inputRef = useRef(null);
  const initialFocusRef = useRef(null);
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

  const [iconList, setIconList] = useState(
    Object.entries(icons).map(([key, value], index) =>
      filterIcons(key, value, index)
    )
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

  return (
    <HStack>
      <Input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Input your text"
        ref={inputRef}
      />

      <Popover isLazy initialFocusRef={initialFocusRef}>
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
                ref={initialFocusRef}
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
                    key={icon.label}
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
