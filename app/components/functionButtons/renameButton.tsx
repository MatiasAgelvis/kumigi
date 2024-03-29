import { useMutation } from "@blitzjs/rpc"
import { EditIcon } from "@chakra-ui/icons"
import {
  Button,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  ModalProps,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react"
import { SimpleDesigns } from "@prisma/client"
import Modalo from "app/components/modal"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import useAlertDialog from "app/hooks/useAlertDialog"
import { Layer } from "app/types/avatara"
import createSimpleDesign from "app/simple-designs/mutations/createSimpleDesign"
import updateSimpleDesign from "app/simple-designs/mutations/updateSimpleDesign"
import deleteSimpleDesign from "app/simple-designs/mutations/deleteSimpleDesign"
import deleteSimpleDesignWithName from "app/simple-designs/mutations/deleteSimpleDesignWithName"
import boxOptions from "app/utils/boxOptions"
import { buttonSize } from "app/utils/buttonOptions"
import layersToImage from "app/utils/layersToImage"
import { useState } from "react"
import ImageBox from "../designer/image/imageBox"
import { useRouter } from "next/router"

export default function UpdateButton({
  design,
  ...props
}: {
  design: SimpleDesigns
  props?: ModalProps
}) {
  const layers = design.layers as Layer[]
  const [name, setName] = useState(design.name)
  const currentUser = useCurrentUser()
  const [createDesingMutation] = useMutation(createSimpleDesign)
  const [updateDesingMutation] = useMutation(updateSimpleDesign)
  const [deleteDesignMutation] = useMutation(deleteSimpleDesign)
  const [deleteDesignNameMutation] = useMutation(deleteSimpleDesignWithName)
  const router = useRouter()
  const toast = useToast()
  const { onToggle, component: Alert } = useAlertDialog()

  const update = (name: string) => {
    return {
      ...design,
      layers,
      name,
    }
  }

  const successToast = (options: UseToastOptions) =>
    toast({
      title: "Success",
      description: "",
      status: "success",
      duration: 9000,
      isClosable: true,
      ...options,
    })

  function handleError(error) {
    switch (error.code) {
      case "P2002":
        onToggle()
        break
      default:
        toast({
          title: "An unknown error ocurred",
          description: "Please try again later.",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
        console.error(error)
        break
    }
  }

  const size = buttonSize

  return (
    <>
      <Modalo
        buttonProps={{
          "aria-label": "Rename desing",
          colorScheme: "teal",
          variant: "outline",
          size,
        }}
        open={<EditIcon />}
        header={
          <Editable value={name} onChange={setName} w="full">
            <EditablePreview w="full" />
            <EditableInput />
          </Editable>
        }
        body={
          <Center>
            <ImageBox
              image={layersToImage(design.layers as Layer[])}
              alt="Current state of the avatar"
            />
          </Center>
        }
        footer={[
          <Button
            key="Update"
            colorScheme={"green"}
            onClick={() =>
              updateDesingMutation(update(name))
                .then(() => {
                  successToast({
                    title: "Avatar updated.",
                    description: `The avatar "${design.name}" was renamed to "${name}" successfully.`,
                  })
                  router.reload()
                })
                .catch(handleError)
            }
          >
            Rename
          </Button>,
        ]}
        modalProps={boxOptions}
        {...props}
      />
      <Alert
        header={"Update Avatar"}
        body={`The Avatar "${name}" already exists, would you like to overwrite it? This can NOT be undone.`}
        action={"Update"}
        onClick={() => {
          deleteDesignNameMutation({ name: name })
            .then(() =>
              createDesingMutation(update(name))
                .then(() => {
                  deleteDesignMutation({ id: design.id })
                    .then(() => {
                      successToast({
                        title: "Avatar updated.",
                        description: `The avatar "${design.name}" was renamed to "${name}" successfully.`,
                      })
                      router.reload()
                    })
                    .catch(handleError)
                })
                .catch(handleError)
            )
            .catch(handleError)
        }}
      />
    </>
  )
}
