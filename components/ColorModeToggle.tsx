import { Box, Button, useColorMode } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";
import { equals } from "ramda";

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box position="fixed" left="2" top="2">
      <Button
        size="sm"
        onClick={toggleColorMode}
        leftIcon={equals(colorMode, "dark") ? <FiMoon /> : <FiSun />}
      >
        {equals(colorMode, "dark") ? "Dark mode" : "Light mode"}
      </Button>
    </Box>
  );
}

export default ColorModeToggle;
