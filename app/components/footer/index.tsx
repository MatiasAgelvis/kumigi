import {
  Box,
  BoxProps,
  Button,
  Flex,
  HStack,
  IconButton,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import APIurl from "./apiUrl"
import boxOptions from "app/utils/boxOptions"

import { NextComponentType } from "next"
import buttonOptions from "app/utils/buttonOptions"
import SizeFormatted from "../size/sizeFormatted"
import Modalo from "../modal"
import { useRecoilState, useRecoilValue } from "recoil"
import { sizesAtom } from "app/utils/store"
import SizePill from "../size/sizePill"
import { AddIcon } from "@chakra-ui/icons"

const Footer: NextComponentType = ({ ...props }: BoxProps) => {
  const [sizes, setSizes] = useRecoilState(sizesAtom)
  return (
    <Box {...props}>
      <Box {...boxOptions} m="1rem">
        <Wrap spacing={2}>
          {sizes.map((size, index) => (
            <SizePill
              key={`size_${index}`}
              index={index}
              colorScheme={"teal"}
            />
          ))}
          <IconButton
            icon={<AddIcon />}
            aria-label={"Add another Size"}
            onClick={() => setSizes([...sizes, [400, 400]])}
          />
        </Wrap>
      </Box>
    </Box>
  )
}

export default Footer
