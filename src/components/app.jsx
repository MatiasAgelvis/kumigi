import Avatara from "../lib/avatara";
import { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import Card from "./card";
import URLfromLayers from "../utils/url";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Image,
  Flex,
  IconButton,
  VStack,
  SimpleGrid,
  SlideFade,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import boxOptions from "../utils/boxOptions";
import buttonOptions from "../utils/buttonOptions";
import DownloadButton from "./downloadButton";
import NumberInput from "../components/numberInput";
import AccordionMenu from "./accordionMenu/accordionMenu";
import ImageBox from "./imageBox";

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
    setURL(
      URLfromLayers(layers, [
        {
          name: "height",
          value: height,
        },
        { name: "width", value: width },
      ])
    );
  }

  useEffect(() => {
    mainUpdate();
  }, [layersString]);

  useEffect(() => {
    avatar = new Avatara(width, height);
    mainUpdate();
  }, [height, width]);

  return (
    <SimpleGrid
      columns={[1, 1, 2]}
      m="1rem"
      gap="4"
      templateAreas={["'image' 'editor'", "'image' 'editor'", "'editor image'"]}
    >
      {/*    Editor    */}
      <Flex justify={["center", "center", "right"]} gridArea="editor">
        <Box
          {...boxOptions}
          mx={["auto", "auto", "auto", "4"]}
          maxW="700px"
          height="fit-content"
        >
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
                <SlideFade in={true}>
                  <Box key={layer.id}>
                    <Card
                      index={i}
                      updateLayer={updateLayer(i)}
                      options={ShapeOptions}
                      fonts={fonts}
                      deleteLayer={deleteLayer(i)}
                    />
                  </Box>
                </SlideFade>
              ))}
            </ReactSortable>

            {/* New Layer Button */}
            <IconButton
              {...buttonOptions}
              onClick={() => setLayers([...layers, createCard()])}
              icon={<AddIcon />}
            />

            <AccordionMenu name="Size" options={sizeOptions} />
          </VStack>
        </Box>
      </Flex>

      {/*    Image    */}
      <Flex justify={["center", "center", "left"]} gridArea="image">
        <Box
          sx={{ alignSelf: "stretch" }}
          w="clamp(1px,min-content,1000px)"
          mx={["auto", "auto", "auto", "4"]}
        >
          <Box
            {...boxOptions}
            sx={{ position: "-webkit-sticky", position: "sticky", top: "2%" }}
            w="fit-content"
            h="fit-content"
            maxW="100%"
          >
            <VStack gap={4}>
              <ImageBox image={image} />
              <DownloadButton canvas={avatar.canvas} />
            </VStack>
          </Box>
        </Box>
      </Flex>
    </SimpleGrid>
  );
}

export default App;
