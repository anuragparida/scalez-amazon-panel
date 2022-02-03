import React from "react";
import ReactDOM from "react-dom";
import Router from "./router";
import theme from "./theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Router />
      </ChakraProvider>
    </React.StrictMode>
  </>,
  document.getElementById("root")
);
