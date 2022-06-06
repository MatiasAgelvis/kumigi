import { Flex, Box, Heading, Text, Link } from "@chakra-ui/react";
import boxOptions from "../utils/boxOptions";

const Header = () => {
	return (
		<Box {...boxOptions} m="1rem">
			<Flex
				w="100%"
				alignItems="center"
				justifyContent="space-between"
				wrap="wrap"
			>
				<Heading as="h1" mr={4}>
					Avatara
				</Heading>
				<Flex ml="auto" direction={["row", "column"]}>
					<Text mr={1}>by</Text>
					<Link href="https://matiasagelvis.com">
						<Heading
							as="h4"
							size={["sm", "md"]}
							w={["max-content"]}
						>
							Matias Agelvis
						</Heading>
					</Link>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Header;
