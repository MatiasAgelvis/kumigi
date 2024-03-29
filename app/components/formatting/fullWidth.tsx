import { Center, Flex, FlexProps, Text, TextProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export type Options = Array<{ name: string; input: ReactNode }>;

function FullWidth({
  name,
  input,
  flexProps,
  textProps,
}: {
  name: ReactNode;
  input: ReactNode;
  flexProps?: FlexProps;
  textProps?: TextProps;
}) {
  return (
    <Flex
      wrap="wrap"
      direction="row"
      justifyContent="space-between"
      {...flexProps}
    >
      <Center>
        <Text {...textProps}>{name}</Text>
      </Center>
      <Center>{input}</Center>
    </Flex>
  );
}

export default FullWidth;
