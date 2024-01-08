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

    <div className=" container w-full space-y-4">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              All Orders
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{`+${data.length}`}</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Writers
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">

          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Writer Ranking</CardTitle>
            <CardDescription>
              Top Writers this month.
            </CardDescription>
          </CardHeader>
          <CardContent>

          </CardContent>
        </Card>
      </div>
    </div>
    <div className="container mx-auto py-4 overflow-hidden">
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
































// 'use client'

// import React from 'react'

// import Image from "next/image"

// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// import { useEffect, useState } from 'react';
// import { Order, columns } from "../admin/orders/columns"
// import { DataTable } from '../admin/orders/data-table';
// import { Heading } from "@/components/ui/heading";
// import { useRouter } from "next/navigation"



// const items = [
//   {
//     id: "available",
//     label: "Available",
//   },
//   {
//     id: "pending",
//     label: "Pending",
//   },
//   {
//     id: "completed",
//     label: "Completed",
//   },
//   {
//     id: "revision",
//     label: "Revision",
//   },
//   {
//     id: "disputed",
//     label: "Disputed",
//   },
//   {
//     id: "revision",
//     label: "Revision",
//   },
// ] as const




//  async function getData():Promise<Order[]>{
//     return[
// {
//     orderId: 'GW020',
//     name: "Lab report",
//     topic: "Science",
//     status: 'available',
//     orderType: 'Other',    
//     cpp: 3,
//     amount: 25.00,
//     writerDeadline: 'Oct 25, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW021',
//     name: "Bio Essay",
//     topic: "Science",
//     status: 'completed',
//     orderType: 'Writing',
//     cpp: 2.5,
//     amount: 25.00,
//     writerDeadline: 'Oct 29, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW022',
//     name: "Civil Eng",
//     topic: "Science",
//     status: 'available',
//     orderType: 'Writing',
//     cpp: 2.5,
//     amount: 25.00,
//     writerDeadline: 'Oct 29, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW023',
//     name: "Bio Hack",
//     topic: "Science",
//     status:'pending',
//     orderType: 'Writing',
//     cpp: 2.5,
//     amount: 25.00,
//     writerDeadline: 'Oct 29, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW020',
//     name: "Lab report",
//     topic: "Science",
//     status: 'available',
//     orderType: 'Other',    
//     cpp: 3,
//     amount: 25.00,
//     writerDeadline: 'Oct 25, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW021',
//     name: "Bio Essay",
//     topic: "Science",
//     status: 'available',
//     orderType: 'Writing',
//     cpp: 2.5,
//     amount: 25.00,
//     writerDeadline: 'Oct 29, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW022',
//     name: "Civil Eng",
//     topic: "Science",
//     status: 'active',
//     orderType: 'Writing',
//     cpp: 2.5,
//     amount: 25.00,
//     writerDeadline: 'Oct 29, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW023',
//     name: "Bio Hack",
//     topic: "Science",
//     status: 'active',
//     orderType: 'Writing',
//     cpp: 2.5,
//     amount: 25.00,
//     writerDeadline: 'Oct 29, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW020',
//     name: "Lab report",
//     topic: "Science",
//     status: 'available',
//     orderType: 'Other',    
//     cpp: 3,
//     amount: 25.00,
//     writerDeadline: 'Oct 25, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW021',
//     name: "Bio Essay",
//     topic: "Science",
//     status: 'available',
//     orderType: 'Writing',
//     cpp: 2.5,
//     amount: 25.00,
//     writerDeadline: 'Oct 29, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW022',
//     name: "Civil Eng",
//     topic: "Science",
//     status: 'available',
//     orderType: 'Writing',
//     cpp: 2.5,
//     amount: 25.00,
//     writerDeadline: 'Oct 29, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW023',
//     name: "Bio Hack",
//     topic: "Science",
//     status: 'completed',
//     orderType: 'Writing',
//     cpp: 2.5,
//     amount: 25.00,
//     writerDeadline: 'Oct 29, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW020',
//     name: "Lab report",
//     topic: "Science",
//     status: 'pending',
//     orderType: 'Other',    
//     cpp: 3,
//     amount: 25.00,
//     writerDeadline: 'Oct 25, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW021',
//     name: "Bio Essay",
//     topic: "Science",
//     status: 'available',
//     orderType: 'Writing',
//     cpp: 2.5,
//     amount: 25.00,
//     writerDeadline: 'Oct 29, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW022',
//     name: "Civil Eng",
//     topic: "Science",
//     status: 'available',
//     orderType: 'Writing',
//     cpp: 2.5,
//     amount: 25.00,
//     writerDeadline: 'Oct 24, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW023',
//     name: "Bio Hack",
//     topic: "Science",
//     status: 'pending',
//     orderType: 'Writing',
//     cpp: 2.5,
//     amount: 25.00,
//     writerDeadline: 'Oct 29, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW020',
//     name: "Lab report",
//     topic: "Science",
//     status: 'available',
//     orderType: 'Other',    
//     cpp: 3,
//     amount: 25.00,
//     writerDeadline: 'Oct 25, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW021',
//     name: "Bio Essay",
//     topic: "Science",
//     status: 'available',
//     orderType: 'Writing',
//     cpp: 2.5,
//     amount: 25.00,
//     writerDeadline: 'Oct 29, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW022',
//     name: "Civil Eng",
//     topic: "Science",
//     status: 'active',
//     orderType: 'Writing',
//     cpp: 2.5,
//     amount: 25.00,
//     writerDeadline: 'Oct 29, 2023',
//     educationLevel: 'college'
//   },
//   {
//     orderId: 'GW023',
//     name: "Bio Hack",
//     topic: "Science",
//     status: 'completed',
//     orderType: 'Writing',
//     cpp: 2.5,
//     amount: 25.00,
//     writerDeadline: 'Oct 29, 2023',
//     educationLevel: 'college'
//   },
//     ]
//   }

  
    

// function Dashboard() {
// const [data, setData] = useState<Order[]>([]);
//     const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
//     const statuses = [...new Set(data.map(order => order.status))];

// useEffect(() => {
//     const fetchData = async () => {
//       const initialData = await getData();
//       setData(initialData);
//     };

//     fetchData();
//   }, []);

//   const router = useRouter();
  
//   const handleRowClick = (row: any, orderId: string) => {
//     router.push(`/admin/orders/${row.orderId}`);
//   };
 
//  const handleCheckboxChange = (event: { target: { checked: any; value: string; }; }) => {
//     if (event.target.checked) {
//       setSelectedStatuses(prevStatuses => [...prevStatuses, event.target.value]);
//     } else {
//       setSelectedStatuses(prevStatuses => prevStatuses.filter(status => status !== event.target.value));
//     }
//   };

//   const filteredOrders = data.filter((order) =>
//     selectedStatuses.length > 0 ? selectedStatuses.includes(order.status) : true
//   );


//   return (
//     <div className="w-full flex flex-col">

//     <div className=" container w-full space-y-4">
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Revenue
//             </CardTitle>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               className="h-4 w-4 text-muted-foreground"
//             >
//               <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//             </svg>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$45,231.89</div>
//             <p className="text-xs text-muted-foreground">
//               +20.1% from last month
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               All Orders
//             </CardTitle>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               className="h-4 w-4 text-muted-foreground"
//             >
//               <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//               <circle cx="9" cy="7" r="4" />
//               <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
//             </svg>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{`+${data.length}`}</div>
//             <p className="text-xs text-muted-foreground">
//               +180.1% from last month
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">In Progress</CardTitle>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               className="h-4 w-4 text-muted-foreground"
//             >
//               <rect width="20" height="14" x="2" y="5" rx="2" />
//               <path d="M2 10h20" />
//             </svg>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">+12,234</div>
//             <p className="text-xs text-muted-foreground">
//               +19% from last month
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Active Writers
//             </CardTitle>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               className="h-4 w-4 text-muted-foreground"
//             >
//               <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
//             </svg>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">+573</div>
//             <p className="text-xs text-muted-foreground">
//               +201 since last hour
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//         <Card className="col-span-4">
//           <CardHeader>
//             <CardTitle>Overview</CardTitle>
//           </CardHeader>
//           <CardContent className="pl-2">

//           </CardContent>
//         </Card>
//         <Card className="col-span-3">
//           <CardHeader>
//             <CardTitle>Writer Ranking</CardTitle>
//             <CardDescription>
//               Top Writers this month.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>

//           </CardContent>
//         </Card>
//       </div>
//     </div>
//     <div className="container mx-auto py-4 overflow-hidden">
//       <div className="flex items-center justify-between w-full">
//         <div className="w-1/3">
//         <Heading title={`Orders (${filteredOrders.length})`} description='Manage your orders' />
//         </div>
//         <div className="flex   flex-wrap items-center justify-end gap-4 w-2/3">
//           {statuses.map(status => (
//             <label key={status} className='flex gap-1 items-center'>
//               <input type="checkbox" value={status} onChange={handleCheckboxChange} className='  border-gray-700 checked:bg-orange-600 checked:border-orange-600 h-5 w-5 text-orange-600 border  rounded-md bg-orange-600 focus:ring-orange-500' />
//               {status}
//             </label>
//           ))}
//         </div>
//       </div>
//       <DataTable  searchKey="orderId" columns={columns} data={filteredOrders} onRowClick={(row)=> handleRowClick(row, row.orderId)} orderId={''} />
//     </div>
//     </div>
//   )
// }

// export default Dashboard