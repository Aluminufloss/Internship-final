import { STATIC_PATHS } from "@/utils/constant/constant";
import React, { useState } from "react";
import styled from "styled-components";
import css from "styled-jsx/css";

type InputProps = {
  size: "small" | "medium" | "large";
  inputType: "email" | "password" | "text";
  iconName?: string;
  color?: string;
  className?: string;
  id?: string;
  placeholder?: string;
  icon?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  onChange: (el: string) => void;
  setIsValidated?: React.Dispatch<React.SetStateAction<boolean>>
};

const Input: React.FC<InputProps> = (props) => {
  const icon = `${STATIC_PATHS.icons}/${props.iconName}.svg`;
  const [active, setActive] = useState(false);

  function handleOnchange(ev: React.ChangeEvent<HTMLInputElement>) {
    if (ev.target.value !== "") {
      setActive(true);
      props.onChange(ev.target.value);
    } else {
      setActive(false);
      props.onChange(ev.target.value);
    }
  }

  function hanldeEraseButtonClick() {
    setActive(false);
  }

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
      disabled={props.disabled ?? false}
      onChange={props.onChange}
      color={props.color}
    >
      <input
        className={active ? "input active--input" : "input"}
        type={props.inputType ?? "text"}
        onChange={(ev) => handleOnchange(ev)}
        value={active ? props.value : ""}
        disabled={props.disabled}
        name={props.name}
        id={props.id}
      />
      <span className={active ? "placeholder active" : "placeholder"}>
        {props.placeholder}
      </span>
      {active && (
        <span className="btn--erase" onClick={hanldeEraseButtonClick} />
      )}
    </StyledInput>
  );
};

const StyledInput = styled.div<InputProps>`
  position: relative;
  z-index: 2;
  background-color: ${(props) => props.theme.colors.light};
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-size: ${(props) => props.theme.fontSizes.smallBig};
  color: ${(props) => props.theme.colors.darkBlue};
  width: 100%;
  height: 47px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 64px;
  padding-right: 48px;
  background-image: url(${(props) => props.icon});
  background-repeat: no-repeat;
  background-position: 24px center;
  transition: all 0.3s ease;

  .input {
    background-color: transparent;
    width: 100%;
    height: 50%;
    z-index: 2;
    margin-bottom: 0;
    color: ${(props) => props.theme.colors.darkBlue};
    font-size: ${(props) => props.theme.fontSizes.medium};
    font-weight: ${(props) => props.theme.fontWeights.normal};
    transition: all 0.3s ease;

    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus {
      border: none;
      -webkit-text-fill-color: ${(props) => props.theme.colors.darkBlue};
      -webkit-box-shadow: 0 0 0px 1000px ${(props) => props.theme.colors.light} inset;
    } 
  }

  .btn--erase {
    display: inline-block;
    position: absolute;
    top: 50%;
    right: 24px;
    width: 12px;
    height: 12px;
    z-index: 2;
    transform: translateY(-50%);
    background-image: url("/images/icons/Close.svg");
    background-repeat: no-repeat;
    background-position: center center;
  }

  .placeholder {
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 64px;
    z-index: 1;
    color: ${(props) => props.color || props.theme.colors.darkGrey};
    font-size: ${(props) => props.theme.fontSizes.normal};
    font-weight: ${(props) => props.theme.fontWeights.normal};
    transition: all 0.3s ease;
  }

  .active {
    top: 25%;
    color: ${(props) => props.theme.colors.darkBlue};
    font-size: ${(props) => props.theme.fontSizes.smallBig};
    font-weight: ${(props) => props.theme.fontWeights.medium};
  }

  .active--input {
    margin-top: 18px;
  }
`;

export default Input;
