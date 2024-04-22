import { useState, useEffect } from 'react'
import { Hero } from "@/app/types/hero"

function useLocalStorage(key: string, initialData: Hero[]) {
    const [storedValue, setStoredValue] = useState<Hero[]>([])

    useEffect(() => {
        const item = localStorage.getItem(key)
        if (item) {
            setStoredValue(JSON.parse(item))
        } else {
            const dataWithId = initialData.map((hero, index) => ({
                ...hero,
                id: Date.now() + index.toString()
            }));
            setStoredValue(dataWithId)
            localStorage.setItem(key, JSON.stringify(dataWithId))
        }
    }, [key, initialData])

    const setValue = (value: Hero[]) => {
        setStoredValue(value)
        localStorage.setItem(key, JSON.stringify(value))
    };

    return [storedValue, setValue] as const;
}

export default useLocalStorage
