import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Home() {
  return (
    <div className="flex flex-col w-screen gap-y-8">
      <div className="flex w-full ">
        <div className="w-1/3 h-auto flex gap-12 items-center ">
          <div className="border rounded-full bg-orange-600">
            Image flani
          </div>
          <h1 className="text-[24px] font-800 font-bold px-12">Prof Writer</h1>
        </div>
      <div className="w-full flex justify-between gap-4">
        <Card className="w-screen sm:w-1/4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Success Rate
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
            <div className="text-2xl font-bold">97%</div>
            
          </CardContent>
        </Card>
        <Card className="w-screen sm:w-1/4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Orders in Progress
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
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              Active orders
            </p>
          </CardContent>
        </Card> 
        <Card className="w-screen sm:w-1/4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Activity Level
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
            <div className="text-2xl font-bold">20</div>
            <p className="text-xs text-muted-foreground">
              Orders completed in the last 30 days
            </p>
          </CardContent>
        </Card>
        <Card className="w-screen sm:w-1/4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sanctions
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
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Disputes in the last 30 days
            </p>
          </CardContent>
        </Card>                
      </div>
      </div>
      <div>
        <h2>Active Orders</h2>
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
          {/* rows to be made dynamic after api consumption */}
          <TableRow>
            <TableCell className="font-medium">GW213</TableCell>
            <TableCell className="text-yellow-400">pending</TableCell>
            <TableCell>Other</TableCell>
            <TableCell>$3</TableCell>
            <TableCell className="">$25.00</TableCell>
            <TableCell className="text-right">Oct 25, 2023</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">GW021</TableCell>
            <TableCell className="text-yellow-400">pending</TableCell>
            <TableCell>Writing</TableCell>
            <TableCell>$2.5</TableCell>
            <TableCell className="">$25.00</TableCell>
            <TableCell className="text-right">Oct 29, 2023</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">GW012</TableCell>
            <TableCell className="text-yellow-400">pending</TableCell>
            <TableCell>Editing</TableCell>
            <TableCell>$1.5</TableCell>
            <TableCell className="">$25.00</TableCell>
            <TableCell className="text-right">Oct 30, 2023</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">GW001</TableCell>
            <TableCell className="text-yellow-400">pending</TableCell>            
            <TableCell>Writing</TableCell>
            <TableCell>$2.5</TableCell>
            <TableCell className="">$200.00</TableCell>
            <TableCell className="text-right">Sept 02, 2023</TableCell>
          </TableRow>
        </TableBody>
      </Table>
        </div>
      </div>
    </div>
  )
}
