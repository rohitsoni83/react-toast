import React, { useState } from "react";
import toast from "./toastFile";
import { data } from "./toastDemoData";
import { LabelHTMLAttributes } from "react";
import toastImg from "./img/toast.png";
import toastEmitter from "./img/toast-emitter.png";
import "./toastDemo.scss";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
}
function MyLabel(props: LabelProps) {
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

  const onChangeRadioBtn = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setState((prev) => ({
      ...prev,
      [name.toLowerCase()]: value,
    }));
  };

  const getCheckedValidation = (name: string, value: string) => {
    return name === "Position"
      ? state.position === value
      : name === "Type"
      ? state.type === value
      : name === "Theme" && state.theme === value;
  };

  const onChangeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          icon: <i className="fa fa-github" />,
          duration: +state.duration,
          style: { backgroundColor: "#262626", color: "#fff" },
        });
      default:
        return;
    }
  };

  return (
    <div className="demo-form">
      <div className="top-heading-container">
        <p>
          CG - <span>Toast</span>
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <form style={{ padding: "16px" }} className="form-container">
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
            <div>
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
          <div className="link-container">
            <a
              href="https://github.com/rohitsoni83/my-toast-app"
              target="_blank"
            >
              <i className="fa fa-github" style={{ marginRight: "16px" }} />
              <p>Github Link</p>
            </a>
          </div>
        </form>

        <div className="right-container">
          <p className="text-head">The Playground</p>
          <div className="toast-code-container">
            <div>
              <p>Toast Container</p>
              <img
                width="100%"
                height="240px"
                style={{ borderRadius: "4px" }}
                alt="Toast Container Img"
                src={toastImg}
              />
            </div>
            <div style={{ margin: "16px 0" }}>
              <p>Toast Type Emitter</p>
              <img
                width="100%"
                height="240px"
                style={{ borderRadius: "4px" }}
                alt="Toast Container Img"
                src={toastEmitter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoToast;
