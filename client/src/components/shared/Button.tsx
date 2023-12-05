import React from "react";
import styled, { css } from "styled-components";

type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  fontSize?:
    | "small"
    | "smallBig"
    | "medium"
    | "mediumBig"
    | "mediumLarge"
    | "big"
    | "large";
  width: string;
  height: string;
  type: "primary" | "secondary";
};

const TYPE = {
  primary: css`
    color: ${(props) => `${props.theme.colors.white}`};
    background-color: ${(props) => `${props.theme.colors.darkBlue}`};

    &:hover {
      color: ${(props) => `${props.theme.colors.white}`};
      background-color: ${(props) => `${props.theme.colors.dark}`};
    }

    &:focus {
      color: ${(props) => `${props.theme.colors.white}`};
      background-color: ${(props) => `${props.theme.colors.darkBlue}`};
      border: 8px solid ${(props) => `${props.theme.colors.lightGrey}`};
    }

    &:disabled {
      background-color: ${(props) => `${props.theme.colors.darkGrey}`};
    }
  `,
  secondary: css`
    color: ${(props) => `${props.theme.colors.dark}`};
    background-color: ${(props) => `${props.theme.colors.white}`};
    border: 1px solid ${(props) => `${props.theme.colors.dark}`};

    &:hover {
      border: 3px solid ${(props) => `${props.theme.colors.dark}`};
    }

    &:disabled {
      color: ${(props) => `${props.theme.colors.darkGrey}`};
      border: 1px solid ${(props) => `${props.theme.colors.darkGrey}`};
    }
  `,
};

const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  transition: all 0.3s ease-out;

  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};

  font-size: ${(props) => props.fontSize || `${props.theme.fontSizes.medium}`};
  font-weight: ${(props) => props.theme.fontWeights.medium};

  ${(props) => props.type && TYPE[props.type]}
`;

export default Button;
