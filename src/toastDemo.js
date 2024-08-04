import React, { useState } from "react";
import toast from "cg-toast";
import { data } from "./toastDemoData";
import toastImg from "./img/toast.png";
import toastEmitter from "./img/toast-emitter.png";
import toastGif from "./img/toast.gif";
import "./toastDemo.scss";

function MyLabel(props) {
  return <label htmlFor={props.htmlFor}>{props.children}</label>;
}

const DemoToast = () => {
  const [state, setState] = useState({
    position: "top-center",
    type: "success",
    theme: "coloured",
    duration: "5000",
    progressbar: true,
    message: "This is demo",
  });

  const onChangeRadioBtn = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState((prev) => ({
      ...prev,
      [name.toLowerCase()]: value,
    }));
  };

  const getCheckedValidation = (name, value) => {
    return name === "Position"
      ? state.position === value
      : name === "Type"
      ? state.type === value
      : name === "Theme" && state.theme === value;
  };

  const onChangeDuration = (event) => {
    const value = event.target.value;
    (+value > 0 || value === "") &&
      setState((prev) => ({
        ...prev,
        duration: value,
      }));
  };

  const showToast = () => {
    switch (state.type) {
      case "error":
        return toast.error(`${state.message} - ( ${state.type} toast )`, {
          duration: +state.duration,
          position: state.position,
          progressbar: state.progressbar,
          theme: state.theme,
        });
      case "info":
        return toast.info(`${state.message} - ( ${state.type} toast )`, {
          duration: +state.duration,
          position: state.position,
          progressbar: state.progressbar,
          theme: state.theme,
        });
      case "success":
        return toast.success(`${state.message} - ( ${state.type} toast )`, {
          duration: +state.duration,
          position: state.position,
          progressbar: state.progressbar,
          theme: state.theme,
        });
      case "warning":
        return toast.warning(`${state.message} - ( ${state.type} toast )`, {
          duration: +state.duration,
          position: state.position,
          progressbar: state.progressbar,
          theme: state.theme,
        });
      case "custom":
        return toast((t) => "I'm a custom toast", {
          position: state.position,
          icon: <i className="fa fa-face-smile" style={{ color: "#c29259" }} />,
          duration: +state.duration,
        });
      default:
        return;
    }
  };

  return (
    <>
      <div className="top-heading-container">
        <p>
          CG - <span>Toast</span>
        </p>
      </div>
      <div className="demo-form">
        <div style={{ height: "100%", padding: "0 16px" }}>
          {/* <img src={toastGif} alt="img" style={{ paddingTop: "16px" }} loop /> */}
          <form className="form-container">
            {Object.entries(data).map(([name, options], dataInd) => (
              <div className="position-container" key={dataInd}>
                <p className="bold-text">{name}</p>
                <div className="content">
                  {Object.entries(options).map(([value, label], index) => (
                    <div className="flex-center" key={index}>
                      <input
                        type="radio"
                        className="radio-btn"
                        name={name}
                        value={value}
                        id={value}
                        checked={getCheckedValidation(name, value)}
                        onChange={(e) => onChangeRadioBtn(e)}
                      />
                      {MyLabel({ htmlFor: value, children: label })}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="option-container">
              <p className="bold-text">Options</p>
              <div className="content">
                <p>Auto Delay Duration</p>
                <input
                  type="number"
                  className="duration-input"
                  value={state.duration}
                  onChange={(e) => onChangeDuration(e)}
                />
                <p>ms</p>
              </div>
            </div>

            <div className="selection-container">
              <p className="bold-text">Selection</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  id="progress-bar"
                  style={{ marginRight: "12px", cursor: "pointer" }}
                  checked={state.progressbar}
                  onChange={({ target: { checked } }) =>
                    setState((prev) => ({ ...prev, progressbar: checked }))
                  }
                />
                {/* <label for="progress-bar">Add Progressbar</label> */}
                {MyLabel({
                  htmlFor: "progress-bar",
                  children: "Add Progressbar",
                })}
              </div>
            </div>
            <div className="message-container">
              <p className="bold-text">Write Message</p>
              <div
                className="action_container"
                style={{
                  width: "60%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  rowGap: "8px",
                }}
              >
                <input
                  type="text"
                  className="message-input"
                  value={state.message}
                  onChange={({ target: { value } }) =>
                    setState((prev) => ({ ...prev, message: value }))
                  }
                />
                <button
                  className="show-toast-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast();
                  }}
                >
                  Show Toast
                </button>
              </div>
            </div>
            <br />
            <div className="link-container">
              <a href="https://github.com/rohitsoni83/my-toast-app" target="_">
                <i className="fa fa-github" style={{ marginRight: "16px" }} />
                <p style={{ textWrap: "nowrap" }}>Github Link</p>
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DemoToast;
