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
    <HStack spacing={4}>
      {currentUser ? (
        <Box>
          <Button
            onClick={async () => {
              await logoutMutation();
            }}
          >
            Logout
          </Button>
          <Box>
            User id: <code>{currentUser.id}</code>
            <br />
            User role: <code>{currentUser.role}</code>
          </Box>
        </Box>
      ) : (
        <Box>
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
        </Box>
      )}
    </HStack>
  );
}
