import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import FormInput from "../../Components/FormInput/FormInput";
import Header from "../../Components/Header/Header";

import { Colors } from "../../environment/theme/Colors";
import { Sizes } from "../../environment/sizes";
import { Icons } from "../../environment/theme/Icons";
import styles from "../../Components/Header/Header.style";
import thisStyle from "./ExchangeList.styles";

const Item = ({ title, value, percentage }) => (
  <View style={listStyles.item}>
    <Text style={listStyles.title}>{title}</Text>
    <Text numberOfLines={2} style={listStyles.title}>
      {value}
    </Text>
    <Text
      numberOfLines={2}
      style={[listStyles.title, { paddingLeft: Sizes.normalize(140) }]}
    >
      {`${percentage}%`}
    </Text>
    <View style={{ paddingLeft: Sizes.normalize(25) }}>
      {percentage !== "?" &&
        (percentage.toString().charAt(0) === "-" ? (
          <Icons.ArrowDown fill={Colors.red} />
        ) : (
          <Icons.ArrowUp fill={Colors.greenHaze} />
        ))}
    </View>
  </View>
);

const ExchangeList = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true); //usually on true
  const [exchanges, setExchanges] = useState({});
  const [lastMonthExchanges, setLastMonthExchanges] = useState({});
  const [todayRates, setTodayRates] = useState("");
  const [currency, setCurrency] = useState("");

  String.prototype.replaceAt = function (index, replacement) {
    if (index >= this.length) {
      return this.valueOf();
    }

    return this.substring(0, index) + replacement + this.substring(index + 2);
  };

  const notifications = false;
  const BASE_URL =
    "http://api.exchangeratesapi.io/v1/latest?access_key=182685343472a02c6eecd9a59e8f1008";

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setExchanges(data.rates);
        setTodayRates(data.date);
      })
      .then(() => {
        setIsLoading(false);
      });
    // fetch(HISTORICAL_URL)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  }, []);

  let prev = todayRates.slice(5, 7);
  prev = prev - "01";
  prev = prev.toString();

  prev = prev.length === 1 ? "0" + prev : prev;

  let prevMonth = todayRates;
  prevMonth = prevMonth.replaceAt(5, prev);
  prevMonth = prevMonth.replaceAt(8, "01");

  prevMonth = prevMonth ? prevMonth : "2013-03-01";

  const HISTORICAL_URL = `http://api.exchangeratesapi.io/v1/${prevMonth}?access_key=182685343472a02c6eecd9a59e8f1008`;

  useEffect(() => {
    let timer = setTimeout(() => {
      fetch(HISTORICAL_URL)
        .then((res) => res.json())
        .then((data) => setLastMonthExchanges(data.rates));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  let exchangeList = [];
  var lastMonthValues = [];
  let currentValues = [];
  // let lastMonthValues = [];

  Object.entries(lastMonthExchanges).forEach((item) => {
    lastMonthValues.push(item[1]);
  });
  // console.log(lastMonthValues);

  Object.entries(exchanges).forEach((item, index) => {
    exchangeList.push({
      id: index,
      currency: item[0],
      value: item[0] !== "RON" ? "1" / item[1] : item[1],
    });
    currentValues.push(item[1]);
  });
  // console.log(currentValues);

  let percentageValues =
    currentValues !== [] && lastMonthValues !== []
      ? currentValues.map((num, idx) => {
          return parseFloat(
            ((num - lastMonthValues[idx]) / num).toFixed(2) * 100
          );
        })
      : [];
  console.log(percentageValues);
  exchangeList = exchangeList.map((item, index) => {
    return { ...item, percentage: percentageValues[index] };
  });

  let filteredExchangeList = exchangeList.filter((item) => {
    if (currency.length === 0) {
      return item;
    }
    if (currency.length === 1) {
      return (
        item.currency.charAt(0) === currency.charAt(0) ||
        item.currency.charAt(0) === currency.charAt(0).toUpperCase()
      );
    } else if (currency.length === 2) {
      return (
        (item.currency.charAt(0) === currency.charAt(0) &&
          item.currency.charAt(1) === currency.charAt(1)) ||
        (item.currency.charAt(0) === currency.charAt(0).toUpperCase() &&
          item.currency.charAt(1) === currency.charAt(1).toUpperCase())
      );
    } else if (currency.length === 3) {
      return (
        (item.currency.charAt(0) === currency.charAt(0) &&
          item.currency.charAt(1) === currency.charAt(1) &&
          item.currency.charAt(2) === currency.charAt(2)) ||
        (item.currency.charAt(0) === currency.charAt(0).toUpperCase() &&
          item.currency.charAt(1) === currency.charAt(1).toUpperCase() &&
          item.currency.charAt(2) === currency.charAt(2).toUpperCase())
      );
    }
  });
  // console.log(todayRates);

  // console.log(percentageValues);

  const IS_RON = exchangeList.find((item) => item.currency === "RON");

  const renderItem = ({ item }) => (
    <Item
      key={item.id}
      title={item.currency}
      value={item.value}
      percentage={item.percentage ? item.percentage : "?"}
    />
  );

  return (
    <View
      style={{
        paddingTop: Sizes.normalize(125),
      }}
    >
      <Header
        title="Exchange Rates"
        headerLeft={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icons.Navigation />
          </TouchableOpacity>
        }
        headerLeftStyle={styles.headerLeft}
        headerRight={
          <TouchableOpacity>
            {notifications ? (
              <Icons.ActiveNotification />
            ) : (
              <Icons.InactiveNotification />
            )}
          </TouchableOpacity>
        }
        headerRightStyle={styles.headerRight}
      />
      <View style={thisStyle.search}>
        <FormInput
          labelValue={currency}
          onChangeText={(text) => setCurrency(text)}
          placeHolderText="Search currency"
          customIcon={<Icons.SearchCurrency fill={Colors.black} />}
          maxLength={25}
          autoCorrect={false}
        />
      </View>
      <View style={thisStyle.baseTitle}>
        <Text style={thisStyle.title}>Base:</Text>
        <Text style={thisStyle.title}>
          {`EUR - ${IS_RON?.value ? IS_RON.value : "?"} RON`}
        </Text>
      </View>
      {!isLoading ? (
        <FlatList
          data={filteredExchangeList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          initialNumToRender={8}
        />
      ) : (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={Colors.outrageousOrange}
        />
      )}
    </View>
  );
};

const listStyles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: Sizes.normalize(32),
    marginVertical: Sizes.normalize(22),
    paddingHorizontal: Sizes.normalize(200),
  },
  title: {
    width: "36%",
    fontSize: Sizes.normalize(60),
    fontFamily: "Lato-BoldItalic",
  },
});

export default ExchangeList;
