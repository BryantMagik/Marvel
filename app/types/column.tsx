"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Hero } from "./hero"
import OrderTable from "../components/orderTable"
import DataTableRowActions from "../components/DataTable/DataTableRowActions"
import { Search, Settings } from "lucide-react"

export const columns = (onEdit: (hero: Hero) => void, onDelete: (hero: Hero) => void): ColumnDef<Hero>[] => [
    {
        accessorKey: "nameLabel",
        header: ({ column }) => {
            return (
                <OrderTable onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} nameTable="Nombre" />
            )
        },
    },
    {
        accessorKey: "genderLabel",
        header: ({ column }) => {
            return (
                <OrderTable onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} nameTable="Género" />

            )
        },
    },
    {
        accessorKey: "citizenshipLabel",
        header: ({ column }) => {
            return (
                <OrderTable onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} nameTable="País" />

            )
        },
    },
    {
        accessorKey: "skillsLabel",
        header: ({ column }) => {
            return (
                <OrderTable onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} nameTable="Habilidades" />

            )
        },
    },
    {
        accessorKey: "occupationLabel",
        header: ({ column }) => {
            return (
                <OrderTable onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} nameTable="Profesión" />
            )
        },
    },
    {
        accessorKey: "memberOfLabel",
        header: ({ column }) => {
            return (
                <OrderTable onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} nameTable="Organización" />
            )
        },
    },
    {
        accessorKey: "creatorLabel",
        header: ({ column }) => {
            return (
                <OrderTable onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} nameTable="Creador" />
            )
        },
    },
    {
        accessorKey: `Ajustes`,
        header: () => {
            return (
                <div className="flex place-content-center">
                    <Settings />
                </div>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="flex place-content-center">
                    <DataTableRowActions
                        row={row}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div>
            )
        }

    },
]