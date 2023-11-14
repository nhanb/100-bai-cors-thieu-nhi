import React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const BE_URL = process.env.REACT_APP_BACKEND_URL;

const CALLBACK_PATH = "/aad-callback/";
const CALLBACK_URL = encodeURIComponent(
  `http://host.local:3000${CALLBACK_PATH}`,
);
const AUTH_URL = `${BE_URL}/.auth/login/aad?post_login_redirect_uri=${CALLBACK_URL}`;

function getToken() {
  return localStorage.getItem("authToken");
}

function setToken(token) {
  localStorage.setItem("authToken", token);
}

const Home = () => {
  const token = getToken();

  if (token === null) {
    return (
      <div>
        <h1>Not logged in</h1>
        <p>
          Authenticate yourself here: <a href={AUTH_URL}>{AUTH_URL}</a>
        </p>
      </div>
    );
  }

  return <div>Token: {token}</div>;
};

const AADCallback = () => {
  // Zoomers' componentDidMount
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      console.log("Empty hash. Aborted.");
      return;
    }
    const blob = decodeURIComponent(hash.slice("#token=".length));
    const token = JSON.parse(blob).authenticationToken;
    console.log(">> token:", token);
    setToken(token);
  }, []);
  return <p>Callback</p>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: CALLBACK_PATH,
    element: <AADCallback />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
