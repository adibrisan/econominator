import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { View, Text, Pressable } from "react-native";

import { Modal } from "../../src/Components/Modal/Modal";

import { Sizes } from "../../src/environment/sizes";

describe("Given the Modal component", () => {
  let isOpenModal = false;

  const onPress = jest.fn(() => {
    isOpenModal = !isOpenModal;
  });
  describe("When checking if it can be used", () => {
    it("Then it should render correctly", () => {
      const { getByA11yLabel } = render(
        <Modal open>
          <View />
        </Modal>
      );
      expect(getByA11yLabel("ModalOverlay")).not.toBeNull();
      expect(getByA11yLabel("ModalContent")).not.toBeNull();
    });
  });
  describe("When checking the functionality", () => {
    it("It can be opened", () => {
      const { getByA11yLabel, getByText } = render(
        <View>
          <Modal open={isOpenModal}>
            <Text>Modal test text</Text>
          </Modal>
          <Pressable accessibilityLabel="OpenModal" onPress={onPress}>
            <Text>Open me</Text>
          </Pressable>
        </View>
      );
      fireEvent.press(getByA11yLabel("OpenModal"));

      expect(onPress).toBeCalled();
      expect(isOpenModal);
      expect(getByText).not.toBeNull();
    });
    it("It can be closed", () => {
      const { getByA11yLabel } = render(
        <Modal open>
          <Pressable accessibilityLabel="Open" onPress={onPress}>
            <Text>Press</Text>
          </Pressable>
        </Modal>
      );

      fireEvent.press(getByA11yLabel("Open"));

      expect(isOpenModal).toBeFalsy();
    });
  });
});
