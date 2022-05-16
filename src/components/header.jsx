import { Flex, Box, Heading, Text, Link } from "@chakra-ui/react";
import boxOptions from '../utils/boxOptions'

const Header = () => {
	return (
		<Box {...boxOptions} m="1rem">
			<Flex w="100%" alignItems="center" justifyContent="space-between">
				<Heading as="h1">Avatara</Heading>
				<Text>
					by
					<Link href="https://matiasagelvis.com">
						<Heading as="h4" size="md">
							Matias Agelvis
						</Heading>
					</Link>
				</Text>
			</Flex>
		</Box>
	);
};

export default Header;
