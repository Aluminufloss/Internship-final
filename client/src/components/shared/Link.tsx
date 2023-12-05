import React from "react";
import Link from "next/link";
import styled from "styled-components";

type LinkProps = {
  href: string;
  children?: React.ReactNode;
  color?: "dark" | "white" | "darkBlue" | "darkGrey";
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

const LinkTo: React.FC<LinkProps> = (props) => {
  return (
    <StyledLink
      href={props.href}
      color={props.color ?? "white"}
      fontSize={props.fontSize ?? "medium"}
      fontWeight={props.fontWeight ?? "medium"}
      className={props.className}
    >
      {props.children}
    </StyledLink>
  );
};

const StyledLink = styled(Link)<LinkProps>`
  font-size: ${(props) => props.fontSize || `${props.theme.fontSizes.medium}`};
  font-weight: ${(props) =>
    props.fontWeight || `${props.theme.fontWeights.normal}`};
  color: ${(props) => props.color || `${props.theme.colors.dark}`};
`;

export default LinkTo;
