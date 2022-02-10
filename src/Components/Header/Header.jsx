import React from "react";
import { View, Text } from "react-native";

import styles from "./Header.style";

const Header = ({
  title,
  headerLeft,
  headerRight,
  headerLeftStyle,
  headerRightStyle,
}) => {
  return (
    <View style={styles.header}>
      <View style={headerLeftStyle}>{headerLeft}</View>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={headerRightStyle}>{headerRight}</View>
    </View>
  );
};

export default Header;
