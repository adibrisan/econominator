import React, { memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, { eq, interpolate } from "react-native-reanimated";
import * as Animatable from "react-native-animatable";

import { withTransition } from "react-native-redash";

import { Colors } from "../../environment/theme/Colors";
import { Sizes } from "../../environment/sizes";
import { Icons } from "../../environment/theme/Icons";

import styles from "./ProductItem.style";

const ProductItem = ({
  index,
  transition,
  onTap,
  onDelete,
  item,
  handleModalToggle,
  selectedItem,
}) => {
  const navigation = useNavigation();
  const isOpen = eq(transition, index);
  const openedTransition = withTransition(isOpen, { duration: 210 });

  const slide = interpolate(openedTransition, {
    inputRange: [0, 1],
    outputRange: [-100, 20],
  });

  const hideIcons = interpolate(openedTransition, {
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => {
          onTap();
        }}
      >
        <Animated.View>
          <View style={styles.container}>
            <View style={{ paddingRight: Sizes.normalize(90) }}>
              <Animated.View style={styles.price}>
                <View style={{ width: "75%" }}>
                  <Text numberOfLines={1} ellipsizeMode="tail">
                    {item.productName}
                  </Text>
                </View>
                <Animated.Text
                  style={{
                    opacity: hideIcons,
                    paddingRight: Sizes.normalize(20),
                  }}
                >{`x${item.amount}`}</Animated.Text>
                <Animated.Text
                  style={{
                    opacity: hideIcons,
                    color:
                      item.price > 0 ? Colors.azureRadiance : Colors.vermilion,
                  }}
                >
                  {item.price.toString().charAt(0) === "-"
                    ? `${item.price.toString().slice(1)}`
                    : `${item.price}`}
                </Animated.Text>
              </Animated.View>
            </View>
            <Animated.View style={[styles.slideAnimation, { right: slide }]}>
              <TouchableOpacity
                onPress={() => {
                  handleModalToggle();
                  selectedItem(item);
                }}
              >
                <Icons.Info />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Add Product", { product: item });
                }}
              >
                <Icons.EditProduct />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onDelete(index);
                }}
              >
                <Icons.DeleteItem />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default memo(ProductItem);
