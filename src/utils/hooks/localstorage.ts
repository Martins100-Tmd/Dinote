import { useState, useEffect } from 'react';

function useLocalStorage(key: any, defaultValue: any) {
   const [storedValue, setStoredValue] = useState(() => {
      try {
         const item = window.localStorage.getItem(key);
         return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
         console.error('Error parsing item from localStorage', error);
         return defaultValue;
      }
   });

   useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
   }, [storedValue, key]);

   return [storedValue, setStoredValue];
}
export default useLocalStorage;
