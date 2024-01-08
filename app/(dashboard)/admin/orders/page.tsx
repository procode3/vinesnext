'use client'
import { useEffect, useState } from 'react';
import { Order, columns } from "./columns"
import { DataTable } from './data-table';
import { Heading } from "@/components/ui/heading";
import { useRouter } from "next/navigation"


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
    status: 'completed',
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
    status:'pending',
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
    status: 'active',
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
    status: 'active',
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
    status: 'completed',
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
    status: 'active',
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
    status: 'completed',
    orderType: 'Writing',
    cpp: 2.5,
    amount: 25.00,
    writerDeadline: 'Oct 29, 2023',
    educationLevel: 'college'
  },
    ]
  }

  export default  function Orders() {
    const [data, setData] = useState<Order[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

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
    
      <div className="container mx-auto py-4 overflow-hidden">
      <div className="flex items-center justify-between w-full">
        <div className="w-1/3">
        <Heading title={`Orders (${filteredOrders.length})`} description='Manage your orders' />
        </div>
      </div>
      <DataTable  searchKey="orderId" columns={columns} data={filteredOrders} onRowClick={(row)=> handleRowClick(row, row.orderId)} orderId={''} />
    </div>
    
  )
}


