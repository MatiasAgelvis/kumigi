import { Flex, Box, Heading, Text, Link } from "@chakra-ui/react";
import APIurl from './apiUrl'

const boxOptions = {
	borderWidth: "3px",
	borderRadius: "lg",
	p: 5,
	shadow: "md",
};

const Footer = ({url}) => {
	return (
		<Box {...boxOptions} m="1rem">
			<Flex w="100%" alignItems="center" justifyContent="space-between">
				<Text>
					<APIurl url={url}/>
				</Text>
			</Flex>
		</Box>
	);
};

export default Footer;
