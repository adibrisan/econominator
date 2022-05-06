import { useCallback, useState } from "react";

export function useModalHook(initiallyOpen = false) {
  const [open, setModalOpen] = useState(initiallyOpen);

  const toggle = useCallback(() => {
    setModalOpen((o) => !o);
  }, []);

  const onClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  return [{ open, onClose }, toggle];
}
