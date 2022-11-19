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
  StackProps,
} from "@chakra-ui/react";
import { useState, useRef, Dispatch, Ref, RefObject } from "react";
import icons from "public/fonts/icons.json";
import useFuzzy from "app/hooks/useFuzzy";
import { OKey } from "app/types/avatara";

function TextInput({
  text,
  setText,
  ...props
}: {
  text: string;
  setText: Dispatch<string>;
} & StackProps) {
  const inputRef = useRef(null);
  const initialFocusRef = useRef(null);
  const [search, setSearch] = useState("");

  function insertTextAtCursor(
    ref: RefObject<HTMLInputElement>,
    text: string,
    insert: string
  ) {
    const curr = ref.current;
    if (curr && "selectionStart" in curr && "selectionEnd" in curr) {
      const textBeforeCursorPosition = text.substring(0, curr.selectionStart!);
      const textAfterCursorPosition = text.substring(curr.selectionEnd!);
      return textBeforeCursorPosition + insert + textAfterCursorPosition;
    }

    return text;
  }

  const handleClick = (insert: string) => {
    setText(insertTextAtCursor(inputRef, text, insert));
    setSearch("");
  };

  function filterIcons(key: OKey, value: any, index: number) {
    return { id: index, label: value.label, unicode: value.unicode };
  }

  const [iconList] = useState(
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
    <HStack {...props}>
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
