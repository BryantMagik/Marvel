"use client"

import React from 'react'
import { DataTable } from "./components/DataTable/DataTable"
import { columns } from "./types/column"
import AddHeroForm from './components/addHeroButton'
import { useHeroService } from './components/services/heroService'

const Home: React.FC = () => {
  const { heroes, handleAddHero, handleEditHero, handleDeleteHero } = useHeroService();

  return (
    <div className='container mx-auto bg-gradient-to-r from-slate-900 to-slate-700 p-8'>
      <h1 className='text-3xl text-center text-white mb-8'>Heroes</h1>
      <div className='flex items-stretch'>
        <AddHeroForm onAddHero={handleAddHero} />
      </div>
      <DataTable columns={columns(handleEditHero, handleDeleteHero)} data={heroes} />
    </div>
  )
}

export default Home
