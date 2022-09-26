import {
  Button,
  Heading,
  SimpleGrid,
  useBreakpointValue,
  Wrap,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { randomLayers } from "../../lib/avatara";
import boxOptions from "../../utils/boxOptions";
import { createCard, idCard } from "../../utils/createCard";
import { layersAtom } from "../../utils/store";
import ColorToggle from "./colorToggle";

const Header = () => {
  const [layers, setLayers] = useRecoilState(layersAtom);
  return (
    <SimpleGrid columns={[1, 2]} {...boxOptions} m="1rem">
      <Heading as="h1" mr={4} mb={[4, 0]}>
        Avatara
      </Heading>
      <Wrap spacing={4} justify="end">
        <Button
          size={useBreakpointValue({ base: "sm", md: "md" })}
          colorScheme="blue"
          onClick={() =>
            setLayers(randomLayers().map((layer) => idCard(layer)))
          }
        >
          Randomize
        </Button>
        <Button
          size={useBreakpointValue({ base: "sm", md: "md" })}
          colorScheme="red"
          onClick={() => {
            try {
              setLayers([createCard()]);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Reset
        </Button>
        <ColorToggle size={useBreakpointValue({ base: "sm", md: "md" })} />
      </Wrap>
    </SimpleGrid>
  );
};

export default Header;
