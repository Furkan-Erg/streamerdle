import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import "./index.css";
import App from "./App";
import theme from "./theme";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./HomePage";
import ClassicGame from "./GameModes/ClassicGame";
import SplashGame from "./GameModes/SplashGame";
import DailyGame from "./GameModes/DailyGame";
import HigherLowerGame from "./GameModes/HigherLowerGame";
import { migrateLegacyStorage } from "./lib/storage";

migrateLegacyStorage();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "daily", element: <DailyGame /> },
      { path: "classic", element: <ClassicGame /> },
      { path: "splash", element: <SplashGame /> },
      { path: "higher-lower", element: <HigherLowerGame /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
