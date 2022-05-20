import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";

import Header from "../../src/Components/Header/Header";

import { Sizes } from "../../src/environment/sizes";

describe("Given the Header component", () => {
  const onPress = jest.fn();

  describe("When checking if it can be used", () => {
    it("Then it should render correctly", () => {
      const { getByA11yLabel } = render(
        <Header title="Header" headerLeft={<View />} headerRight={<View />} />
      );

      expect(getByA11yLabel("Header")).not.toBeNull();
      expect(getByA11yLabel("HeaderLeft")).not.toBeNull();
      expect(getByA11yLabel("HeaderRight")).not.toBeNull();
      expect(getByA11yLabel("HeaderTitle")).not.toBeNull();
    });
    it("Then it should render the correct styles", () => {
      const { getByText } = render(<Header title="Header" />);

      const styles = StyleSheet.flatten(getByText("Header").props.style);

      expect(styles.fontSize).toEqual(Sizes.normalize(55));
      expect(styles.fontWeight).toEqual("bold");
    });
    it("Then it should make an action", () => {
      const { getByA11yLabel } = render(
        <Header
          title="Header"
          headerLeft={
            <Pressable accessibilityLabel="Press" onPress={onPress}>
              <View />
            </Pressable>
          }
        />
      );

      fireEvent.press(getByA11yLabel("Press"));

      expect(onPress).toBeCalled();
    });
  });
});
