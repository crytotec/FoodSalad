import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Styles/index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";

const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
    <App />
   </Provider>
  </StrictMode>
);
