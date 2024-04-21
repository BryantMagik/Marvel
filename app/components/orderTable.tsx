import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import React from "react"

interface OrderTableProps {
    nameTable: string,
    onClick: () => void,
}

const OrderTable: React.FC<OrderTableProps> = ({ onClick, nameTable }) => {
    return (
        <Button variant="ghost" onClick={onClick}>
            {nameTable}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    )
}

export default OrderTable