import Gallery from "app/components/gallery"
import { ReactNode, useState } from "react"
import Avatar from "./Avatar"
import { v4 as uuidv4 } from "uuid"
import { HStack, Text, VStack } from "@chakra-ui/react"

import getSimpleDesigns from "app/simple-designs/queries/getSimpleDesigns"
import { useInfiniteQuery } from "@blitzjs/rpc"

import DeleteButton from "../functionButtons/deleteButton"
import UpdateButton from "../functionButtons/renameButton"
import { lastElement, zip } from "app/utils/arrays"
import { useSession } from "@blitzjs/auth"

const UserGalleryComponent = () => {
  // <Avatar layers={item} key={`avatar_${index}`} />
  const [items, setItems] = useState<ReactNode[]>([])
  const session = useSession({ suspense: false })
  const [hasMore, setHasMore] = useState(true)
  const manyMore = 3
  const limit = 100
  const [results, { fetchNextPage, isFetching }] = useInfiniteQuery(
    getSimpleDesigns,
    (page = { take: manyMore, skip: 0, where: { userId: session.userId } }) =>
      page,
    {
      getNextPageParam: (lastPage) => {
        return {
          ...lastPage.nextPage,
          where: { userId: session.userId },
        }
      },
    }
  )

  const fetchMore = () => {
    if (!isFetching) {
      fetchNextPage()
    }

    if (results && !isFetching) {
      const lastResult = lastElement(results)
      const designs = lastResult.simpleDesigns
      setHasMore(lastResult.hasMore)
      setItems(
        items.concat(
          designs.map((design) => (
            <Avatar
              key={uuidv4()}
              header={
                <HStack w="full">
                  <Text w="full">{design.id}</Text>
                  <UpdateButton design={design} />
                </HStack>
              }
              sizes={zip(design.widths, design.heights)}
              layers={design.layers}
              name={design.id}
              footer={[
                <DeleteButton
                  key={`Delete ${design.id}`}
                  id={design.id}
                  layers={design.layers}
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
