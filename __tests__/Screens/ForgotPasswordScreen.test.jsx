import React from "react";
import { StyleSheet } from "react-native";
import { render } from "@testing-library/react-native";

import ForgotPasswordScreen from "../../src/screens/ForgotPasswordScreen/ForgotPasswordScreen";

import { Colors } from "../../src/environment/theme/Colors";

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
      const { getByText, getByA11yLabel } = render(
        <ForgotPasswordScreen navigation={navigation} />
      );

      expect(
        getByText(
          "Enter your registered email below to receive password reset instruction."
        )
      ).not.toBeNull();
      expect(getByText("Reset password")).not.toBeNull();
      expect(getByA11yLabel("ForgotPasswordContainer")).not.toBeNull();
    });
    it("Then it should render the animation correctly", () => {
      const { getByA11yLabel } = render(
        <ForgotPasswordScreen navigation={navigation} />
      );

      expect(getByA11yLabel("Animation")).not.toBeNull();
    });
    it("Then it should render the right styles", () => {
      const { getByText } = render(
        <ForgotPasswordScreen navigation={navigation} />
      );

      const stylesTitle = StyleSheet.flatten(
        getByText(
          "Enter your registered email below to receive password reset instruction."
        ).props.style
      );

      const stylesReset = StyleSheet.flatten(
        getByText("Reset password").props.style
      );

      expect(stylesTitle.color).toEqual(Colors.grey);
      expect(stylesReset.color).toEqual(Colors.grey);
    });
  });
});
