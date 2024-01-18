'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"


import { toast } from "@/components/ui/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useEffect, useState } from 'react';
import { Order, columns } from "./columns"
import { DataTable } from '../admin/orders/data-table';
import { Heading } from "@/components/ui/heading";
import { useRouter } from "next/navigation"
import DashCard from "../components/dashcard"
import Image from 'next/image'
import Overview from "../components/overview/overview"
import RankingItem from "../components/rankingItem"



const items = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "available",
    label: "Available",
  },
  {
    id: "pending",
    label: "Pending",
  },
  {
    id: "active",
    label: "Active",
  },
  {
    id: "completed",
    label: "Completed",
  },
  {
    id: "revision",
    label: "Revision",
  },
  {
    id: "disputed",
    label: "Disputed",
  },
] as const


const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})




async function getData(): Promise<Order[]> {
  return [
    {
      orderId: 'GW020',
      name: "Lab report",
      writer: "",
      status: 'available',
      orderType: 'Other',
      writerDeadline: 'Oct 25, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW021',
      name: "Bio Essay",
      writer: "Prof_Writer",
      status: 'completed',
      orderType: 'Writing',
      writerDeadline: 'Oct 29, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW022',
      name: "Civil Eng",
      writer: "",
      status: 'available',
      orderType: 'Writing',
      writerDeadline: 'Oct 29, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW023',
      name: "Bio Hack",
      writer: "",
      status: 'pending',
      orderType: 'Writing',
      writerDeadline: 'Oct 29, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW020',
      name: "Lab report",
      writer: "",
      status: 'available',
      orderType: 'Other',
      writerDeadline: 'Oct 25, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW021',
      name: "Bio Essay",
      writer: "",
      status: 'available',
      orderType: 'Writing',
      writerDeadline: 'Oct 29, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW022',
      name: "Civil Eng",
      writer: "Prof_Writer",
      status: 'active',
      orderType: 'Writing',
      writerDeadline: 'Oct 29, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW023',
      name: "Bio Hack",
      writer: "Prof_Writer",
      status: 'active',
      orderType: 'Writing',
      writerDeadline: 'Oct 29, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW020',
      name: "Lab report",
      writer: "",
      status: 'available',
      orderType: 'Other',
      writerDeadline: 'Oct 25, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW021',
      name: "Bio Essay",
      writer: "Prof_Writer",
      status: 'revision',
      orderType: 'Writing',
      writerDeadline: 'Oct 29, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW022',
      name: "Civil Eng",
      writer: "",
      status: 'available',
      orderType: 'Writing',
      writerDeadline: 'Oct 29, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW023',
      name: "Bio Hack",
      writer: "Prof_Writer",
      status: 'completed',
      orderType: 'Writing',
      writerDeadline: 'Oct 29, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW020',
      name: "Lab report",
      writer: "Prof_Writer",
      status: 'pending',
      orderType: 'Other',
      writerDeadline: 'Oct 25, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW021',
      name: "Bio Essay",
      writer: "Prof_Writer",
      status: 'disputed',
      orderType: 'Writing',
      writerDeadline: 'Oct 29, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW022',
      name: "Civil Eng",
      writer: "",
      status: 'available',
      orderType: 'Writing',
      writerDeadline: 'Oct 24, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW023',
      name: "Bio Hack",
      writer: "Prof_Writer",
      status: 'pending',
      orderType: 'Writing',
      writerDeadline: 'Oct 29, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW020',
      name: "Lab report",
      writer: "",
      status: 'available',
      orderType: 'Other',
      writerDeadline: 'Oct 25, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW021',
      name: "Bio Essay",
      writer: "",
      status: 'available',
      orderType: 'Writing',
      writerDeadline: 'Oct 29, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW022',
      name: "Civil Eng",
      writer: "Prof_Writer",
      status: 'active',
      orderType: 'Writing',
      writerDeadline: 'Oct 29, 2023',
      educationLevel: 'college'
    },
    {
      orderId: 'GW023',
      name: "Bio Hack",
      writer: "Prof_Writer",
      status: 'disputed',
      orderType: 'Writing',
      writerDeadline: 'Oct 29, 2023',
      educationLevel: 'college'
    },
  ]
}

const cardProps = [
  {
    title: "Total revenue",
    value: "$45000",
    changeValue: 1,
    changeText: "from last month",
    iconName: "revenue",
  },
  {
    title: "All Orders",
    value: "2100",
    changeValue: 21,
    changeText: "Active Orders",
    iconName: "progress",
  },
  {
    title: "Active writers",
    value: "48",
    changeValue: 18,
    changeText: "from last month",
    iconName: "activewriter",
  },
  {
    title: "In Progress",
    value: "560",
    changeValue: 2,
    changeText: "from last month",
    iconName: "progress",
  },
];

const rankingData = [
  {
    rank: 1,
    avatarSrc: "/images/avatar-cactus.svg",
    name: "John Doe",
    points: "+150"
  },
  {
    rank: 2,
    avatarSrc: "/images/sloth.svg",
    name: "Jane Smith",
    points: "+120"
  },
  {
    rank: 3,
    avatarSrc: "/images/avatar-cactus.svg",
    name: "Bob Johnson",
    points: "+100"
  },
  {
    rank: 4,
    avatarSrc: "/images/sloth.svg",
    name: "Alice Williams",
    points: "+70"
  },
  {
    rank: 5,
    avatarSrc: "/images/avatar-cactus.svg",
    name: "Charlie Brown",
    points: "+40"
  },
  {
    rank: 6,
    avatarSrc: "/images/sloth.svg",
    name: "Emma Davis",
    points: "+40"
  },
  {
    rank: 7,
    avatarSrc: "/images/avatar-cactus.svg",
    name: "Frank Miller",
    points: "+40"
  },
  {
    rank: 8,
    avatarSrc: "/images/sloth.svg",
    name: "Grace Wilson",
    points: "+40"
  },
  {
    rank: 9,
    avatarSrc: "/images/avatar-cactus.svg",
    name: "Henry Jones",
    points: "+40"
  },
  {
    rank: 10,
    avatarSrc: "/images/sloth.svg",
    name: "Isabel White",
    points: "+40"
  }
]


function Dashboard() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["all"],
    },
  })



  const [data, setData] = useState<Order[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.items.length > 0 && !data.items.includes("all")) {
      setSelectedStatuses([...data.items]);
    } else if (data.items.includes("all")) {
      setSelectedStatuses(["available", "pending", "active", "completed", "revision", "disputed"]);
    }
  }

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

  const filteredOrders = data.filter((order) =>
    selectedStatuses.length > 0 ? selectedStatuses.includes(order.status) : true
  );


  return (
    <div className="w-full flex flex-col">
      <div className='flex w-full h-1/5 justify-between items-center py-5'>
        <div>
          <h2 className='font-bold text-3xl'>Welcome back, Erick!</h2>
          <p className='text-muted opacity-0.5'>Take a look at you dashboard:)</p>
        </div>
        <div className='relative h-[70px] w-[70px]'>
          <Image
            src={`/images/bell.svg`}
            fill={true}
            style={{ objectFit: "cover" }}
            alt='bell' />
          <div className='absolute top-0 right-0'>5</div>
        </div>

      </div>
      <div className="  w-full space-y-4">
        <div className="grid gap-4 grid-cols-3 ">
          <Card className=" col-span-3 md:col-span-2 rounded-xl bg-[#1F4A57]">
            <CardHeader className=' top-0 w-full '>
              <CardTitle className="leading-wide text-gray-100 tracking-tight flex items-center justify-between">
                <p className="text-lg md:text-3xl">Overview</p>
                <p className="text-lg md:text-3xl  text-green-400">$4500</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 w-full h-full">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3 md:col-span-1 rounded-xl h-[40vh] overflow-y-scroll">
            <CardHeader>
              <CardTitle>Writer Ranking</CardTitle>
              <CardDescription>
                Top Writers this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col text-sm font-md pr-3">
                {rankingData.map((item) => (
                  <RankingItem
                    key={item.rank}
                    rank={item.rank}
                    avatarSrc={item.avatarSrc}
                    name={item.name}
                    points={item.points}
                  />
                ))}
              </div>
              <p className="text-center hover:text-green-600 pointer">see more...</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
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

    </div>
  )
}

export default Dashboard
