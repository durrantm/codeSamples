import { useRef, useCallback } from 'react';

function useLocalStorage(key, initialValue = null) {
  const valInLS = window?.localStorage?.getItem(key);
  const ref = useRef(valInLS ? JSON.parse(valInLS) : initialValue);

  const setRefValue = useCallback(newVal => {
    ref.current = newVal;
    window?.localStorage?.setItem(key, JSON.stringify(newVal));
  }, [key]);

  return [ref, setRefValue];
}

export default useLocalStorage;
