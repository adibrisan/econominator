import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import MediaButton from "../../src/Components/MediaButton/MediaButton";

describe("Given the Modal component", () => {
  const onPress = jest.fn();
  describe("When checking if it can be used", () => {
    it("Then it should render correctly", () => {
      const { getByA11yLabel } = render(<MediaButton />);

      expect(getByA11yLabel("MediaButton")).not.toBeNull();
      expect(getByA11yLabel("Icon")).not.toBeNull();
    });
  });
  it("Check if actions work", () => {
    const { getByA11yLabel } = render(<MediaButton onPress={onPress} />);

    fireEvent.press(getByA11yLabel("MediaButton"));
    expect(onPress).toBeCalled();
  });
});
