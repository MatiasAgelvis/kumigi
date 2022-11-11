import { useMutation } from "@blitzjs/rpc";
import { Routes } from "@blitzjs/next";
import { Box, Button, HStack } from "@chakra-ui/react";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import Link from "next/link";
import logout from "app/auth/mutations/logout";

export default function UserInfo() {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);

  return (
    <Box>
      {currentUser ? (
        <HStack spacing={4}>
          <Link href={Routes.UserGallery()}>
            <Button>
              <strong>Your Gallery</strong>
            </Button>
          </Link>
          {/*<code>{currentUser.email}</code>*/}
          <Button
            onClick={async () => {
              await logoutMutation();
            }}
          >
            Logout
          </Button>
        </HStack>
      ) : (
        <HStack>
          <Link href={Routes.SignupPage()}>
            <Button>
              <strong>Sign Up</strong>
            </Button>
          </Link>
          <Link href={Routes.LoginPage()}>
            <Button>
              <strong>Login</strong>
            </Button>
          </Link>
        </HStack>
      )}
    </Box>
  );
}
