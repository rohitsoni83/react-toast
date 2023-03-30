import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster, toast } from "./toastFile";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <>
      <App />
      <Toaster />
      <button
        onClick={() =>
          toast("Success", {
            icon: <i className="fa fa-github" />,
            id: "success",
            duration: 400000000,
          })
        }
      >
        Show Toast
      </button>
    </>
  </React.StrictMode>
);
