import React from "react";
import styled from "styled-components";

type TextProps = {
  children?: React.ReactNode;
  color?: "dark" | "white" | "darkBlue" | "darkGrey";
  lineHeight?: string;
  fontSize?:
    | "small"
    | "smallBig"
    | "medium"
    | "mediumBig"
    | "mediumLarge"
    | "big"
    | "large";
  fontWeight?:
    | "light"
    | "normal"
    | "medium"
    | "semiBold"
    | "bold"
    | "extraBold";
  className?: string;
};

const Text = styled.p<TextProps>`
  font-size: ${(props) => props.fontSize || `${props.theme.fontSizes.medium}`};
  font-weight: ${(props) =>
    props.fontWeight || `${props.theme.fontWeights.normal}`};
  color: ${(props) => props.color || `${props.theme.colors.dark}`};
  line-height: ${(props) => props.lineHeight};
`;

export default Text;
