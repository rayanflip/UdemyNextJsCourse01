import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
//imported and wrapped here because most of the components will make use of it, otherwise it could be on another level.
import { FavoritesContextProvider } from "./store/favorites-context";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <FavoritesContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavoritesContextProvider>
  </StrictMode>
);
