import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import Header from "../../Components/Header/Header";

import { Colors } from "../../environment/theme/Colors";
import { Sizes } from "../../environment/sizes";
import { Icons } from "../../environment/theme/Icons";
import styles from "../../Components/Header/Header.style";
import thisStyle from "./ExchangeList.styles";

const Item = ({ title, value }) => (
  <View style={listStyles.item}>
    <Text style={listStyles.title}>{title}</Text>
    <Text style={listStyles.title}>{value}</Text>
  </View>
);

const ExchangeList = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true); //usually on true
  const [exchanges, setExchanges] = useState({});
  const [todayRates, setTodayRates] = useState("");
  const [values, setValues] = useState([]);
  const [inRon, setInRon] = useState({});

  const notifications = false;
  const BASE_URL =
    "http://api.exchangeratesapi.io/v1/latest?access_key=182685343472a02c6eecd9a59e8f1008";

  useEffect(() => {
    let timer;
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setExchanges(data.rates);
        setTodayRates(data.date);
      })
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
    return () => (timer ? clearTimeout(timer) : undefined);
  }, []);

  useEffect(() => {
    if (exchanges !== {} && todayRates !== "" && isLoading !== true) {
      Object.keys(exchanges).forEach((key) => {
        if (key === "EUR") {
          setValues((prevValue) => [
            ...prevValue,
            { id: 1, currency: "EUR", value: exchanges["EUR"] },
          ]);
        }
        if (key === "XAF") {
          setValues((prevValue) => [
            ...prevValue,
            { id: 2, currency: "XAF", value: exchanges["XAF"] },
          ]);
        }
        if (key === "GBP") {
          setValues((prevValue) => [
            ...prevValue,
            { id: 3, currency: "GBP", value: exchanges["GBP"] },
          ]);
        }
        if (key === "AUD") {
          setValues((prevValue) => [
            ...prevValue,
            { id: 4, currency: "AUD", value: exchanges["AUD"] },
          ]);
        }
        if (key === "BYR") {
          setValues((prevValue) => [
            ...prevValue,
            { id: 5, currency: "BYR", value: exchanges["BYR"] },
          ]);
        }
        if (key === "HKD") {
          setValues((prevValue) => [
            ...prevValue,
            { id: 6, currency: "HKD", value: exchanges["HKD"] },
          ]);
        }
        if (key === "CAD") {
          setValues((prevValue) => [
            ...prevValue,
            { id: 7, currency: "CAD", value: exchanges["CAD"] },
          ]);
        }
        if (key === "CHF") {
          setValues((prevValue) => [
            ...prevValue,
            { id: 8, currency: "CHF", value: exchanges["CHF"] },
          ]);
        }
        if (key === "TND") {
          setValues((prevValue) => [
            ...prevValue,
            { id: 9, currency: "TND", value: exchanges["TND"] },
          ]);
        }
        if (key === "HUF") {
          setValues((prevValue) => [
            ...prevValue,
            { id: 10, currency: "HUF", value: exchanges["HUF"] },
          ]);
        }
        if (key === "UAH") {
          setValues((prevValue) => [
            ...prevValue,
            { id: 11, currency: "UAH", value: exchanges["UAH"] },
          ]);
        }
        if (key === "RON") {
          setValues((prevValue) => [
            ...prevValue,
            { id: 13, currency: "RON", value: exchanges["RON"] },
          ]);
        }
      });
    }
  }, [exchanges, todayRates, isLoading]);

  useEffect(() => {
    if (values !== [] && isLoading !== true) {
      setInRon(values.filter((item) => item.currency === "RON"));
    }
  }, [values, isLoading]);

  const renderItem = ({ item }) => (
    <Item key={item.id} title={item.currency} value={item.value} />
  );

  console.log(values);
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
      <View style={thisStyle.baseTitle}>
        <Text style={thisStyle.title}>Base:</Text>
        <Text style={thisStyle.title}>
          EUR-{inRon[0]?.value ? inRon[0]?.value : "?"}
        </Text>
      </View>
      {!isLoading ? (
        <FlatList
          data={values}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
    padding: Sizes.normalize(42),
    marginVertical: Sizes.normalize(22),
    paddingHorizontal: Sizes.normalize(220),
  },
  title: {
    fontSize: Sizes.normalize(60),
    fontFamily: "Lato-BoldItalic",
  },
});

export default ExchangeList;
