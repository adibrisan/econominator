import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";

import { Icons } from "../../environment/theme/Icons";

import styles from "./TopMainScreen.style";
import { Sizes } from "../../environment/sizes";

const TopMainScreen = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.trs);

  const prices = products.map((product) => product.price);
  const balance = prices.reduce(
    (previousValue, currentValue) => (previousValue += currentValue),
    0
  );
  const expenses =
    prices
      .filter((price) => price < 0)
      .reduce(
        (previousValue, currentValue) => (previousValue += currentValue),
        0
      ) * -1;
  const income = expenses + balance;

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>November</Text>
        <TouchableOpacity>
          <Icons.Chart />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: Sizes.normalize(45),
        }}
      >
        <View>
          <Text
            style={{ textAlign: "center", fontFamily: "Kufam-SemiBoldItalic" }}
          >
            Income
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Kufam-SemiBoldItalic",
              fontSize: Sizes.normalize(30),
              fontWeight: "700",
            }}
          >
            {income + " "}
            <Icons.Euro fill="black" />
          </Text>
        </View>
        <View>
          <Text
            style={{ textAlign: "center", fontFamily: "Kufam-SemiBoldItalic" }}
          >
            Expenses
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Kufam-SemiBoldItalic",
              fontSize: Sizes.normalize(30),
              fontWeight: "700",
            }}
          >
            {expenses + " "}
            <Icons.Euro fill="black" />
          </Text>
        </View>
        <View>
          <Text
            style={{ textAlign: "center", fontFamily: "Kufam-SemiBoldItalic" }}
          >
            Balance
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Kufam-SemiBoldItalic",
              fontSize: Sizes.normalize(30),
              fontWeight: "700",
            }}
          >
            {balance + " "}
            <Icons.Euro fill="black" />
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TopMainScreen;
