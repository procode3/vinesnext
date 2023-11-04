import Image from "next/image"
import { Order, columns } from "./columns"
import { DataTable } from '@/components/ui/data-table';
import { Heading } from "@/components/ui/heading";
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button";


 async function getData():Promise<Order[]>{
    return[
{
    orderId: 'GW020',
    name: "Lab report",
    topic: "Science",
    status: 'available',
    orderType: 'Other',    
    cpp: 3,
    amount: 25.00,
    writerDeadline: 'Oct 25, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW021',
    name: "Bio Essay",
    topic: "Science",
    status: 'available',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 29, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW022',
    name: "Civil Eng",
    topic: "Science",
    status: 'available',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 29, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW023',
    name: "Bio Hack",
    topic: "Science",
    status:'available',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 29, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW020',
    name: "Lab report",
    topic: "Science",
    status: 'available',
    orderType: 'Other',    
    cpp: 3,
    amount: 25.00,
    writerDeadline: 'Oct 25, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW021',
    name: "Bio Essay",
    topic: "Science",
    status: 'available',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 29, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW022',
    name: "Civil Eng",
    topic: "Science",
    status: 'available',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 29, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW023',
    name: "Bio Hack",
    topic: "Science",
    status: 'available',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 29, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW020',
    name: "Lab report",
    topic: "Science",
    status: 'available',
    orderType: 'Other',    
    cpp: 3,
    amount: 25.00,
    writerDeadline: 'Oct 25, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW021',
    name: "Bio Essay",
    topic: "Science",
    status: 'available',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 29, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW022',
    name: "Civil Eng",
    topic: "Science",
    status: 'available',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 29, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW023',
    name: "Bio Hack",
    topic: "Science",
    status: 'available',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 29, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW020',
    name: "Lab report",
    topic: "Science",
    status: 'available',
    orderType: 'Other',    
    cpp: 3,
    amount: 25.00,
    writerDeadline: 'Oct 25, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW021',
    name: "Bio Essay",
    topic: "Science",
    status: 'available',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 29, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW022',
    name: "Civil Eng",
    topic: "Science",
    status: 'available',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 24, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW023',
    name: "Bio Hack",
    topic: "Science",
    status: 'available',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 29, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW020',
    name: "Lab report",
    topic: "Science",
    status: 'available',
    orderType: 'Other',    
    cpp: 3,
    amount: 25.00,
    writerDeadline: 'Oct 25, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW021',
    name: "Bio Essay",
    topic: "Science",
    status: 'available',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 29, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW022',
    name: "Civil Eng",
    topic: "Science",
    status: 'available',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 29, 2023',
    educationLevel: 'college'
  },
  {
    orderId: 'GW023',
    name: "Bio Hack",
    topic: "Science",
    status: 'available',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 29, 2023',
    educationLevel: 'college'
  },
    ]
  }

export default async function Orders() {
  
  const data = await getData()

 
  
  return (
    
      <div className="container mx-auto py-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <Heading title={`Available orders (${data.length})`} description='Manage your orders' />
      </div>
      <DataTable searchKey="orderId" columns={columns} data={data} />
    </div>
    
  )
}


