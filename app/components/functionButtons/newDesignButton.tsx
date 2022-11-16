import { AddIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import { buttonSize } from "app/utils/buttonOptions";
import { layers__Default } from "app/utils/createLayer";
import { useRecoilState } from "recoil";
import { layersAtom, nameAtom } from "app/utils/store";
import { name__default } from "app/utils/name";
import { useRouter } from "next/router";
import { Routes } from "@blitzjs/next";

export default function NewDesignButton({ ...props }: ButtonProps) {
  const [name, setName] = useRecoilState(nameAtom);
  const [layers, setLayers] = useRecoilState(layersAtom);
  const router = useRouter();

  return (
    <Button
      leftIcon={<AddIcon />}
      colorScheme="green"
      onClick={() => {
        setLayers(layers__Default);
        setName(name__default);
        router.push(Routes.Home());
      }}
      {...props}
    >
      New
    </Button>
  );
}
