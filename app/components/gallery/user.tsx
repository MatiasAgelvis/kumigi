import Gallery from "app/components/gallery";
import { randomLayers } from "app/lib/avatara";
import { FC, ReactElement, ReactNode, Suspense, useState } from "react";
import Modalo from "../modal";
import sizeFormatted from "../size/sizeFormatted";
import Avatar from "./Avatar";
import { idCard } from "app/utils/createLayer";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import boxOptions from "app/utils/boxOptions";
import { nameAtom } from "app/utils/store";
import { useRecoilState } from "recoil";
import getSimpleDesigns from "app/simple-designs/queries/getSimpleDesigns";
import { useInfiniteQuery } from "@blitzjs/rpc";
import sizeState from "app/utils/sizeState";
import DeleteButton from "../functionButtons/deleteButton";
import UpdateButton from "../functionButtons/renameButton";

function lastElement(arr: any[]) {
  return arr.slice(-1)[0];
}

const UserGalleryComponent = () => {
  // <Avatar layers={item} key={`avatar_${index}`} />
  const [name, setName] = useRecoilState(nameAtom);
  const [items, setItems] = useState<ReactNode[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const manyMore = 3;
  const limit = 100;
  const [results, { fetchNextPage, isFetching }] = useInfiniteQuery(
    getSimpleDesigns,
    (page = { take: manyMore, skip: 0 }) => page,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  const fetchMore = () => {
    if (!isFetching) {
      fetchNextPage();
    }

    if (results && !isFetching) {
      const lastResult = lastElement(results);
      const designs = lastResult.simpleDesigns;
      setHasMore(lastResult.hasMore);
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
              size={{ height: design.height, width: design.width }}
              layers={design.layers}
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
      );
    }
  };

  return (
    <VStack w="full" spacing={8}>
      <Wrap w="full" justify={"center"}>
        {/*<Modalo
          open={"Size Options"}
          buttonProps={{ variant: "outline", colorScheme: "blue" }}
          body={sizeFormatted()}
          modalProps={boxOptions}
        />*/}
      </Wrap>

      <Gallery items={items} fetchMore={fetchMore} hasMore={hasMore} w="full" />
    </VStack>
  );
};

export default UserGalleryComponent;
