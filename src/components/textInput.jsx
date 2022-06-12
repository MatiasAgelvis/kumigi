// import Select from "react-select";
import { Input, InputGroup, InputRightAddon, Code } from "@chakra-ui/react";

function TextInput({ text, setText, maxLength = 3 }) {
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
            {text.length}/{maxLength}
          </Code>
        }
      />
    </InputGroup>
  );
}

export default TextInput;
