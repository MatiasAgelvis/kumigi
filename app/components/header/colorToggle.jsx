import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  useColorModeValue,
  useColorMode,
  Button,
  IconButton,
} from "@chakra-ui/react";

function ColorToggle({ ...props }) {
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
