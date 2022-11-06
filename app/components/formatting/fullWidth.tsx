import { Flex, FlexProps, Text, TextProps } from "@chakra-ui/react";
import { ReactElement } from "react";

function FullWidth({
  name,
  input,
  flexProps,
  textProps,
}: {
  name: ReactElement;
  input: ReactElement;
  flexProps: FlexProps;
  textProps: TextProps;
}) {
  return (
    <Flex
      wrap="wrap"
      direction="row"
      justifyContent="space-between"
      {...flexProps}
    >
      <Text {...textProps}>{name}</Text>
      {input}
    </Flex>
  );
}

export default FullWidth;
