import { useRef, useCallback } from "react";

const useThrottleFn = (callback: () => void, delay: number) => {
  const lastCalled = useRef(0);

  return useCallback(() => {
    const now = Date.now();
    if (now - lastCalled.current >= delay) {
      lastCalled.current = now;
      callback();
    }
  }, [callback, delay]);
};

export default useThrottleFn;