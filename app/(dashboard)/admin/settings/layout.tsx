import Link from "next/link"
import { ReactNode } from 'react';
import DeleteAccount from "./settingscomponents/delete"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type SettingsLayoutProps = {
  children: ReactNode;
};

function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className='bg-white w-screen h-full flex flex-col gap-4 p-5'>
      <h1 className="text-md md:text-[16px] font-semibold">Account settings</h1>
      <div className="main-container flex flex-col sm:flex-row shadow-sm">
        <div className="hidden md:inline settings-nav sm:flex-col items-center sm:justify-start shadow-sm w-full sm:w-48 p-4   opacity-[100%]">
          <nav className="flex sm:flex-col sm:gap-4 w-full justify-between sm:justify-normal">
            <Link href="/admin/settings/" className="text-xs md:text-[12px] px-2 py-2 text-black  hover:bg-orange-600 hover:text-white cursor-pointer transition ease-in-out duration-400 rounded">Profile</Link>
            <Link href="/admin/settings/security" className="text-xs md:text-[12px] px-2 py-2 text-black hover:bg-orange-600 hover:text-white cursor-pointer transition ease-in-out duration-400 rounded">Security</Link>
            <Link href="/admin/settings/billing" className="text-xs md:text-[12px] px-2 py-2 text-black hover:bg-orange-600 hover:text-white cursor-pointer transition ease-in-out duration-400 rounded">Billing</Link>
            <Link href="/admin/settings/users/newuser" className="text-xs md:text-[12px] px-2 py-2 text-black hover:bg-orange-600 hover:text-white cursor-pointer transition ease-in-out duration-400 rounded">Register User</Link>
            <Link href="/admin/settings/users/manageusers" className="text-xs md:text-[12px] px-2 py-2 text-black hover:bg-orange-600 hover:text-white cursor-pointer transition ease-in-out duration-400 rounded">Manage Users</Link>
          <div  className="text-white bg-red-600 text-xs md:text-[12px]   hover:bg-red-400 hover:text-white cursor-pointer transition ease-in-out duration-400 rounded"> 
          <Dialog>
            <DialogTrigger className="px-2 py-2">Delete Account</DialogTrigger>
              <DialogContent>
                <DialogHeader>                           
                </DialogHeader>
                  <DeleteAccount/>
              </DialogContent>
            </Dialog>
          </div>
          </nav>
        </div>
        <div className="settings-display flex justify-center w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default SettingsLayout