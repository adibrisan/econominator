import React from "react";
import { StyleSheet } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";

import FormInput from "../../src/Components/FormInput/FormInput";

import { Colors } from "../../src/environment/theme/Colors";

describe("Given the FormInput component", () => {
  const mockInputText = "Sample Text";
  const newMockInputText = "New Sample Text";

  describe("When checking if it can be used", () => {
    it("Then it should render correctly", () => {
      const { getByA11yLabel } = render(
        <FormInput placeHolderText="Placeholder text" />
      );

      expect(getByA11yLabel("FormInput")).not.toBeNull();
    });
    describe("When checking if input is password", () => {
      it("Then it should show/hide password", () => {
        const { getByA11yLabel } = render(
          <FormInput placeHolderText="Password" />
        );

        expect(getByA11yLabel("Show/Hide_Password")).not.toBeNull();
      });
    });
    describe("When checking onChangeFunctionality", () => {
      it("Then it should change text", () => {
        const onChangeText = jest.fn();

        const { getByDisplayValue } = render(
          <FormInput
            placeHolderText="Placeholder text"
            onChangeText={onChangeText}
            labelValue={mockInputText}
          />
        );
        const input = getByDisplayValue(mockInputText);

        fireEvent.changeText(input, newMockInputText);

        expect(onChangeText).toBeCalledWith(newMockInputText);
      });
    });
    it("Then I expect that it should be focused", () => {
      const onChangeText = jest.fn();
      const onFocus = jest.fn();
      const { getByDisplayValue } = render(
        <FormInput
          placeHolderText="Placeholder text"
          onChangeText={onChangeText}
          labelValue={mockInputText}
          onFocus={onFocus}
        />
      );
      fireEvent(getByDisplayValue(mockInputText), "onFocus", () => {});

      expect(onFocus).toHaveBeenCalledTimes(1);
    });
    it("Then I expect that it should be onBlur", () => {
      const onChangeText = jest.fn();
      const onBlur = jest.fn();
      const { getByDisplayValue } = render(
        <FormInput
          placeHolderText="Placeholder text"
          onChangeText={onChangeText}
          labelValue={mockInputText}
          onBlur={onBlur}
        />
      );
      fireEvent(getByDisplayValue(mockInputText), "onBlur", () => {});

      expect(onBlur).toHaveBeenCalledTimes(1);
    });
    it("Then I expect that it should display an error message", () => {
      const errorMessage = "Error Sample Text";
      const onChangeText = jest.fn();
      const { getByText } = render(
        <FormInput
          placeHolderText="Placeholder text"
          onChangeText={onChangeText}
          labelValue={mockInputText}
          error={errorMessage}
          touched
        />
      );
      const errorElement = getByText(errorMessage);
      expect(errorElement).not.toBeNull();
      const styles = StyleSheet.flatten(errorElement.props.style);
      expect(styles.color).toEqual(Colors.scarlet);
    });
  });
});
