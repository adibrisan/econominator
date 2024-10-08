import AntDesign from "react-native-vector-icons/AntDesign";
import { locale } from "expo-localization";
import React, { useCallback, useContext, useState } from "react";
import { FlatList, Platform, View, Text, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { VictoryPie } from "victory-native";
import { Svg } from "react-native-svg";
import { StatusBar } from "expo-status-bar";

import Header from "../../Components/Header/Header";
import { chartStyles } from "./SummaryScreen.style";
import { I18nContext } from "../../navigation/i18nProvider";
import { getCurrentMonth } from "../../data/consts";

import { Icons } from "../../environment/theme/Icons";
import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";
import styles from "../../Components/Header/Header.style";

const SummaryScreen = ({ navigation, route }) => {
  const currency = locale == "ro-RO" ? "RON" : "Euro";
  const { I18n } = useContext(I18nContext);
  const { chart, lastMonthTotalExpenses, pickedDate } = route.params;
  const [categories, setCategories] = useState(chart);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setCategories(chart);
    }, [route])
  );

  const getTotalOfCurrentMonth = () => {
    let chartData = [];
    categories.forEach((item) => {
      let confirmExpenses = [];
      if (item.expenses !== undefined) {
        confirmExpenses = item.expenses.filter((a) => parseInt(a.price) < 0);
      }

      var total =
        confirmExpenses === []
          ? 0
          : confirmExpenses.reduce((a, b) => a + (parseFloat(b.price) || 0), 0);
      if (item.expenses !== undefined && total !== 0) {
        chartData.push({
          name: item.name,
          y: total,
          expenseCount: confirmExpenses.length,
          color: item.color,
          id: item.id,
        });
      }
    });

    let totalExpenses = chartData.reduce((a, b) => a + (b.y || 0), 0);

    return totalExpenses;
  };

  const totalPercentage =
    lastMonthTotalExpenses * -1 < getTotalOfCurrentMonth() * -1
      ? (lastMonthTotalExpenses * -100) / getTotalOfCurrentMonth() + 100
      : (getTotalOfCurrentMonth() * -100) / lastMonthTotalExpenses + 100;
  const filteredChartData = () => {
    let chartData = [];
    categories.forEach((item) => {
      let confirmExpenses = [];
      if (item.expenses !== undefined) {
        confirmExpenses = item.expenses.filter((a) => parseInt(a.price) < 0);
      }

      var total =
        confirmExpenses === []
          ? 0
          : confirmExpenses.reduce((a, b) => a + (parseFloat(b.price) || 0), 0);
      if (item.expenses !== undefined && total !== 0) {
        chartData.push({
          name: item.name,
          y: total,
          expenseCount: confirmExpenses.length,
          color: item.color,
          id: item.id,
        });
      }
    });

    let totalExpenses = chartData.reduce((a, b) => a + (b.y || 0) * -1, 0);
    let finalChartData = chartData.map((item) => {
      let percentage = ((item.y / totalExpenses) * 100).toFixed(2);
      return {
        label: `${percentage * -1}%`,
        y: Number(item.y) * -1,
        expenseCount: item.expenseCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });
    return finalChartData;
  };

  const filterCategoryByName = (name) => {
    let category = categories.filter((a) => a.name == name);
    setSelectedCategory(category[0]);
  };

  function renderChart() {
    let chrtData = filteredChartData();
    const chartData = chrtData.map((item, index) => {
      return { ...item, id: index + 1 };
    });

    let scalingColors = chartData.map((item) => item.color);
    let totalExpenseCount = chartData.reduce(
      (a, b) => a + (b.expenseCount || 0),
      0
    );

    if (Platform.OS == "ios") {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <VictoryPie
            data={chartData}
            labels={(datum) => `${datum.y}`}
            radius={({ datum }) =>
              selectedCategory && selectedCategory.name == datum.name
                ? Sizes.windowWidth * 0.4
                : Sizes.windowWidth * 0.4 - 14
            }
            innerRadius={65}
            labelRadius={(Sizes.windowWidth * 0.4 + 55) / 1.5}
            style={{
              labels: { fill: Colors.black, fontSize: Sizes.normalize(62) },
            }}
            width={Sizes.windowWidth * 0.8}
            height={Sizes.windowWidth * 0.8}
            colorScale={scalingColors}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        target: "labels",
                        mutation: (mutation) => {
                          let categoryName = chartData[mutation.index].name;
                          filterCategoryByName(categoryName);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />

          <View style={{ position: "absolute", top: "45%", left: "45%" }}>
            <Text
              style={{ fontSize: Sizes.normalize(70), textAlign: "center" }}
            >
              {totalExpenseCount}
            </Text>
            <Text
              style={{ fontSize: Sizes.normalize(22), textAlign: "center" }}
            >
              {I18n.t("summary.circleExpenses")}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Svg
            width={Sizes.windowWidth}
            height={Sizes.windowWidth}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <VictoryPie
              data={chartData}
              labels={(datum) => `${datum.y}`}
              radius={({ datum }) =>
                selectedCategory && selectedCategory.name == datum.name
                  ? Sizes.windowWidth * 0.4
                  : Sizes.windowWidth * 0.4 - 14
              }
              innerRadius={65}
              labelPlacement={({ index }) => (index ? "parallel" : "vertical")}
              labelRadius={(Sizes.windowHeight * 0.23 + 59) / 1.57}
              style={{
                labels: { fill: Colors.black, fontSize: Sizes.normalize(52) },
              }}
              width={Sizes.windowWidth}
              height={Sizes.windowWidth}
              colorScale={scalingColors}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPress: () => {
                      return [
                        {
                          target: "labels",
                          mutation: (mutation) => {
                            let categoryName = chartData[mutation.index].name;
                            filterCategoryByName(categoryName);
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </Svg>
          <View style={{ position: "absolute" }}>
            <Text
              style={{ fontSize: Sizes.normalize(70), textAlign: "center" }}
            >
              {totalExpenseCount}
            </Text>
            <Text
              style={{ fontSize: Sizes.normalize(42), textAlign: "center" }}
            >
              {I18n.t("summary.circleExpenses")}
            </Text>
          </View>
        </View>
      );
    }
  }

  function expenseSummary() {
    let data = filteredChartData();

    const renderExpenses = ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: Sizes.normalize(130),
          paddingHorizontal: Sizes.normalize(30),
          borderRadius: Sizes.normalize(70),
          backgroundColor:
            selectedCategory && selectedCategory.name == item.name
              ? item.color
              : Colors.white,
        }}
        onPress={() => {
          filterCategoryByName(item.name);
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: Sizes.normalize(65),
              height: Sizes.normalize(65),
              backgroundColor:
                selectedCategory && selectedCategory.name == item.name
                  ? Colors.white
                  : item.color,
              borderRadius: Sizes.normalize(20),
            }}
          />

          <Text
            style={{
              marginLeft: Sizes.normalize(35),
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? Colors.white
                  : Colors.darkBlue,
              fontSize: Sizes.normalize(42),
            }}
          >
            {item.name}
          </Text>
        </View>

        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? Colors.white
                  : Colors.darkBlue,
              fontSize: Sizes.normalize(33),
            }}
          >
            {item.y} {currency} - {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{ padding: Sizes.normalize(55) }}>
        <FlatList
          data={data}
          renderItem={renderExpenses}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.lightGrey,
        paddingTop: Sizes.normalize(125),
      }}
    >
      <StatusBar style="dark" />
      <Header
        customStyle={{ backgroundColor: Colors.white }}
        title={`${I18n.t("summary.title")}`}
        headerLeft={
          <TouchableOpacity onPress={navigation.goBack}>
            <AntDesign name="left" size={26} />
          </TouchableOpacity>
        }
        headerLeftStyle={styles.headerLeft}
        headerRight={<TouchableOpacity></TouchableOpacity>}
        headerRightStyle={styles.headerRight}
      />

      <View style={chartStyles.categoryHeader}>
        <View>
          <Text
            style={{ color: Colors.darkBlue, fontSize: Sizes.normalize(55) }}
          >
            {I18n.t("summary.subtitle")}
          </Text>
          <Text
            style={{ fontSize: Sizes.normalize(40), color: Colors.darkGrey }}
          >
            {`${I18n.t("summary.monthlySummary")}${getCurrentMonth(
              Number(pickedDate.split(".", 1)[0] - 1)
            )}`}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: Sizes.normalize(55),
            alignItems: "center",
          }}
        >
          <View style={chartStyles.calendarContainer}>
            <Icons.Calendar />
          </View>

          <View style={{ marginLeft: Sizes.normalize(55) }}>
            <Text
              style={{ color: Colors.gulfBlue, fontSize: Sizes.normalize(50) }}
            >
              {getCurrentMonth(Number(pickedDate.split(".", 1)[0] - 1))}
            </Text>
            <Text
              style={{
                fontSize: Sizes.normalize(40),
                color:
                  lastMonthTotalExpenses !== 0 &&
                  getTotalOfCurrentMonth() !== 0 &&
                  (totalPercentage !== 0 &&
                  lastMonthTotalExpenses * -1 < getTotalOfCurrentMonth() * -1
                    ? Colors.punch
                    : Colors.greenHaze),
              }}
            >
              {lastMonthTotalExpenses !== 0 &&
                getTotalOfCurrentMonth() !== 0 &&
                (totalPercentage !== 0 &&
                lastMonthTotalExpenses * -1 < getTotalOfCurrentMonth() * -1
                  ? `${totalPercentage.toFixed(2)} % ${I18n.t(
                      "summary.morePercentage"
                    )}`
                  : `${totalPercentage.toFixed(2)} % ${I18n.t(
                      "summary.lessPercentage"
                    )}`)}
            </Text>
          </View>
        </View>
      </View>

      <View style={chartStyles.categoryHeaderContainer}>
        <View>
          <Text
            style={{ color: Colors.darkBlue, fontSize: Sizes.normalize(60) }}
          >
            {I18n.t("summary.allCategories")}
          </Text>
          <Text
            style={{ color: Colors.darkGrey, fontSize: Sizes.normalize(38) }}
          >
            {categories.length} Total
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={chartStyles.chartIcon}>
            <Icons.Chart />
          </View>
        </View>
      </View>

      <FlatList
        data={[{}]}
        keyExtractor={() => null}
        renderItem={() => (
          <View>
            {renderChart()}
            {expenseSummary()}
          </View>
        )}
      />
    </View>
  );
};

export default SummaryScreen;
