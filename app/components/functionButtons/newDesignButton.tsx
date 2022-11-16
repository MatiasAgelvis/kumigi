import { PlusSquareIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import { buttonSize } from "app/utils/buttonOptions";
import { layers__Default } from "app/utils/createLayer";
import { useRecoilState } from "recoil";
import { layersAtom, nameAtom } from "app/utils/store";
import { name__default } from "app/utils/name";

export default function NewDesignButton({ ...props }: ButtonProps) {
  const [name, setName] = useRecoilState(nameAtom);
  const [layers, setLayers] = useRecoilState(layersAtom);

  const size = buttonSize;

  return (
    <Button
      size={size}
      leftIcon={<PlusSquareIcon />}
      colorScheme="green"
      onClick={() => {
        setLayers(layers__Default);
        setName(name__default);
      }}
    >
      New
    </Button>
  );
}
