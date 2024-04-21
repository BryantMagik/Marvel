import { Button } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import EditHeroForm from '../editHeroButton'
import { Hero } from '@/app/types/hero'

interface DataTableRowActionsProps<Hero> {
    row: Row<Hero>
    onEdit: (value: Hero) => void
    onDelete: (value: Hero) => void
}

const DataTableRowActions: React.FC<DataTableRowActionsProps<Hero>> = ({ row, onEdit, onDelete }) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <EditHeroForm hero={row.original} onSave={(editedHero) => { onEdit(editedHero) }} />
                <DropdownMenuSeparator />
                <Button className='border-0' variant="outline" onClick={() => onDelete(row.original)}>Borrar Héroe</Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DataTableRowActions