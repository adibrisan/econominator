import React from "react";
import { View, Pressable } from "react-native";

import styles from "./Modal.style";

export function Modal({ children, open, onOverlayPress }) {
  return (
    <>
      {open && (
        <>
          <Pressable
            accessibilityLabel="ModalOverlay"
            style={styles.overlay}
            onPress={onOverlayPress}
          />
          <View accessibilityLabel="ModalContent" style={styles.container}>
            {children}
          </View>
        </>
      )}
    </>
  );
}
