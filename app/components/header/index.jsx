import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  useBreakpointValue,
  Wrap,
} from "@chakra-ui/react";
import { Suspense } from "react";
import { useRecoilState } from "recoil";
import { randomLayers } from "../../lib/avatara";
import boxOptions from "../../utils/boxOptions";
import { createCard, idCard } from "../../utils/createCard";
import { layersAtom } from "../../utils/store";
import ColorToggle from "./colorToggle";
import UserInfo from "./UserInfo";

const Header = () => {
  return (
    <SimpleGrid columns={[1, 2]} {...boxOptions} m="1rem">
      <Heading as="h1" mr={4} mb={[4, 0]}>
        Avatara
      </Heading>
      <Wrap spacing={4} justify="end">
        <Suspense fallback={<Button disabled>Loading...</Button>}>
          <UserInfo />
        </Suspense>
        <ColorToggle size={useBreakpointValue({ base: "sm", md: "md" })} />
      </Wrap>
    </SimpleGrid>
  );
};

export default Header;
