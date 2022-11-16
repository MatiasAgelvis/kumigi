import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  useColorModeValue,
  useColorMode,
  Button,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";

function ColorToggle({ ...props }: IconButtonProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      onClick={toggleColorMode}
      icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
      {...props}
    />
  );
}

export default ColorToggle;
