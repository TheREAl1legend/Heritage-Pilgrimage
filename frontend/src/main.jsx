import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";

import "leaflet/dist/leaflet.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="374111445497-nr8jpc9gka9g5ibqhcoq52r7mctnu97s.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  </GoogleOAuthProvider>,
);
