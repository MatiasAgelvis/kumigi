import Gallery from "app/components/gallery"
import { randomLayers } from "app/lib/avatara"
import { FC, ReactNode, useEffect, useState } from "react"
import Modalo from "../modal"
import SizeFormatted from "../size/sizeFormatted"
import Avatar from "./Avatar"
import { idCard } from "app/utils/createLayer"
import { v4 as uuidv4 } from "uuid"
import { Box, Button, VStack, Wrap } from "@chakra-ui/react"
import boxOptions from "app/utils/boxOptions"
import { nameAtom, sizesAtom } from "app/utils/store"
import { useRecoilState } from "recoil"
import { name__default } from "app/utils/name"
import SizesBar from "../size/sizesBar"
import { RepeatIcon } from "@chakra-ui/icons"

const RandomGalleryComponent = () => {
  // <Avatar layers={item} key={`avatar_${index}`} />
  const [name, setName] = useRecoilState(nameAtom)
  const [items, setItems] = useState<ReactNode[]>([])
  const [sizes, setSizes] = useRecoilState(sizesAtom)
  const [hasMore, setHasMore] = useState(true)
  const manyMore = 10
  const limit = 100

  const layerGenerator = () => randomLayers().map(idCard)
  const fetchMore = () => {
    setHasMore(items.length < limit)
    setItems(
      items.concat(
        Array.from({ length: manyMore }, () => (
          <Avatar
            key={uuidv4()}
            name={name__default}
            sizes={sizes}
            layers={layerGenerator()}
          />
        ))
      )
    )
  }

  function restart() {
    setItems([])
    setHasMore(true)
    setName("Name")
  }

  return (
    <VStack w="full" spacing={8}>
      <Wrap w="full" justify={"center"}>
        <SizesBar />
      </Wrap>

      <Gallery items={items} fetchMore={fetchMore} hasMore={hasMore} w="full" />
      <Button colorScheme={"red"} onClick={restart} leftIcon={<RepeatIcon />}>
        Start Over
      </Button>
    </VStack>
  )
}

export default RandomGalleryComponent
