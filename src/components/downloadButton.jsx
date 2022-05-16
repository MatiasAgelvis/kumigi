import { Button } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { saveAs } from 'file-saver';

export default function DownloadButton({ canvas }) {
	return (
		<Button
			w="100%"
			colorScheme="teal"
			variant="outline"
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
