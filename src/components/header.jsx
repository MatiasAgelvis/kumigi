import {
	Flex,
	Box,
	Heading,
	HStack,
	Button,
	useBreakpointValue,
	Wrap,
	SimpleGrid,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import boxOptions from "../utils/boxOptions";
import ColorToggle from "./colorToggle";
import { layersAtom } from "../utils/store";
import Avatara from "../lib/avatara";
import { idCard } from "../utils/createCard";

const Header = () => {
	const [layers, setLayers] = useRecoilState(layersAtom);
	return (
		<SimpleGrid columns={[1, 2]} {...boxOptions} m="1rem">
			<Heading as="h1" mr={4} mb={4}>
				Avatara
			</Heading>
			<Wrap spacing={4} justify="end">
				<Button
					size={useBreakpointValue({ base: "sm", md: "md" })}
					colorScheme="blue"
					onClick={() =>
						setLayers(
							new Avatara().randomLayers().map((layer) => idCard(layer))
						)
					}
				>
					Randomize
				</Button>
				<Button
					size={useBreakpointValue({ base: "sm", md: "md" })}
					colorScheme="red"
					onClick={() => setLayers([])}
				>
					Reset
				</Button>
				<ColorToggle size={useBreakpointValue({ base: "sm", md: "md" })} />
			</Wrap>
		</SimpleGrid>
	);
};

export default Header;
