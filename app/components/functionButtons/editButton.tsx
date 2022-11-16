import { Routes } from "@blitzjs/next";
import { Button, ButtonProps, Center } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

import Avatara from "app/lib/avatara";
import applyLayers from "app/utils/applyLayers";
import { useRecoilState } from "recoil";
import { layersAtom, nameAtom } from "app/utils/store";
import { useRouter } from "next/router";
import { Layer } from "app/lib/shapes";
import { EditIcon } from "@chakra-ui/icons";
import { name__default } from "app/utils/name";
import sizeState from "app/utils/sizeState";

export default function EditButton({
  layers: startLayers,
  name = name__default,
  dimensions,

  ...props
}: {
  layers: Layer[];
  name: string;
  dimensions: { height: number; width: number };
} & ButtonProps) {
  const { height, width } = dimensions;
  const avatar = new Avatara(width, height);
  const [layers] = useState(startLayers);
  applyLayers(avatar, layers);
  const [editorLayers, setEditorLayers] = useRecoilState(layersAtom);
  const [nameState, setNameState] = useRecoilState(nameAtom);
  const { setHeight, setWidth } = sizeState();
  const router = useRouter();

  return (
    <Button
      colorScheme={"teal"}
      onClick={() => {
        setEditorLayers(layers);
        setNameState(name);
        setHeight(dimensions.height);
        setWidth(dimensions.width);
        router.push(Routes.Home());
      }}
      leftIcon={<EditIcon />}
      {...props}
    >
      Edit
    </Button>
  );
}
