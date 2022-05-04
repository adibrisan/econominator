import * as yup from "yup";

export const addProductValidationSchema = yup.object().shape({
  productName: yup.string().required("Type the product name !"),
  price: yup
    .string()
    .matches(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/, "Only numbers allowed !")
    .required("Fill the price field !"),
  amount: yup
    .string()
    .matches(/^[0-9]+$/, "Only numbers allowed !")
    .required("Fill the amount field !"),
});
