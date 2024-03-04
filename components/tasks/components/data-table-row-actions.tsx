"use client"

import React from "react"
import { useState } from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { statuses } from "../data/data"
import { orderSchema } from "../data/schema"

import { AssignOrder } from "./modals/assign-writer"
import { EditOrderForm } from "./modals/edit-order"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [modal, setModal] = useState<string | null>(null)

  const order = orderSchema.parse(row.original);
  const { writerId, id }: any = order;

  return (
    <Dialog >


      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DialogTrigger asChild >
            <span className='w-full h-full' onClick={() => setModal("edit")}>
              <DropdownMenuItem >
                Edit
              </DropdownMenuItem>
            </span>
          </DialogTrigger>

          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DialogTrigger asChild>
            <span className='w-full h-full ' onClick={() => setModal("assign")}>
              <DropdownMenuItem>
                Assign Writer
              </DropdownMenuItem>
            </span>
          </DialogTrigger>

          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={order.subject}>
                {statuses.map((label) => (
                  <DropdownMenuRadioItem key={label.value} value={label.value || ""}>
                    {label.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className={modal === "edit" ? `sm:max-w-[825px]  h-4/5 ` : `sm:max-w-[425px]`}>
        {
          modal === "edit" ?
            <>
              <DialogHeader className='sticky	'>
                <DialogTitle>Edit Order {`#${order.name}`}</DialogTitle>
                <DialogDescription>
                  Make changes to the Order. Click save when you are done.
                </DialogDescription>
              </DialogHeader>
              <EditOrderForm order={row.original} />
            </>
            :
            <>
              <DialogHeader>
                <DialogTitle>Assign Order</DialogTitle>
                <DialogDescription>
                  Directly assign this order to a writer.
                </DialogDescription>
              </DialogHeader>
              <AssignOrder order={order} />
            </>
        }


      </DialogContent>






    </Dialog>
  )
}
