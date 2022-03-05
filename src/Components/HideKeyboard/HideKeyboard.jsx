import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export const HideKeyboard = ({ children, hideDropdown }) => (
  <TouchableWithoutFeedback
    onPress={() => {
      Keyboard.dismiss();
      hideDropdown?.();
    }}
  >
    {children}
  </TouchableWithoutFeedback>
);
