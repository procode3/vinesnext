import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import { taskSchema } from "./data/schema"
import { httpGetOrders } from '@/app/(dashboard)/hooks/requests'
import { getServerSession } from 'next-auth'
import { options } from '@/pages/api/auth/options'


export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a database read for tasks.


export default async function TaskPage({ type = '' }: { type: string; }) {
  const session: {user:{id: string}} | null = await getServerSession(options)

  const tasks = await httpGetOrders();
  let filterdTasks = tasks?.data;
  if (!!type && type === 'available') {
    filterdTasks = filterdTasks.filter((order) => order?.status === 'available');
  }
  if (!!type && type === 'myorders') {
    filterdTasks = filterdTasks.filter((order) => order?.writerId === session?.user?.id)
  }
  if(type =='client'){
    filterdTasks = filterdTasks.filter((order) => order?.clientId === session?.user?.id)
  }


  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks!
          </p>
        </div>
        <DataTable data={filterdTasks} columns={columns} />
      </div>
    </>
  )
}
