import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, { eq, interpolate } from "react-native-reanimated";

import { withTransition } from "react-native-redash";

import { Colors } from "../../environment/theme/Colors";
import { Sizes } from "../../environment/sizes";
import { Icons } from "../../environment/theme/Icons";

import styles from "./ProductItem.style";

const ProductItem = ({ index, transition, onTap, onDelete, item }) => {
  const isActive = eq(transition, index);
  const activeTransition = withTransition(isActive, { duration: 200 });

  const delX = interpolate(activeTransition, {
    inputRange: [0, 1],
    outputRange: [-100, 20],
  });

  const hidePrice = interpolate(activeTransition, {
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onTap();
      }}
    >
      <Animated.View>
        <View style={styles.container}>
          <View style={{ paddingRight: Sizes.normalize(90) }}>
            <Animated.View style={styles.price}>
              <Animated.Text>{item.title}</Animated.Text>
              <Animated.Text
                style={{
                  opacity: hidePrice,
                  color:
                    item.price > 0 ? Colors.azureRadiance : Colors.vermilion,
                }}
              >
                {item.price > 0 ? `${item.price}` : `- ${Math.abs(item.price)}`}
              </Animated.Text>
            </Animated.View>
          </View>

          <Animated.View style={[styles.slideAnimation, { right: delX }]}>
            <Text>
              <TouchableOpacity
                onPress={() => {
                  onDelete(index);
                }}
              >
                <Icons.DeleteItem />
              </TouchableOpacity>
            </Text>
          </Animated.View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ProductItem;
