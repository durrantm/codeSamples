import { useState, useCallback } from 'react';

function useLocalStorage(key, initialValue = null) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window?.localStorage?.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = useCallback(valueOrCallback => {
    setStoredValue(oldValue => {
      const nextValue = valueOrCallback instanceof Function ?
        valueOrCallback(oldValue) :
        valueOrCallback;
      window?.localStorage?.setItem(key, JSON.stringify(nextValue));
      return nextValue;
    });
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
