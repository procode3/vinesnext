"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "orderType",
    header: "Order Type",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "topic",
    header: "Topic",
  },
  {
    accessorKey: 'instructions',
    header: "Instuctions"
  },
  {
    accessorKey: 'educationLevel',
    header: "Order Level",
  },
  {
    accessorKey: 'writerDeadline',
    id: "status",
    header: "Deadline",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Move</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },

]