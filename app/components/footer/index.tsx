import {
  Box,
  BoxProps,
  Button,
  Flex,
  HStack,
  IconButton,
  VStack,
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
        <HStack spacing={2}>
          {/*<APIButton
            message="Copy Equivalent Link"
            layers={layers}
            parameters={{ height, width }}
          />*/}
          {/*<Modalo
            open={"Size Options"}
            buttonProps={{ variant: "outline", colorScheme: "blue" }}
            body={<SizeFormatted index={0} />}
            modalProps={boxOptions}
          />*/}
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
        </HStack>
      </Box>
      {/*<Center>
        <Text mr={2}>by</Text>
        <Heading size={"lg"}>
          <Link href="https://matiasagelvis.com">Matias Agelvis</Link>
        </Heading>
      </Center>*/}
    </Box>
  )
}

export default Footer
