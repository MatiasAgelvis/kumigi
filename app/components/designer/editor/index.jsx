import { AddIcon } from "@chakra-ui/icons";
import { Box, ButtonGroup, Flex, IconButton, VStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { ReactSortable } from "react-sortablejs";
import { useRecoilState } from "recoil";
import boxOptions from "../../../utils/boxOptions";
import buttonOptions from "../../../utils/buttonOptions";
import { randomLayer } from "../../../lib/avatara";
import { createCard, idCard } from "../../../utils/createCard";
import { heightAtom, widthAtom } from "../../../utils/store";
import AccordionMenu from "../accordionMenu/accordionMenu";
import Card from "../card";
import NumberInput from "./numberInput";

function Editor({ layers, setLayers, avatar, shapes, fonts, ...props }) {
  const [dragTarget, setDragTarget] = useState(-1);
  const [dragEvent, setDragEvent] = useState(false);
  const [height, setHeight] = useRecoilState(heightAtom);
  const [width, setWidth] = useRecoilState(widthAtom);

  const advancedOptions = [
    {
      name: "Height",
      input: <NumberInput value={height} setValue={setHeight} max={2000} />,
    },
    {
      name: "Width",
      input: <NumberInput value={width} setValue={setWidth} max={2000} />,
    },
  ];

  const updateLayer = (index) => (update) => {
    let layersUpdate = [...layers];
    layersUpdate[index] = {
      ...layersUpdate[index],
      ...update,
    };
    setLayers(layersUpdate);
  };

  const addLayer = (layer) => {
    setLayers([...layers, layer]);
  };

  const deleteLayer = (index) => () => {
    setLayers(layers.filter((_, i) => i != index));
  };

  return (
    <Flex justify={["center", null, "right"]} {...props}>
      {/*    Editor    */}
      <Box
        {...boxOptions}
        mx={["auto", "auto", "auto", 4]}
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
            <AnimatePresence initial={false} mode={"popLayout"}>
              {layers.map((layer, i) => (
                <motion.div
                  key={layer.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    index={i}
                    layer={layer}
                    updateLayer={updateLayer(i)}
                    options={shapes}
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
          <ButtonGroup isAttached>
            <IconButton
              {...buttonOptions}
              fontSize={"1.4rem"}
              onClick={() => addLayer(createCard())}
              icon={<AddIcon />}
            />
            <IconButton
              {...buttonOptions}
              colorScheme="blue"
              w={["full", "90%", "60%"]}
              onClick={() => addLayer(idCard(randomLayer()))}
              fontSize={"2rem"}
              icon={<GiPerspectiveDiceSixFacesRandom />}
            />
          </ButtonGroup>
          <AccordionMenu
            name="Size Options"
            options={advancedOptions}
            buttonProps={buttonOptions}
          />
        </VStack>
      </Box>
    </Flex>
  );
}

export default Editor;
