import { Image } from "@chakra-ui/react";

function ImageBox({ image, alt, ...props }) {
  return (
    <Image
      src={image}
      // {...boxOptions}
      alt={alt}
      border="2px"
      borderColor="gray.200"
      _dark={{ borderColor: "gray.600" }}
      background={
        "repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px"
      }
      shadow="md"
      fit="scale-down"
      maxH="70vh"
      {...props}
    />
  );
}

export default ImageBox;
