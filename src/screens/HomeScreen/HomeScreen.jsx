import React, { useRef, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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
import moment from "moment";

import Header from "../../Components/Header/Header";
import TopMainScreen from "../../Components/TopMainScreen/TopMainScreen";
import ProductItem from "../../Components/ProductItem/ProductItem";

import { AuthContext } from "../../navigation/AuthProvider";
import { deleteProduct } from "../../store/actions/ProductActions";

import { Icons } from "../../environment/theme/Icons";
import { Colors } from "../../environment/theme/Colors";
import { Sizes } from "../../environment/sizes";

import styles from "../../Components/Header/Header.style";
import stylesHome from "./HomeScreen.style";

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

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
    dispatch(deleteProduct(id));
  };

  const renderHeader = ({ section: { data } }) => {
    return (
      <Animatable.View
        animation="fadeIn"
        duration={1000}
        delay={1000}
        style={stylesHome.sectionHeader}
      >
        <Text style={{ color: Colors.boulder }}>
          {moment(data[0].addedTime, "x").format("DD MM YYYY")}
        </Text>
      </Animatable.View>
    );
  };

  //TODO: get notification status
  const notifications = true;

  const { products } = useSelector((state) => state.trs);
  const DATA = Object.values(
    products.reduce((acc, item) => {
      if (!acc[item.addedTime]) {
        acc[item.addedTime] = {
          title: item.addedTime,
          data: [],
          price: item.price,
        };
      }
      acc[item.addedTime].data.push(item);
      return acc;
    }, {})
  );

  console.log("====================================");
  console.log(DATA);
  console.log("====================================");

  useFocusEffect(
    useCallback(() => {
      progress.setValue(0);
    }, [progress])
  );

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
            <TopMainScreen />
          </View>
          <View style={stylesHome.listContainer}>
            <SectionList
              sections={DATA}
              scrollEventThrottle={16}
              bounces={false}
              keyExtractor={(item, index) => item + index}
              showsVerticalScrollIndicator={false}
              renderSectionHeader={renderHeader}
              renderItem={({ item }) => {
                const index = item.id;

                return (
                  <Animatable.View
                    key={index}
                    overflow="hidden"
                    borderBottomWidth={Sizes.normalize(2)}
                    animation="fadeInUpBig"
                    duration={1000}
                    delay={index * 150}
                    // backgroundcolor={Colors.white}
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
                  </Animatable.View>
                );
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={handleAddProduct}>
        <LottieView
          source={require("../../assets/add-button-animation.json")}
          resizeMode="cover"
          progress={progress}
          style={stylesHome.animation}
        />
      </TouchableOpacity>
    </>
  );
};

export default HomeScreen;
