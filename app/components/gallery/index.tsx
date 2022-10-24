import boxOptions from "app/utils/boxOptions";
import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Spinner,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useState } from "react";

import InfiniteScroll from "react-infinite-scroller";
import ImageBox from "../designer/image/imageBox";
import Avatara, { randomLayers } from "app/lib/avatara";
import applyLayers from "app/utils/applyLayers";
import Modalo from "../modal";

function Dummy() {
  const avatar = new Avatara();
  const [layers, setLayers] = useState(randomLayers());
  applyLayers(avatar, layers);

  const imageBox = (
    <Center>
      <ImageBox image={avatar.toDataURL()} />
    </Center>
  );
  return (
    <Modalo
      open={<Box {...boxOptions}>{imageBox}</Box>}
      buttonProps={{ variant: "link" }}
      action="Open in Editor"
      modalBody={imageBox}
      onClickAction={console.log}
      modalProps={boxOptions}
    />
  );
}

function Gallery({ ...props }) {
  // sizeOptions
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState([]);

  const fetchMore = () => {
    setHasMore(items.length < 50);
    setItems(items.concat(Array.from({ length: 2 })));
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
          {items.map((i, index) => (
            <Dummy key={index} />
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default Gallery;
