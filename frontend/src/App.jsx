// src/App.js
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Temples from "./pages/Temples";
import Pilgrimage from "./pages/Pilgrimage";
import Architecture from "./pages/Architecture";
import About from "./pages/About";
import AdminRoute from "./routes/AdminRoute";
import CreateTemple from "./pages/CreateTemple";
import Category from "./pages/Category";
import EditTemple from "./pages/EditTemple";
import TempleDetail from "./pages/TempleDetail";
import UpdateUser from "./pages/UpdateUser";
import OTPSystem from "./components/OTPSystem";
import OTPProtectedRoute from "./routes/OTPProtectedRoute";
import PilgrimageCircuits from "./pages/PilgrimageCircuits";
import CircuitsDetails from "./pages/CircuitsDetails";

const App = () => {
  const myroute = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "templeList",
          element: <Temples />,
        },
        {
          path: "pilgrimage",
          element: <Pilgrimage />,
        },
        {
          path: "architecture",
          element: <Architecture />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "admin/upload",
          element: (
            <AdminRoute>
              <CreateTemple />
            </AdminRoute>
          ),
        },
        {
          path: "admin/category",
          element: (
            <AdminRoute>
              <Category />
            </AdminRoute>
          ),
        },
        {
          path: "admin/editTemple/:id",
          element: (
            <AdminRoute>
              <EditTemple />
            </AdminRoute>
          ),
        },
        {
          path: "templeDetails/:id",
          element: <TempleDetail />,
        },
        {
          path: "circuits",
          element: <PilgrimageCircuits />
        },
        {
          path: "travel/:pilgrimage",
          element: <CircuitsDetails />
        }
      ],
    },
    {
      path: "otp-generate",
      element: <OTPSystem />,
    },
    {
      path: "updatePass",
      element: (
        <OTPProtectedRoute>
          <UpdateUser />
        </OTPProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={myroute} />;
};

export default App;
