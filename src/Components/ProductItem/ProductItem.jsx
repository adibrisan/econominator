import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, { eq, interpolate } from "react-native-reanimated";

import { withTransition } from "react-native-redash/lib/module/v1";

// import { useTimingTransition } from "react-native-redash";

import { Colors } from "../../environment/theme/Colors";
import { Sizes } from "../../environment/sizes";
import { Icons } from "../../environment/theme/Icons";

const ProductItem = ({ index, transition, onTap, onDelete, item }) => {
  const isActive = transition === index;
  //   const activeTransition = useTimingTransition(isActive, { duration: 200 });

  const delX = 0;
  //   interpolate(activeTransition, {
  //     inputRange: [0, 1],
  //     outputRange: [-100, 20],
  //   });

  const hidePrice = 1;
  //   interpolate(activeTransition, {
  //     inputRange: [0, 1],
  //     outputRange: [1, 0],
  //   });

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          onTap();
        }}
      >
        <Animated.View>
          <View
            overflow="hidden"
            paddingHorizontal={Sizes.normalize(50)}
            borderBottomWidth={1}
            borderBottomColor="silver"
            height={50}
            position="relative"
          >
            <View style={{ paddingRight: 35 }}>
              <Animated.View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 65,
                  padding: Sizes.normalize(50),
                }}
              >
                <Animated.Text>{item.title}</Animated.Text>
                <Animated.Text
                  style={{
                    opacity: hidePrice,
                    color:
                      item.price > 0 ? Colors.azureRadiance : Colors.vermilion,
                  }}
                >
                  {item.price > 0
                    ? `${item.price}`
                    : `- ${Math.abs(item.price)}`}
                </Animated.Text>
              </Animated.View>
            </View>

            <Animated.View
              style={{
                fontSize: 12,
                color: "white",
                fontWeight: "900",
                position: "absolute",
                height: 50,
                width: "14%",
                right: delX,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
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
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flex: 1,
  },
});

export default ProductItem;
