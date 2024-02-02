import { DeleteIcon } from "@chakra-ui/icons"
import {
  Button,
  ModalProps,
  Center,
  Text,
  useToast,
  UseToastOptions,
  VStack,
} from "@chakra-ui/react"
import { SimpleDesigns } from "@prisma/client"
import Modalo from "app/components/modal"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import useAlertDialog from "app/hooks/useAlertDialog"
import { Layer } from "app/types/avatara"
import boxOptions from "app/utils/boxOptions"
import { buttonSize } from "app/utils/buttonOptions"
import layersToImage from "app/utils/layersToImage"
import ImageBox from "../designer/image/imageBox"

export default function DeleteButton({
  layers,
  id,
  name,
  onSuccess = () => {},
  onFailure = () => {},
  ...props
}: {
  layers?: Layer[]
  id: SimpleDesigns["id"]
  name: SimpleDesigns["name"]
  onSuccess?: () => void
  onFailure?: () => void
  props?: ModalProps
}) {
  const currentUser = true
  const [deleteDesignMutation] = ()=>{}

  const image = layers && layersToImage(layers)

  const toast = useToast()
  const { onToggle, component: Alert } = useAlertDialog()

  const successToast = (options?: UseToastOptions | undefined) =>
    toast({
      title: "Success",
      description: "",
      status: "success",
      duration: 9000,
      isClosable: true,
      ...options,
    })

  function handleError(error) {
    toast({
      title: "An unknown error ocurred",
      description: "Please try again later.",
      status: "error",
      duration: 9000,
      isClosable: true,
    })
    console.error(error)
  }

  // const size = buttonSize

  return (
    <>
      <Modalo
        buttonProps={{
          "aria-label": "Delete design",
          colorScheme: "red",
          // size,
          leftIcon: <DeleteIcon />,
        }}
        open={"Delete"}
        header={<Text>Delete {name}?</Text>}
        body={
          <VStack>
            {layers && (
              <Center>
                <ImageBox image={image} alt="Current state of the avatar" />
              </Center>
            )}
          </VStack>
        }
        footer={[
          <Button
            key="Delete design"
            colorScheme={"red"}
            variant="outline"
            onClick={onToggle}
          >
            Delete
          </Button>,
        ]}
        modalProps={boxOptions}
        {...props}
      />

      <Alert
        header={"Update Avatar"}
        body={`The Avatar "${name}" will be deleted, are you sure? This can NOT be undone.`}
        action={"Yes, Delete"}
        buttonProps={{ colorScheme: "red" }}
        onClick={() => {
          if (currentUser) {
            deleteDesignMutation({ id })
              .then(() => {
                successToast({
                  title: `"${name}" was Deleted.`,
                  description: `The avatar "${name}" was removed from your gallery.`,
                })
                onSuccess()
              })
              .catch((error) => {
                handleError(error)
                onFailure()
              })
          }
        }}
      />
    </>
  )
}
