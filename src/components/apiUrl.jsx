import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function APIurl({ url }) {
	return (
		url && (
			<Link href={url} isExternal>
				{url} <ExternalLinkIcon mx="2px" />
			</Link>
		)
	);
}
