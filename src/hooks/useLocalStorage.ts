import { useState } from "react";
import { storage } from "../utils/storage";

export function useLocalStorage<T>(key: string) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storage.getItem(key);
  });

  const setValue = (value: T) => {
    storage.setItem(key, value)
    setStoredValue(value);
  };

  return [storedValue, setValue] as const;
}