"use client"

import {
    ColumnDef,
    flexRender,
    useReactTable,
    SortingState,
    getSortedRowModel,
    getCoreRowModel,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,
} from "@tanstack/react-table"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SearchTable from "../searchTable"
import PaginationTable from "../paginationTable"
import { Hero } from "../../types/hero"

interface DataTableProps {
    columns: ColumnDef<Hero>[]
    data: Hero[]
}
export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        }
    })
    return (
        <div className="">
            <div className="flex items-stretch place-content-center	w-100">
                <SearchTable
                    value={(table.getColumn("nameLabel")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("nameLabel")?.setFilterValue(event.target.value)}
                />
            </div>
            <Table className="text-center mt-4">
                <TableHeader className="bg-black">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="hover:bg-black">
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="group relative px-4 py-2 text-white transition-colors duration-[400ms] hover:text-cyan-500">
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-cyan-400 transition-all delay-100 duration-400 group-hover:w-full" />
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} className="text-center hover:bg-black group relative px-4 py-2 text-white transition-colors duration-[400ms] hover:text-white">
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-cyan-400 transition-all delay-100 duration-700 group-hover:w-full" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center text-white">
                                No se han encontrado heroes con ese nombre...
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <PaginationTable
                previousPage={() => table.previousPage()}
                nextPage={() => table.nextPage()}
                canPreviousPage={!table.getCanPreviousPage()}
                canNextPage={!table.getCanNextPage()}
            />
        </div>
    )
}