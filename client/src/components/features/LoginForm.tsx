import React from "react";
import styled from "styled-components";
import { Formik } from "formik";

import { useAuth } from "@/Contexts/UserContext";

import Text from "../shared/Text";
import Input from "../shared/Input";
import Label from "../shared/label";
import Button from "../shared/Button";

type FormProps = {};

const LoginForm: React.FC<FormProps> = (props) => {
  const { login } = useAuth();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          login(values.email, values.password);
          setSubmitting(false);
        } catch (err) {
          console.log("error login");
        }
      }}
    >
      {(formik) => (
        <StyledLoginForm onSubmit={formik.handleSubmit}>
          <Text fontSize="medium" fontWeight="bold" className="text">
            Log In
          </Text>
          <Input
            size="small"
            inputType="email"
            placeholder="Email"
            id="email"
            className="input__mail"
            iconName="Mail"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <Label htmlFor="email" className="label">
            Enter your email
          </Label>

          <Input
            size="small"
            inputType="password"
            placeholder="Password"
            id="password"
            className="input__password"
            iconName="Hide"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Label htmlFor="password" className="label">
            Enter your password
          </Label>
          <Button type="primary" width="151" height="44">
            Log In
          </Button>
        </StyledLoginForm>
      )}
    </Formik>
  );
};

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 15px 60px;
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
`;

export default LoginForm;
