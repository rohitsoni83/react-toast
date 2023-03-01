import { styled, keyframes } from "goober";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export interface LoaderTheme {
  primary?: string;
  secondary?: string;
}

export const LoaderIcon = styled("div")<LoaderTheme>`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-color: ${(p) => p.secondary || "#e0e0e0"};
`;
