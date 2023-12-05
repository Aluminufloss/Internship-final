import React from "react";
import styled, { css } from "styled-components";

type InputProps = {
  size: "small" | "medium" | "large";
  inputType: "email" | "password" | "text";
  label: string;
  className?: string;
  id?: string;
};

const SIZE = {
  small: css`
    width: 290px;
    height: 56px;
  `,
  medium: css`
    width: 528px;
    height: 64px;
  `,

  large: css`
    width: 522px;
    height: 64px;
  `,
};

const UserInput: React.FC<InputProps> = (props) => {
  const userName = "Guy Hawkins";

  return (
    <div className="input__container">
      <span className="input__label">{props.label}</span>
      <StyledInput
       size={props.size ?? "medium"}
       inputType={props.inputType ?? "text"}
       className={props.className}
       id={props.id}
       value={userName}
       label={props.label}
      />
    </div>
  );
};

const StyledInput = styled.input<InputProps>`
  ${(props) => props.size && SIZE[props.size]}

  background-color: ${(props) => props.theme.colors.light};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-size: ${(props) => props.theme.fontSizes.smallBig};
  color: ${(props) => props.theme.colors.dark};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 64px;
  padding-right: 24px;
  background-image: url("icons/Mail.svg");
  background-repeat: no-repeat;
  background-position: 24px center;

  &::placeholder {
    color: ${(props) => props.theme.colors.darkGrey};
  }

  .input__container {
    position: relative;
  }

  .input__label {
    display: inline-block;
    position: absolute;
    top: 2px;
    left: 64px;
  }
`;

export default UserInput;
