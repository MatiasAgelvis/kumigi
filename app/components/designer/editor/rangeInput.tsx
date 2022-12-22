import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputProps,
} from "@chakra-ui/react"
import { Dispatch } from "react"
import { SetterOrUpdater } from "recoil"

const RangeInput = ({
  value,
  setValue,
  min = 1,
  max = 1000,
  ...props
}: {
  value: number
  setValue: Dispatch<number> | SetterOrUpdater<number>
  min?: number
  max?: number
} & NumberInputProps) => {
  return (
    <NumberInput
      value={value}
      min={min}
      max={max}
      onChange={(string, number) => setValue(number)}
      {...props}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}

export default RangeInput
