import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage";
import ClassicGame from "./GameModes/ClassicGame";
import SplashGame from "./GameModes/SplashGame";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "classic",
    element: <ClassicGame />,
  },
  {
    path: "splash",
    element: <SplashGame />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <App>
    <RouterProvider router={router} />
  </App>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
