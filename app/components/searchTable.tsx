import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchTableProps {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchTable: React.FC<SearchTableProps> = ({ value, onChange }) => {
    return (
        <Input
            className="border-sky-500 neon-border text-white w-60"
            placeholder="Encuentra al héroe que buscas..."
            value={value}
            onChange={onChange}
        />
    )
}

export default SearchTable
