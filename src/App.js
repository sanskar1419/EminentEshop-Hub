/* Importing Hooks, method, function etc. */
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* Importing Components */
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import AddProduct from "./pages/NewProduct/AddProduct";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";
import Cart from "./pages/Cart/Cart";

/* Functional App Component */
function App() {
  /* React Router Configuration */
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: ":id",
          element: <ProductDetail />,
        },
        {
          path: "add",
          element: <AddProduct />,
        },
        {
          path: "update/:id",
          element: <UpdateProduct />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
      ],
    },
  ]);
  /* Returning the JSX */
  return <RouterProvider router={router} />;
}

/* Exporting App */
export default App;
