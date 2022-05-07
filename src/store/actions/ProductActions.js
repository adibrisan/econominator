import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  RETRIEVE_PRODUCTS,
  RESET_LIST,
  RECEIVING,
  RECEIVED,
  NO_DATA,
} from "./types";

import { auth, db } from "../../../firebase";
import {
  ref,
  remove,
  get,
  query,
  startAt,
  endAt,
  orderByChild,
} from "firebase/database";
import { onAuthStateChanged } from "@firebase/auth";

import { DATABASE_URL } from "@env";

export const addProduct =
  ({ productName, price, amount, dropdownValue, date }) =>
  (dispatch) => {
    const newTransaction = {
      // cartId,
      productName,
      price: +price,
      amount,
      dropdownValue,
      date,
    };
    dispatch({ type: ADD_PRODUCT, payload: newTransaction });
    dispatch({ type: RECEIVING, payload: "RECEIVING" });
  };

export const deleteProduct = (id, cartId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT, payload: id });

    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        remove(ref(db, `usersList/${user.uid}/personalCart/${cartId}`));
      }
    });
  };
};

export const resetList = () => (dispatch) => {
  dispatch({ type: RESET_LIST, payload: [] });
};

export const retrieveCurrentMonthData = (date) => (dispatch) => {
  const que = query(
    ref(db, "personalCart"),
    orderByChild("date"),
    startAt(`${date.split(".", 1)[0]}.1.${date.split(".", 3)[2]}`),
    endAt(
      `${(Number(date.split(".", 1)[0]) + 1).toString()}.1.${
        date.split(".", 3)[2]
      }`
    )
  );
  let prods = [];
  get(que).then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      studs.push(childSnapshot.val());
      console.log(childSnapshot.val());
    });
  });
  return prods;
};

export const retrieveProducts = () => {
  return async (dispatch) => {
    const fetchUserList = async () => {
      const uid = auth.currentUser.uid;
      const response = await fetch(
        `${DATABASE_URL}/usersList/${uid}/personalCart.json`
      );

      if (!response.ok) {
        throw new Error("Could not fetch data !");
      }

      const data = await response.json();
      return data;
    };
    try {
      let productsArray = [];

      dispatch({ type: RECEIVING, payload: "RECEIVING" });

      const productsList = Object.values(await fetchUserList());
      productsList.forEach((product, index) => {
        const transaction = {
          id: product.cartId,
          index: index + 1,
          productName: product.productName,
          price: product.price,
          amount: product.amount,
          addedTime: product.date,
          category: product.dropdownValue,
        };
        productsArray.push(transaction);
      });
      dispatch({ type: RETRIEVE_PRODUCTS, payload: productsArray });
      dispatch({ type: RECEIVED, payload: "RECEIVED" });
    } catch (error) {
      console.log("Could not fetch report list !");
      dispatch({ type: NO_DATA, payload: "NO_DATA" });
    }
  };
};
