// import Select from "react-select";
import { useState } from "react";
import {
  PinInputField,
  PinInput,
} from "@chakra-ui/react";

function TextInput({ text, setText }) {

  return (
    <PinInput
      type="alphanumeric"
      value={text}
      autoFocus
      onChange={setText}
    >
      <PinInputField />
      <PinInputField />
      <PinInputField />
    </PinInput>
  );
}

export default TextInput;
