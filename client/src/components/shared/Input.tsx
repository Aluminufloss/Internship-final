import React from "react";
import styled, { css } from "styled-components";

import { STATIC_PATHS } from "@/utils/constant/constant";

type InputProps = {
  size: "small" | "medium" | "large";
  inputType: "email" | "password" | "text";
  iconName?: string;
  className?: string;
  id?: string;
  placeholder?: string;
  icon?: string;
  name?: string;
  value?: string;
  onChange?: (newValue: string) => void;
};

const SIZE = {
  small: css`
    height: 47px;
  `,
  medium: css`
    height: 64px;
  `,

  large: css`
    height: 64px;
  `,
};

const Input: React.FC<InputProps> = (props) => {
  const icon = `${STATIC_PATHS.icons}/${props.iconName}.svg`;

  return (
    <StyledInput
      iconName={props.iconName}
      size={props.size ?? "medium"}
      inputType={props.inputType ?? "text"}
      placeholder={props.placeholder}
      className={props.className}
      id={props.id}
      icon={icon}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

const StyledInput = styled.input<InputProps>`
  ${(props) => props.size && SIZE[props.size]}

  background-color: ${(props) => props.theme.colors.light};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-size: ${(props) => props.theme.fontSizes.smallBig};
  color: ${(props) => props.theme.colors.dark};
  width: 100%;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 64px;
  padding-right: 24px;
  background-image: url(${props => props.icon});
  background-repeat: no-repeat;
  background-position: 24px center;

  &::placeholder {
    color: ${(props) => props.theme.colors.darkGrey};
  }
`;

export default Input;
