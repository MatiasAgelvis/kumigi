import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
} from "@chakra-ui/react";
import Item from "./item";

function AccordionMenu({ name, options }) {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} pl={6}>
          <VStack spacing={4} align="stretch">
            {options.map((option, i) => (
              <Item key={i} name={option.name} input={option.input} />
            ))}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default AccordionMenu;
