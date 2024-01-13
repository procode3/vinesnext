'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod" 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
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


  

 async function getData():Promise<Order[]>{
    return[
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
    status:'pending',
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
      } else if(data.items.includes("all")) {
      setSelectedStatuses(["available", "pending", "active", "completed", "revision", "disputed" ]);
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

    <div className="  w-full space-y-4">
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
      <div className="grid gap-4 grid-cols-3">
        <Card className="col-span-3 md:col-span-2 rounded-xl">
          <CardHeader>
            <CardTitle>
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2 w-full h-full">
              <Overview/>
          </CardContent>
        </Card>
        <Card className="col-span-3 md:col-span-1 ">
          <CardHeader>
            <CardTitle>Writer Ranking</CardTitle>
            <CardDescription>
              Top Writers this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col text-lg font-semibold pr-3 h-[50vh] overflow-y-scroll">
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
    </div>
    <div className="py-4 overflow-hidden">
      <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-4 sm:justify-between w-full">
        <div className="w-1/3">
        <Heading title={`Orders (${filteredOrders.length})`} description='Manage your orders' />
        </div>
        <div className="flex   flex-wrap items-center justify-end gap-4 w-2/3">
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Filter</FormLabel>
                <FormDescription>
                  Select the orders you want to display.
                </FormDescription>
              </div>
              <div className="flex flex-wrap gap-4">
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Apply</Button>
      </form>
      </Form>
        </div>
      </div>
      <DataTable  searchKey="orderId" columns={columns} data={filteredOrders} onRowClick={(row)=> handleRowClick(row, row.orderId)} orderId={''} />
    </div>
    </div>
  )
}

export default Dashboard
