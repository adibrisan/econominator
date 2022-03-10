import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";

import { Icons } from "../../environment/theme/Icons";

import styles from "./TopMainScreen.style";
import { Sizes } from "../../environment/sizes";

const TopMainScreen = ({ products }) => {
  console.log(products);
  const prices = products.map((product) => parseInt(product.price));
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
  const income = expenses - balance;

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
            style={{
              textAlign: "center",
              fontFamily: "Lato-Bold",
              fontSize: Sizes.normalize(55),
            }}
          >
            Income
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Lato-Bold",
                fontSize: Sizes.normalize(40),
                fontWeight: "700",
              }}
            >
              {income}
            </Text>
            <View>
              <Icons.Euro fill="black" />
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Lato-Bold",
              fontSize: Sizes.normalize(55),
            }}
          >
            Expenses
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Lato-Bold",
                fontSize: Sizes.normalize(40),
                fontWeight: "700",
              }}
            >
              {expenses}
            </Text>
            <View>
              <Icons.Euro fill="black" />
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Lato-Bold",
              fontSize: Sizes.normalize(55),
            }}
          >
            Balance
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Lato-Bold",
                fontSize: Sizes.normalize(40),
                fontWeight: "700",
              }}
            >
              {balance}
            </Text>
            <View>
              <Icons.Euro fill="black" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TopMainScreen;
