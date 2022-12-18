import { Box, BoxProps, StackProps, VStack } from "@chakra-ui/react"
import useSizeComponents from "app/hooks/useSizeComponents"
import FullWidth from "../formatting/fullWidth"

export default function SizeFormatted({
  vstackProps,
  ...props
}: {
  vstackProps?: StackProps
} & BoxProps) {
  const sizeComponents = useSizeComponents(0)

  return (
    <Box {...props}>
      <VStack align="stretch" {...vstackProps}>
        {Array.from(sizeComponents).map((option, i) => (
          <FullWidth
            key={i}
            name={option.name}
            input={option.input}
            textProps={{ fontFamily: "mono" }}
          />
        ))}
      </VStack>
    </Box>
  )
}
