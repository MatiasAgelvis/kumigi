import { AuthenticationError, PromiseReturnType } from "blitz";
import NextLink from "next/link";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { Form, FORM_ERROR } from "app/core/components/Form";
import login from "app/auth/mutations/login";
import { Login } from "app/auth/validations";
import { useMutation } from "@blitzjs/rpc";
import { Routes } from "@blitzjs/next";
import { Box, Center, Link, Text } from "@chakra-ui/react";
import boxOptions from "app/utils/boxOptions";

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login);
  return (
    <Center>
      <Box {...boxOptions} w={"fit-content"}>
        <Form
          submitText="Login"
          title="Login"
          schema={Login}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              const user = await loginMutation(values);
              props.onSuccess?.(user);
            } catch (error: any) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" };
              } else {
                return {
                  [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " +
                    error.toString(),
                };
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" />
          <LabeledTextField name="password" label="Password" type="password" />
          <NextLink href={Routes.ForgotPasswordPage()}>
            <Link>Forgot your password?</Link>
          </NextLink>
        </Form>
        <Text align={"center"}>
          Or{" "}
          <NextLink href={Routes.SignupPage()} passHref>
            <Link>Sign Up</Link>
          </NextLink>
        </Text>
      </Box>
    </Center>
  );
};

export default LoginForm;
