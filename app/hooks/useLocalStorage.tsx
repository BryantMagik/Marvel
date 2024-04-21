import { useState, useEffect } from 'react';
import { Hero } from "../types/hero";

function useLocalStorage(key: string, initialData: Hero[]) {
    const [storedValue, setStoredValue] = useState<Hero[]>([]);

    useEffect(() => {
        const item = localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialData);
    }, [key, initialData]);

    const setValue = (value: Hero[]) => {
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
    };

    return [storedValue, setValue] as const;
}

export default useLocalStorage;
