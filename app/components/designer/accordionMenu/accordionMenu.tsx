import {
  Box,
  VStack,
  useDisclosure,
  Button,
  Collapse,
  BoxProps,
  ButtonProps,
} from "@chakra-ui/react";
import boxOptions from "app/utils/boxOptions";
import { ReactNode } from "react";
import Item from "./item";

export type Options = Array<{ name: string; input: ReactNode }>;

type Props = {
  name: string;
  options: Options;
  spacing: number;
  wrapperProps: BoxProps;
  buttonProps: ButtonProps;
};

function AccordionMenu({
  name,
  options,
  spacing = 4,
  wrapperProps,
  buttonProps,
}: Props) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box {...wrapperProps}>
      <Button onClick={onToggle} {...buttonProps}>
        {isOpen ? "Hide" : "Show"} {name}
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box mt={spacing} {...boxOptions}>
          <VStack spacing={spacing} align="stretch">
            {Array.from(options).map((option, i) => (
              <Item key={i} name={option.name} input={option.input} />
            ))}
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
}

export default AccordionMenu;
