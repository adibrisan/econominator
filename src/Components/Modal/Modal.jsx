import React from "react";
import { View, Pressable } from "react-native";

import styles from "./Modal.style";

export function Modal({ children, open, onOverlayPress }) {
  return (
    <>
      {open && (
        <>
          <Pressable style={styles.overlay} onPress={onOverlayPress} />
          <View style={styles.container}>{children}</View>
        </>
      )}
    </>
  );
}
