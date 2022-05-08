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

import Header from "../../Components/Header/Header";
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

import { Modal } from "../../Components/Modal/Modal";
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

  //TODO: get notification status
  const notifications = true;

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
  console.log(productsList);

  const pdf = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      ${productNames}
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

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
          <View style={{ padding: Sizes.normalize(50) }}>
            <View style={{ flexDirection: "row" }}>
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
