import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ActivityIndicator,
  Animated as Animation,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  SectionList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import Animated from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { useValue, withTransition } from "react-native-redash";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import CustomImagePicker from "../../Components/ImagePicker/CustomImagePicker";
import Header from "../../Components/Header/Header";
import { Modal } from "../../Components/Modal/Modal";
import TopMainScreen from "../../Components/TopMainScreen/TopMainScreen";
import ProductItem from "../../Components/ProductItem/ProductItem";

import { AuthContext } from "../../navigation/AuthProvider";

import {
  deleteProduct,
  retrieveProducts,
} from "../../store/actions/ProductActions";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../../../firebase";
import { NO_DATA } from "../../store/actions/types";
import { CHART_DATA, CATEGORIES } from "../../data/consts";

import { Icons } from "../../environment/theme/Icons";
import { Colors } from "../../environment/theme/Colors";
import { Sizes } from "../../environment/sizes";

import { useModalHook } from "../../hooks/useModalHook";

import styles from "../../Components/Header/Header.style";
import stylesHome from "./HomeScreen.style";

function formatDate(date) {
  return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join(".");
}

export const NothingToShow = ({ isExchange }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {isExchange ? (
        <>
          <LottieView
            source={require("../../assets/exchange.json")}
            resizeMode="contain"
            autoPlay
            style={stylesHome.noDataAnimation}
          />
          <Text style={stylesHome.emptyListMessage}>No exchanges found !</Text>
        </>
      ) : (
        <>
          <LottieView
            source={require("../../assets/no_data.json")}
            resizeMode="contain"
            autoPlay
            loop={false}
            style={stylesHome.noDataAnimation}
          />
          <Text style={stylesHome.emptyListMessage}>No items to show !</Text>
        </>
      )}
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [{ open: isModalOpen, onClose: onModalClose }, toggleModal] =
    useModalHook();

  const { user } = useContext(AuthContext);
  const productsList = useSelector((state) => state.trs.products);
  const isLoading = useSelector((state) => state.ui.notification);
  const [date, setDate] = useState(new Date(Date.now()));
  const [selectedItem, setSelectedItem] = useState(null);
  const sectionListRef = useRef(null);
  const progress = useRef(new Animation.Value(0)).current;

  // useEffect(() => {
  //   if (imageBase !== null) {
  //     processOCR(imageBase);
  //   }
  // }, [imageBase]);

  const handleAddProduct = () => {
    Animation.timing(progress, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      navigation.navigate("Add Product", { pickedDate: formatDate(date) });
    }, 400);
  };

  const dispatch = useDispatch();

  const active = useValue(0);
  const transition = withTransition(active, { duration: 300 });

  const onDelete = (id) => {
    const currentItem = productsList.filter((item) => item.index === id);
    dispatch(deleteProduct(id, currentItem[0].id));
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        dispatch(retrieveProducts());
      }
    });
    // if (isLoading === "RECEIVING") {
    //   dispatch(retrieveProducts());
    // }
    if (productsList.length === 0) {
      dispatch({ type: NO_DATA, payload: "NO_DATA" });
    }
  }, [dispatch]);

  const renderHeader = ({ section: { data } }) => {
    return (
      <View
        // animation="fadeIn"
        // duration={800}
        // useNativeDriver
        // iterationCount={1}
        style={stylesHome.sectionHeader}
      >
        <Text style={{ color: Colors.boulder }}>{data[0].addedTime}</Text>
      </View>
    );
  };

  const DATA = Object.values(
    productsList.reduce((acc, item) => {
      if (!acc[item.addedTime]) {
        acc[item.addedTime] = {
          productName: item.productName,
          data: [],
          price: item.price,
          addedTime: item.addedTime,
        };
      }
      acc[item.addedTime].data.unshift(item);

      return acc;
    }, {})
  );
  let filteredDataList = DATA.filter(
    (item) => formatDate(date).charAt(0) === item?.addedTime?.charAt(0)
  );

  const topScreenData = productsList.filter(
    (item) => formatDate(date).charAt(0) === item?.addedTime?.charAt(0)
  );

  const lastMonthData = DATA.filter(
    (item) =>
      formatDate(date).charAt(0) !== "0" &&
      formatDate(date).charAt(0) - 1 == item?.addedTime?.charAt(0)
  );
  let lastMonthItems = [];
  lastMonthData.forEach((item) => {
    item.data.forEach((lastMonthItem) => {
      if (parseInt(lastMonthItem.price) < 0) {
        lastMonthItems.push(lastMonthItem);
      }
    });
  });

  const lastMonthTotalExpenses = lastMonthItems.reduce(
    (acc, total) => acc + parseFloat(total.price),
    0
  );

  let chartData = JSON.parse(JSON.stringify(CHART_DATA));

  chartData.forEach((chartItem) => {
    let expenses;
    expenses = [];
    filteredDataList.forEach((item) => {
      item.data.forEach((product) => {
        if (product.category === chartItem.value) {
          expenses.push(product);
          chartItem.expenses = expenses;
        }
      });
    });
  });

  let listWithOffset = [];

  filteredDataList.map((item) => {
    item.data.map((item) => {
      listWithOffset.push(item);
    });
  });

  listWithOffset.reverse().map((item, index) => {
    item.offset = index + 1;
  });

  useFocusEffect(
    useCallback(() => {
      progress.setValue(0);
    }, [progress])
  );

  useEffect(() => {
    const index = DATA.map((item) => {
      if (item.addedTime === formatDate(date)) {
        return item.data[0].offset;
      }
    });
    const actualIndex = index.find((element) => element > -1);

    const today = formatDate(new Date(Date.now()));

    if (
      DATA !== null &&
      actualIndex !== undefined &&
      today !== formatDate(date)
    ) {
      sectionListRef.current?.scrollToLocation({
        itemIndex: actualIndex,
      });
    }
  }, [date]);
  let productNames = [];
  filteredDataList.forEach((item) => {
    item.data.forEach((product) => {
      productNames.push(product.productName);
    });
  });

  const htmlStyles = `* {
    border: 0;
    box-sizing: content-box;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    line-height: inherit;
    list-style: none;
    margin: 0;
    padding: 0;
    text-decoration: none;
    vertical-align: top;
  }
  h1 {
    font: bold 100% sans-serif;
    letter-spacing: 0.5em;
    text-align: center;
    text-transform: uppercase;
  }
  table {
    font-size: 75%;
    table-layout: fixed;
    width: 100%;
  }
  table {
    border-collapse: separate;
    border-spacing: 2px;
  }
  th,
  td {
    border-width: 1px;
    padding: 0.5em;
    position: relative;
    text-align: center;
  }
  th,
  td {
    border-radius: 0.25em;
    border-style: solid;
  }
  th {
    background: #eee;
    border-color: #bbb;
  }
  td {
    border-color: #ddd;
  }
  html {
    font: 16px/1 "Open Sans", sans-serif;
    overflow: auto;
  }
  html {
    background: #999;
    cursor: default;
  }
  body {
    box-sizing: border-box;
    margin: 0 auto;
    overflow: hidden;
    padding: 0.25in;
  }
  body {
    background: #fff;
    border-radius: 1px;
    box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
  }
  header {
    margin: 0 0 3em;
  }
  header:after {
    clear: both;
    content: "";
    display: table;
  }
  header h1 {
    background: #000;
    border-radius: 0.25em;
    color: #fff;
    margin: 0 0 1em;
    padding: 0.5em 0;
  }
  header address {
    float: left;
    font-size: 75%;
    font-style: normal;
    line-height: 1.25;
    margin: 0 1em 1em 0;
  }
  header address p {
    margin: 0 0 0.25em;
  }
  header span,
  header img {
    display: block;
    float: right;
  }
  header span {
    margin: 0 0 1em 1em;
    max-height: 25%;
    max-width: 60%;
    position: relative;
  }
  header img {
    max-height: 100%;
    max-width: 100%;
  }
  article,
  article address,
  table.meta,
  table.inventory {
    margin: 0 0 3em;
  }
  article:after {
    clear: both;
    content: "";
    display: table;
  }
  article h1 {
    clip: rect(0 0 0 0);
    position: absolute;
  }
  article address {
    float: left;
    font-size: 125%;
    font-weight: bold;
  }
  table.meta,
  table.balance {
    float: center;
    width: 36%;
  }
  table.meta:after,
  table.balance:after {
    clear: both;
    content: "";
    display: table;
  }
  table.meta th {
    width: 40%;
  }
  table.meta td {
    width: 60%;
  }
  table.inventory {
    clear: both;
    width: 100%;
  }
  table.inventory th {
    font-weight: bold;
    text-align: center;
  }
  table.inventory td:nth-child(1) {
    width: 26%;
  }
  table.inventory td:nth-child(2) {
    width: 38%;
  }
  table.inventory td:nth-child(3) {
    text-align: center;
    width: 12%;
  }
  table.balance th,
  table.balance td {
    width: 50%;
  }
  table.balance td {
    text-align: center;
  }
  aside h1 {
    border: none;
    border-width: 0 0 1px;
    margin: 0 0 1em;
  }
  aside h1 {
    border-color: #999;
    border-bottom-style: solid;
  }
  `;

  const pdf = `<html>
  <head>
    <meta charset="utf-8">
    <title>Your receipt</title>
    <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
    <style>
      ${htmlStyles}
    </style>
  </head>
  <body>
    <header>
      <h1>Your receipt</h1>
        <p>${user?.displayName ? user?.displayName : user?.name}</p>
    </header>
    <article>
      <address>
        <p>Econominator</p>
      </address>
      <table class="inventory">
        <thead>
          <tr>
            <th><span>Item</span></th>
            <th><span>Quantity</span></th>
            <th><span>Price</span></th>
          </tr>
        </thead>
        <tbody>
          ${(function fun() {
            let str = "";
            for (const item of productsList) {
              str =
                str +
                `<tr><td><span>${item.productName}</span></td>
              <td><span>${item.amount}</span></td>
              <td><span>${item.price} €</span></td></tr>`;
            }
            return str;
          })()}
        </tbody>
      </table>
      <table class="balance">
        <tr>
          <th><span>Total</span></th>
          ${(function fun() {
            const totalPrice = productsList.reduce(
              (acc, item) => Number(acc) + Number(item.price),
              0
            );
            return `<td><span data-prefix>€</span><span> ${totalPrice}</span></td>`;
          })()}
        </tr>
      </table>
    </article>
    <aside>
      <h1><span>Additional Notes</span></h1>
      <div>
        <p>Your Econominator team.</p>
        <br>
        <p>Today: ${formatDate(date)}</p>
      </div>
    </aside>
  </body>
  </html>`;

  const createPDF = async (html) => {
    try {
      const { uri } = await Print.printToFileAsync({ html });

      await Sharing.shareAsync(uri, {
        UTI: ".pdf",
        mimeType: "application/pdf",
      });

      return uri;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => active.setValue(0)}>
        <View style={stylesHome.container}>
          <Header
            title="Home"
            headerLeft={
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icons.Navigation />
              </TouchableOpacity>
            }
            headerLeftStyle={styles.headerLeft}
            headerRight={<CustomImagePicker date={formatDate(date)} />}
            headerRightStyle={styles.headerRight}
          />
          <View style={{ padding: Sizes.normalize(50) }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={{ fontSize: Sizes.normalize(60) }}>Hi,</Text>
                <Text style={{ fontSize: Sizes.normalize(90) }}>
                  {user?.displayName ? user?.displayName : user?.name}
                </Text>
              </View>
              <TouchableOpacity
                style={stylesHome.pdfContainer}
                onPress={() => {
                  createPDF(pdf);
                }}
              >
                <Text style={{ width: Sizes.normalize(200) }} numberOfLines={2}>
                  Export to PDF
                </Text>
                <LottieView
                  source={require("../../assets/pdf.json")}
                  autoPlay
                  loop
                  renderMode="HARDWARE"
                  resizeMode="cover"
                  style={stylesHome.pdfAnimation}
                />
              </TouchableOpacity>
            </View>
            <TopMainScreen
              pickerMonth={setDate}
              products={topScreenData}
              chart={chartData}
              lastMonthTotalExpenses={lastMonthTotalExpenses}
              pickedDate={formatDate(date)}
            />
          </View>
          <View style={stylesHome.listContainer}>
            {isLoading === "RECEIVED" ? (
              <SectionList
                ref={sectionListRef}
                getItemLayout={(data, index) => ({
                  length: data.length + Sizes.normalize(250),
                  offset: Sizes.normalize(250) + data.length * index,
                  index,
                })}
                sections={
                  filteredDataList ? filteredDataList.reverse() : DATA.reverse()
                }
                ListEmptyComponent={<NothingToShow />}
                scrollEventThrottle={16}
                bounces={false}
                keyExtractor={(item, index) => item + index}
                showsVerticalScrollIndicator={false}
                renderSectionHeader={renderHeader}
                stickySectionHeadersEnabled={false}
                renderItem={({ item }) => {
                  const index = item.index;

                  return (
                    <View
                      key={index}
                      overflow="hidden"
                      borderBottomWidth={Sizes.normalize(2)}
                      // animation="fadeInUpBig"
                      // duration={1000}
                      // delay={index * 150}
                      backgroundcolor={Colors.white}
                    >
                      <Animated.View
                        style={{
                          // backgroundColor: Colors.white,
                          justifyContent: "center",
                        }}
                      >
                        <ProductItem
                          handleModalToggle={toggleModal}
                          selectedItem={setSelectedItem}
                          onTap={() => {
                            active.setValue(index);
                          }}
                          {...{ transition, index, item, onDelete }}
                        />
                      </Animated.View>
                    </View>
                  );
                }}
              />
            ) : isLoading === "RECEIVING" ? (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color={Colors.outrageousOrange}
              />
            ) : (
              <NothingToShow />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        style={stylesHome.animationContainer}
        onPress={handleAddProduct}
      >
        <LottieView
          source={require("../../assets/add-button-animation.json")}
          resizeMode="cover"
          progress={progress}
          style={stylesHome.animation}
        />
      </TouchableOpacity>

      <Modal open={isModalOpen} onOverlayPress={toggleModal}>
        <View style={modalStyles.title}>
          <View style={modalStyles.icon}>
            {CATEGORIES.map((item) => {
              if (item.value === selectedItem?.category) {
                return <item.icon key={1} />;
              }
            })}
          </View>
          <Text style={[modalStyles.details, { color: Colors.white }]}>
            Details
          </Text>
        </View>
        <ScrollView style={{ height: Sizes.windowHeight / 2 }}>
          <View style={modalStyles.container}>
            <Text style={modalStyles.details}>
              {`Name: ${selectedItem?.productName}`}
            </Text>
            <Text
              style={modalStyles.details}
            >{`Amount: ${selectedItem?.amount}`}</Text>
            <Text
              style={modalStyles.details}
            >{`Price: ${selectedItem?.price} €`}</Text>
            <Text style={modalStyles.details}>
              {`Category: ${
                selectedItem?.category.slice(0, 1).toUpperCase() +
                selectedItem?.category.slice(1)
              }`}
            </Text>
          </View>
        </ScrollView>
        <TouchableHighlight
          style={{
            alignSelf: "flex-end",
            padding: Sizes.normalize(80),
            borderRadius: 30,
          }}
          underlayColor={Colors.wildSand}
          onPress={onModalClose}
        >
          <Text>Exit</Text>
        </TouchableHighlight>
      </Modal>
    </>
  );
};

const modalStyles = StyleSheet.create({
  title: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: Colors.azureRadiance,
    paddingVertical: Sizes.normalize(40),
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100%",
    width: Sizes.windowWidth / 1.4,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    paddingHorizontal: Sizes.normalize(111),
    paddingVertical: Sizes.normalize(111),
  },
  details: {
    fontSize: Sizes.normalize(60),
    fontFamily: "Lato-BoldItalic",
    color: Colors.gulfBlue,
    paddingVertical: Sizes.normalize(30),
  },
  icon: {
    position: "absolute",
    left: Sizes.normalize(50),
  },
});

export default HomeScreen;
