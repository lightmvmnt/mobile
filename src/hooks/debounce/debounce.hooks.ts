import { useEffect, useState } from 'react';
import { DebounceParams } from './debounce.types';

function useDebounce({ value, delay = 400 }: DebounceParams) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
