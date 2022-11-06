import { useMutation } from "@blitzjs/rpc";
import {
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import Modalo from "app/components/modal";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import useAlertDialog from "app/hooks/useAlertDialog";
import createSimpleDesign from "app/simple-designs/mutations/createSimpleDesign";
import updateSimpleDesign from "app/simple-designs/mutations/updateSimpleDesign";
import boxOptions from "app/utils/boxOptions";
import { buttonSize } from "app/utils/buttonOptions";
import {
  heightAtom,
  imageAtom,
  layersAtom,
  nameAtom,
  widthAtom,
} from "app/utils/store";
import { FaSave } from "react-icons/fa";
import { useRecoilState } from "recoil";
import ImageBox from "../image/imageBox";

export default function SaveButton({ ...props }) {
  const [layers] = useRecoilState(layersAtom);
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
        modalHeader={
          <Editable value={name} onChange={setName} w="full">
            <EditablePreview w="full" />
            <EditableInput />
          </Editable>
        }
        modalBody={
          <Center>
            <ImageBox image={image} alt="Current state of the avatar" />
          </Center>
        }
        action="Save"
        onClickAction={() => {
          if (currentUser) {
            createDesingMutation(update(currentUser.id))
              .then(() =>
                successToast({
                  title: "Avatar created.",
                  description: "The avatar is saved in your account.",
                })
              )
              .catch(handleError);
          }
        }}
        modalProps={boxOptions}
        {...props}
      />
      <Alert
        header={"Update Avatar"}
        body={
          "This Avatar already exists, would you like to overwrite it? This can't be undone."
        }
        action={"Update"}
        onClick={() =>
          currentUser &&
          updateDesingMutation(update(currentUser.id))
            .then(() =>
              successToast({
                title: "Avatar updated.",
                description: "The avatar was updated successfully.",
              })
            )
            .catch(handleError)
        }
      />
    </>
  );
}
