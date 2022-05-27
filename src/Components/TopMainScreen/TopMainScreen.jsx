import React, { useState, useEffect, memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Colors } from "../../environment/theme/Colors";
import { Icons } from "../../environment/theme/Icons";

import { getCurrentMonth } from "../../data/consts";

import styles from "./TopMainScreen.style";
import { Sizes } from "../../environment/sizes";

const TopMainScreen = ({
  pickerMonth,
  products,
  chart,
  lastMonthTotalExpenses,
  pickedDate,
}) => {
  const navigation = useNavigation();
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const income = products.reduce((totalIncome, item) => {
    if (item.price.toString().charAt(0) === "-") {
      return totalIncome + 0;
    } else {
      return parseFloat(item.price) + totalIncome;
    }
  }, 0);

  const expenses = products.reduce((totalExpenses, item) => {
    if (item.price.toString().charAt(0) === "-") {
      return parseFloat(item.price) + totalExpenses;
    } else {
      return totalExpenses + 0;
    }
  }, 0);

  const prices = products.map((product) => parseFloat(product.price));

  const balance = prices.reduce(
    (previousValue, currentValue) => (previousValue += currentValue),
    0
  );

  const onChange = (event, value) => {
    if (event.type == "set") {
      setDate(value);
      setIsPickerShow(false);
    } else {
      setIsPickerShow(false);
    }
  };

  useEffect(() => {
    pickerMonth(date);
  }, [date]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => setIsPickerShow(true)}
        >
          <Text style={styles.title}>{getCurrentMonth(date.getMonth())}</Text>
          <Icons.PickerIcon fill={Colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Summary", {
              chart,
              lastMonthTotalExpenses,
              pickedDate,
            })
          }
        >
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
              {expenses * -1}
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
      {isPickerShow && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={true}
          locale="en_GB"
          onChange={onChange}
          onTouchCancel={() => setIsPickerShow(false)}
          style={styles.datePicker}
        />
      )}
    </View>
  );
};

export default memo(TopMainScreen);
