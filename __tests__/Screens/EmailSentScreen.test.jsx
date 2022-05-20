import React from "react";
import { render } from "@testing-library/react-native";

import EmailSentScreen from "../../src/screens/EmailSentScreen/EmailSentScreen";

describe("Given the EmailSentScreen", () => {
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
      const { getByA11yLabel } = render(
        <EmailSentScreen navigation={navigation} />
      );

      expect(getByA11yLabel("EmailSentScreen")).not.toBeNull();
      expect(getByA11yLabel("TypeWriter")).not.toBeNull();
    });
  });
});
