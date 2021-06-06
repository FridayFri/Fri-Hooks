import { useRef, useEffect } from "react";

function useInterval(
  fn: () => void,
  delay: number | null | undefined,
  option?: {
    immediate?: boolean;
  }
): void {
  const immediate = option?.immediate;
  const fnRef = useRef<() => void>();
  fnRef.current = fn;

  useEffect(() => {
    if (delay === undefined || delay === null) return;
    if (immediate) {
      fnRef.current?.();
    }
    const timer = setInterval(() => {
      fnRef.current?.();
    }, delay);
    return () => {
      clearInterval(timer);
    };
  }, [delay]);
}

export default useInterval;
