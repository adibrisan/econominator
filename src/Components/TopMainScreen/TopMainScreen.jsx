import { locale } from "expo-localization";
import React, { useContext, useState, useEffect, memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Colors } from "../../environment/theme/Colors";
import { Icons } from "../../environment/theme/Icons";

import { getCurrentMonth } from "../../data/consts";
import { I18nContext } from "../../navigation/i18nProvider";

import styles from "./TopMainScreen.style";
import { Sizes } from "../../environment/sizes";

const TopMainScreen = ({
  pickerMonth,
  products,
  chart,
  lastMonthTotalExpenses,
  pickedDate,
}) => {
  const { I18n } = useContext(I18nContext);
  const navigation = useNavigation();
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const currency =
    locale == "ro-RO" ? <Text>RON</Text> : <Icons.Euro fill="black" />;

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
          justifyContent: "space-evenly",
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
            {I18n.t("home.income")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              numberOfLines={3}
              style={{
                width: "33%",
                textAlign: "center",
                fontFamily: "Lato-Bold",
                fontSize: Sizes.normalize(40),
                fontWeight: "700",
              }}
            >
              {income}
            </Text>
            <View style={{ paddingLeft: Sizes.normalize(10) }}>{currency}</View>
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
            {I18n.t("home.expenses")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              numberOfLines={3}
              style={{
                width: "33%",
                textAlign: "center",
                fontFamily: "Lato-Bold",
                fontSize: Sizes.normalize(40),
                fontWeight: "700",
              }}
            >
              {expenses * -1}
            </Text>
            <View style={{ paddingLeft: Sizes.normalize(10) }}>{currency}</View>
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
            {I18n.t("home.balance")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              numberOfLines={3}
              style={{
                width: "33%",
                textAlign: "center",
                fontFamily: "Lato-Bold",
                fontSize: Sizes.normalize(40),
                fontWeight: "700",
              }}
            >
              {balance}
            </Text>
            <View style={{ paddingLeft: Sizes.normalize(10) }}>{currency}</View>
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
