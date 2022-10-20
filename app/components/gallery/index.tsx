import boxOptions from "app/utils/boxOptions";
import { Box, Center, Flex, SimpleGrid, Spinner, VStack, Wrap } from "@chakra-ui/react";
import { useState } from "react";


import InfiniteScroll from 'react-infinite-scroller';


function Dummy({ msg }) {
  return <Box>HIHIHIHIHIHIHI {msg}</Box>;
}



function Gallery({ ...props }) {

  const [hasMore, setHasMore] = useState(true)
  const [items, setItems] = useState([])

  const fetchMore = () => {
    setHasMore(items.length < 50)
    setItems(items.concat(Array.from({ length: 2 })));
  };


  return (
    <Flex justify={"center"} {...props}>

      <Box as={InfiniteScroll}
        w='full'
        p={boxOptions.p}
        pageStart={0}
        loadMore={fetchMore}
        hasMore={hasMore}
        loader={<Spinner />}
      >
        <SimpleGrid minChildWidth={'120px'} spacing='40px' w='full'>
          
          {items.map((i, index) => (
            <Box
              {...boxOptions}
            >
              <Dummy key={index} msg={'#' + index} />
            </Box>
          ))}

        </SimpleGrid>
      </Box>

    </Flex >
  );
}

export default Gallery;
