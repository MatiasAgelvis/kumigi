import { useMutation } from "@blitzjs/rpc";
import { Routes } from "@blitzjs/next";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import logout from "app/auth/mutations/logout";
import { useSession, UseSessionOptions } from "@blitzjs/auth";
import { buttonSize } from "app/utils/buttonOptions";

export default function useLogin(
  options: UseSessionOptions = { suspense: false }
) {
  const session = useSession(options);
  const [logoutMutation] = useMutation(logout);

  return session
    ? [
        <Link key="usergalley" href={Routes.UserGallery()}>
          <Button>Your Gallery </Button>
        </Link>,
        <Button
          key="logout"
          onClick={async () => {
            await logoutMutation();
          }}
        >
          Logout
        </Button>,
      ]
    : [
        <Link key="signup" href={Routes.SignupPage()}>
          <Button>Sign Up </Button>
        </Link>,
        <Link key="login" href={Routes.LoginPage()}>
          <Button>Login </Button>
        </Link>,
      ];
}
