import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Center,
} from "@chakra-ui/react";

import { ReactNode, PropsWithoutRef } from "react";
import {
  Form as FinalForm,
  FormProps as FinalFormProps,
} from "react-final-form";
import { z } from "zod";
import { validateZodSchema } from "blitz";
import boxOptions from "app/utils/boxOptions";
export { FORM_ERROR } from "final-form";

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode;
  /** Text to display in the submit button */
  submitText?: string;
  schema?: S;
  title?: string;
  subtitle?: string;
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"];
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"];
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  title,
  subtitle,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} {...props}>
          <Center>
            {/* Form fields supplied as children are rendered here */}
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                {title && (
                  <Heading fontSize={"4xl"} textAlign={"center"}>
                    {title}
                  </Heading>
                )}
                {subtitle && (
                  <Text fontSize={"lg"} color={"gray.600"}>
                    {subtitle}
                  </Text>
                )}
              </Stack>

              {children}

              {submitError && (
                <Alert
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  status="error"
                  borderRadius={"md"}
                >
                  <AlertIcon />
                  <AlertTitle>Oh No! There was an error!</AlertTitle>
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}

              {submitText && (
                <Button
                  loadingText="Submitting"
                  type="submit"
                  disabled={submitting}
                >
                  {submitText}
                </Button>
              )}
            </Stack>
          </Center>
        </form>
      )}
    />
  );
}

export default Form;
