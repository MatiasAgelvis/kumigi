import Gallery from "app/components/gallery"
import { ReactNode, useState } from "react"
import Avatar from "./Avatar"
import { v4 as uuidv4 } from "uuid"
import { Button, HStack, Text, VStack } from "@chakra-ui/react"

import getSimpleDesigns from "app/simple-designs/queries/getSimpleDesigns"
import DeleteButton from "../functionButtons/deleteButton"
import UpdateButton from "../functionButtons/renameButton"
import { lastElement, zip } from "app/utils/arrays"
import { useRouter } from "next/router"

const UserGalleryComponent = () => {
  // <Avatar layers={item} key={`avatar_${index}`} />
  const [items, setItems] = useState<ReactNode[]>([])
  const [display, setDisplay] = useState<Object>({})
  const [hasMore, setHasMore] = useState(true)
  const router = useRouter()

  const manyMore = 3
  const limit = 100
  const [results, { fetchNextPage, isFetching }] = ()=>{}

  const fetchMore = () => {
    if (!isFetching) {
      fetchNextPage()
    }

    if (results && !isFetching) {
      const lastResult = lastElement(results)
      const designs = lastResult.simpleDesigns
      setHasMore(lastResult.hasMore)

      designs.map((design) => setDisplay({ ...display, [design.id]: true }))

      setItems(
        items.concat(
          designs.map((design) => (
            <Avatar
              key={uuidv4()}
              header={
                <HStack w="full">
                  <Text w="full">{design.name}</Text>
                  <UpdateButton design={design} />
                </HStack>
              }
              sizes={zip(design.widths, design.heights)}
              layers={design.layers}
              name={design.name}
              footer={[
                <DeleteButton
                  key={`Delete ${design.name}`}
                  id={design.id}
                  name={design.name}
                  layers={design.layers}
                  onSuccess={() => {
                    router.reload()
                  }}
                />,
              ]}
            />
          ))
        )
      )
    }
  }

  return (
    <VStack w="full" spacing={8}>
      <Gallery items={items} fetchMore={fetchMore} hasMore={hasMore} w="full" />
    </VStack>
  )
}

export default UserGalleryComponent
