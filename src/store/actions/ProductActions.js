import moment from "moment";
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  RETRIEVE_PRODUCTS,
  RESET_LIST,
  RECEIVING,
  RECEIVED,
  NO_DATA,
} from "./types";

import { auth, db, uniqueId } from "../../../firebase";
import { ref, set } from "firebase/database";

import { DATABASE_URL } from "@env";

export const addProduct =
  ({ cartId, productName, price, amount, dropdownValue, date }) =>
  (dispatch) => {
    // const id = Math.floor(Math.random() * 600000);

    const newTransaction = {
      cartId,
      productName,
      price: +price,
      amount,
      dropdownValue,
      date,
    };

    dispatch({ type: ADD_PRODUCT, payload: newTransaction });
  };

export const deleteProduct = (id) => (dispatch, getState) => {
  dispatch({ type: DELETE_PRODUCT, payload: id });
};

export const resetList = () => (dispatch) => {
  dispatch({ type: RESET_LIST, payload: [] });
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
      // console.log(data);
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
          addedTime: product.date,
        };
        // console.log(transaction);
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

export const mainTime = () => {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  var currentTime = new Date();
  // returns the month (from 0 to 11)
  var month = currentTime.getMonth() + 1;

  // returns the day of the month (from 1 to 31)
  var day = currentTime.getDate();

  // returns the year (four digits)
  var year = currentTime.getFullYear();

  // write output MM/dd/yyyy
  const MiliTime = year + "-" + pad(month) + "-" + pad(day);

  // const mainTime = moment(`${a}T00:00:00`).valueOf();
  return moment(`${MiliTime}T00:00:00`).valueOf();
};
