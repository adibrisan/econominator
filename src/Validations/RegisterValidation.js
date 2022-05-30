import { locale } from "expo-localization";
import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required(
      locale == "ro-RO"
        ? "Numele de utilizator este necesar"
        : "Username is required"
    ),
  email: yup
    .string()
    .email(locale == "ro-RO" ? "Email Invalid" : "Invalid email")
    .matches(
      /\w*com\b/,
      locale == "ro-RO"
        ? "Emailul are nevoie de .com la sfârșit"
        : "Email needs .com at the end"
    )
    .required(
      locale == "ro-RO" ? "Emailul este obligatoriu" : "Email is required"
    ),
  password: yup
    .string()
    .matches(
      /^.{8,}$/,
      locale == "ro-RO"
        ? "Parola este prea scurtă ! (min. 8 caractere)"
        : "Password is too short ! (min. 8 characters)"
    )
    .matches(
      /(?=.*[A-Z])/,
      locale == "ro-RO"
        ? "Parola trebuie să aibă un caracter mare!"
        : "Password must have one upper case character !"
    )
    .required(locale == "ro-RO" ? "Este necesară parola" : "Password required"),
  confirmPassword: yup
    .string()
    .equals(
      [yup.ref("password"), null],
      locale == "ro-RO"
        ? "Parola nu se potrivește !"
        : "Password does not match !"
    )
    .required(
      locale == "ro-RO"
        ? "Este necesară confirmarea parolei"
        : "Confirm password is required"
    ),
});

export const validEmail = (email) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
