import { Flex, Box, Heading, Text, Link } from "@chakra-ui/react";
import APIurl from "./apiUrl";
import boxOptions from "../utils/boxOptions";

const Footer = ({ url }) => {
	return (
		<Box {...boxOptions} m="1rem">
			<Flex w="100%" alignItems="center" justifyContent="space-between">
				<Text wordBreak="break-all">
					<APIurl url={url} />
				</Text>
			</Flex>
		</Box>
	);
};

export default Footer;
