// import Select from "react-select";
import { Select } from "@chakra-ui/react";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function OptionSelect({ options, state, setState, placeholder }) {
  return (
    <Select
      placeholder={placeholder}
      value={state}
      onChange={(e) => setState(event.target.value)}
    >
      {options.map((op) => (
        <option key={op} value={op}>
          {capitalize(op)}
        </option>
      ))}
    </Select>
  );
}

export default OptionSelect;
