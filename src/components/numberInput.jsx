import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const RangeInput = ({ value, setValue, min = 1, max = 1000, ...props }) => {
  return (
    <NumberInput
      value={value}
      min={min}
      max={max}
      onChange={setValue}
      {...props}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default RangeInput;
