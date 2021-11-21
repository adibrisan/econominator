import * as yup from "yup";

export const registerValidationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .matches(/^.{8,}$/, "Password is too short ! (min. 8 characters)")
    .matches(/(?=.*[A-Z])/, "Password must have one upper case character !"),
  confirmPassword: yup
    .string()
    .equals([yup.ref("password"), null], "Password does not match !"),
});
