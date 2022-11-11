import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
  IconButton,
  Flex,
  useEditableControls,
  HStack,
  Input,
  EditableProps,
} from "@chakra-ui/react";
import { Dispatch, useEffect } from "react";

export function EditableWithControls({
  state,
  setState,
  ...props
}: {
  state: string;
  setState: Dispatch<string>;
  props?: EditableProps;
}) {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    console.log(getSubmitButtonProps());
    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
          aria-label="Confirm Edit"
        />
        <IconButton
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
          aria-label="Discard Edit"
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
          aria-label="Edit"
        />
      </Flex>
    );
  }
  return (
    <Editable
      textAlign="start"
      isPreviewFocusable={false}
      value={state}
      onChange={setState}
      {...props}
    >
      <HStack>
        <EditablePreview w="full" />
        <Input as={EditableInput} w="full" />
        <EditableControls />
      </HStack>
    </Editable>
  );
}
