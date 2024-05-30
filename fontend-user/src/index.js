import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import reportWebVitals from "./reportWebVitals";
import { router } from "./routes";
import TokenRefresher from "./constant/refreshToken";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <TokenRefresher></TokenRefresher>
      <RouterProvider router={router}></RouterProvider>
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals();
