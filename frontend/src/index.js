import React from "react";
import { useEffect, useState } from "react";
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

function logout() {
  localStorage.clear();
  window.location.reload();
}

const Home = () => {
  const token = getToken();
  const [respText, setRespText] = useState("");
  const [errText, setErrText] = useState("");

  if (token === null) {
    return (
      <div>
        <h1>Not logged in</h1>
        <button onClick={callApi}>Call API</button> (will fail)
        <p>
          Authenticate yourself here:{" "}
          <a rel="noreferrer" href={AUTH_URL}>
            {AUTH_URL}
          </a>
        </p>
      </div>
    );
  }

  // We have a token now. Use it.
  function callApi(useToken) {
    setErrText("");
    setRespText("");

    const tok = useToken ? token : "";

    fetch(`${BE_URL}/api/hello/`, {
      headers: {
        "X-ZUMO-AUTH": tok,
      },
    })
      .then((resp) => resp.text())
      .then(setRespText)
      .catch((err) => {
        setErrText(err.toString());
      });
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <p>Token: {token}</p>
      <button
        onClick={() => {
          callApi(true);
        }}
      >
        Call API
      </button>{" "}
      <button
        onClick={() => {
          callApi(false);
        }}
      >
        Call API without token
      </button>
      {respText ? (
        <div>
          <p>Response from api:</p>
          <pre>{respText}</pre>
        </div>
      ) : (
        ""
      )}
      {errText ? (
        <p>
          ERROR: <b>{errText}</b>
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

const AADCallback = () => {
  const [msg, setMsg] = useState("n/a");

  // Zoomers' componentDidMount
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      setMsg("Empty hash. Aborted.");
      return;
    }
    setMsg(`Received token: ${hash}`);
    const blob = decodeURIComponent(hash.slice("#token=".length));
    const token = JSON.parse(blob).authenticationToken;
    setToken(token);
    window.location = "/";
  }, []);

  return <p>{msg}</p>;
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
