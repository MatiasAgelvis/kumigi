import {
  Box,
  BoxProps,
  Button,
  Flex,
  StackProps,
  VStack,
  ButtonGroup
} from "@chakra-ui/react"
import useSizeState from "app/hooks/useSizeState"
import { useState } from "react"
import RangeInput from "../designer/editor/rangeInput"
import FullWidth from "../formatting/fullWidth"
import buttonOptions from "app/utils/buttonOptions";

export default function SizeFormatted({
  index,
  onClose,
  vstackProps,
  ...props
}: {
  index: number
  onClose?: () => void
  vstackProps?: StackProps
} & BoxProps) {
  const { size, setSize } = useSizeState(index)
  const [width, height]: number[] = size
  const [localWidth, setLocalWidth] = useState(width)
  const [localHeight, setLocalHeight] = useState(height)

  return (
    <Box {...props}>
      <VStack align="stretch" {...vstackProps}>
        <FullWidth
          name={"Width"}
          input={
            <RangeInput
              value={localWidth!}
              setValue={setLocalWidth}
              max={3000}
            />
          }
          textProps={{ fontFamily: "mono" }}
        />

        <FullWidth
          name={"Height"}
          input={
            <RangeInput
              value={localHeight!}
              setValue={setLocalHeight}
              max={3000}
            />
          }
          textProps={{ fontFamily: "mono" }}
        />
        <Flex justify={"space-between"}>
        <ButtonGroup isAttached w="full">
          <Button
          {...buttonOptions}
            colorScheme="blue"
            onClick={() => {setSize([localWidth!, localHeight!]); onClose()}}
          >
            Apply
          </Button>
          {onClose ? (
            <Button {...buttonOptions} colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          ) : null}
          </ButtonGroup>
        </Flex>
      </VStack>
    </Box>
  )
}
