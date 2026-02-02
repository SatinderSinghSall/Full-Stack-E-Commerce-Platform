import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>
  </HelmetProvider>,
);
