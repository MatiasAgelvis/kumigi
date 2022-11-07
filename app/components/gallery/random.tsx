import Gallery from "app/components/gallery";
import { idCard } from "app/utils/createLayer";
import { randomLayers } from "app/lib/avatara";
import { FC } from "react";
import Modalo from "../modal";
import sizeFormatted from "../size/sizeFormatted";

const RandomGalleryComponent = () => {
  return (
    <>
      <Modalo open={"Size Options"} body={sizeFormatted()} />
      <Gallery layerGenerator={() => randomLayers().map(idCard)} />
    </>
  );
};

export default RandomGalleryComponent;
