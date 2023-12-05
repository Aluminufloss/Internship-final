import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const RegistrationValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  username: Yup.string()
    .required("Required")
    .max(40, "Password is too big - should be less than 40 chars."),
  password: Yup.string()
    .required()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(40, "Password is too big - should be less than 40 chars.")
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  passwordConfirm: Yup.string()
  .required("Required")
  .oneOf(
    [Yup.ref("password"), "null"],
    "Passwords must match"
  ),
});
