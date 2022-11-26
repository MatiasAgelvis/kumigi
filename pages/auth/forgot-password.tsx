import Layout from "app/core/layouts/Layout";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { Form, FORM_ERROR } from "app/core/components/Form";
import { ForgotPassword } from "app/auth/validations";
import forgotPassword from "app/auth/mutations/forgotPassword";
import { useMutation } from "@blitzjs/rpc";
import { BlitzPage } from "@blitzjs/next";
import {
  Center,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import boxOptions from "app/utils/boxOptions";
import { detect } from "detect-browser";

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword);
  const browser = detect();

  function nonNullValue(
    obj: object | null,
    key: string | number | symbol,
    def: NonNullable<any>
  ) {
    return obj && key in obj && obj[key] ? obj[key] : def;
  }

  return (
    <Layout title="Forgot Your Password?">
      <Center>
        <Box {...boxOptions} w={"fit-content"}>
          {isSuccess ? (
            <Alert status="info" borderRadius={"md"}>
              <AlertIcon />
              <AlertTitle>Request Submitted</AlertTitle>
              <AlertDescription>
                If your email is in our system, you will receive instructions to
                reset your password shortly.
              </AlertDescription>
            </Alert>
          ) : (
            <Form
              title="Forgot your password?"
              submitText="Send Reset Password Instructions"
              schema={ForgotPassword}
              initialValues={{
                email: "",
                device: { name: "unknown browser 😕", os: "unknown OS 😕" },
              }}
              onSubmit={async (values) => {
                try {
                  await forgotPasswordMutation({
                    ...values,
                    device: {
                      name: nonNullValue(browser, "name", "unknown browser 😕"),
                      os: nonNullValue(browser, "os", "unknown OS 😕"),
                    },
                  });
                } catch (error: any) {
                  return {
                    [FORM_ERROR]:
                      "Sorry, we had an unexpected error. Please try again.",
                  };
                }
              }}
            >
              <LabeledTextField name="email" label="Email" />
            </Form>
          )}
        </Box>
      </Center>
    </Layout>
  );
};

export default ForgotPasswordPage;
