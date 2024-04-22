import { useState } from "react"
import { Hero } from '@/app/types/hero'

const useAddHeroHook = () => {
    const [heroFields] = useState<Hero>({
        nameLabel: "",
        genderLabel: "",
        citizenshipLabel: "",
        skillsLabel: "",
        occupationLabel: "",
        memberOfLabel: "",
        creatorLabel: "",
    })

    return [heroFields] as const
}

export default useAddHeroHook