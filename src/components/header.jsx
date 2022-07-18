import { Flex, Box, Heading, Text, Link, HStack } from "@chakra-ui/react";
import boxOptions from "../utils/boxOptions";
import ColorToggle from "./colorToggle";
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
				<HStack spacing={4}>
					<ColorToggle />
				</HStack>
			</Flex>
		</Box>
	);
};

export default Header;
