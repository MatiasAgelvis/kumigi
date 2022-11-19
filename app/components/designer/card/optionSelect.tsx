// import Select from "react-select";
import { Select } from "@chakra-ui/react";
import capitalize from "../../../utils/capitalize";
import { Dispatch } from "react";
function OptionSelect({
  options,
  state,
  setState,
  placeholder,
}: {
  options: string[];
  state: string | null;
  setState: Dispatch<string>;
  placeholder: string;
}) {
  return (
    <Select
      placeholder={placeholder}
      value={state ? state : ""}
      onChange={(e) => setState(e.target.value)}
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
