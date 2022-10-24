import { Routes } from "@blitzjs/next";
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
import sizeState from "app/utils/sizeState";
import { useRecoilState } from "recoil";
import { layersAtom } from "app/utils/store";
import { useRouter } from "next/router";

function Dummy() {
  const { height, width } = sizeState();
  const avatar = new Avatara(width, height);
  const [layers, setLayers] = useState(randomLayers());
  applyLayers(avatar, layers);
  const [editorLayers, setEditorLayers] = useRecoilState(layersAtom);
  const router = useRouter();

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
      onClickAction={() => {
        setEditorLayers(layers);
        router.push(Routes.Home());
      }}
      modalProps={boxOptions}
    />
    // <Designer initialLayersState={layers__Default} />
  );
}

function Gallery({ ...props }) {
  // sizeOptions
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState([]);
  const manyMore = 10;

  const fetchMore = () => {
    setHasMore(items.length < 50);
    setItems(items.concat(Array.from({ length: manyMore })));
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
