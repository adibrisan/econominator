import React from "react";
import { StyleSheet } from "react-native";
import { render } from "@testing-library/react-native";

import CompletionProductScreen from "../../src/screens/CompletionProductScreen/CompletionProductScreen";

import { Sizes } from "../../src/environment/sizes";

describe("Given the Modal component", () => {
  const navigation = {
    setOptions: () => {
      return {
        title: "Title",
        headerLeft: jest.fn(),
      };
    },
  };

  describe("When checking if it can be used", () => {
    it("Then it should render correctly", () => {
      const { getByA11yLabel, getByText } = render(<CompletionProductScreen />);

      expect(getByA11yLabel("CompletionProductScreen")).not.toBeNull();
      expect(getByText("Your product has been added !")).not.toBeNull();
    });
    it("Then I expect the correct styles", () => {
      const { getByText } = render(<CompletionProductScreen />);

      const styles = StyleSheet.flatten(
        getByText("Your product has been added !").props.style
      );

      expect(styles.fontFamily).toEqual("Lato-BoldItalic");
      expect(styles.fontSize).toEqual(Sizes.normalize(60));
    });
  });
});
