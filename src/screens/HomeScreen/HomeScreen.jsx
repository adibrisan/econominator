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
  SectionList,
  TouchableWithoutFeedback,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import Animated from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { useValue, withTransition } from "react-native-redash";

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
import { CHART_DATA } from "../../data/consts";

import { Icons } from "../../environment/theme/Icons";
import { Colors } from "../../environment/theme/Colors";
import { Sizes } from "../../environment/sizes";

import styles from "../../Components/Header/Header.style";
import stylesHome from "./HomeScreen.style";

function formatDate(date) {
  return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join(".");
}

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const productsList = useSelector((state) => state.trs.products);
  const isLoading = useSelector((state) => state.ui.notification);

  const [date, setDate] = useState(new Date(Date.now()));
  const sectionListRef = useRef(null);

  const [buttonVisibility, setButtonVisibility] = useState(true);

  const progress = useRef(new Animation.Value(0)).current;

  const handleAddProduct = () => {
    Animation.timing(progress, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      navigation.navigate("Add Product");
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
    if (isLoading === "RECEIVING") {
      dispatch(retrieveProducts());
    }
    if (productsList.length === 0) {
      dispatch({ type: NO_DATA, payload: "NO_DATA" });
    }
  }, [dispatch, productsList.length]);

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

  //TODO: COMPARE ACTUAL DATA WITH LAST MONTH DATA
  let lastMonthData = DATA.filter(
    (item) => formatDate(date).charAt(0) - 1 == item?.addedTime?.charAt(0)
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

  return (
    <>
      <TouchableWithoutFeedback onPress={() => active.setValue(0)}>
        <View style={stylesHome.container}>
          <Header
            title="Details"
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
            <Text style={{ fontSize: Sizes.normalize(60) }}>Hi,</Text>
            <Text style={{ fontSize: Sizes.normalize(90) }}>
              {user?.displayName ? user?.displayName : user?.name}
            </Text>
            <TopMainScreen
              pickerMonth={setDate}
              products={productsList}
              chart={chartData}
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
                scrollEventThrottle={16}
                bounces={false}
                keyExtractor={(item, index) => item + index}
                showsVerticalScrollIndicator={false}
                renderSectionHeader={renderHeader}
                stickySectionHeadersEnabled={false}
                onScrollBeginDrag={() => setButtonVisibility(false)}
                onScrollEndDrag={() => setButtonVisibility(true)}
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
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <LottieView
                  source={require("../../assets/no_data.json")}
                  resizeMode="contain"
                  autoPlay
                  loop={false}
                  style={stylesHome.noDataAnimation}
                />
                <Text style={stylesHome.emptyListMessage}>
                  No items to show !
                </Text>
                <Text style={stylesHome.emptyListMessage}></Text>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      {buttonVisibility && (
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
      )}
    </>
  );
};

export default HomeScreen;
