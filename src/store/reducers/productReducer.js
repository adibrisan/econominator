import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  RETRIEVE_PRODUCTS,
  RESET_LIST,
  RETRIEVE_CURRENT,
} from "../actions/types";

const initialState = {
  products: [],
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
        products: state.products.filter(({ index }) => index !== payload),
      };
    case RETRIEVE_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case RESET_LIST:
      return {
        ...state,
        products: payload,
      };
    case RETRIEVE_CURRENT:
      return {
        ...state,
        products: payload,
      };
    default:
      return state;
  }
};
