import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import CheckOut from "./pages/Checkout";
import CarCompany from "./pages/CarCompany";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <CheckOut />,
  },
  {
    path: "/carcompany/:id",
    element: <CarCompany />,
  },
]);
