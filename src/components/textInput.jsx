// import Select from "react-select";
import { Input } from "@chakra-ui/react";

function TextInput({ text, setText }) {
  return (
    <Input
      value={text}
      onChange={(event) => setText(event.target.value)}
      maxLength={3}
      placeholder="Input your text"
    />
  );
}

export default TextInput;
