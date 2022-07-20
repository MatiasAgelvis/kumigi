import Avatara from "../lib/avatara";
import { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import Card from "./card";
import URLfromLayers from "../utils/url";
import { Box, Flex, IconButton, VStack, SimpleGrid } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import boxOptions from "../utils/boxOptions";
import buttonOptions from "../utils/buttonOptions";
import DownloadButton from "./downloadButton";
import NumberInput from "../components/numberInput";
import AccordionMenu from "./accordionMenu/accordionMenu";
import ImageBox from "./imageBox";
import applyLayers from "../utils/applyLayers";
import { motion, AnimatePresence } from "framer-motion";
import FontFaceObserver from "fontfaceobserver";
import { useRecoilState } from "recoil";
import { createCard } from "../utils/createCard";
import { layersAtom, urlAtom } from "../utils/store";

function App() {
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(200);
  const [dragTarget, setDragTarget] = useState(-1);
  const [dragEvent, setDragEvent] = useState(false);
  const [_, setURL] = useRecoilState(urlAtom);
  let avatar = new Avatara(width, height);

  const ShapeOptions = [
    "background",
    "square",
    "circle",
    "rectangle",
    "triangle",
    "diamond",
    "squircle",
    "linear",
    "radial",
    "text",
  ];

  const sizeOptions = [
    {
      name: "Height",
      input: <NumberInput value={height} setValue={setHeight} max={2000} />,
    },
    {
      name: "Width",
      input: <NumberInput value={width} setValue={setWidth} max={2000} />,
    },
  ];

  const fonts = avatar.fonts();

  useEffect(() => {
    var fontsLoader = fonts.map((font) => new FontFaceObserver(font));
    fontsLoader.map(
      (font) => font.load()
      // .then(function () {console.log("My Family has loaded");})
    );
  }, []);

  const [image, setImage] = useState(avatar.toDataURL());
  const [layers, setLayers] = useRecoilState(layersAtom);
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

  const addLayer = () => {
    setLayers([...layers, createCard()]);
  };

  const deleteLayer = (index) => () => {
    setLayers(layers.filter((_, i) => i != index));
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
    setLayers(layers);
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
          w="clamp(200px,100%,700px)"
          height="fit-content"
          p={["0.5rem", 5]}
        >
          <VStack spacing={4} align="stretch">
            {/* Layer Stack */}
            <ReactSortable
              list={layers.map((x) => ({ ...x, chosen: true }))}
              setList={setLayers}
              animation={200}
              // delay={100}
              delayOnTouchStart={true}
              // touchStartThreshold={5}
              fallbackTolerance={2}
              handle=".dragHandle"
              onChoose={(e) => setDragTarget(e.oldIndex)}
              onStart={() => setDragEvent(true)}
              onEnd={() => setDragEvent(false)}
              onUnchoose={() => setDragTarget(-1)}
            >
              <AnimatePresence>
                {layers.map((layer, i) => (
                  <motion.div
                    key={layer.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0, scale: 0.9 }}
                  >
                    <Card
                      index={i}
                      updateLayer={updateLayer(i)}
                      options={ShapeOptions}
                      fonts={fonts}
                      deleteLayer={deleteLayer(i)}
                      dragEvent={dragEvent}
                      dragTarget={i == dragTarget}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </ReactSortable>

            {/* New Layer Button */}
            <IconButton
              {...buttonOptions}
              onClick={() => addLayer()}
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
