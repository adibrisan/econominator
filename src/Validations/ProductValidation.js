import { locale } from "expo-localization";
import * as yup from "yup";

export const addProductValidationSchema = yup.object().shape({
  productName: yup
    .string()
    .required(
      locale == "ro-RO"
        ? "Introduceți numele produsului!"
        : "Type the product name !"
    ),
  price: yup
    .string()
    .matches(
      /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
      locale == "ro-RO"
        ? "Numai numerele sunt permise!"
        : "Only numbers allowed !"
    )
    .required(
      locale == "ro-RO"
        ? "Completați câmpul cu un preț!"
        : "Fill the price field !"
    ),
  amount: yup
    .string()
    .matches(
      /^[0-9]+$/,
      locale == "ro-RO"
        ? "Numai numerele sunt permise!"
        : "Only numbers allowed !"
    )
    .required(
      locale == "ro-RO"
        ? "Completați câmpul cu o cantitate !"
        : "Fill the amount field !"
    ),
});
