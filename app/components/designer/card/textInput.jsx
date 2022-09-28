// import Select from "react-select";
import {
  Input,
  InputGroup,
  InputRightAddon,
  Code,
  Highlight,
  Text,
  Box,
} from "@chakra-ui/react";
import { textLength } from "app/lib/avatara";

function TextInput({ text, setText, maxLength = 3 }) {
  return (
    <InputGroup>
      <Input
        value={text}
        onChange={(event) => setText(event.target.value)}
        // maxLength={maxLength}
        placeholder="Input your text"
      />
      <InputRightAddon
        {...(textLength(text) > maxLength && { backgroundColor: "red.200" })}
        children={
          <Code background={"transparent"}>
            {textLength(text)}/{maxLength}
          </Code>
        }
      />
    </InputGroup>
  );
}

export default TextInput;
