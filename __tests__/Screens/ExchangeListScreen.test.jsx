import React from "react";
import { render } from "@testing-library/react-native";

import ExchangeListScreen from "../../src/screens/ExchangeListScreen/ExchangeListScreen";

describe("Given the ExchangeListScreen", () => {
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
        <ExchangeListScreen navigation={navigation} />
      );

      expect(getByA11yLabel("ExchangeListScreen")).not.toBeNull();
    });
  });
});
