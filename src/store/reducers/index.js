import { combineReducers } from "redux";

import productReducer from "./productReducer";
import loadingReducer from "./loadingReducer";

export default combineReducers({
  trs: productReducer,
  ui: loadingReducer,
});
