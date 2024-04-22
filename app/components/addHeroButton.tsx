"use client"
import React, { useCallback } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useAddHeroHook from "../hooks/useAddHero"
import { Hero } from '@/app/types/hero'
import useHeroValidator from "@/app/hooks/useValidateHero"
import HeroForm from "./heroForm"
import DrawOutlineButton from "./buttonNeon";

interface AddHeroFormProps {
    onAddHero: (newHero: Hero) => void
}
const AddHeroForm: React.FC<AddHeroFormProps> = ({ onAddHero }) => {

    const [heroFields] = useAddHeroHook()
    const validateHero = useHeroValidator()

    const handleAddHero = useCallback((newHero: Hero) => {
        if (validateHero(newHero)) onAddHero(newHero)

    }, [onAddHero, validateHero])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DrawOutlineButton>Añadir Héroe</DrawOutlineButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Descripción del Héroe</DialogTitle>
                    <DialogDescription>
                        Por favor, rellena los siguientes campos para añadir un nuevo héroe.
                    </DialogDescription>
                </DialogHeader>
                <HeroForm initialHero={heroFields} onSubmit={handleAddHero} />
            </DialogContent>
        </Dialog>
    )
}

export default AddHeroForm
