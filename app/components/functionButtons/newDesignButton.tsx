import { AddIcon } from "@chakra-ui/icons"
import { Button, ButtonProps } from "@chakra-ui/react"
import { buttonSize } from "app/utils/buttonOptions"
import { layers__Default } from "app/utils/createLayer"
import { useRecoilState, useSetRecoilState } from "recoil"
import { layersAtom, nameAtom, sizesAtom } from "app/utils/store"
import { name__default } from "app/utils/name"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { _default_size } from "app/utils/defaults"

export default function NewDesignButton({ ...props }: ButtonProps) {
  const setName = useSetRecoilState(nameAtom)
  const setLayers = useSetRecoilState(layersAtom)
  const setSizes = useSetRecoilState(sizesAtom)
  const router = useRouter()

  return (
    <Button
      leftIcon={<AddIcon />}
      colorScheme="green"
      onClick={() => {
        setLayers(layers__Default)
        setName(name__default)
        setSizes(_default_size)
        router.push(Routes.Home())
      }}
      {...props}
    >
      New
    </Button>
  )
}
