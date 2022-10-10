import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  forwardRef,
  ComponentPropsWithoutRef,
  PropsWithoutRef,
  useState,
  cloneElement,
} from "react";
import { useField, UseFieldConfig } from "react-final-form";

export interface LabeledTextFieldProps
  extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string;
  /** Field label. */
  label: string;
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number";
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>;
  labelProps?: ComponentPropsWithoutRef<"label">;
  fieldProps?: UseFieldConfig<string>;
}

const Control = ({ name, ...rest }) => {
  const {
    meta: { error, touched },
  } = useField(name, { subscription: { touched: true, error: true } });
  return <FormControl {...rest} isInvalid={error && touched} />;
};

const Error = ({ name }) => {
  const {
    meta: { error },
  } = useField(name, { subscription: { error: true } });
  return <FormErrorMessage>{error}</FormErrorMessage>;
};

const PasswordInput = ({ input }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      {cloneElement(input, { type: showPassword ? "text" : "password" })}

      <InputRightElement h={"full"}>
        <IconButton
          aria-label={showPassword ? "hide password" : "show password"}
          variant={"ghost"}
          icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
          onClick={() => setShowPassword((showPassword) => !showPassword)}
        ></IconButton>
      </InputRightElement>
    </InputGroup>
  );
};

const LabeledTextField = ({ name, label, type = "text" }) => {
  const { input, meta } = useField(name);

  const inputComponent = (
    <Input
      {...input}
      isInvalid={meta.error && meta.touched}
      id={name}
      type={type}
      placeholder={label}
    />
  );
  return (
    <Control name={name} my={4}>
      <FormLabel htmlFor={name}>{label}</FormLabel>

      {type == "password" ? (
        <PasswordInput input={inputComponent} />
      ) : (
        inputComponent
      )}

      <Error name={name} />
    </Control>
  );
};

export { LabeledTextField };
