"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { Hero } from "./types/hero";
import { DataTable } from "./components/DataTable/DataTable";
import { columns } from "./types/column";
import initialData from '@/data/wikipedia_marvel_data.json';
import AddHeroForm from './components/addHeroButton';
import useLocalStorage from './hooks/useLocalStorage';

const Home: React.FC = () => {

  const [heroes, setHeroes] = useLocalStorage('marvelData', initialData);

  function handleAddHero(newHero: any) {
    const newData = [newHero, ...heroes];
    setHeroes(newData);
    localStorage.setItem('marvelData', JSON.stringify(newData));
  }

  const handleEditHero = useCallback((editedHero: Hero) => {

    const heroesEditados = heroes.map(hero =>
      hero.nameLabel === editedHero.nameLabel ? editedHero : hero
    )

    setHeroes(heroesEditados);
    localStorage.setItem('marvelData', JSON.stringify(heroesEditados));
  }, [heroes]);

  const handleDeleteHero = useCallback((hero: Hero) => {
    const updatedHeroes = heroes.filter(h => h.nameLabel !== hero.nameLabel);
    setHeroes(updatedHeroes);
    localStorage.setItem('marvelData', JSON.stringify(updatedHeroes));
  }, [heroes]);

  return (
    <div>
      <AddHeroForm onAddHero={handleAddHero} />
      <DataTable columns={columns(handleEditHero, handleDeleteHero)} data={heroes} />
    </div>
  );
};

export default Home;
