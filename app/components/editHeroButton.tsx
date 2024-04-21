import React, { useState, useEffect } from 'react'
import { Hero } from '../types/hero'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import HeroForm from './heroForm';
interface EditHeroFormProps {
    hero: Hero;
    onSave: (hero: Hero) => void
}

const EditHeroForm: React.FC<EditHeroFormProps> = ({ hero, onSave }) => {

    const [editedHero, setEditedHero] = useState<Hero>(hero)

    useEffect(() => {
        setEditedHero(hero)
    }, [hero])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Hero) => {
        setEditedHero(prevHero => ({
            ...prevHero,
            [field]: e.target.value
        }))
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(editedHero)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className='border-0'>Editar Héroe</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Descripción del Héroe</DialogTitle>
                    <DialogDescription>
                        Por favor, rellena los siguientes campos para añadir un nuevo héroe.
                    </DialogDescription>
                </DialogHeader>
                <HeroForm initialHero={editedHero} onSubmit={onSave} />
            </DialogContent>
        </Dialog>
    )
}

export default EditHeroForm
