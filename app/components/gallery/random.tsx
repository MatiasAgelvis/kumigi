import Gallery from "app/components/gallery";
import { randomLayers } from "app/lib/avatara";
import { FC, ReactElement, ReactNode, useState } from "react";
import Modalo from "../modal";
import sizeFormatted from "../size/sizeFormatted";
import Avatar from "./Avatar";
import { idCard } from "app/utils/createLayer";
import { v4 as uuidv4 } from "uuid";
import { Box, VStack, Wrap } from "@chakra-ui/react";
import boxOptions from "app/utils/boxOptions";

const RandomGalleryComponent = () => {
  // <Avatar layers={item} key={`avatar_${index}`} />
  const [items, setItems] = useState<ReactNode[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const manyMore = 10;
  const limit = 100;

  const layerGenerator = () => randomLayers().map(idCard);

  const fetchMore = () => {
    setHasMore(items.length < limit);
    setItems(
      items.concat(
        Array.from({ length: manyMore }, () => (
          <Avatar key={uuidv4()} layers={layerGenerator()} />
        ))
      )
    );
  };

  return (
    <VStack w="full" spacing={8}>
      <Wrap w="full" justify={"center"}>
        <Modalo
          open={"Size Options"}
          body={sizeFormatted()}
          modalProps={boxOptions}
        />
      </Wrap>

      <Gallery items={items} fetchMore={fetchMore} hasMore={hasMore} w="full" />
    </VStack>
  );
};

export default RandomGalleryComponent;
