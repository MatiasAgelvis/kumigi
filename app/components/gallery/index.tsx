import boxOptions from "app/utils/boxOptions";
import { Box, Center, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { idCard } from "app/utils/createLayer";
import Avatara, { randomLayers } from "app/lib/avatara";

import InfiniteScroll from "react-infinite-scroller";
import Avatar from "./Avatar";
import { Layer } from "app/lib/shapes";

function Gallery({ layerGenerator, limit = 100, ...props }) {
  // sizeOptions
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<Layer[][]>([]);
  const manyMore = 10;

  const fetchMore = () => {
    setHasMore(items.length < limit);
    setItems(items.concat(Array.from({ length: manyMore }, layerGenerator)));
  };

  return (
    <Flex justify={"center"} {...props}>
      <Box
        as={InfiniteScroll}
        w="full"
        p={boxOptions.p}
        pageStart={0}
        loadMore={fetchMore}
        hasMore={hasMore}
        loader={
          <Center>
            <Spinner />
          </Center>
        }
      >
        <SimpleGrid minChildWidth={"120px"} spacing="40px" w="full">
          {items.map((item, index) => (
            <Avatar layers={item} key={`avatar_${index}`} />
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default Gallery;
