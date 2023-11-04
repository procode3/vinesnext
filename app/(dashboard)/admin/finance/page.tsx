import Image from 'next/image'
import { Button } from "@/components/ui/button"


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



export default function Home() {
  return (
    <div className="flex flex-col w-screen gap-y-8">
    <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-[10px] px-4">
      {/* change to dynamic after design */}
       <Card className="w-screen sm:w-1/3">
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
            <div className="text-2xl font-bold">$750</div>
            <p className="text-xs text-muted-foreground">
              Earned in the last 30 days
            </p>
          </CardContent>
        </Card>
        <Card className="w-screen sm:w-1/3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending payments
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
            <div className="text-2xl font-bold">$250</div>
            <p className="text-xs text-muted-foreground">
              In progress orders
            </p>
          </CardContent>
        </Card >
        <Card className="w-screen sm:w-1/3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
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
            <div className="text-2xl font-bold">$500</div>
            <p className="text-xs text-muted-foreground">
              Available for withdrawal
            </p>
          </CardContent>
        </Card>
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
          {/* rows to be made dynamic after data - mapping through etc */}
          <TableRow>
            <TableCell className="font-medium">GW213</TableCell>
            <TableCell className="text-yellow-400">pending</TableCell>
            <TableCell>Income</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="">$25.00</TableCell>
            <TableCell className="text-right">Oct 25, 2023</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">GW021</TableCell>
            <TableCell className="text-green-400">paid</TableCell>
            <TableCell>Income</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="">$25.00</TableCell>
            <TableCell className="text-right">Oct 25, 2023</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">GW012</TableCell>
            <TableCell className="text-red-400">refunded</TableCell>
            <TableCell>Income</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="">$25.00</TableCell>
            <TableCell className="text-right">Oct 25, 2023</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">GW001</TableCell>
            <TableCell className="text-green-400">processed</TableCell>
            <TableCell>Withdrawal</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="">$200.00</TableCell>
            <TableCell className="text-right">Oct 25, 2023</TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </div>
    </div>
  )
}
