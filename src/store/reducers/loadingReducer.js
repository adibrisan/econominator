import { RECEIVING, RECEIVED, NO_DATA } from "../actions/types";

const initialState = {
  notification: "",
};

export default (state = initialState, { type }) => {
  switch (type) {
    case NO_DATA:
      return {
        ...state,
        notification: "NO_DATA",
      };
    case RECEIVING:
      return {
        ...state,
        notification: "RECEIVING",
      };
    case RECEIVED:
      return {
        ...state,
        notification: "RECEIVED",
      };
    default:
      return state;
  }
};
