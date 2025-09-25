import { useEffect, useRef, useState } from "react";

export default function useCounter({ initial = 0, step = 1, onChange } = {}) {
  const [count, setCount] = useState(initial);
  const prev = useRef(count);

  useEffect(() => {
    if (onChange && prev.current !== count) {
      onChange(count, prev.current);
    }
    prev.current = count;
  }, [count, onChange]);

  const inc = () => setCount((c) => c + step);
  const dec = () => setCount((c) => c - step);
  const reset = (value = initial) => setCount(value);

  return { count, inc, dec, reset, set: setCount };
}
