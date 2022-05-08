// import Select from "react-select";
import { useState } from "react";
import { Select } from "@chakra-ui/react";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function FontSelect({ fontOptions, font, setFont }) {
  return (
    <Select
      placeholder="Select a Font"
      value={font}
      onChange={(e) => setFont(event.target.value)}
    >
      {fontOptions.map((op) => (
        <option key={op} value={op}>
          {capitalize(op)}
        </option>
      ))}
    </Select>
  );
}

export default FontSelect;
