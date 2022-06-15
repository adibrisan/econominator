import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { EXCHANGE_API_KEY as API_KEY } from "@env";

import { NothingToShow } from "../HomeScreen/HomeScreen";
import FormInput from "../../Components/FormInput/FormInput";
import Header from "../../Components/Header/Header";
import { I18nContext } from "../../navigation/i18nProvider";

import { Colors } from "../../environment/theme/Colors";
import { Sizes } from "../../environment/sizes";
import { Icons } from "../../environment/theme/Icons";
import styles from "../../Components/Header/Header.style";
import thisStyle from "./ExchangeListScreen.styles";

const Item = ({ title, value, percentage }) => (
  <View style={listStyles.item}>
    <Text style={listStyles.title}>{title}</Text>
    <Text
      numberOfLines={2}
      style={[listStyles.values, { paddingLeft: Sizes.normalize(70) }]}
    >
      {value}
    </Text>
    <Text
      numberOfLines={2}
      style={[listStyles.values, { paddingLeft: Sizes.normalize(80) }]}
    >
      {`${percentage}%`}
    </Text>
    <View style={{ paddingLeft: Sizes.normalize(25) }}>
      {percentage !== "N/A" &&
        (percentage.toString().charAt(0) === "-" ? (
          <Icons.ArrowDown fill={Colors.red} />
        ) : (
          <Icons.ArrowUp fill={Colors.greenHaze} />
        ))}
    </View>
  </View>
);

const ExchangeListScreen = ({ navigation }) => {
  const { I18n } = useContext(I18nContext);
  const [isLoading, setIsLoading] = useState(true);
  const [exchanges, setExchanges] = useState({});
  const [lastMonthExchanges, setLastMonthExchanges] = useState({});
  const [todayRates, setTodayRates] = useState("");
  const [currency, setCurrency] = useState("");
  const [isValid, setIsValid] = useState(isLoading);

  const BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

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

  function getPreviousMonth() {
    const date = new Date();
    const prevMonth = date.getMonth() - 1;

    return new Date(date.getFullYear(), prevMonth, 2)
      .toISOString()
      .split("T")[0];
  }

  const HISTORICAL_URL = `http://api.exchangeratesapi.io/v1/${getPreviousMonth()}?access_key=${API_KEY}`;

  useEffect(() => {
    fetch(HISTORICAL_URL)
      .then((res) => res.json())
      .then((data) => setLastMonthExchanges(data.rates));
  }, []);

  useEffect(() => {
    Object.keys(exchanges).some((item) => {
      if (currency.length === 0 && exchanges !== {}) {
        setIsValid(true);
        return item;
      }
      if (
        currency.length === 1 &&
        (item.charAt(0) === currency.charAt(0) ||
          item.charAt(0) === currency.charAt(0).toUpperCase())
      ) {
        setIsValid(true);
        return (
          item.charAt(0) === currency.charAt(0) ||
          item.charAt(0) === currency.charAt(0).toUpperCase()
        );
      } else if (
        currency.length === 2 &&
        ((item.charAt(0) === currency.charAt(0) &&
          item.charAt(1) === currency.charAt(1)) ||
          (item.charAt(0) === currency.charAt(0).toUpperCase() &&
            item.charAt(1) === currency.charAt(1).toUpperCase()))
      ) {
        setIsValid(true);
        return (
          (item.charAt(0) === currency.charAt(0) &&
            item.charAt(1) === currency.charAt(1)) ||
          (item.charAt(0) === currency.charAt(0).toUpperCase() &&
            item.charAt(1) === currency.charAt(1).toUpperCase())
        );
      } else if (
        currency.length === 3 &&
        ((item.charAt(0) === currency.charAt(0) &&
          item.charAt(1) === currency.charAt(1) &&
          item.charAt(2) === currency.charAt(2)) ||
          (item.charAt(0) === currency.charAt(0).toUpperCase() &&
            item.charAt(1) === currency.charAt(1).toUpperCase() &&
            item.charAt(2) === currency.charAt(2).toUpperCase()))
      ) {
        setIsValid(true);
        return (
          (item.charAt(0) === currency.charAt(0) &&
            item.charAt(1) === currency.charAt(1) &&
            item.charAt(2) === currency.charAt(2)) ||
          (item.charAt(0) === currency.charAt(0).toUpperCase() &&
            item.charAt(1) === currency.charAt(1).toUpperCase() &&
            item.charAt(2) === currency.charAt(2).toUpperCase())
        );
      } else if (exchanges !== {}) setIsValid(false);
    });
  }, [currency]);

  let exchangeList = [];
  var lastMonthValues = [];
  let currentValues = [];

  Object.entries(lastMonthExchanges).forEach((item) => {
    lastMonthValues.push([item[0], item[1]]);
  });

  Object.entries(exchanges).forEach((item, index) => {
    exchangeList.push({
      id: index,
      currency: item[0],
      value: item[0] !== "RON" ? 1 / item[1] : item[1],
    });
    currentValues.push([item[0], item[1]]);
  });

  let percentageValues = [];
  currentValues.forEach((num) => {
    lastMonthValues.forEach((nr) => {
      if (num[0] === nr[0]) {
        percentageValues.push(
          parseFloat(((num[1] - nr[1]) / num[1]).toFixed(2) * -100)
        );
      }
    });
  });

  exchangeList = exchangeList.map((item, index) => {
    return {
      ...item,
      percentage: percentageValues[index] ? percentageValues[index] : "?",
    };
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

  const IS_RON = exchangeList.find((item) => item.currency === "RON");

  const renderItem = ({ item }) => (
    <Item
      key={item.id}
      title={item.currency}
      value={item.value.toFixed(6)}
      percentage={
        typeof item.percentage == "number" ? item.percentage.toFixed(1) : "N/A"
      }
    />
  );

  return (
    <View
      accessibilityLabel="ExchangeListScreen"
      style={{
        paddingTop: Sizes.normalize(125),
      }}
    >
      <Header
        title={`${I18n.t("exchanges.title")}`}
        headerLeft={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icons.Navigation />
          </TouchableOpacity>
        }
        headerLeftStyle={styles.headerLeft}
        headerRightStyle={styles.headerRight}
      />
      {!isLoading ? (
        <>
          <View style={thisStyle.search}>
            <FormInput
              labelValue={currency}
              onChangeText={(text) => setCurrency(text)}
              placeHolderText={`${I18n.t("exchanges.search")}`}
              error={!isValid}
              touched={!isValid}
              customIcon={<Icons.SearchCurrency fill={Colors.black} />}
              maxLength={3}
              autoCorrect={false}
              isExchange
            />
          </View>
          <View style={thisStyle.baseTitle}>
            {isValid && (
              <>
                <Text style={thisStyle.title}>{I18n.t("exchanges.base")}:</Text>
                <Text style={thisStyle.title}>
                  {`EUR - ${IS_RON?.value ? IS_RON.value : "?"} RON`}
                </Text>
              </>
            )}
          </View>

          <FlatList
            data={filteredExchangeList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<NothingToShow isExchange />}
            initialNumToRender={8}
          />
        </>
      ) : (
        <View
          style={{
            relative: "absolute",
            top: Sizes.windowHeight / 2.5,
          }}
        >
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color={Colors.outrageousOrange}
          />
        </View>
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
    paddingHorizontal: Sizes.normalize(120),
  },
  values: {
    width: "38%",
    fontSize: Sizes.normalize(60),
    fontFamily: "Lato-BoldItalic",
  },
  title: {
    fontSize: Sizes.normalize(60),
    fontFamily: "Lato-BoldItalic",
  },
});

export default ExchangeListScreen;
