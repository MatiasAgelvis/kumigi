import Avatara from "../lib/avatara";
import { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import Card from "./card";
import URLfromLayers from "../utils/url";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Grid,
  GridItem,
  Center,
  Heading,
  Box,
  Image,
  Divider,
  Flex,
  IconButton,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import boxOptions from "../utils/boxOptions";
import DownloadButton from "./downloadButton";
import NumberInput from "../components/numberInput";
import AccordionMenu from "./accordionMenu/accordionMenu";

function applyLayers(avatar, layers) {
  for (let [key, layer] of Object.entries(layers)) {
    if (layer.shape) {
      if (layer.shape != "text") {
        avatar[layer.shape](layer.color);
      } else {
        avatar[layer.shape](layer.text, layer.color, layer.font);
      }
    }
  }
}

function App({ setURL }) {
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(200);
  let avatar = new Avatara(width, height);

  const ShapeOptions = [
    "background",
    "square",
    "circle",
    "rectangle",
    "gradient",
    "text",
  ];

  const sizeOptions = [
    {
      name: "Height",
      input: <NumberInput value={height} setValue={setHeight} />,
    },
    { name: "Width", input: <NumberInput value={width} setValue={setWidth} /> },
  ];

  const fonts = avatar.fonts();

  const createCard = () => {
    return { id: uuidv4() };
  };

  const [image, setImage] = useState(avatar.toDataURL());
  const [layers, setLayers] = useState([createCard()]);
  const layersString = JSON.stringify(layers);

  applyLayers(avatar, layers);

  const updateLayer = (index) => (update) => {
    let layersUpdate = [...layers];
    layersUpdate[index] = {
      ...layersUpdate[index],
      ...update,
    };
    setLayers(layersUpdate);
  };

  const deleteLayer = (index) => () => {
    let layersUpdate = layers.filter((_, i) => i != index);
    setLayers(layersUpdate);
  };

  function mainUpdate() {
    applyLayers(avatar, layers);
    setImage(avatar.toDataURL());
    setURL(URLfromLayers(layers));
  }

  useEffect(() => {
    mainUpdate();
  }, [layersString]);

  useEffect(() => {
    avatar = new Avatara(width, height);
    mainUpdate();
  }, [height, width]);

  return (
    <Flex
      m="1rem"
      align="start"
      justify="space-evenly"
      wrap="wrap-reverse"
      direction="row"
      gap="4"
      justifyContent='center'
    >
      {/*    Editor    */}
      <Box {...boxOptions}>
        <VStack spacing={4} align="stretch">
          {/* Layer Stack */}
          <ReactSortable
            list={layers}
            setList={setLayers}
            animation={200}
            delayOnTouchStart={true}
            fallbackTolerance={5}
            handle=".dragHandle"
          >
            {layers.map((layer, i) => (
              <div key={layer.id}>
                <Card
                  index={i}
                  updateLayer={updateLayer(i)}
                  options={ShapeOptions}
                  fonts={fonts}
                  deleteLayer={deleteLayer(i)}
                />
              </div>
            ))}
          </ReactSortable>

          {/* New Layer Button */}
          <IconButton
            variant="outline"
            colorScheme="teal"
            width="100%"
            onClick={() => setLayers([...layers, createCard()])}
            icon={<AddIcon />}
          />

          <AccordionMenu name="Size" options={sizeOptions} />
        </VStack>
      </Box>

      {/*    Image    */}
      <Box sx={{ alignSelf: "stretch" }} maxWidth="50%">
        <Box
          {...boxOptions}
          sx={{ position: "-webkit-sticky", position: "sticky", top: "20%" }}
        >
          <Center>
            <VStack gap={4}>
              <Image
                src={image}
                border="1px"
                borderColor={"gray.200"}
                shadow="md"
                htmlWidth={width}
                htmlHeight={height}
              />
              <DownloadButton canvas={avatar.canvas} />
            </VStack>
          </Center>
        </Box>
      </Box>
    </Flex>
  );
}

export default App;
