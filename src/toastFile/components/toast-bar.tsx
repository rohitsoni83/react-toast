import React, { useRef, useEffect, useState } from "react";
import { styled, keyframes } from "goober";

import { Toast, ToastPosition, resolveValue, Renderable } from "../core/types";
import { ToastIcon } from "./toast-icon";
import { getBackgroundColor, prefersReducedMotion } from "../core/utils";
import "./toastBar.scss";

const enterAnimation = (factor: number) => `
0% {transform: translate3d(0,${factor * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`;

const exitAnimation = (factor: number) => `
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${factor * -150}%,-1px) scale(.6); opacity:0;}
`;

const fadeInAnimation = `0%{opacity:0;} 100%{opacity:1;}`;
const fadeOutAnimation = `0%{opacity:1;} 100%{opacity:0;}`;

interface ToastBarProps {
  toast: Toast;
  position?: ToastPosition;
  style?: React.CSSProperties;
  children?: (components: {
    icon: Renderable;
    message: Renderable;
  }) => Renderable;
}

const getAnimationStyle = (
  position: ToastPosition,
  visible: boolean
): React.CSSProperties => {
  const top = position.includes("top");
  const factor = top ? 1 : -1;

  const [enter, exit] = prefersReducedMotion()
    ? [fadeInAnimation, fadeOutAnimation]
    : [enterAnimation(factor), exitAnimation(factor)];

  return {
    animation: visible
      ? `${keyframes(enter)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`
      : `${keyframes(exit)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`,
  };
};

export const ToastBar: React.FC<ToastBarProps> = React.memo(
  ({ toast, position, style, children }) => {
    const animationStyle: React.CSSProperties = toast.height
      ? getAnimationStyle(
          toast.position || position || "top-center",
          toast.visible
        )
      : { opacity: 0 };

    const icon = <ToastIcon toast={toast} />;
    const message = (
      <div className="message-container" {...toast.ariaProps}>
        {resolveValue(toast.message, toast)}
      </div>
    );

    // progressBar
    const progressBarRef = useRef<ReturnType<typeof setInterval>>();
    const [progress, setProgress] = useState(100);

    useEffect(() => {
      const complete = 0;
      if (toast.duration) {
        progressBarRef.current = setInterval(() => {
          if (progress > complete) {
            setProgress((prev) => prev - 1);
          } else {
            return;
          }
        }, toast.duration / 100);
      }

      return () => {
        clearInterval(progressBarRef.current);
      };
    }, []);

    return (
      <div
        className={toast.className ? toast.className : "toast-bar-container"}
        style={{
          ...animationStyle,
          ...style,
          ...toast.style,
        }}
      >
        {typeof children === "function" ? (
          children({
            icon,
            message,
          })
        ) : (
          <>
            {icon}
            {message}
            {/* render progressbar */}
            {toast.progressbar && toast.duration && (
              <div className="progress-bar">
                <span
                  style={{
                    width: `${progress}%`,
                    backgroundColor:
                      toast.theme === "coloured"
                        ? "#fff"
                        : getBackgroundColor(toast.type),
                    borderRadius: toast.style?.borderRadius || "8px",
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);
