import React from "react";
import { View, Text } from "react-native";

import styles from "./Header.style";

const Header = ({
  title,
  customStyle,
  headerLeft,
  headerRight,
  headerLeftStyle,
  headerRightStyle,
}) => {
  return (
    <View accessibilityLabel="Header" style={[styles.header, customStyle]}>
      <View accessibilityLabel="HeaderLeft" style={headerLeftStyle}>
        {headerLeft}
      </View>
      <View>
        <Text accessibilityLabel="HeaderTitle" style={styles.title}>
          {title}
        </Text>
      </View>
      <View accessibilityLabel="HeaderRight" style={headerRightStyle}>
        {headerRight}
      </View>
    </View>
  );
};

export default Header;
