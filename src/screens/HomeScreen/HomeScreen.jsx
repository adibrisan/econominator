import { locale } from "expo-localization";
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
import { useValue, withTransition } from "react-native-redash";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import CustomImagePicker from "../../Components/ImagePicker/CustomImagePicker";
import Header from "../../Components/Header/Header";
import { Modal } from "../../Components/Modal/Modal";
import TopMainScreen from "../../Components/TopMainScreen/TopMainScreen";
import ProductItem from "../../Components/ProductItem/ProductItem";

import { AuthContext } from "../../navigation/AuthProvider";
import { I18nContext } from "../../navigation/i18nProvider";

import {
  deleteProduct,
  retrieveProducts,
} from "../../store/actions/ProductActions";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../../../firebase";
import { NO_DATA } from "../../store/actions/types";
import { CHART_DATA, CATEGORIES } from "../../data/consts";
import { showToast } from "../../navigation/AuthProvider";

import { Icons } from "../../environment/theme/Icons";
import { Colors } from "../../environment/theme/Colors";
import { htmlStyles } from "./PdfDesign";
import { Sizes } from "../../environment/sizes";

import { useModalHook } from "../../hooks/useModalHook";

import styles from "../../Components/Header/Header.style";
import stylesHome from "./HomeScreen.style";

function formatDate(date) {
  return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join(".");
}

export const NothingToShow = ({ isExchange }) => {
  const { I18n } = useContext(I18nContext);

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
          <Text style={stylesHome.emptyListMessage}>
            {I18n.t("errors.noExchange")}
          </Text>
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
          <Text style={stylesHome.emptyListMessage}>
            {I18n.t("errors.noItems")}
          </Text>
        </>
      )}
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [{ open: isModalOpen, onClose: onModalClose }, toggleModal] =
    useModalHook();

  const { user } = useContext(AuthContext);
  const { I18n } = useContext(I18nContext);
  const currency = locale == "ro-RO" ? "RON" : "€";

  const productsList = useSelector((state) => state.trs.products);
  const isLoading = useSelector((state) => state.ui.notification);
  const [date, setDate] = useState(new Date(Date.now()));
  const [selectedItem, setSelectedItem] = useState(null);
  const sectionListRef = useRef(null);
  const progress = useRef(new Animation.Value(0)).current;

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

    if (productsList.length === 0) {
      dispatch({ type: NO_DATA, payload: "NO_DATA" });
    }
  }, [dispatch]);

  const renderHeader = ({ section: { data } }) => {
    return (
      <View style={stylesHome.sectionHeader}>
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

  let pdfData = productsList.filter(
    (item) =>
      formatDate(date).charAt(0) === item?.addedTime?.charAt(0) &&
      item?.price < 0
  );

  const topScreenData = productsList.filter(
    (item) => formatDate(date).charAt(0) === item?.addedTime?.charAt(0)
  );

  const pdfIncome = topScreenData.reduce((totalIncome, item) => {
    if (item?.price?.toString().charAt(0) === "-") {
      return totalIncome + 0;
    } else {
      return parseFloat(item?.price) + totalIncome;
    }
  }, 0);

  const pdfPrices = topScreenData.map((product) => parseFloat(product.price));

  const pdfBalance = pdfPrices.reduce(
    (previousValue, currentValue) => (previousValue += currentValue),
    0
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
      <h1>${I18n.t("pdf.title")}</h1>
        <p>${user?.displayName ? user?.displayName : user?.name}</p>
    </header>
    <article>
      <address>
        <p>Econominator</p>
      </address>
      <table class="inventory">
        <thead>
          <tr>
            <th><span>${I18n.t("pdf.item")}</span></th>
            <th><span>${I18n.t("pdf.quantity")}</span></th>
            <th><span>${I18n.t("pdf.price")}</span></th>
          </tr>
        </thead>
        <tbody>
          ${(function fun() {
            let str = "";
            for (const item of pdfData) {
              str =
                str +
                `<tr><td><span>${item.productName}</span></td>
              <td><span>${item.amount}</span></td>
              <td><span>${item.price} ${currency}</span></td></tr>`;
            }
            return str;
          })()}
        </tbody>
      </table>
      <table class="balance">
        <tr>
          <th><span>${I18n.t("pdf.total")}</span></th>
          ${(function fun() {
            const totalPrice = pdfData.reduce(
              (acc, item) => Number(acc) + Number(item.price),
              0
            );
            return `<td><span data-prefix>${currency}</span><span> ${totalPrice}</span></td>`;
          })()}
        </tr>
        <tr>
        <th><span>${I18n.t("home.income")}</span></th>
        <td><span data-prefix>${currency}</span><span> ${pdfIncome}</span></td>
        </tr>
        <tr>
        <th><span>${I18n.t("home.balance")}</span></th>
        <td><span data-prefix>${currency}</span><span> ${pdfBalance}</span></td>
        </tr>
      </table>
    </article>
    <aside>
      <h1><span>${I18n.t("pdf.additional")}</span></h1>
      <div>
        <p>${I18n.t("pdf.team")}</p>
        <br>
        <p>${I18n.t("pdf.today")}: ${formatDate(date)}</p>
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
      showToast(
        "error",
        `${I18n.t("errors.pdf")}`,
        `${I18n.t("errors.plsPdf")}`
      );
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => active.setValue(0)}>
        <View style={stylesHome.container}>
          <Header
            title={`${I18n.t("home.title")}`}
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
                <Text style={{ fontSize: Sizes.normalize(60) }}>
                  {I18n.t("home.hi")},
                </Text>
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
                  {I18n.t("home.export")}
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
                      backgroundcolor={Colors.white}
                    >
                      <Animated.View
                        style={{
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
            {I18n.t("home.details")}
          </Text>
        </View>
        <ScrollView style={{ height: Sizes.windowHeight / 2 }}>
          <View style={modalStyles.container}>
            <Text style={modalStyles.details}>
              {`${I18n.t("home.name")}: ${selectedItem?.productName}`}
            </Text>
            <Text style={modalStyles.details}>{`${I18n.t("home.amount")}: ${
              selectedItem?.amount
            }`}</Text>
            <Text style={modalStyles.details}>{`${I18n.t("home.price")}: ${
              selectedItem?.price
            } ${currency}`}</Text>
            <Text style={modalStyles.details}>
              {`${I18n.t("home.category")}: ${
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
          <Text>{I18n.t("home.exit")}</Text>
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
