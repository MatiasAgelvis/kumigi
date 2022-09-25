import { Image } from "@chakra-ui/react";

function ImageBox({ image }) {
  return (
    <Image
      src={image}
      // {...boxOptions}
      border="2px"
      borderColor="gray.200"
      _dark={{ borderColor: "gray.600" }}
      shadow="md"
      fit="scale-down"
      maxH="70vh"
    />
  );
}

export default ImageBox;
