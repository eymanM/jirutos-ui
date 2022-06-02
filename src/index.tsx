import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStyle } from "assets/styles/globalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "assets/styles/theme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { store } from "state/store";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </BrowserRouter>
      </Provider>
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
