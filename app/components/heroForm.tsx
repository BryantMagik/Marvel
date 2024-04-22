import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Hero } from '@/app/types/hero'

interface HeroFormProps {
    initialHero: Hero
    onSubmit: (hero: Hero) => void
}

const HeroForm: React.FC<HeroFormProps> = ({ initialHero, onSubmit }) => {
    const [heroFields, setHeroFields] = useState<Hero>(initialHero)
    const [error, setError] = useState<string | null>(null)

    const handleFieldChange = (field: keyof Hero) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setHeroFields(prev => ({
            ...prev,
            [field]: event.target.value,
        }))
    }

    const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleFieldChange('genderLabel')(event as unknown as React.ChangeEvent<HTMLInputElement>)
    }

    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            onSubmit(heroFields)
        } catch (err) {
            setError('El héroe no es válido. Por favor, revisa los campos introducidos.')
        }
    }, [heroFields, onSubmit])

    return (
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-2 gap-4">
                <Label htmlFor="nameLabel">Nombre</Label>
                <Input
                    id="nameLabel"
                    value={heroFields.nameLabel}
                    placeholder="Nombre"
                    onChange={handleFieldChange("nameLabel")}
                />
                <Label htmlFor="genderLabel">Género</Label>
                <select
                    id="genderLabel"
                    value={heroFields.genderLabel}
                    onChange={handleGenderChange}
                    className="border border-gray-300 rounded-md px-3 py-1"
                >
                    <option value="">Selecciona el género</option>
                    <option value="Male">Masculino</option>
                    <option value="Female">Femenino</option>
                </select>
                <Label htmlFor="citizenshipLabel">Ciudadanía</Label>
                <Input
                    id="citizenshipLabel"
                    value={heroFields.citizenshipLabel}
                    placeholder="Ciudadanía"
                    onChange={handleFieldChange("citizenshipLabel")}
                />
                <Label htmlFor="skillsLabel">Habilidades</Label>
                <Input
                    id="skillsLabel"
                    value={heroFields.skillsLabel}
                    placeholder="Habilidades"
                    onChange={handleFieldChange("skillsLabel")}
                />
                <Label htmlFor="occupationLabel">Ocupación</Label>
                <Input
                    id="occupationLabel"
                    value={heroFields.occupationLabel}
                    placeholder="Ocupación"
                    onChange={handleFieldChange("occupationLabel")}
                />
                <Label htmlFor="memberOfLabel">Miembro de</Label>
                <Input
                    id="memberOfLabel"
                    value={heroFields.memberOfLabel}
                    placeholder="Miembro de"
                    onChange={handleFieldChange("memberOfLabel")}
                />
                <Label htmlFor="creatorLabel">Creador</Label>
                <Input
                    id="creatorLabel"
                    value={heroFields.creatorLabel}
                    placeholder="Creador"
                    onChange={handleFieldChange("creatorLabel")}
                />
            </div>
            <Button type="submit">Añadir</Button>
        </form>
    );
};

export default HeroForm
