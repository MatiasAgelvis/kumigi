import { Flex, Text } from "@chakra-ui/react";

function Item({ name, input }) {
  return (
    <Flex wrap="wrap" direction="row" justifyContent="space-between">
      <Text>{name}</Text>
      {input}
    </Flex>
  );
}

export default Item;
