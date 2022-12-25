import { IconButton, Wrap, WrapProps } from "@chakra-ui/react"

import { useRecoilState, useRecoilValue } from "recoil"
import { sizesAtom } from "app/utils/store"
import SizePill from "../size/sizePill"
import { AddIcon } from "@chakra-ui/icons"

export default function SizesBar({ ...props }: WrapProps) {
  const [sizes, setSizes] = useRecoilState(sizesAtom)
  return (
    <Wrap spacing={2} {...props}>
      {sizes.map((size, index) => (
        <SizePill key={`size_${index}`} index={index} colorScheme={"teal"} />
      ))}
      <IconButton
        icon={<AddIcon />}
        aria-label={"Add another Size"}
        onClick={() => setSizes([...sizes, [400, 400]])}
      />
    </Wrap>
  )
}
