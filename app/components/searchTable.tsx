import React from "react";
import { Input } from "@/components/ui/input";

interface SearchTableProps {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchTable: React.FC<SearchTableProps> = ({ value, onChange }) => {
    return (
        <div className="flex w-60 py-4">
            <Input
                placeholder="Buscar héroe específicos"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default SearchTable
