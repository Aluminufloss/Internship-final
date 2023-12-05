import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Text from "../shared/Text";
import Input from "../shared/Input";
import Label from "../shared/label";
import Button from "../shared/Button";
import { useInitialized } from "@/hooks/useInitialized";
import { Auth } from "@/Contexts/UserContext";

type FormProps = {};

const UserForm: React.FC<FormProps> = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isInitialized, setInitialized] = useState(false);
  const { state, getMe } = Auth();

  useEffect(() => {
    if (getMe === undefined) {
      console.log('getMe undefined')
      setInitialized(false);
    } else {
      getMe();
      setInitialized(true);
    }
  }, [])

  function handlePasswordClick(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <>
    {isInitialized ? <StyledUserForm>
      <Text
        fontSize="medium"
        fontWeight="medium"
        className="text"
      >
        Personal Information
      </Text>
      <button className="btn__change-info">Change information</button>

      <Label htmlFor="password" className="label">
        Your name
      </Label>
      <Input
        size="small"
        inputType="text"
        placeholder="Guy Hawkins"
        id="username"
        className="input__username"
        iconName="UserProfile"
      />

      <Label htmlFor="email" className="label">
        Your email
      </Label>
      <Input
        size="small"
        inputType="email"
        placeholder="kenzi.lawson@example.com"
        id="email"
        className="input__email"
        iconName="Mail"
      />

      <div className="container">
        <Text fontSize="medium" fontWeight="medium" className="text__password">
          Password
        </Text>
        <button className="btn__change-password" onClick={(ev) => handlePasswordClick(ev)}>Change password</button>
      </div>

      {isPasswordVisible && (
        <>
          <Label htmlFor="old-password" className="label">
            New password
          </Label>
          <Input
            size="small"
            inputType="password"
            placeholder="New password"
            id="new-password"
            className="input__password"
            iconName="Hide"
          />

          <Label htmlFor="new-password-reply" className="label">
            Enter your password again
          </Label>
          <Input
            size="small"
            inputType="password"
            placeholder="Password replay"
            id="new-password-reply"
            className="input__password"
            iconName="Hide"
          />
          <Text
            fontSize="medium"
            fontWeight="medium"
            className="text"
            style={{ marginBottom: "40px" }}
          >
            Repeat your password without errors
          </Text>
        </>
      )}

      <Button type="primary" width="151" height="44">
        Confirm
      </Button>
    </StyledUserForm> : "Loading..."}
    </>
  );
};

const StyledUserForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 15px 60px;

  .btn__change-info,
  .btn__change-password {
    text-decoration: underline;
    color: ${(props) => props.theme.colors.darkGreen};
    font-size: ${(props) => props.theme.fontSizes.small};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    background-color: ${(props) => props.theme.colors.white};
    cursor: pointer;
  }

  .btn__change-info {
    align-self: flex-start;
    margin-bottom: 10px;
  }

  & input {
    margin-bottom: 10px;
  }

  & label {
    margin-bottom: 6px;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .text {
    margin-top: 10px;
  }
`;

export default UserForm;
