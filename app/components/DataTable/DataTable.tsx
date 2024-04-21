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
} from "@tanstack/react-table";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SearchTable from "../searchTable";
import PaginationTable from "../paginationTable";
import { Hero } from "../../types/hero";

interface DataTableProps{
    columns: ColumnDef<Hero>[]
    data: Hero[]
}
export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

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
        <div className="rounded-md border">
            <SearchTable
                value={(table.getColumn("nameLabel")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("nameLabel")?.setFilterValue(event.target.value)}
            />
            <Table>
                <TableHeader className="bg-black text-white hover:bg-black">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} className="hover:bg-black">
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
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