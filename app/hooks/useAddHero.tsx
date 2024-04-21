import { useState } from "react";
import { Hero } from '@/app/types/hero'

const useAddHeroHook = () => {
    const [heroFields, setHeroFields] = useState<Hero>({
        nameLabel: "",
        genderLabel: "",
        citizenshipLabel: "",
        skillsLabel: "",
        occupationLabel: "",
        memberOfLabel: "",
        creatorLabel: "",
    })

    const handleAddNewHero = (
        onAddHero: (newHero: Hero) => void
    ) => {
        onAddHero(heroFields);

        setHeroFields({
            nameLabel: "",
            genderLabel: "",
            citizenshipLabel: "",
            skillsLabel: "",
            occupationLabel: "",
            memberOfLabel: "",
            creatorLabel: "",
        })
    }

    const handleFieldChange = (fieldName: string) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setHeroFields((prevHeroFields) => ({
            ...prevHeroFields,
            [fieldName]: event.target.value,
        }))
    }

    return [heroFields, handleFieldChange, handleAddNewHero] as const;
}

export default useAddHeroHook