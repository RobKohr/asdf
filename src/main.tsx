import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import "./_variables.scss";
import ErrorPage from "./error-page";
import "./index.scss";
import Layout from "./routes/_layout";
import Login from "./routes/auth/login";
import Logout from "./routes/auth/logout";
import Register from "./routes/auth/register";
import Home from "./routes/home";
import Integration from "./routes/integration";
import Test from "./routes/test";
import Dashboard from "./routes/dashboard";

const siteRoutes: Record<string, RouteObject[]> = {};
siteRoutes["common"] = [
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/logout", element: <Logout /> },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      ...siteRoutes["common"],
      { path: "", element: <Home /> },
      { path: "integration", element: <Integration /> },
      { path: "test", element: <Test /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error("rootElement is null");
}
