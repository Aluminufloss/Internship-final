import React from "react";
import styled from "styled-components";

import { RegistrationValidationSchema } from "@/schema/validation";

import { Formik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

import Text from "../shared/Text";
import Input from "../shared/Input";
import Label from "../shared/label";
import Button from "../shared/Button";
import { useAuth } from "@/Contexts/UserContext";

type FormProps = {};

const RegistrationForm: React.FC<FormProps> = (props) => {
  const { registration } = useAuth();

  return (
    <Formik
      initialValues={{ email: "", username: "", password: "", passwordConfirm: "" }}
      validationSchema={RegistrationValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          registration(values.email, values.password, values.username);
          setSubmitting(false);
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
            className="input__mail"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <Label htmlFor="email" className="label">
            Enter your email
          </Label>

          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}

          <Input
            size="small"
            inputType="text"
            placeholder="Username"
            id="username"
            iconName="UserProfile"
            className="input__username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <Label htmlFor="email" className="label">
            Enter your username
          </Label>

          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}

          <Input
            size="small"
            inputType="password"
            placeholder="Password"
            id="password"
            iconName="Hide"
            className="input__password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Label htmlFor="password" className="label">
            Enter your password
          </Label>

          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}

          <Input
            size="small"
            inputType="password"
            placeholder="Password replay"
            id="passwordConfirm"
            iconName="Hide"
            className="input__password"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
          />
          <Label htmlFor="password" className="label">
            Repeat your password without errors
          </Label>

          {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
            <div>{formik.errors.passwordConfirm}</div>
          ) : null}

          <Button type="primary" width="151" height="44">
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
`;

export default RegistrationForm;
