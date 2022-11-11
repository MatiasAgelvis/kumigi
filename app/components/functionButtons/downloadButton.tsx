import { Button } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { saveAs } from "file-saver";
import buttonOptions from "app/utils/buttonOptions";

export default function DownloadButton({ canvas, ...props }) {
  return (
    <Button
      {...buttonOptions}
      leftIcon={<DownloadIcon />}
      onClick={() => {
        canvas.toBlob(function (blob) {
          saveAs(blob, "avatara.png");
        });
      }}
      {...props}
    >
      Download
    </Button>
  );
}
