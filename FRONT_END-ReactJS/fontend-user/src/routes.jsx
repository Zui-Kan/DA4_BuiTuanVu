import { createBrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import CheckOut from "./pages/Order";
import CarCompany from "./pages/CarCompany";
import AppLayout from "./shares/AppLayout";
import ErrorBoundary from "./Components/Error/Error";
import OrderSuccess from "./pages/OrderSuccess";
import Purchase from "./pages/Purchase";
import PurchaseDetail from "./pages/PurchaseDetail";

import Post from "./pages/Post";
import Topic from "./pages/Topic";
import Forum from "./pages/Forum";
import Category from "./pages/Category";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <>
        <ScrollToTop />
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
        path: "/detail/:id",
        element: <Detail />,
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
      {
        path: "/category/:id",
        element: <Category />,
      },
      {
        path: "/ordersuccess/:id",
        element: <OrderSuccess />,
      },
      {
        path: "/purchase",
        element: <Purchase />,
      },
      {
        path: "/purchasedetail/:id",
        element: <PurchaseDetail />,
      },

      {
        path: "/forum",
        element: <Forum />,
      },
      {
        path: "/topic/:id",
        element: <Topic />,
      },
      {
        path: "/post/:id",
        element: <Post />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/login",
    element: <Login />,
  },
]);
