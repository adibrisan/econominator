import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import FormButton from "../../src/Components/FormButton/FormButton";

describe("Given the Modal component", () => {
  const onPress = jest.fn();
  describe("When checking if it can be used", () => {
    it("Then it should render correctly", () => {
      const { getByA11yLabel } = render(<FormButton />);

      expect(getByA11yLabel("FormButton")).not.toBeNull();
      expect(getByA11yLabel("ButtonText")).not.toBeNull();
    });
    it("Then It can be clicked", () => {
      const { getByA11yLabel } = render(<FormButton onPress={onPress} />);
      fireEvent.press(getByA11yLabel("FormButton"));

      expect(onPress).toBeCalled();
    });
  });
});
