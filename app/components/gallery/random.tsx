import Gallery from "app/components/gallery";
import { randomLayers } from "app/lib/avatara";
import { FC, ReactNode, useState } from "react";
import Modalo from "../modal";
import sizeFormatted from "../size/sizeFormatted";
import Avatar from "./Avatar";
import { idCard } from "app/utils/createLayer";
import { v4 as uuidv4 } from "uuid";
import { Box, Button, VStack, Wrap } from "@chakra-ui/react";
import boxOptions from "app/utils/boxOptions";
import { nameAtom } from "app/utils/store";
import { useRecoilState } from "recoil";
import sizeState from "app/utils/sizeState";

const RandomGalleryComponent = () => {
  // <Avatar layers={item} key={`avatar_${index}`} />
  const [name, setName] = useRecoilState(nameAtom);
  const [items, setItems] = useState<ReactNode[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const manyMore = 10;
  const limit = 100;

  const layerGenerator = () => randomLayers().map(idCard);
  const size = sizeState();
  const fetchMore = () => {
    setHasMore(items.length < limit);
    setItems(
      items.concat(
        Array.from({ length: manyMore }, () => (
          <Avatar key={uuidv4()} size={size} layers={layerGenerator()} />
        ))
      )
    );
  };

  function restart() {
    setItems([]);
    setHasMore(true);
    setName("Name");
  }

  return (
    <VStack w="full" spacing={8}>
      <Wrap w="full" justify={"center"}>
        <Modalo
          open={"Size Options"}
          buttonProps={{ variant: "outline", colorScheme: "blue" }}
          body={sizeFormatted()}
          modalProps={boxOptions}
        />
        <Button colorScheme={"red"} onClick={restart}>
          Start Over
        </Button>
      </Wrap>

      <Gallery items={items} fetchMore={fetchMore} hasMore={hasMore} w="full" />
    </VStack>
  );
};

export default RandomGalleryComponent;
