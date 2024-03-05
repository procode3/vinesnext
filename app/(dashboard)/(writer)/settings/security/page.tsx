import React from 'react'
import { Heading } from "@/components/ui/heading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import DeleteAccount from '../settingscomponents/delete';
import DeactivateAccount from '../settingscomponents/deactivate';


function page() {
  return (
    <div className='w-full  px-4 pt-2 flex flex-col gap-4'>
      <Heading title="Security settings" description='' />

      <div className="flex items-center justify-between border px-4 py-4 md:py-6 border-gray-100 rounded">
        <div className="flex  flex-col gap-2">
          <h1 className="text-black font-semibold">Email Address</h1>
          <p  className="text-sm md:text-md text-gray-500 font-600">The email address associated with your account.</p>
        </div>
        <div>
          <p className="text-black font-semibold text-sm md:text-md">jamesbond007@gmail.com</p>
        </div>
      </div>
      <div className="flex items-center justify-between border px-4 py-4 md:py-6 border-gray-100 rounded">
        <div className="flex  flex-col gap-2">
          <h1 className="text-black font-semibold text-sm md:text-md">Password</h1>
          <p className="text-sm md:text-md text-gray-500 font-600">Set a unique password to protect your account.</p>
        </div>
        <div>
          <p>Change password</p>
        </div>
      </div>
      <div className="flex items-center justify-between border px-4 py-4 md:py-6 border-gray-100 rounded">
        <div className="flex  flex-col gap-2">
          <h1 className="text-black font-semibold text-sm md:text-md">Deactivate account</h1>
          <p className="text-sm md:text-md text-gray-500 font-600">This will shut down your account. Your account will reactivate when you sign in again.</p>
        </div>
        <div  className=" font-semibold  text-xs md:text-[12px]   hover:bg-neutral-100 hover:text-orange-600 cursor-pointer transition ease-in-out duration-400 rounded"> <Dialog>
            <DialogTrigger className="px-2 py-2">Deactivate Account</DialogTrigger>
              <DialogContent>
                <DialogHeader>                           
                </DialogHeader>
                  <DeactivateAccount/>
              </DialogContent>
            </Dialog>
          </div>
      </div>
      <div className="flex items-center justify-between border px-4 py-4 md:py-6 border-gray-100 rounded">
        <div className="flex  flex-col gap-2">
          <h1 className="text-black font-semibold">Delete Account</h1>
          <p className="text-sm md:text-md text-gray-500 font-600">This will permanently delete your account and delete all associated information from our database</p>
        </div>
        <div>
          <div  className="text-red-600 font-semibold  text-xs md:text-[12px]   hover:bg-red-400 hover:text-white cursor-pointer transition ease-in-out duration-400 rounded"> <Dialog>
            <DialogTrigger className="px-2 py-2">Delete Account</DialogTrigger>
              <DialogContent>
                <DialogHeader>                           
                </DialogHeader>
                  <DeleteAccount/>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
