import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { RegistrationValidationSchema } from "@/schema/validation";

import { Formik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

import Text from "../shared/Text";
import Input from "../shared/Input";
import Label from "../shared/label";
import Button from "../shared/Button";

import { useAuth } from "@/Contexts/User/UserContext";


type FormProps = {};

const RegistrationForm: React.FC<FormProps> = (props) => {
  const [isValidated, setIsValidated] = useState(false);

  const { registration } = useAuth();
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={RegistrationValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          registration(values.email, values.password, values.username);
          setSubmitting(false);
          router.push("/catalog");
        } catch (err) {
          console.log("error registration");
        }
      }}
    >
      {(formik) => (
        <StyledRegistrationForm onSubmit={formik.handleSubmit}>
          <Text fontSize="medium" fontWeight="bold" className="text">
            Sing Up
          </Text>

          <Input
            size="small"
            inputType="email"
            placeholder="Email"
            id="email"
            iconName="Mail"
            className={
              !isValidated || formik.values.email === ""
                ? "input__mail"
                : formik.errors.email
                ? "input__mail validation__input--error"
                : "input__mail validation__input--success"
            }
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          <Label htmlFor="email" className="label">
            {!isValidated || formik.values.email === "" ? (
              <span className="validation__empthy">Enter your email</span>
            ) : formik.errors.email ? (
                  <span className="validation__error">{formik.errors.email}</span>
                ) : (
                  <span className="validation__success">Email is correct</span>
                )}
          </Label>

          <Input
            size="small"
            inputType="text"
            placeholder="Username"
            id="username"
            iconName="UserProfile"
            value={formik.values.username}
            onChange={formik.handleChange}
            className={
              !isValidated
                ? "input__username"
                : formik.errors.username
                ? "input__username validation__input--error"
                : "input__username validation__input--success"
            }
          />
          <Label htmlFor="username" className="label">
            {!isValidated || formik.values.username === "" ? (
              <span className="validation__empthy">Enter your username</span>
            ) : formik.errors.username ? (
                  <span className="validation__error">{formik.errors.username}</span>
                ) : (
                  <span className="validation__success">Username is correct</span>
                )}
          </Label>

          <Input
            size="small"
            inputType="password"
            placeholder="Password"
            id="password"
            iconName="Hide"
            value={formik.values.password}
            onChange={formik.handleChange}
            className={
              !isValidated
                ? "input__password"
                : formik.errors.password
                ? "input__password validation__input--error"
                : "input__password validation__input--success"
            }
          />
          <Label htmlFor="password" className="label">
            {!isValidated || formik.values.password === "" ? (
              <span className="validation__empthy">Enter your password</span>
            ) : formik.errors.password ? (
                  <span className="validation__error">{formik.errors.password}</span>
                ) : (
                  <span className="validation__success">Password is correct</span>
                )}
          </Label>

          <Input
            size="small"
            inputType="password"
            placeholder="Password replay"
            id="passwordConfirm"
            iconName="Hide"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            className={
              !isValidated
                ? "input__password"
                : formik.errors.password
                ? "input__password validation__input--error"
                : "input__password validation__input--success"
            }
          />
          <Label htmlFor="passwordConfirm" className="label">
            {!isValidated || formik.values.passwordConfirm === "" ? (
              <span className="validation__empthy">Repeat your password without errors</span>
            ) : formik.errors.passwordConfirm ? (
                  <span className="validation__error">{formik.errors.passwordConfirm}</span>
                ) : (
                  <span className="validation__success">Passwords aren't match</span>
                )}
          </Label>

          <Button
            type="primary"
            width="151"
            height="44"
            onClick={(ev) => setIsValidated(true)}
          >
            Sing Up
          </Button>
        </StyledRegistrationForm>
      )}
    </Formik>
  );
};

const StyledRegistrationForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 15px 60px;
  width: 100%;

  .text {
    margin-bottom: 30px;
  }

  & input {
    margin-bottom: 6px;
  }

  & label {
    margin-bottom: 20px;
  }

  & label:last-of-type {
    margin-bottom: 40px;
  }

  .validation {
    &__error {
      color: ${(props) => props.theme.colors.error};
      font-size: ${(props) => props.theme.fontSizes.smallBig};
      font-weight: ${(props) => props.theme.fontWeights.normal};
    }

    &__success {
      color: ${(props) => props.theme.colors.success};
      font-size: ${(props) => props.theme.fontSizes.smallBig};
      font-weight: ${(props) => props.theme.fontWeights.normal};
    }

    &__input--success {
      border: 2px solid ${(props) => props.theme.colors.success};
      background-color: ${(props) => props.theme.colors.successLight};

      & span {
        color: ${(props) => props.theme.colors.success};
      }

      & span.btn--erase {
        background-image: url("/images/icons/Close-success.svg");
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover, 
      &:-webkit-autofill:focus {
        border: none;
        -webkit-text-fill-color: ${(props) => props.theme.colors.darkBlue};
        -webkit-box-shadow: 0 0 0px 1000px ${(props) => props.theme.colors.successLight} inset;
      } 
    }

    &__input--error {
      border: 2px solid ${(props) => props.theme.colors.error};
      background-color: ${(props) => props.theme.colors.errorLight};

      & span {
        color: ${(props) => props.theme.colors.error};
      }

      & span.btn--erase {
        background-image: url("/images/icons/Close-error.svg");
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover, 
      &:-webkit-autofill:focus {
        border: none;
        -webkit-text-fill-color: ${(props) => props.theme.colors.darkBlue};
        -webkit-box-shadow: 0 0 0px 1000px ${(props) => props.theme.colors.errorLight} inset;
      } 
    }
  }
`;

export default RegistrationForm;
