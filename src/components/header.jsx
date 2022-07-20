import { Flex, Box, Heading, HStack, Button } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import boxOptions from "../utils/boxOptions";
import ColorToggle from "./colorToggle";
import { layersAtom } from "../utils/store";
import { layers__Default } from "../utils/createCard";

const Header = () => {
	const [layers, setLayers] = useRecoilState(layersAtom);
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
					<Button colorScheme="red" onClick={() => setLayers([])}>
						Reset
					</Button>
					<ColorToggle />
				</HStack>
			</Flex>
		</Box>
	);
};

export default Header;
