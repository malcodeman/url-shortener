import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

const THEME = extendTheme({
  styles: {
    global: {
      html: {
        scrollbarWidth: "thin",
      },
      "html::-webkit-scrollbar": {
        width: "8px",
      },
      "html::-webkit-scrollbar-thumb": {
        backgroundColor: "#72757b",
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={THEME}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
