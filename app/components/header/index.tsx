import { Routes } from "@blitzjs/next";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  useBreakpointValue,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import useDrawer from "app/hooks/useDrawer";
import useLogin from "app/hooks/useLogin";

import Link from "next/link";
import { Suspense } from "react";
import boxOptions from "../../utils/boxOptions";
import NewDesignButton from "../functionButtons/newDesignButton";
import ColorToggle from "./colorToggle";
import UserInfo from "./UserInfo";

export default function Header() {
  const content = [
    <NewDesignButton variant={"outline"} key="newdesign" />,
    <Button key="randomgallery">
      <Link href={Routes.RandomGallery()}>Random Gallery</Link>
    </Button>,
    <Suspense key="userinfo" fallback={<Button disabled>Loading...</Button>}>
      {/*<UserInfo />*/ useLogin()}
    </Suspense>,
  ];

  const desktop = (
    <Wrap spacing={4} justify="end" align={"center"}>
      {content}
    </Wrap>
  );

  const { toggle: Toggle, drawer: Drawer } = useDrawer();
  const mobile = (
    <>
      <Toggle variant={"outline"}>Menu</Toggle>
      <Drawer>
        <VStack>{content}</VStack>
      </Drawer>
    </>
  );

  const header = useBreakpointValue([mobile, null, desktop]);

  return (
    <Flex {...boxOptions} m="1rem" rowGap={4}>
      <Heading as="h1" mr={8}>
        <Link href={Routes.Home()}>
          <Center>Avatara</Center>
        </Link>
      </Heading>
      <Spacer />
      <HStack spacing={4} justify="end">
        {header}
        <ColorToggle aria-label="toggle color mode" />
      </HStack>
    </Flex>
  );
}
