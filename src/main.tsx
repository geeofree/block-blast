import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Arial, Helvetica, sans-serif;
    box-sizing: border-box;
    font-weight: normal;
    padding: 0;
    margin: 0;
    font-size: 1rem;
  }

  html, body {
    font-size: 16px;
  }
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
);
