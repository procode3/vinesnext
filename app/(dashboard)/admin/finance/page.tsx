'use client'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import DashCard from "@/components/dashcard"
import { useSession, signIn } from 'next-auth/react'


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const data = [
  {
    "orderNumber": "GW213",
    "status": "pending",
    "statusColor": "yellow-400",
    "type": "Income",
    "method": "bank transfer",
    "amount": 25.00,
    "date": "Oct 25, 2023"
  },
  {
    "orderNumber": "GW021",
    "status": "processed",
    "statusColor": "green-400",
    "type": "Income",
    "method": "m-pesa",
    "amount": 25.00,
    "date": "Oct 25, 2023"
  },
  {
    "orderNumber": "GW012",
    "status": "refunded",
    "statusColor": "red-400",
    "type": "Income",
    "method": "paypal",
    "amount": 25.00,
    "date": "Oct 25, 2023"
  },
  {
    "orderNumber": "GW001",
    "status": "processed",
    "statusColor": "green-400",
    "type": "Withdrawal",
    "method": "paypal",
    "amount": 200.00,
    "date": "Oct 26, 2023"
  }
]

const cardProps = [
  {
    title: "Total Revenue",
    value: "$750",
    changeText: "Earned in the last 30 days",
    iconName: "revenue",
  },
  {
    title: "Pending Payments",
    value: "250",
    changeText: "In Progress Orders",
    iconName: "revenue",
  },
  {
    title: "Available Balance",
    value: "$250",
    changeText: "Available for withdrawal",
    iconName: "revenue",
  },
];

export default function Home() {

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'yellow-400';
      case 'refunded':
        return 'red-400';
      case 'processed':
        return 'green-400';
      default:
        return '';
    }
  };

  const { data: session, status } = useSession()

  if (!session && status !== 'loading') {
    signIn()
    return null
  }

  return (
    <div className="flex flex-col w-full gap-y-8">
      <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-[10px] ">
        {cardProps.map((props, index) => (
          <DashCard
            key={index}
            title={props.title}
            value={props.value}
            iconUrl={`/images/${props.iconName}.svg`}
            changeText={props.changeText}
          />
        ))}
      </div>
      <div className=" flex w-full px-4 justify-between">
        <Select>
          <SelectTrigger className="w-[180px] bg-white opacity-100 border-gray-200">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent className="bg-white opacity-100 z-10">
            <SelectItem value="none">none</SelectItem>
            <SelectItem value="week">week</SelectItem>
            <SelectItem value="month">1 month</SelectItem>
            <SelectItem value="three-months">3 months</SelectItem>
            <SelectItem value="six-months">6 months</SelectItem>
            <SelectItem value="year">year</SelectItem>
            <SelectItem value="all-time">all time</SelectItem>
          </SelectContent>
        </Select>
        {/* button can send a request to admin for payment */}
        <Button variant="default">Request Withdrawal</Button>

      </div>
      <div>
        <Table>
          <TableCaption>Keep track of all your earnings.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Order Number</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold">Method</TableHead>
              <TableHead className=" font-semibold">Amount</TableHead>
              <TableHead className="text-right font-semibold">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.orderNumber}</TableCell>
                <TableCell className={`text-${getStatusColorClass(item.status)}`}>{item.status}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.method}</TableCell>
                <TableCell className="">{`$${item.amount}`}</TableCell>
                <TableCell className="text-right">{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>
    </div>
  )
}