import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Animated,
  Platform,
} from "react-native";
import React, { useRef } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { VictoryPie } from "victory-native";
import { Svg } from "react-native-svg";

import Header from "../../Components/Header/Header";

import { Icons } from "../../environment/theme/Icons";
import { Sizes } from "../../environment/sizes";
import { Colors } from "../../environment/theme/Colors";
import styles from "../../Components/Header/Header.style";
import { NavigationContainer } from "@react-navigation/native";

// const SummaryScreen = ({ navigation }) => {
//   const notifications = false;
//   return (
//     <View
//       style={{
//         paddingTop: Sizes.normalize(125),
//       }}
//     >
//       <Header
//         title="Summary"
//         headerLeft={
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <AntDesign name="left" size={26} />
//           </TouchableOpacity>
//         }
//         headerLeftStyle={styles.headerLeft}
//         headerRight={
//           <TouchableOpacity>
//             {notifications ? (
//               <Icons.ActiveNotification />
//             ) : (
//               <Icons.InactiveNotification />
//             )}
//           </TouchableOpacity>
//         }
//         headerRightStyle={styles.headerRight}
//       />
//     </View>
//   );
// };

const SummaryScreen = ({ navigation }) => {
  // dummy data
  const confirmStatus = "C";
  const pendingStatus = "P";

  let categoriesData = [
    {
      id: 1,
      name: "Education",
      icon: Icons.Children,
      color: Colors.yellow,
      expenses: [
        {
          id: 1,
          title: "Tuition Fee",
          description: "Tuition fee",
          location: "ByProgrammers' tuition center",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 2,
          title: "Arduino",
          description: "Hardward",
          location: "ByProgrammers' tuition center",
          total: 30.0,
          status: pendingStatus,
        },
        {
          id: 3,
          title: "Javascript Books",
          description: "Javascript books",
          location: "ByProgrammers' Book Store",
          total: 20.0,
          status: confirmStatus,
        },
        {
          id: 4,
          title: "PHP Books",
          description: "PHP books",
          location: "ByProgrammers' Book Store",
          total: 20.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 2,
      name: "Nutrition",
      icon: Icons.Food,
      color: Colors.lightBlue,
      expenses: [
        {
          id: 5,
          title: "Vitamins",
          description: "Vitamin",
          location: "ByProgrammers' Pharmacy",
          total: 25.0,
          status: pendingStatus,
        },

        {
          id: 6,
          title: "Protein powder",
          description: "Protein",
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 3,
      name: "Child",
      icon: Icons.Children,
      color: Colors.greenHaze,
      expenses: [
        {
          id: 7,
          title: "Toys",
          description: "toys",
          location: "ByProgrammers' Toy Store",
          total: 25.0,
          status: confirmStatus,
        },
        {
          id: 8,
          title: "Baby Car Seat",
          description: "Baby Car Seat",
          location: "ByProgrammers' Baby Care Store",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 9,
          title: "Pampers",
          description: "Pampers",
          location: "ByProgrammers' Supermarket",
          total: 100.0,
          status: pendingStatus,
        },
        {
          id: 10,
          title: "Baby T-Shirt",
          description: "T-Shirt",
          location: "ByProgrammers' Fashion Store",
          total: 20.0,
          status: pendingStatus,
        },
      ],
    },
    {
      id: 4,
      name: "Beauty & Care",
      icon: Icons.Other,
      color: Colors.peach,
      expenses: [
        {
          id: 11,
          title: "Skin Care product",
          description: "skin care",
          location: "ByProgrammers' Pharmacy",
          total: 10.0,
          status: pendingStatus,
        },
        {
          id: 12,
          title: "Lotion",
          description: "Lotion",
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: confirmStatus,
        },
        {
          id: 13,
          title: "Face Mask",
          description: "Face Mask",
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: pendingStatus,
        },
        {
          id: 14,
          title: "Sunscreen cream",
          description: "Sunscreen cream",
          location: "ByProgrammers' Pharmacy",
          total: 50.0,
          status: pendingStatus,
        },
      ],
    },
    {
      id: 5,
      name: "Sports",
      icon: Icons.Sport,
      color: Colors.yourPink,
      expenses: [
        {
          id: 15,
          title: "Gym Membership",
          description: "Monthly Fee",
          location: "ByProgrammers' Gym",
          total: 45.0,
          status: pendingStatus,
        },
        {
          id: 16,
          title: "Gloves",
          description: "Gym Equipment",
          location: "ByProgrammers' Gym",
          total: 15.0,
          status: confirmStatus,
        },
      ],
    },
    {
      id: 6,
      name: "Clothing",
      icon: Icons.Groceries,
      color: Colors.red,
      expenses: [
        {
          id: 17,
          title: "T-Shirt",
          description: "Plain Color T-Shirt",
          location: "ByProgrammers' Mall",
          total: 20.0,
          status: pendingStatus,
        },
        {
          id: 18,
          title: "Jeans",
          description: "Blue Jeans",
          location: "ByProgrammers' Mall",
          total: 50.0,
          status: confirmStatus,
        },
      ],
    },
  ];

  const categoryListHeightAnimationValue = useRef(
    new Animated.Value(115)
  ).current;

  const [categories, setCategories] = React.useState(categoriesData);
  const [viewMode, setViewMode] = React.useState("chart");
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  function renderNavBar() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 80,
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingHorizontal: Sizes.normalize(55),
          backgroundColor: Colors.white,
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: "center", width: 50 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="left" size={26} />
        </TouchableOpacity>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View
        style={{
          paddingHorizontal: Sizes.normalize(55),
          paddingVertical: Sizes.normalize(55),
          backgroundColor: Colors.white,
        }}
      >
        <View>
          <Text
            style={{ color: Colors.darkBlue, fontSize: Sizes.normalize(55) }}
          >
            My Expenses
          </Text>
          <Text
            style={{ fontSize: Sizes.normalize(40), color: Colors.darkGrey }}
          >
            Summary (private)
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: Sizes.normalize(55),
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: Colors.lightGray,
              height: 50,
              width: 50,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icons.Calendar />
          </View>

          <View style={{ marginLeft: Sizes.normalize(55) }}>
            <Text
              style={{ color: Colors.darkBlue, fontSize: Sizes.normalize(40) }}
            >
              11 Nov, 2020
            </Text>
            <Text
              style={{ fontSize: Sizes.normalize(40), color: Colors.darkGrey }}
            >
              18% more than last month
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderCategoryHeaderSection() {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: Sizes.normalize(55),
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Title */}
        <View>
          <Text
            style={{ color: Colors.darkBlue, fontSize: Sizes.normalize(40) }}
          >
            CATEGORIES
          </Text>
          <Text
            style={{ color: Colors.darkGrey, fontSize: Sizes.normalize(22) }}
          >
            {categories.length} Total
          </Text>
        </View>

        {/* Button */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: viewMode == "chart" ? Colors.peach : null,
              height: 50,
              width: 50,
              borderRadius: 25,
            }}
            onPress={() => setViewMode("chart")}
          >
            <Icons.Chart />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function processCategoryDataToDisplay() {
    // Filter expenses with "Confirmed" status
    let chartData = categories.map((item) => {
      let confirmExpenses = item.expenses.filter((a) => a.status == "C");
      var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0);

      return {
        name: item.name,
        y: total,
        expenseCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
      };
    });

    // filter out categories with no data/expenses
    let filterChartData = chartData.filter((a) => a.y > 0);

    // Calculate the total expenses
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0);

    // Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map((item) => {
      let percentage = ((item.y / totalExpense) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        expenseCount: item.expenseCount,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });

    return finalChartData;
  }

  function setSelectCategoryByName(name) {
    let category = categories.filter((a) => a.name == name);
    setSelectedCategory(category[0]);
  }

  function renderChart() {
    let chartData = processCategoryDataToDisplay();
    let colorScales = chartData.map((item) => item.color);
    let totalExpenseCount = chartData.reduce(
      (a, b) => a + (b.expenseCount || 0),
      0
    );

    console.log("Check Chart");
    console.log(chartData);

    if (Platform.OS == "ios") {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <VictoryPie
            data={chartData}
            labels={(datum) => `${datum.y}`}
            radius={({ datum }) =>
              selectedCategory && selectedCategory.name == datum.name
                ? Sizes.windowWidth * 0.4
                : Sizes.windowWidth * 0.4 - 10
            }
            innerRadius={70}
            labelRadius={({ innerRadius }) =>
              (Sizes.windowWidth * 0.4 + 70) / 2.5
            }
            style={{
              labels: { fill: "white" },
            }}
            width={Sizes.windowWidth * 0.8}
            height={Sizes.windowWidth * 0.8}
            colorScale={colorScales}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        target: "labels",
                        mutation: (props) => {
                          let categoryName = chartData[props.index].name;
                          setSelectCategoryByName(categoryName);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />

          <View style={{ position: "absolute", top: "42%", left: "42%" }}>
            <Text
              style={{ fontSize: Sizes.normalize(70), textAlign: "center" }}
            >
              {totalExpenseCount}
            </Text>
            <Text
              style={{ fontSize: Sizes.normalize(22), textAlign: "center" }}
            >
              Expenses
            </Text>
          </View>
        </View>
      );
    } else {
      // Android workaround by wrapping VictoryPie with SVG
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Svg
            width={Sizes.windowWidth}
            height={Sizes.windowWidth}
            style={{ width: "100%", height: "auto" }}
          >
            <VictoryPie
              standalone={false} // Android workaround
              data={chartData}
              labels={(datum) => `${datum.y}`}
              radius={({ datum }) =>
                selectedCategory && selectedCategory.name == datum.name
                  ? Sizes.windowWidth * 0.4
                  : Sizes.windowWidth * 0.4 - 10
              }
              innerRadius={70}
              labelRadius={({ innerRadius }) =>
                (Sizes.windowWidth * 0.4 + 70) / 2.5
              }
              style={{
                labels: { fill: "white", fontSize: Sizes.normalize(22) },
              }}
              width={Sizes.windowWidth}
              height={Sizes.windowWidth}
              colorScale={colorScales}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPress: () => {
                      return [
                        {
                          target: "labels",
                          mutation: (props) => {
                            let categoryName = chartData[props.index].name;
                            setSelectCategoryByName(categoryName);
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </Svg>
          <View style={{ position: "absolute", top: "42%", left: "42%" }}>
            <Text
              style={{ fontSize: Sizes.normalize(70), textAlign: "center" }}
            >
              {totalExpenseCount}
            </Text>
            <Text
              style={{ fontSize: Sizes.normalize(22), textAlign: "center" }}
            >
              Expenses
            </Text>
          </View>
        </View>
      );
    }
  }

  function renderExpenseSummary() {
    let data = processCategoryDataToDisplay();

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 40,
          paddingHorizontal: Sizes.normalize(30),
          borderRadius: 10,
          backgroundColor:
            selectedCategory && selectedCategory.name == item.name
              ? item.color
              : Colors.white,
        }}
        onPress={() => {
          let categoryName = item.name;
          setSelectCategoryByName(categoryName);
        }}
      >
        {/* Name/Category */}
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor:
                selectedCategory && selectedCategory.name == item.name
                  ? Colors.white
                  : item.color,
              borderRadius: 5,
            }}
          />

          <Text
            style={{
              marginLeft: Sizes.normalize(20),
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? Colors.white
                  : Colors.darkBlue,
              fontSize: Sizes.normalize(22),
            }}
          >
            {item.name}
          </Text>
        </View>

        {/* Expenses */}
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? Colors.white
                  : Colors.darkBlue,
              fontSize: Sizes.normalize(22),
            }}
          >
            {item.y} USD - {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{ padding: Sizes.normalize(55) }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightGrey }}>
      {/* Nav bar section */}
      {renderNavBar()}

      {/* Header section */}
      {renderHeader()}

      {/* Category Header Section */}
      {renderCategoryHeaderSection()}

      <FlatList
        data={[{}]}
        keyExtractor={() => null}
        renderItem={() => (
          <>
            {viewMode == "chart" && (
              <View>
                {renderChart()}
                {renderExpenseSummary()}
              </View>
            )}
          </>
        )}
      />
    </View>
  );
};

export default SummaryScreen;

const thisStyles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});
