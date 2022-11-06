import {
  Box,
  useDisclosure,
  Button,
  Collapse,
  BoxProps,
  ButtonProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  name: string;
  body: ReactNode;
  wrapperProps?: BoxProps;
  buttonProps?: ButtonProps;
};

function AccordionMenu({ name, body, wrapperProps, buttonProps }: Props) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box {...wrapperProps}>
      <Button onClick={onToggle} {...buttonProps}>
        {isOpen ? "Hide" : "Show"} {name}
      </Button>
      <Collapse in={isOpen} animateOpacity>
        {body}
      </Collapse>
    </Box>
  );
}

export default AccordionMenu;
