import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    dark: "#0D1821",
    darkBlue: "#344966",
    lightGrey: "#d6d8e7",
    darkGrey: "#B9BAC3",
    white: "#FFFFFF",
    light: "#F0F4EF",
    green: "#BFCC94",
    darkGreen: "#8d9f4f",
    error: "#ED2E7E",
    errorLight: "#FFF2F7",
    success: "#00BA88",
    successLight: "#F3FDFA"
  },

  fontSizes: {
    small: "12px",
    smallBig: "14px",
    medium: "16px",
    mediumBig: "18px",
    mediumLarge: "20px",
    big: "20px",
    large: "40px",
  },

  fontWeights: {
    thin: "100",
    extraLight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
    extraBold: "800",
  },
};

type ThemeProps = {
  children?: ReactNode;
};

const Theme: React.FC<ThemeProps> = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default Theme;
