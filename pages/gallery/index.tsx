import Layout from "app/core/layouts/Layout";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Center,
  Flex,
  HStack,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import boxOptions from "app/utils/boxOptions";
import Link from "next/link";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { TbLayoutDashboard } from "react-icons/tb";
import { ReactNode, Suspense } from "react";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";

function Card({
  href,
  text,
  subtext,
  icon,
  buttonProps,
  ...props
}: {
  href: string;
  text: string;
  subtext?: ReactNode;
  icon: ReactNode;
  buttonProps: ButtonProps;
} & BoxProps) {
  return (
    <LinkBox {...boxOptions} w="full" {...props}>
      <Center h="full">
        <VStack spacing={4}>
          {icon}
          <Link href={href} passHref>
            <LinkOverlay>
              <VStack>
                <Button colorScheme="teal" {...buttonProps}>
                  {text}
                </Button>
                {subtext}
              </VStack>
            </LinkOverlay>
          </Link>
        </VStack>
      </Center>
    </LinkBox>
  );
}

const IntroGalleryPage = () => {
  const user = useSession();

  return (
    <SimpleGrid w="full" columns={[1, null, 2]} spacing={8} minH={"70vh"}>
      <Card
        href={"#"}
        buttonProps={{
          colorScheme: "teal",
          disabled: Boolean(!user.userId),
        }}
        text="Your Gallery"
        subtext={
          <Link href={"#"}>
            <Button variant={"link"}>
              Requires you to&nbsp;<strong>Login</strong>
            </Button>
          </Link>
        }
        icon={<TbLayoutDashboard fontSize={"100px"} />}
      />

      <Card
        href={"#"}
        buttonProps={{ colorScheme: "blue" }}
        text="Random Gallery"
        icon={<GiPerspectiveDiceSixFacesRandom fontSize={"100px"} />}
      />
    </SimpleGrid>
  );
};

const IntroGallery = () => {
  return (
    <Layout title="Choose a Gallery">
      <main>
        <Suspense fallback={<Spinner />}>
          <IntroGalleryPage />
        </Suspense>
      </main>
    </Layout>
  );
};

export default IntroGallery;
