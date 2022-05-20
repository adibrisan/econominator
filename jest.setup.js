import { NativeModules, View } from "react-native";

NativeModules.Orientation = { unlockAllOrientations: () => {} };

// REACT NAVIGATION
const mockedNavigation = jest.fn();
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => {
    return mockedNavigation;
  },
  useFocusEffect: () => {
    return mockedNavigation;
  },
  navigation: {
    setOptions: () => {
      return {
        title: "Title",
        headerLeft: jest.fn(),
      };
    },
  },
}));
