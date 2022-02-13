import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { View, Text, TouchableOpacity, SectionList } from "react-native";
import Animated from "react-native-reanimated";
import { useValue, withTransition } from "react-native-redash";

import Header from "../../Components/Header/Header";
import TopMainScreen from "../../Components/TopMainScreen/TopMainScreen";
import ProductItem from "../../Components/ProductItem/ProductItem";

import { AuthContext } from "../../navigation/AuthProvider";

import { Icons } from "../../environment/theme/Icons";
import { Colors } from "../../environment/theme/Colors";
import { Sizes } from "../../environment/sizes";

import styles from "../../Components/Header/Header.style";
import stylesHome from "./HomeScreen.style";

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const active = useValue(0);
  const transition = withTransition(active, { duration: 300 });

  const onDelete = (id) => {};

  const renderHeader = () => {
    return (
      <View
        style={{
          paddingHorizontal: Sizes.normalize(45),
          backgroundColor: Colors.white,
          flexDirection: "row",
          justifyContent: "space-around",
          borderBottomWidth: 1,
          borderBottomColor: Colors.silver,
          paddingVertical: Sizes.normalize(24),
          marginTop: Sizes.normalize(45),
          borderTopRightRadius: 3,
          borderTopLeftRadius: 3,
        }}
      ></View>
    );
  };
  const renderFooter = () => {
    return (
      <View
        style={{
          paddingHorizontal: Sizes.normalize(45),
          backgroundColor: Colors.white,
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: Colors.silver,
          paddingBottom: Sizes.normalize(24),
          borderBottomRightRadius: 3,
          borderBottomLeftRadius: 3,
        }}
      ></View>
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

  return (
    <View style={stylesHome.container}>
      <Header
        title="Home Page"
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
        <Text>
          Welcome {user?.displayName ? user?.displayName : user?.name}
        </Text>
        <TopMainScreen />
      </View>
      <View
        style={{
          height: Sizes.windowHeight * 0.8,
          paddingHorizontal: Sizes.normalize(45),
        }}
      >
        <SectionList
          sections={DATA}
          scrollEventThrottle={16}
          bounces={false}
          keyExtractor={(item, index) => item + index}
          showsVerticalScrollIndicator={false}
          // renderSectionFooter={renderFooter}
          // renderSectionHeader={renderHeader}
          renderItem={({ item }) => {
            const index = item.id;
            return (
              <View
                key={index}
                overflow="hidden"
                borderBottomWidth={Sizes.normalize(2)}
                backgroundcolor={Colors.white}
              >
                <Animated.View
                  style={{
                    backgroundColor: Colors.white,
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
      </View>
    </View>
  );
};

export default HomeScreen;
