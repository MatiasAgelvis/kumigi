import Layout from "app/core/layouts/Layout";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { Form, FORM_ERROR } from "app/core/components/Form";
import { ResetPassword } from "app/auth/validations";
import resetPassword from "app/auth/mutations/resetPassword";
import { BlitzPage, Routes } from "@blitzjs/next";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import NextLink from "next/link";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Link,
} from "@chakra-ui/react";
import boxOptions from "app/utils/boxOptions";

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter();
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword);

  return (
    <Center>
      <Box {...boxOptions} w={"fit-content"}>
        {isSuccess ? (
          <Alert status="success" borderRadius={"md"}>
            <AlertIcon />
            <AlertTitle>Password Reset Successfully</AlertTitle>
            <AlertDescription>
              Go to the{" "}
              <NextLink href={Routes.Home()}>
                <Link>homepage</Link>
              </NextLink>
            </AlertDescription>
          </Alert>
        ) : (
          <Form
            submitText="Reset Password"
            title="Set a New Password"
            schema={ResetPassword}
            initialValues={{
              password: "",
              passwordConfirmation: "",
              token: router.query.token as string,
            }}
            onSubmit={async (values) => {
              try {
                await resetPasswordMutation(values);
              } catch (error: any) {
                if (error.name === "ResetPasswordError") {
                  return {
                    [FORM_ERROR]: error.message,
                  };
                } else {
                  return {
                    [FORM_ERROR]:
                      "Sorry, we had an unexpected error. Please try again.",
                  };
                }
              }
            }}
          >
            <LabeledTextField
              name="password"
              label="New Password"
              type="password"
            />
            <LabeledTextField
              name="passwordConfirmation"
              label="Confirm New Password"
              type="password"
            />
          </Form>
        )}
      </Box>
    </Center>
  );
};

ResetPasswordPage.redirectAuthenticatedTo = "/";
ResetPasswordPage.getLayout = (page) => (
  <Layout title="Reset Your Password">{page}</Layout>
);

export default ResetPasswordPage;
