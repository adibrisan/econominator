import React from "react";
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
}) => {
  const navigation = useNavigation();
  const isOpen = eq(transition, index);
  const openedTransition = withTransition(isOpen, { duration: 210 });

  const slide = interpolate(openedTransition, {
    inputRange: [0, 1],
    outputRange: [-100, 50],
  });

  const hideIcons = interpolate(openedTransition, {
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View
    // animation="fadeInUpBig"
    // duration={1000}
    // delay={index * 300}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          onTap();
        }}
      >
        <Animated.View>
          <View style={styles.container}>
            <View style={{ paddingRight: Sizes.normalize(90) }}>
              <Animated.View style={styles.price}>
                <Text>{`${item.productName}           x${item.amount}`}</Text>
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
                style={{ paddingRight: Sizes.normalize(55) }}
                onPress={handleModalToggle}
              >
                <Icons.Info />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingRight: Sizes.normalize(55) }}
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

export default ProductItem;
