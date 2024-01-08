import { User, columns } from "./columns"
import { DataTable } from '@/components/ui/data-table';
import { Heading } from "@/components/ui/heading";
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button";




async function getData(): Promise<User[]> {
  // We will fetch users data from endpoint here.
  return [
    {
        username: "jamesbond",
        firstname: "james",
        lastname: "bond",
        phone: 1234567890,
       status: "active",
        email: "jamesbond007@gmail.com",
        role: "writer"
    },
    {
        username: "jasonbourne",
        firstname: "jason",
        lastname: "bourne",
        phone: 12345467890,
       status: "deactivated",
        email: "jasonbourne@yahoo.com",
        role: "admin"
    },
     {
        username: "jackbauer",
        firstname: "jack",
        lastname: "bauer",
        phone: 123454234590,
       status: "active",
        email: "jackbauer21@yahoo.com",
        role: "superadmin"
    },
    
  ]
}

export default async function ManageUsers() {
  const data = await getData()

  return (
    <div className="container mx-auto py-4">
      <div className="flex items-center justify-between">
        <Heading title={`Available users (${data.length})`} description='Manage users' />
        <Link href='/admin/settings/users/newuser' className={buttonVariants({ variant: "default" })}>Create User</Link>
      </div>
      <DataTable searchKey="username" columns={columns} data={data} />
    </div>
  )
}
