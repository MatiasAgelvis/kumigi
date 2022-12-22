import {
  Box,
  BoxProps,
  Button,
  Flex,
  StackProps,
  VStack,
} from "@chakra-ui/react"
import useSizeState from "app/hooks/useSizeState"
import { useState } from "react"
import RangeInput from "../designer/editor/rangeInput"
import FullWidth from "../formatting/fullWidth"

export default function SizeFormatted({
  index,
  onCancelClick,
  vstackProps,
  ...props
}: {
  index: number
  onCancelClick?: () => void
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
          <Button
            colorScheme="blue"
            onClick={() => setSize([localWidth!, localHeight!])}
          >
            Apply
          </Button>
          {onCancelClick ? (
            <Button colorScheme="red" onClick={onCancelClick}>
              Cancel
            </Button>
          ) : null}
        </Flex>
      </VStack>
    </Box>
  )
}
