"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
 
import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"


export type Order = {
    orderId: string
    orderType: string
    name: string
    writer: string
    status: "pending" | "available" | "completed" | "active" | "disputed" | "revision"
    writerDeadline: string
    educationLevel: string
}

export const columns: ColumnDef<Order>[] = [

  {
    accessorKey: "orderId",
    header: "Order Number",
  },
  {
    accessorKey: "orderType",
    header: "Order Type",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
   
   
  {
    accessorKey: "writer",
    header: "Writer",
  },
  {
    accessorKey: 'educationLevel',
    header: "Order Level",
  },
  {
    accessorKey: 'writerDeadline',
    id: "deadline",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="font-bold">Deadline</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const od = row.original
 
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(od.orderId)}
  //           >
  //             Copy Order Number
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>Open</DropdownMenuItem>
  //           <DropdownMenuItem>Submit</DropdownMenuItem>
  //           <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
  //           <DropdownMenuItem>Mark as disputed</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]
