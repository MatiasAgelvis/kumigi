import boxOptions from "app/utils/boxOptions";
import { Box, Center, ModalProps } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

import ImageBox from "../designer/image/imageBox";
import Avatara from "app/lib/avatara";
import applyLayers from "app/utils/applyLayers";
import Modalo from "../modal";

import DownloadButton from "../functionButtons/downloadButton";
import { Layer } from "app/types/avatara";

import { name__default } from "app/utils/name";
import EditButton from "../functionButtons/editButton";

function Avatar({
  layers: startLayers,
  name = name__default,
  dimensions,
  header,
  footer: __footer,
  ...props
}: {
  layers: Layer[];
  name: string;
  dimensions: { height: number; width: number };
  header?: ReactNode;
  footer?: ReactNode[];
  props?: ModalProps;
}) {
  const { height, width } = dimensions;
  const avatar = new Avatara(width, height);
  const [layers] = useState(startLayers);
  applyLayers(avatar, layers);

  const footer = __footer ? Array.from(__footer) : [];

  const imageBox = (
    <Center>
      <ImageBox image={avatar.toDataURL()} alt="random Avatar" />
    </Center>
  );

  return (
    <Modalo
      open={<Box {...boxOptions}>{imageBox}</Box>}
      buttonProps={{ variant: "link" }}
      header={header}
      body={imageBox}
      modalProps={boxOptions}
      footer={[
        <EditButton
          key="edit"
          layers={layers}
          name={name}
          dimensions={dimensions}
        />,
        <DownloadButton
          key="download"
          canvas={avatar.canvas}
          w={"fit-content"}
        />,
        ...footer,
      ]}
      {...props}
    />
  );
}
export default Avatar;
