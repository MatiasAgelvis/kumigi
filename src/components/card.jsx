// import Select from "react-select";
import { DragHandleIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  CloseButton,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Switch,
} from "@chakra-ui/react";
import namer from "color-namer";
import { useEffect, useState } from "react";
import ColorPicker from "../components/colorPicker";
import OptionSelect from "../components/optionSelect";
import TextInput from "../components/textInput";
import boxOptions from "../utils/boxOptions";

function Card({ index, updateLayer, options, fonts, deleteLayer, ...props }) {
  const [shape, setShape] = useState("");
  const [color, setColor] = useState("rgba(0,0,0,1)");
  const [text, setText] = useState("");
  const [font, setFont] = useState("");
  const [displayLayer, setdisplayLayer] = useState(true);

  useEffect(() => {
    updateLayer({
      shape: displayLayer ? shape : null,
      color: color,
      text: text,
      font: font ? font : text && "pt",
    });
  }, [shape, color, text, font, displayLayer]);

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function colorName(color, pick = "basic") {
    return capitalize(namer(color, { pick: [pick] })[pick][0].name);
  }

  return (
    <Box {...boxOptions} my={3} bg="white" {...props} p={["0.7rem", 5]}>
      <HStack>
        <Center
          className="dragHandle"
          py="0.7rem"
          // increases the click box
          pr={["0.4rem", "0.5rem"]}
          // gives more room
          mr={["0.1rem", "0.4rem"]}
        >
          <DragHandleIcon />
        </Center>
        <Box w="100%">
          <Flex justify="space-between" gap={4}>
            <HStack>
              <Switch
                id="displayLayer"
                defaultChecked
                onChange={() => setdisplayLayer(!displayLayer)}
              />
              <Heading as="h4" size="md" pl="0.2rem" fontSize={["lg", "xl"]}>
                {`Layer ${index + 1}`}
              </Heading>
            </HStack>
            <CloseButton onClick={() => deleteLayer()} />
          </Flex>
          <Heading as="h4" size="md" pl="0.2rem">{`${colorName(
            color,
            "pantone"
          )} ${capitalize(shape ? shape : "")}`}</Heading>
        </Box>
      </HStack>
      <Center height="20px">
        <Divider
          orientation="horizontal"
          border={2}
          borderColor="gray.300"
          borderRadius="8"
        />
      </Center>

      <SimpleGrid columns={[1, 2]} spacing={10}>
        <OptionSelect
          options={options}
          state={shape}
          setState={setShape}
          placeholder="Select a shape"
        />
        <ColorPicker color={color} setColor={setColor} />

        {shape == "text" && (
          <Center>
            <TextInput text={text} setText={setText} />
          </Center>
        )}

        {shape == "text" && (
          <OptionSelect
            options={fonts}
            state={font}
            setState={setFont}
            placeholder="Select a Font"
          />
        )}
      </SimpleGrid>
    </Box>
  );
}

export default Card;
