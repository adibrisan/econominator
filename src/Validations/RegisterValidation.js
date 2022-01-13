import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email")
    .matches(/\w*com\b/, "Email needs .com at the end")
    .required("Email is required"),
  password: yup
    .string()
    .matches(/^.{8,}$/, "Password is too short ! (min. 8 characters)")
    .matches(/(?=.*[A-Z])/, "Password must have one upper case character !")
    .required("Password required"),
  confirmPassword: yup
    .string()
    .equals([yup.ref("password"), null], "Password does not match !")
    .required("Confirm password is required"),
});
