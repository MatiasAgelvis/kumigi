import { Image, ImageProps } from "@chakra-ui/react";

function ImageBox({
  image,
  alt,
  ...props
}: { image: string; alt?: string } & ImageProps) {
  return (
    <Image
      src={image}
      // {...boxOptions}
      alt={alt}
      textColor="transparent"
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
