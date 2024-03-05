import { User, columns } from "./columns"
import { DataTable } from '@/components/ui/data-table';
import { Heading } from "@/components/ui/heading";
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button";
import { httpGetWriters } from "@/app/(dashboard)/hooks/requests"   
import { getServerSession } from 'next-auth';
import { options } from '@/pages/api/auth/options';                                                                                                                           




export default async function ManageUsers() {
  const session = await getServerSession(options);
  const data = await httpGetWriters(session)
  console.log(data.data)

  return (
    <div className="container mx-auto py-4">
      <div className="flex items-center justify-between">
        <Heading title={`Available users (${data.data.length})`} description='Manage users' />
        <Link href='/admin/settings/users/newuser' className={buttonVariants({ variant: "default" })}>Create User</Link>
      </div>
      <DataTable searchKey="username" columns={columns} data={data.data} />
    </div>
  )
}
