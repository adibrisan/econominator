import { NativeModules } from "react-native";

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

jest.mock("./src/navigation/AuthProvider.js", () => {
  () => {
    return {
      user: {
        userName: "test",
      },
      setUser: jest.fn(),
      register: jest.fn(),
    };
  };
});

jest.mock("react", () => {
  const ActualReact = jest.requireActual("react");
  return {
    ...ActualReact,
    useContext: () => ({}),
  };
});

import { enData } from "./src/data/en-GB";
const mockedEn = enData;
jest.mock("i18n-js", () => {
  const Actual = jest.requireActual("i18n-js");
  return {
    ...Actual,
    i18n: {
      locale: "en-GB",
      changeLanguage: () => new Promise(() => {}),
      translations: {
        "en-GB": mockedEn,
      },
      t: (str) => str,
    },
  };
});

jest.mock("./src/navigation/i18nProvider.js", () => ({
  I18n: {
    locale: "en-GB",
    changeLanguage: () => new Promise(() => {}),
    translations: {
      "en-GB": mockedEn,
    },
    t: (str) => str,
  },
}));

require("jest-fetch-mock").enableFetchMocks();
