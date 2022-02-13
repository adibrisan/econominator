import { ADD_PRODUCT, DELETE_PRODUCT } from "../actions/types";

const initialState = {
  products: [
    { addedTime: 1576590342000, id: 2, title: "Macare restaurant", price: -40 },
    { addedTime: 1576590342000, id: 3, title: "Cadou", price: 400 },
    { addedTime: 1274174256000, id: 4, title: "Credit bancar", price: 2000 },
    { addedTime: 1274174256000, id: 5, title: "Apa", price: -60 },
    { addedTime: 1274174256000, id: 6, title: "Motorina", price: -10 },
    { addedTime: 779879856000, id: 7, title: "Supa la plic", price: -20 },
    { addedTime: 779879856000, id: 9, title: "Asigurare masina", price: -200 },
    { addedTime: 779879856000, id: 10, title: "Salar", price: 6000 },
    { addedTime: 1613682000000, id: 11, title: "Sarmale", price: -10 },
    { addedTime: 1613682000000, id: 12, title: "Fidea", price: -10 },
    { addedTime: 1613682000000, id: 13, title: "Paine", price: -10 },
    { addedTime: 1613682000000, id: 14, title: "Cascaval", price: -10 },
    { addedTime: 1613682000000, id: 15, title: "Lapte", price: -10 },
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
