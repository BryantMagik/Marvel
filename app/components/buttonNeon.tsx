import React, { ReactNode, forwardRef, ButtonHTMLAttributes } from 'react'

interface DrawOutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}

const DrawOutlineButton = forwardRef<HTMLButtonElement, DrawOutlineButtonProps>(({ children, ...rest }, ref) => {
    return (
        <button
            {...rest}
            ref={ref}
            className={`group relative px-4 py-2 font-medium text-white transition-colors duration-[400ms] hover:text-cyan-500 ${rest.className}`}
            type="button"
        >
            <span className="neon-text hover:text-cyan-950">{children}
            <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-cyan-400 transition-all delay-100 duration-400 group-hover:w-full hover:text-cyan-950" />

            </span>
        </button>
    )
})

export default DrawOutlineButton;
