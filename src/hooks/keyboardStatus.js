import { useState, useEffect } from "react";
import { Keyboard } from "react-native";

const useKeyboardStatus = () => {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  return keyboardStatus;
};

export default useKeyboardStatus;
