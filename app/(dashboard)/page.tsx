"use client"
import Image from "next/image"
import { useEffect, useState } from 'react';
import { Order, columns } from "../(dashboard)/admin/orders/columns"
import { DataTable } from '../(dashboard)/admin/orders/data-table';
import { Heading } from "@/components/ui/heading";
import { useRouter } from "next/navigation"


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"




 async function getData():Promise<Order[]>{
    return[
{
    orderId: 'GW020',
    name: "Lab report",
    topic: "Science",
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
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
    status: 'pending',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 29, 2023',
    educationLevel: 'college'
  },
    ]
  }

export default function Home() {
    const [data, setData] = useState<Order[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const initialData = await getData();
      setData(initialData);
    };

    fetchData();
  }, []);
  
  

  const router = useRouter();

  const handleRowClick = (row: any, orderId: string) => {
    router.push(`/admin/orders/${row.orderId}`);
  };
 
  
  return (
    <div className="flex flex-col w-screen gap-y-8">
      <div className="flex w-full ">
        <div className="w-1/3 h-full flex flex-col lg:flex-row gap-2  items-center justify-start">
          <div className=" w-[60px] h-[60px] md:w-[100px] md:h-[100px] flex">
            
            <Image
            src="/images/avatar-cactus.svg"
            alt="avatar"
            width={100}
            height={100}
            style={{objectFit: "contain"}}
            />
            
          </div>
          <h1 className="text-[14px] md:text-[24px] font-800 font-bold px-4  text-orange-400">Prof_Writer</h1>
        </div>
      <div className="w-full flex justify-between gap-4">
        <Card className="w-full ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium hidden sm:block">
              Success Rate
            </CardTitle>
             <svg 
              width="15" 
              height="15" 
              viewBox="0 0 15 15" 
              fill="none" xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.85001 7.50043C1.85001 4.37975 4.37963 1.85001 7.50001 1.85001C10.6204 1.85001 13.15 4.37975 13.15 7.50043C13.15 10.6211 10.6204 13.1509 7.50001 13.1509C4.37963 13.1509 1.85001 10.6211 1.85001 7.50043ZM7.50001 0.850006C3.82728 0.850006 0.850006 3.82753 0.850006 7.50043C0.850006 11.1733 3.82728 14.1509 7.50001 14.1509C11.1727 14.1509 14.15 11.1733 14.15 7.50043C14.15 3.82753 11.1727 0.850006 7.50001 0.850006ZM7.00001 8.00001V3.12811C7.16411 3.10954 7.33094 3.10001 7.50001 3.10001C9.93006 3.10001 11.9 5.07014 11.9 7.50043C11.9 7.66935 11.8905 7.83604 11.872 8.00001H7.00001Z" 
                fill="currentColor" 
                fill-rule="evenodd" 
                clip-rule="evenodd"
              >
                </path>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-md md:text-2xl font-bold">97%</div>
            
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium hidden sm:block">
              Orders in Progress
            </CardTitle>
            <svg 
              width="15" 
              height="15" 
              viewBox="0 0 15 15" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M0 1.5C0 1.22386 0.223858 1 0.5 1H2.5C2.77614 1 3 1.22386 3 1.5C3 1.77614 2.77614 2 2.5 2H0.5C0.223858 2 0 1.77614 0 1.5ZM4 1.5C4 1.22386 4.22386 1 4.5 1H14.5C14.7761 1 15 1.22386 15 1.5C15 1.77614 14.7761 2 14.5 2H4.5C4.22386 2 4 1.77614 4 1.5ZM4 4.5C4 4.22386 4.22386 4 4.5 4H11.5C11.7761 4 12 4.22386 12 4.5C12 4.77614 11.7761 5 11.5 5H4.5C4.22386 5 4 4.77614 4 4.5ZM0 7.5C0 7.22386 0.223858 7 0.5 7H2.5C2.77614 7 3 7.22386 3 7.5C3 7.77614 2.77614 8 2.5 8H0.5C0.223858 8 0 7.77614 0 7.5ZM4 7.5C4 7.22386 4.22386 7 4.5 7H14.5C14.7761 7 15 7.22386 15 7.5C15 7.77614 14.7761 8 14.5 8H4.5C4.22386 8 4 7.77614 4 7.5ZM4 10.5C4 10.2239 4.22386 10 4.5 10H11.5C11.7761 10 12 10.2239 12 10.5C12 10.7761 11.7761 11 11.5 11H4.5C4.22386 11 4 10.7761 4 10.5ZM0 13.5C0 13.2239 0.223858 13 0.5 13H2.5C2.77614 13 3 13.2239 3 13.5C3 13.7761 2.77614 14 2.5 14H0.5C0.223858 14 0 13.7761 0 13.5ZM4 13.5C4 13.2239 4.22386 13 4.5 13H14.5C14.7761 13 15 13.2239 15 13.5C15 13.7761 14.7761 14 14.5 14H4.5C4.22386 14 4 13.7761 4 13.5Z" 
                  fill="currentColor" 
                  fill-rule="evenodd" 
                  clip-rule="evenodd">
                </path>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-md md:text-2xl font-bold">{data.length}</div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Active orders
            </p>
          </CardContent>
        </Card> 
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium hidden sm:block">
              Activity Level
            </CardTitle>
           <svg 
              width="15" 
              height="15" 
              viewBox="0 0 15 15" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 1C11.7761 1 12 1.22386 12 1.5V13.5C12 13.7761 11.7761 14 11.5 14C11.2239 14 11 13.7761 11 13.5V1.5C11 1.22386 11.2239 1 11.5 1ZM9.5 3C9.77614 3 10 3.22386 10 3.5V13.5C10 13.7761 9.77614 14 9.5 14C9.22386 14 9 13.7761 9 13.5V3.5C9 3.22386 9.22386 3 9.5 3ZM13.5 3C13.7761 3 14 3.22386 14 3.5V13.5C14 13.7761 13.7761 14 13.5 14C13.2239 14 13 13.7761 13 13.5V3.5C13 3.22386 13.2239 3 13.5 3ZM5.5 4C5.77614 4 6 4.22386 6 4.5V13.5C6 13.7761 5.77614 14 5.5 14C5.22386 14 5 13.7761 5 13.5V4.5C5 4.22386 5.22386 4 5.5 4ZM1.5 5C1.77614 5 2 5.22386 2 5.5V13.5C2 13.7761 1.77614 14 1.5 14C1.22386 14 1 13.7761 1 13.5V5.5C1 5.22386 1.22386 5 1.5 5ZM7.5 5C7.77614 5 8 5.22386 8 5.5V13.5C8 13.7761 7.77614 14 7.5 14C7.22386 14 7 13.7761 7 13.5V5.5C7 5.22386 7.22386 5 7.5 5ZM3.5 7C3.77614 7 4 7.22386 4 7.5V13.5C4 13.7761 3.77614 14 3.5 14C3.22386 14 3 13.7761 3 13.5V7.5C3 7.22386 3.22386 7 3.5 7Z" 
              fill="currentColor" 
              fill-rule="evenodd" 
              clip-rule="evenodd">
                </path>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-sm md:text-2xl font-bold">20</div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium hidden sm:block">
              Sanctions
            </CardTitle>
          <svg 
            width="15" 
            height="15" 
            viewBox="0 0 15 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z" 
                fill="currentColor" 
                fill-rule="evenodd" 
                clip-rule="evenodd">
              </path>
          </svg>
          </CardHeader>
          <CardContent>
            <div className="text-md md:text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Last 30 days
            </p>
          </CardContent>
        </Card>                
      </div>
      </div>
      <div className="container mx-auto py-4">
      <div className="flex items-center justify-between">
        <Heading title={`Pending orders (${data.length})`} description='Manage your orders' />
      </div>
      <DataTable searchKey="orderId" columns={columns} data={data} onRowClick={(row)=> handleRowClick(row, row.orderId)} orderId={''} />
    </div>
    </div>
  )
}


 {/* <div>
        <h2 className="p-4 font-semibold">Active Orders</h2>
        <div>
          <Table>
            <TableCaption>All your pending orders will appear here</TableCaption>
              <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Order Number</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Order Type</TableHead>
                <TableHead className="font-semibold">cpp</TableHead>
                <TableHead className=" font-semibold">Amount</TableHead>
                <TableHead className="text-right font-semibold">Deadline</TableHead>
              </TableRow>
              </TableHeader>
            <TableBody>
              {orders.map((order) => (
              <TableRow
                key={order.orderId}
                onClick={() => router.push(`/admin/orders/${order.orderId}`)}
                className="cursor-pointer hover:bg-orange-100"
              >
                <TableCell className="font-medium">{order.orderId}</TableCell>
                <TableCell className="text-yellow-400">{order.status}</TableCell>
                <TableCell>{order.orderType}</TableCell>
                <TableCell>{order.cpp}</TableCell>
                <TableCell className="">{order.amount}</TableCell>
                <TableCell className="text-right">{order.deadline}</TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div> */}