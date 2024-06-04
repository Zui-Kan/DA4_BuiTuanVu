import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./shares/AppLayout";
import ErrorBoundary from "./Component/Error/Error";
import Home from "./Page/Home";
import LoaiXe from "./Page/LoaiXe";
import PhienBan from "./Page/PhienBan";
import ModelXe from "./Page/ModelXe";
import HangXe from "./Page/Quản lý hãng xe/HangXe";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <>
        <AppLayout />
      </>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/hangxe",
        element: <HangXe />,
      },
      {
        path: "/loaixe",
        element: <LoaiXe />,
      },
      {
        path: "/phienban",
        element: <PhienBan />,
      },
      {
        path: "/modelxe",
        element: <ModelXe />,
      },
    ],
  },
]);
