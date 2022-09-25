// import Select from "react-select";
import { Input, InputGroup, InputRightAddon, Code } from "@chakra-ui/react";
import GraphemeSplitter from "grapheme-splitter";

function TextInput({ text, setText, maxLength = 3 }) {
  const splitter = new GraphemeSplitter();
  return (
    <InputGroup>
      <Input
        value={text}
        onChange={(event) => setText(event.target.value)}
        maxLength={maxLength}
        placeholder="Input your text"
      />
      <InputRightAddon
        children={
          <Code>
            {splitter.splitGraphemes(text).length}/{maxLength}
          </Code>
        }
      />
    </InputGroup>
  );
}

export default TextInput;
