import { SimpleGrid } from "@chakra-ui/react";
import FontFaceObserver from "fontfaceobserver";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Avatara from "../../lib/avatara";
import applyLayers from "../../utils/applyLayers";
import URLfromLayers from "../../utils/url";
import {
  baseAtom,
  heightAtom,
  imageAtom,
  layersAtom,
  urlAtom,
  widthAtom,
} from "../../utils/store";
import Editor from "./editor";
import Image from "./image";
import useUndo from "use-undo";
import { layers__Default } from "app/utils/createLayer";
import { Layer } from "app/types/avatara";

function Designer({
  initialLayersState = layers__Default,
}: {
  initialLayersState: Layer[];
}) {
  const [height] = useRecoilState(heightAtom);
  const [width] = useRecoilState(widthAtom);
  const [layersRecoil, setLayersRecoil] = useRecoilState(layersAtom);
  const [URL, setURL] = useRecoilState(urlAtom);
  const [BASE] = useRecoilState(baseAtom);
  let avatar = new Avatara(width, height);

  const fonts = avatar.fonts();
  const shapes = avatar.shapes();

  useEffect(() => {
    var fontsLoader = fonts.map((font: string) => new FontFaceObserver(font));
    fontsLoader.map(
      (font: FontFace) => font.load()
      // .then(function () {console.log("My Family has loaded");})
    );
  }, [fonts]);

  const [image, setImage] = useRecoilState(imageAtom);

  const layerState = useUndo(initialLayersState);

  const [{ present: layers }] = layerState;

  applyLayers(avatar, layers);

  function mainUpdate() {
    avatar = new Avatara(width, height);
    applyLayers(avatar, layers);
    console.log(avatar, layers);
    setImage(avatar.toDataURL());
    setURL(
      URLfromLayers(BASE, layers, [
        {
          name: "height",
          value: height,
        },
        { name: "width", value: width },
      ])
    );
  }

  useEffect(() => {
    // console.log(layers);
    mainUpdate();
    setLayersRecoil(layers);
  }, [JSON.stringify(layers)]);

  useEffect(() => {
    mainUpdate();
  }, [height, width]);

  return (
    <SimpleGrid
      columns={[1, null, 2]}
      m={["0", "1rem 0"]}
      gap={4}
      templateAreas={["'image' 'editor'", null, "'editor image'"]}
    >
      {/*    Editor    */}

      <Editor
        layerState={layerState}
        avatar={avatar}
        shapes={shapes}
        fonts={fonts}
        gridArea="editor"
      />

      {/*    Image    */}
      <Image
        image={image}
        alt="Current state of the avatar"
        canvas={avatar.canvas}
        gridArea="image"
      />
    </SimpleGrid>
  );
}

export default Designer;
