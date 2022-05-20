import React from "react";
import { View } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";

import { HideKeyboard } from "../../src/Components/HideKeyboard/HideKeyboard";

describe("Given the HideKeyboard component", () => {
  describe("When checking if it can be used", () => {
    it("Then it should render correctly", () => {
      const { getByA11yLabel } = render(
        <HideKeyboard>
          <View />
        </HideKeyboard>
      );

      expect(getByA11yLabel("HideKeyboard")).not.toBeNull();
    });
    it("Then it should hide correctly", () => {
      const onPress = jest.fn();
      const { getByA11yLabel } = render(
        <HideKeyboard hideDropdown={onPress}>
          <View />
        </HideKeyboard>
      );
      fireEvent.press(getByA11yLabel("HideKeyboard"));

      expect(onPress).toBeCalled();
    });
  });
});
