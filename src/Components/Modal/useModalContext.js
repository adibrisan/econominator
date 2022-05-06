import { createContext, useContext } from "react";

export const ModalContext = createContext({
  onClose: () => {},
  onOpen: () => {},
});

export function useModalContext() {
  const modalContext = useContext(ModalContext);
  return modalContext;
}
