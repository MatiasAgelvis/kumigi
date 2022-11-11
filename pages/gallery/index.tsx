import Layout from "app/core/layouts/Layout";
import { BlitzPage, Routes } from "@blitzjs/next";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import boxOptions from "app/utils/boxOptions";
import Link from "next/link";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { TbLayoutDashboard } from "react-icons/tb";

function Card({ href, text, icon, buttonProps }) {
  return (
    <LinkBox {...boxOptions} w="full">
      <Center h="full">
        <VStack spacing={4}>
          {icon}
          <Link href={href} passHref>
            <LinkOverlay>
              <Button colorScheme="teal" {...buttonProps}>
                {text}
              </Button>
            </LinkOverlay>
          </Link>
        </VStack>
      </Center>
    </LinkBox>
  );
}

const IntroGallery: BlitzPage = () => {
  return (
    <Layout title="Choose a Gallery">
      <main>
        <SimpleGrid w="full" columns={[1, null, 2]} spacing={8} minH={"70vh"}>
          <Card
            href={Routes.UserGallery()}
            buttonProps={{ colorScheme: "teal" }}
            text="Your Gallery"
            icon={<TbLayoutDashboard fontSize={"100px"} />}
          />

          <Card
            href={Routes.RandomGallery()}
            buttonProps={{ colorScheme: "blue" }}
            text="Random Gallery"
            icon={<GiPerspectiveDiceSixFacesRandom fontSize={"100px"} />}
          />
        </SimpleGrid>
      </main>
    </Layout>
  );
};

export default IntroGallery;
