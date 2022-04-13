import { useEffect, useState } from "react";

//api call being made to get all the products
//making use of hook
let exchangeArray = () => {
  let [data, setData] = useState([]);
  const BASE_URL =
    "http://api.exchangeratesapi.io/v1/latest?access_key=182685343472a02c6eecd9a59e8f1008";

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.log(err));
  }, []);
  return data;
};

export default exchangeArray;
