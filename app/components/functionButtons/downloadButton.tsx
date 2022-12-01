import { Button, ButtonProps } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { saveAs } from "file-saver";
import buttonOptions from "app/utils/buttonOptions";

export default function DownloadButton({
  image,
  message = "Download",
  ...props
}: {
  image: string;
  message?: string;
} & ButtonProps) {
  return (
    <Button
      leftIcon={<DownloadIcon />}
      onClick={() => {
        saveAs(image, "avatara.png");
      }}
      {...props}
    >
      {message}
    </Button>
  );
}
