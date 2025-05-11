import { useEffect, useRef } from "react";

export const useThrottle = (callback: () => void, delay: number, deps: any[] = []) => {
  const lastCalled = useRef(0);

  useEffect(() => {
    const now = Date.now();
    if (now - lastCalled.current >= delay) {
      lastCalled.current = now;
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
