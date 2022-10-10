import { LabeledTextField } from "app/core/components/LabeledTextField";
import { Form, FORM_ERROR } from "app/core/components/Form";
import signup from "app/auth/mutations/signup";
import { Signup } from "app/auth/validations";
import { useMutation } from "@blitzjs/rpc";
import { Box, Center, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Routes } from "@blitzjs/next";
import boxOptions from "app/utils/boxOptions";

type SignupFormProps = {
  onSuccess?: () => void;
};

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup);
  return (
    <Center>
      <Box {...boxOptions} w={"fit-content"}>
        {/*<h1>Create an Account</h1>*/}

        <Form
          submitText="Create Account"
          schema={Signup}
          title="Sign Up"
          subtitle="Unlock many new features 🚀"
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await signupMutation(values);
              props.onSuccess?.();
            } catch (error: any) {
              if (
                error.code === "P2002" &&
                error.meta?.target?.includes("email")
              ) {
                // This error comes from Prisma
                return { email: "This email is already being used" };
              } else {
                return { [FORM_ERROR]: error.toString() };
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" />
          <LabeledTextField name="password" label="Password" type="password" />
        </Form>
        <Text align={"center"}>
          Already a user?{" "}
          <NextLink href={Routes.LoginPage()} passHref>
            <Link>Login</Link>
          </NextLink>
        </Text>
      </Box>
    </Center>
  );
};

export default SignupForm;
