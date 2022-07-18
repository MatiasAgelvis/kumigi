import {
	Flex,
	Box,
	Heading,
	Text,
	Link,
	VStack,
	Center,
} from "@chakra-ui/react";
import APIurl from "./apiUrl";
import boxOptions from "../utils/boxOptions";

const Footer = ({ url }) => {
	return (
		<Box>
			<Box {...boxOptions} m="1rem">
				<Flex
					w="100%"
					alignItems="center"
					justifyContent="space-between"
				>
					<Text wordBreak="break-all">
						<APIurl url={url} />
					</Text>
				</Flex>
			</Box>
			<Center>
				<Text mr={2}>by</Text>
				<Heading size={"lg"}>
					<Link href="https://matiasagelvis.com">Matias Agelvis</Link>
				</Heading>
			</Center>
		</Box>
	);
};

export default Footer;
