import {
  Box,
  useDisclosure,
  Button,
  Collapse,
  BoxProps,
  ButtonProps,
  CollapseProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  name: string;
  body: ReactNode;
  wrapperProps?: BoxProps;
  buttonProps?: ButtonProps;
  collapseProps?: CollapseProps;
  drawerProps?: BoxProps;
};

function AccordionMenu({
  name,
  body,
  wrapperProps,
  buttonProps,
  collapseProps,
  drawerProps,
}: Props) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box {...wrapperProps}>
      <Button onClick={onToggle} {...buttonProps}>
        {isOpen ? "Hide" : "Show"} {name}
      </Button>
      <Collapse in={isOpen} {...collapseProps}>
        <Box {...drawerProps}>{body}</Box>
      </Collapse>
    </Box>
  );
}

export default AccordionMenu;
