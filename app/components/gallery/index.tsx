import boxOptions from "app/utils/boxOptions";
import {
  Box,
  Center,
  CenterProps,
  SimpleGrid,
  SimpleGridProps,
  Spinner,
} from "@chakra-ui/react";
import { ReactNode } from "react";

import InfiniteScroll from "react-infinite-scroller";

interface Props extends CenterProps {
  items: ReactNode;
  hasMore: boolean;
  fetchMore: () => void;
  gridProps?: SimpleGridProps;
}

function Gallery({ items, hasMore, fetchMore, gridProps, ...props }: Props) {
  return (
    <Center {...props}>
      <Box
        as={InfiniteScroll}
        w="full"
        pageStart={0}
        loadMore={fetchMore}
        hasMore={hasMore}
        loader={
          <Center>
            <Spinner />
          </Center>
        }
      >
        <SimpleGrid
          minChildWidth={"120px"}
          spacing="40px"
          w="full"
          {...gridProps}
        >
          {items}
        </SimpleGrid>
      </Box>
    </Center>
  );
}

export default Gallery;
