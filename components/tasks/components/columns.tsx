"use client"

import { format, differenceInMilliseconds, isPast, isWithinInterval, add } from "date-fns";
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { labels, priorities, statuses } from "../data/data"
import { Order } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"


import {
  ArrowUpIcon,
} from "@radix-ui/react-icons"

import Deadline from './deadline'
import Link from "next/link";

//return remaining time to deadline in format "1d 4h 20m"
const formatDate = (date: any) => {
  // Convert the deadline string to a Date object
  const deadlineDate = new Date(date);

  // Check if the deadline is overdue
  if (isPast(deadlineDate)) {
    const overdueTime = differenceInMilliseconds(Date.now(), deadlineDate);
    const overdueDays = Math.floor(overdueTime / (24 * 60 * 60 * 1000));
    const overdueHours = Math.floor((overdueTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const overdueMinutes = Math.floor((overdueTime % (60 * 60 * 1000)) / (60 * 1000));

    return {
      date: `${overdueDays}d ${overdueHours}h ${overdueMinutes}m`,
      status: "Overdue",
    };
  }

  // Calculate the difference in milliseconds
  const differenceMs = differenceInMilliseconds(deadlineDate, Date.now());

  // Calculate days, hours, and minutes
  const days = Math.floor(differenceMs / (24 * 60 * 60 * 1000));
  const hours = Math.floor((differenceMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((differenceMs % (60 * 60 * 1000)) / (60 * 1000));

  // Check if the deadline is within the next 24 hours
  const isUrgent = differenceMs < 24 * 60 * 60 * 1000;
  const urgencyStatus = isUrgent ? "Urgent" : "On time";

  return {
    date: `${days}d ${hours}h ${minutes}m`,
    status: urgencyStatus,
  };
}

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order" />
    ),
    cell: ({ row }) => <Link href={`/orders/${row.original.id}`} className="w-[80px] hover:underline">{row.getValue("name")}</Link>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "topic",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) =>
        label.value === row.original.subject.toLocaleLowerCase())
      return (
        <div className="flex space-x-2">
          {label && <Badge className='bg-teal-200 border border-emerald-700' variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("topic")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "words",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Words" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">

          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("words")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "citationStyle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Citation" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">

          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("citationStyle")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "sources",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sources" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">

          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("sources")}
          </span>
        </div>
      )
    },
  },

  {
    accessorKey: "orderStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value?.toLocaleUpperCase() === row.getValue("orderStatus")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "clientDeadline",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deadline" />
    ),
    cell: ({ row }) => {

      const clientDeadline = row.getValue("clientDeadline")

      if (!clientDeadline) {
        return null
      }

      return (
        <div className="flex items-center">
          {(
            <ArrowUpIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{format(new Date(row.getValue("clientDeadline")), "dd MMM, HH:mm aa")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
