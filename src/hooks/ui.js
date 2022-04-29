import { useEffect, useRef } from "react";

export function usePreviousState(state) {
  const refference = useRef();
  useEffect(() => {
    refference.current = state;
  }, [state]);
  return refference.current;
}
