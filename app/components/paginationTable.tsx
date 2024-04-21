import React from "react"
import { Button } from "@/components/ui/button"


interface PaginationTableProps {
    previousPage(): void
    nextPage(): void
    canPreviousPage: boolean
    canNextPage: boolean
}
const PaginationTable: React.FC<PaginationTableProps> = ({ previousPage, nextPage, canPreviousPage, canNextPage, }) => {
    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <Button
                variant="outline"
                size="sm"
                onClick={previousPage}
                disabled={canPreviousPage}
            >
                Anterior
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={canNextPage}
            >
                Siguiente
            </Button>
        </div>
    )
}

export default PaginationTable