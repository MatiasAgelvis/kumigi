import { Image } from "@chakra-ui/react";
import boxOptions from "../utils/boxOptions";

function ImageBox({ image }) {
  return (
    <Image
      src={image}
      {...boxOptions}
      border="1px"
      borderColor={"gray.200"}
      shadow="md"
      fit="scale-down"
      maxH="70vh"
    />
  );
}

export default ImageBox;
