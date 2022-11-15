import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import {
  Button,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  HStack,
  ModalProps,
  Text,
  Tooltip,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import Modalo from "app/components/modal";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import useAlertDialog from "app/hooks/useAlertDialog";
import { Layer } from "app/lib/shapes";
import createSimpleDesign from "app/simple-designs/mutations/createSimpleDesign";
import updateSimpleDesign from "app/simple-designs/mutations/updateSimpleDesign";
import boxOptions from "app/utils/boxOptions";
import { buttonSize } from "app/utils/buttonOptions";
import { heightAtom, imageAtom, nameAtom, widthAtom } from "app/utils/store";
import Link from "next/link";
import { FaSave } from "react-icons/fa";
import { useRecoilState } from "recoil";
import LogInCTA from "../auth/logInCTA";
import ImageBox from "../designer/image/imageBox";

export default function SaveButton({
  layers,
  ...props
}: {
  layers: Layer[];
  props: ModalProps;
}) {
  const [image] = useRecoilState(imageAtom);
  const [height] = useRecoilState(heightAtom);
  const [width] = useRecoilState(widthAtom);
  const [name, setName] = useRecoilState(nameAtom);

  const currentUser = useCurrentUser();

  const [createDesingMutation] = useMutation(createSimpleDesign);
  const [updateDesingMutation] = useMutation(updateSimpleDesign);

  const toast = useToast();
  const { onToggle, component: Alert } = useAlertDialog();

  const update = (userId: number) => {
    return {
      id: name,
      userId: userId,
      layers,
      height,
      width,
    };
  };

  const successToast = (options: UseToastOptions) =>
    toast({
      title: "Success",
      description: "",
      status: "success",
      duration: 9000,
      isClosable: true,
      ...options,
    });

  function handleError(error) {
    switch (error.code) {
      case "P2002":
        onToggle();
        break;
      default:
        toast({
          title: "An unknown error ocurred",
          description: "Please try again later.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.error(error);
        break;
    }
  }

  const size = buttonSize;

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
                    .catch(handleError);
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
          updateDesingMutation(update(currentUser.id))
            .then(() =>
              successToast({
                title: "Avatar updated.",
                description: `The avatar "${name}" was updated successfully.`,
              })
            )
            .catch(handleError)
        }
      />
    </>
  );
}
