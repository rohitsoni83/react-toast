import * as React from "react";
import { styled, keyframes } from "goober";

import { Toast } from "../core/types";

const StatusWrapper = styled("div")`
  position: absolute;
`;

const IndicatorWrapper = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`;

const enter = keyframes`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`;

export const AnimatedIconWrapper = styled("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${enter} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`;

export const ToastIcon: React.FC<{
  toast: Toast;
}> = ({ toast }) => {
  const { icon, type, theme, customIconColor } = toast;
  if (icon !== undefined) {
    if (typeof icon === "string") {
      return <AnimatedIconWrapper>{icon}</AnimatedIconWrapper>;
    } else {
      return icon;
    }
  }

  if (type === "blank") {
    return null;
  }

  return (
    <IndicatorWrapper>
      {type !== "loading" && (
        <StatusWrapper>
          {type === "error" ? (
            <i
              className="fa-solid fa-circle-exclamation"
              style={{
                color: customIconColor
                  ? customIconColor
                  : theme === "coloured"
                  ? "#fff"
                  : "rgb(211, 47, 47)",
              }}
            ></i>
          ) : type === "info" ? (
            <i
              className="fa-solid fa-circle-info"
              style={{
                color: customIconColor
                  ? customIconColor
                  : theme === "coloured"
                  ? "#fff"
                  : "rgb(2, 136, 209)",
              }}
            ></i>
          ) : type === "warning" ? (
            <i
              className="fa-solid fa-triangle-exclamation"
              style={{
                color: customIconColor
                  ? customIconColor
                  : theme === "coloured"
                  ? "#262626"
                  : "rgb(245, 124, 0)",
              }}
            ></i>
          ) : (
            <i
              className="fa-solid fa-circle-check"
              style={{
                color: customIconColor
                  ? customIconColor
                  : theme === "coloured"
                  ? "#fff"
                  : "rgb(56, 142, 60)",
              }}
            ></i>
          )}
        </StatusWrapper>
      )}
    </IndicatorWrapper>
  );
};
