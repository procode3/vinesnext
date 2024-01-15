"use client"
import Image from "next/image"
import { useEffect, useState } from 'react';
import { Order, columns } from "../(dashboard)/admin/orders/columns"
import { DataTable } from '../(dashboard)/admin/orders/data-table';
import { Heading } from "@/components/ui/heading";
import { useRouter } from "next/navigation"
import DashCard from ".././(dashboard)/components/dashcard"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"




async function getData(): Promise<Order[]> {
  return [
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

const cardProps = [
  {
    title: "Success Rate",
    value: "97%",
    changeValue: 1,
    changeText: "from last month",
    iconName: "success",
  },
  {
    title: "Orders in Progress",
    value: "20",
    changeText: "Active Orders",
    iconName: "progress",
  },
  {
    title: "Activity Level",
    value: "20",
    changeValue: 18,
    changeText: "from last month",
    iconName: "activity",
  },
  {
    title: "Sanctions",
    value: "2",
    changeValue: 2,
    changeText: "from last month",
    iconName: "sanction",
  },
];

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
      <div className="flex w-full px-8 ">
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* <div className="h-full flex flex-col  gap-2  items-center justify-start col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-1">
            <div className=" w-[60px] h-[60px] md:w-[100px] md:h-[100px] flex relative">
              <Image
                src="/images/avatar-cactus.svg"
                alt="avatar"
                width={100}
                height={100}
                style={{ objectFit: "contain" }}
                priority
              />

            </div>
            <h1 className="text-[14px] md:text-[24px] font-800 font-bold px-4  text-slate-900">Prof_Writer</h1>
          </div> */}
          {cardProps.map((props, index) => (
            <DashCard
              key={index}
              title={props.title}
              value={props.value}
              iconUrl={`/images/${props.iconName}.svg`}
              changeValue={props.changeValue}
              changeText={props.changeText}
            />
          ))}
        </div>
      </div>
      <div className=" py-4">
        <div className="flex items-center justify-between bg-white p-5 rounded-[10px]">
          <Heading title={`Pending orders (${data.length})`} description='Manage your orders' />
        </div>
        <DataTable searchKey="orderId" columns={columns} data={data} onRowClick={(row) => handleRowClick(row, row.orderId)} orderId={''} />
      </div>
    </div>
  )
}