import React, { useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";

import Text from "../shared/Text";
import Input from "../shared/Input";
import Label from "../shared/label";
import Button from "../shared/Button";

import { IUser } from "@/models/response/Auth/IUser";

import { useAuth } from "@/Contexts/User/UserContext";

type FormProps = {
  user: IUser;
  avatar?: File;
};

const UserForm: React.FC<FormProps> = (props) => {
  const { changeInformation, userState } = useAuth();
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [initialUsername, setInitialUsername] = useState(props.user.username);
  const [initialEmail, setInitialEmail] = useState(props.user.email);

  const [isValidated, setIsValidated] = useState(false);

  function handlePasswordClick(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    ev.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  }

  function handleChangeInfoClick(
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    ev.preventDefault();
    setDisabled(!disabled);
  }

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      // validationSchema={RegistrationValidationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);

          if (
            values.username === initialUsername &&
            values.email === initialEmail &&
            values.password === ""
          ) {
            console.log("sukaddd")
            return;
          }

          await changeInformation(userState.user, values.username, values.email, values.password);

          console.log("Yes");

          // const im = encodeImageFileAsURL(props.avatar!);
          // console.log("Yep", im)

          setSubmitting(false);
        } catch (err) {
          console.log("error change information", err);
        }
      }}
    >
      {(formik) => (
        <StyledUserForm>
          <Text fontSize="medium" fontWeight="medium" className="text">
            Personal Information
          </Text>
          <button className="btn__change-info" onClick={handleChangeInfoClick}>
            Change information
          </button>

          <Label htmlFor="username" className="label">
            Your name
          </Label>
          <Input
            iconName="UserProfile"
            size="small"
            inputType="text"
            id="username"
            className="input__username"
            disabled={disabled}
            placeholder={initialUsername}
            color="dark"
            value={formik.values.username}
            onChange={formik.handleChange}
          />

          <Label htmlFor="email" className="label">
            Your email
          </Label>
          <Input
            size="small"
            inputType="email"
            placeholder={initialEmail}
            id="email"
            className="input__email"
            iconName="Mail"
            color="dark"
            value={formik.values.email}
            onChange={formik.handleChange}
            disabled={disabled}
          />

          <div className="container">
            <Text
              fontSize="medium"
              fontWeight="medium"
              className="text__password"
            >
              Password
            </Text>
            <button
              className="btn__change-password"
              onClick={(ev) => handlePasswordClick(ev)}
            >
              Change password
            </button>
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
                color="dark"
                className="input__password"
                onChange={formik.handleChange}
                iconName="Hide"
              />

              <Label htmlFor="new-password-reply" className="label">
                Enter your password again
              </Label>
              <Input
                size="small"
                inputType="password"
                placeholder="Password replay"
                color="dark"
                id="new-password-reply"
                className="input__password"
                onChange={formik.handleChange}
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
        </StyledUserForm>
      )}
    </Formik>
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

  input::placeholder {
    color: ${(props) => props.theme.colors.dark};
  }
`;

export default UserForm;
