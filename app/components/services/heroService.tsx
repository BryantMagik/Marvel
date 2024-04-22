import { useCallback, useEffect } from 'react'
import useLocalStorage from '@/app/hooks/useLocalStorage'
import { Hero } from "@/app/types/hero"
import initialData from '@/data/wikipedia_marvel_data.json'

export function useHeroService() {
    const [heroes, setHeroes] = useLocalStorage('marvelData', initialData)

    const handleAddHero = useCallback((newHero: Hero) => {
        const id = Date.now().toString()
        const heroWithId = { ...newHero, id }
        const newData = [heroWithId, ...heroes]
        setHeroes(newData)
    }, [heroes, setHeroes])

    const handleEditHero = useCallback((editedHero: Hero) => {
        const updatedHeroes = heroes.map(hero => {
            if (hero.id === editedHero.id) {
                return editedHero
            } else {
                return hero
            }
        })
        setHeroes(updatedHeroes)
    }, [heroes, setHeroes])

    const handleDeleteHero = useCallback((hero: Hero) => {
        const updatedHeroes = heroes.filter(h => h.id !== hero.id)
        setHeroes(updatedHeroes)
    }, [heroes, setHeroes])

    return { heroes, handleAddHero, handleEditHero, handleDeleteHero }
}
