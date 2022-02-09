import { ADD_PRODUCT, DELETE_PRODUCT } from "../actions/types";

const initialState = {
  products: [
    { addedTime: 1576590342000, id: 2, title: "Amala Soup", price: -40 },
    { addedTime: 1576590342000, id: 3, title: "Paypal Income", price: 400 },
    { addedTime: 1274174256000, id: 4, title: "Bank Credit", price: 2000 },
    { addedTime: 1274174256000, id: 5, title: "Bought Garri", price: -60 },
    { addedTime: 1274174256000, id: 6, title: "Transport fare", price: -10 },
    { addedTime: 779879856000, id: 7, title: "Ewedu Soup", price: -20 },
    { addedTime: 779879856000, id: 9, title: "Funded my wallet", price: -200 },
    { addedTime: 779879856000, id: 10, title: "Salary", price: 2000 },
    { addedTime: 1613682000000, id: 11, title: "Give out", price: -10 },
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [payload, ...state.products],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(({ id }) => id !== payload),
      };
    default:
      return state;
  }
};
