"use client"
import React, { useCallback, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import useAddHeroHook from "../hooks/useAddHero"
import { Hero } from '@/app/types/hero'
import useHeroValidator from "@/app/hooks/useValidateHero"
import HeroForm from "./heroForm"

interface AddHeroFormProps {
    onAddHero: (newHero: Hero) => void
}
const AddHeroForm: React.FC<AddHeroFormProps> = ({ onAddHero }) => {

    const [heroFields, handleFieldChange] = useAddHeroHook()
    const validateHero = useHeroValidator()
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const validatedHero = validateHero(heroFields)
            onAddHero(validatedHero)
        } catch (error) {
            setError("Error de validación: Algunos campos no son válidos.")
        }
    }, [heroFields, onAddHero, validateHero])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Añadir Héroe</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Descripción del Héroe</DialogTitle>
                    <DialogDescription>
                        Por favor, rellena los siguientes campos para añadir un nuevo héroe.
                    </DialogDescription>
                </DialogHeader>
                <HeroForm initialHero={heroFields} onSubmit={onAddHero} />
            </DialogContent>
        </Dialog>
    )
}

export default AddHeroForm
