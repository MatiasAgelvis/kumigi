import { Button } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { saveAs } from "file-saver";
import buttonOptions from "../utils/buttonOptions";

export default function DownloadButton({ canvas }) {
	return (
		<Button
			{...buttonOptions}
			leftIcon={<DownloadIcon />}
			onClick={() => {
				canvas.toBlob(function (blob) {
					saveAs(blob, "avatara.png");
				});
			}}
		>
			Download
		</Button>
	);
}
