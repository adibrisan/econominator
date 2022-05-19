import React from "react";
import { render } from "@testing-library/react-native";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import CustomImagePicker from "../../src/Components/ImagePicker/CustomImagePicker";

import { Colors } from "../../src/environment/theme/Colors";
import { Sizes } from "../../src/environment/sizes";

describe("Given the Modal component", () => {
  describe("When checking if it can be used", () => {
    it("Then it should render correctly if it is not for Profile", () => {
      const { getByA11yLabel } = render(
        <NavigationContainer>
          <CustomImagePicker />
        </NavigationContainer>
      );

      expect(getByA11yLabel("ScannerPicker")).not.toBeNull();
    });
    it("Then it should render correctly if it is for Profile", () => {
      const { getByA11yLabel, getByText } = render(
        <NavigationContainer>
          <CustomImagePicker isProfile />
        </NavigationContainer>
      );
      const styles = StyleSheet.flatten(
        getByText("Pick photo from gallery").props.style
      );

      expect(styles.fontSize).toEqual(Sizes.normalize(60));
      expect(styles.color).toEqual(Colors.gulfBlue);
      expect(getByText("Pick photo from gallery").props.children).toMatch(
        "Pick photo from gallery"
      );
      expect(getByA11yLabel("ImagePicker")).not.toBeNull();
    });
  });
});
