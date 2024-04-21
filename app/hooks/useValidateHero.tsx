import { z } from "zod"

const HeroSchema = z.object({
    nameLabel: z.string().min(1).max(50),
    genderLabel: z.string().min(1).max(20),
    citizenshipLabel: z.string().min(1).max(50),
    skillsLabel: z.string().min(1).max(100),
    occupationLabel: z.string().min(1).max(50),
    memberOfLabel: z.string().min(1).max(50),
    creatorLabel: z.string().min(1).max(50),
})

const useHeroValidator = () => {
    const validateHero = (fields: any) => {
        try {
            const validatedHero = HeroSchema.parse(fields)
            return validatedHero
        } catch (error) {
            console.error("Error de validación:", error)
            throw error
        }
    }

    return validateHero
}

export default useHeroValidator