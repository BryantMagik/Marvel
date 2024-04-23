import React, { useState } from "react"
import {
    ColumnDef,
    useReactTable,
    flexRender,
    SortingState,
    getSortedRowModel,
    getCoreRowModel,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,
} from "@tanstack/react-table"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SearchTable from "../searchTable"
import PaginationTable from "../paginationTable"
import { Hero } from "../../types/hero"
import { Button } from "@/components/ui/button"

interface DataTableProps {
    columns: ColumnDef<Hero>[]
    data: Hero[]
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
        },
    })

    const handleRowClick = (hero: Hero) => {
        setSelectedHero(hero);
        setIsDialogOpen(true);
    }

    return (
        <div>
            <div className="flex items-stretch place-content-center w-full">
                <SearchTable
                    value={(table.getColumn("nameLabel")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("nameLabel")?.setFilterValue(event.target.value)}
                />
            </div>
            <Table className="text-center mt-4">
                <TableHeader className="bg-black">
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id} className="hover:bg-black">
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id} className="px-4 py-2 text-white">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id} className="cursor-pointer hover:bg-gray-800 group relative px-4 py-2 text-white transition-colors duration-[400ms] hover:text-white">
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id}>
                                    <span onClick={() => handleRowClick(row.original)} className="absolute bottom-0 left-0 h-[4px] w-0 bg-cyan-400 transition-all delay-100 duration-700 group-hover:w-full" />
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <PaginationTable
                previousPage={table.previousPage}
                nextPage={table.nextPage}
                canPreviousPage={!table.getCanPreviousPage()}
                canNextPage={!table.getCanNextPage()}
            />

            {selectedHero && (
                <AlertDialog open={isDialogOpen} >
                <AlertDialogContent className="w-full max-w-2xl bg-white p-5 rounded-lg shadow-lg">
                    <AlertDialogHeader className="border-b pb-3">
                        <AlertDialogTitle className="text-lg font-semibold"><span>Heroe: {selectedHero.nameLabel}</span></AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription className="grid grid-cols-2 gap-4 p-4">
                        <span>Nombre: {selectedHero.nameLabel}</span>
                        <span>Género: {selectedHero.genderLabel}</span>
                        <span>País: {selectedHero.citizenshipLabel}</span>
                        <span>Habilidades: {selectedHero.skillsLabel}</span>
                        <span>Profesión: {selectedHero.occupationLabel}</span>
                        <span>Miembro de: {selectedHero.memberOfLabel}</span>
                        <span>Creador: {selectedHero.creatorLabel}</span>
                    </AlertDialogDescription>
                    <AlertDialogFooter className="flex justify-end pt-4 border-t">
                        <Button onClick={() => setIsDialogOpen(false)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors">Cerrar</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            )}
        </div>
    )
}
