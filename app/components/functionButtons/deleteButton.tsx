import { useMutation } from "@blitzjs/rpc";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  ModalProps,
  Center,
  Text,
  useToast,
  UseToastOptions,
  VStack,
} from "@chakra-ui/react";
import { SimpleDesigns } from "@prisma/client";
import Modalo from "app/components/modal";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import useAlertDialog from "app/hooks/useAlertDialog";
import { Layer } from "app/lib/shapes";
import deleteSimpleDesign from "app/simple-designs/mutations/deleteSimpleDesign";
import boxOptions from "app/utils/boxOptions";
import { buttonSize } from "app/utils/buttonOptions";
import layersToImage from "app/utils/layersToImage";
import ImageBox from "../designer/image/imageBox";

export default function DeleteButton({
  layers,
  id,
  ...props
}: {
  layers?: Layer[];
  id: SimpleDesigns["id"];
  props?: ModalProps;
}) {
  const currentUser = useCurrentUser();
  const [deleteDesignMutation] = useMutation(deleteSimpleDesign);

  const image = layers && layersToImage(layers);

  const toast = useToast();
  const { onToggle, component: Alert } = useAlertDialog();

  const successToast = (options?: UseToastOptions | undefined) =>
    toast({
      title: "Success",
      description: "",
      status: "success",
      duration: 9000,
      isClosable: true,
      ...options,
    });

  function handleError(error) {
    toast({
      title: "An unknown error ocurred",
      description: "Please try again later.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    console.error(error);
  }

  const size = buttonSize;

  return (
    <>
      <Modalo
        buttonProps={{
          "aria-label": "Delete design",
          colorScheme: "red",
          size,
          leftIcon: <DeleteIcon />,
        }}
        open={"Delete"}
        header={<Text>Delete {id}?</Text>}
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
        body={`The Avatar "${id}" will be deleted, are you sure? This can NOT be undone.`}
        action={"Yes, Delete"}
        buttonProps={{ colorScheme: "red" }}
        onClick={() => {
          if (currentUser) {
            deleteDesignMutation({ id })
              .then(() =>
                successToast({
                  title: `"${id}" was Deleted.`,
                  description: `The avatar "${id}" was removed from your gallery.`,
                })
              )
              .catch(handleError);
          }
        }}
      />
    </>
  );
}
