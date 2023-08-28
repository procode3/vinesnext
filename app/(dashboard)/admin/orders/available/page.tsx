"use client"

import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table';
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import { httpGetOrders } from '@/app/(dashboard)/hooks/requests';
import { columns } from './columns';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import parseISO from 'date-fns/parseISO'


import Link from 'next/link';
import { useEffect } from 'react';
import { it } from 'node:test';



export default function AvailableOrders() {

  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    httpGetOrders(session)
      .then((data) => {
        const updated = data.data.map((item: any) => {
          try {
            item.attributes.writerDeadline = parseISO(item.attributes.writerDeadline);
          } catch (error) {
            return item.attributes
          }
          return item.attributes
        });

        setOrders(updated);

      });

  }, [])



  return (
    <div className=" w-4/5 flex  flex-col py-4 rounded-xl">
      <div className="flex items-center justify-between">
        <Heading title={`Available Orders (${orders.length})`} description='Manage  your Available Orders' />
        <Link href='/admin/createorder' className={buttonVariants({ variant: "default" })}>Add Order</Link>
      </div>
      <DataTable searchKey="name" columns={columns} data={orders} />
    </div>
  )
}



