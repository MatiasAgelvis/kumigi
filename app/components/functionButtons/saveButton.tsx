import { useMutation, useQuery } from "@blitzjs/rpc"
import {
  Button,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  ModalProps,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react"
import Modalo from "app/components/modal"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import useAlertDialog from "app/hooks/useAlertDialog"
import useSize from "app/hooks/useSize"
import createSimpleDesign from "app/simple-designs/mutations/createSimpleDesign"
import deleteSimpleDesignWithName from "app/simple-designs/mutations/deleteSimpleDesignWithName"
import updateSimpleDesign from "app/simple-designs/mutations/updateSimpleDesign"
import getDesignNameUser from "app/simple-designs/queries/getDesignNameUser"
import { Layer } from "app/types/avatara"
import boxOptions from "app/utils/boxOptions"
import { buttonSize } from "app/utils/buttonOptions"
import { imageAtom, nameAtom, sizesAtom } from "app/utils/store"
import { FaSave } from "react-icons/fa"
import { useRecoilState } from "recoil"
import LogInCTA from "../auth/logInCTA"
import ImageBox from "../designer/image/imageBox"

export default function SaveButton({
  layers,
  ...props
}: {
  layers: Layer[]
  props?: ModalProps
}) {
  const [image] = useRecoilState(imageAtom)
  const [sizes, setSizes] = useRecoilState(sizesAtom)
  const [name, setName] = useRecoilState(nameAtom)

  const currentUser = useCurrentUser()

  const [createDesingMutation] = useMutation(createSimpleDesign)
  const [updateDesingMutation] = useMutation(updateSimpleDesign)
  const [deleteDesignNameMutation] = useMutation(deleteSimpleDesignWithName)

  const toast = useToast()
  const { onToggle, component: Alert } = useAlertDialog()

  const update = (userId: number) => {
    return {
      name,
      userId,
      layers,
      widths: sizes.map((size) => size[0]!)!,
      heights: sizes.map((size) => size[1]!)!,
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
          "aria-label": "Save desing",
          colorScheme: "teal",
          size,
        }}
        open={<FaSave />}
        header={
          currentUser && (
            <Editable value={name} onChange={setName} w="full">
              <EditablePreview w="full" />
              <EditableInput />
            </Editable>
          )
        }
        body={
          <Center>
            {currentUser ? (
              <ImageBox image={image} alt="Current state of the avatar" />
            ) : (
              <LogInCTA
                heading={
                  <Heading textAlign={"center"}>
                    Create an account to Save your design
                  </Heading>
                }
                spacing={6}
              />
            )}
          </Center>
        }
        footer={
          currentUser && [
            <Button
              key="Save"
              colorScheme={"green"}
              onClick={() => {
                if (currentUser) {
                  createDesingMutation(update(currentUser.id))
                    .then(() =>
                      successToast({
                        title: "Avatar created.",
                        description: `The avatar "${name}" was saved to your gallery.`,
                      })
                    )
                    .catch(handleError)
                }
              }}
            >
              Save
            </Button>,
          ]
        }
        modalProps={boxOptions}
        {...props}
      />
      <Alert
        header={"Update Avatar"}
        body={`The Avatar "${name}" already exists, would you like to overwrite it? This can NOT be undone.`}
        action={"Update"}
        onClick={() =>
          currentUser &&
          deleteDesignNameMutation({ name: name })
            .then(() =>
              createDesingMutation(update(currentUser.id))
                .then(() =>
                  successToast({
                    title: "Avatar updated.",
                    description: `The avatar "${name}" was updated successfully.`,
                  })
                )
                .catch(handleError)
            )
            .catch(handleError)
        }
      />
    </>
  )
}
