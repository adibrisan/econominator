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
  }, []);

  let exchangeList = [];

  Object.entries(exchanges).forEach((item, index) => {
    exchangeList.push({
      id: index,
      currency: item[0],
      value: item[1],
    });
  });

  const IS_RON = exchangeList.find((item) => item.currency === "RON");

  const renderItem = ({ item }) => (
    <Item key={item.id} title={item.currency} value={item.value} />
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
      <View style={thisStyle.baseTitle}>
        <Text style={thisStyle.title}>Base:</Text>
        <Text style={thisStyle.title}>
          EUR-{IS_RON?.value ? IS_RON.value : "?"}
        </Text>
      </View>
      {!isLoading ? (
        <FlatList
          data={exchangeList}
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
