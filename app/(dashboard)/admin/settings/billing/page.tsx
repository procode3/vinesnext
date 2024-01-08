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
import BillingInfo from '../settingscomponents/editbilling';


function page() {
  return (
    <div className='w-full text-lg  px-4 pt-2 flex flex-col gap-4'>
      <div className="flex justify-between w-full">
        <Heading title="Billing" description='' />
        <div className="flex items-center">
            <Dialog>
              <DialogTrigger className="bg-orange-600 h-[30px]  px-4 text-white text-sm rounded">Update</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit your Billing Information</DialogTitle>
                  <DialogDescription>
                  </DialogDescription>
                </DialogHeader>
                <BillingInfo/>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      <div className="flex items-center justify-between border px-4 py-4 md:py-6 border-gray-100 rounded">
        <div className="flex  flex-col gap-2">
          <h1 className="text-black font-semibold">Paypal Email Address</h1>
          <p  className="text-sm md:text-md text-gray-500 font-600">The email address associated with your paypal account.</p>
        </div>
        <div>
          <p className="text-black font-semibold">jamesbond007@gmail.com</p>
        </div>
      </div>
      <div className="flex items-center justify-between border px-4 py-4 md:py-6 border-gray-100 rounded">
        <div className="flex  flex-col gap-2">
          <h1 className="text-black font-semibold">Bank Account Number</h1>
          <p className="text-sm md:text-md text-gray-500 font-600">Add a bank account to receive payments directly to your bank.</p>
        </div>
        <div>
          <p>1234*****455</p>
        </div>
      </div>
      <div className="flex items-center justify-between border px-4 py-4 md:py-6 border-gray-100 rounded">
        <div className="flex  flex-col gap-2">
          <h1 className="text-black font-semibold">Automatic payment period</h1>
          <p className="text-sm md:text-md text-gray-500 font-600">Payments will be automatically disbursed to your prefered payment method.</p>
        </div>
        <div>
          <p> Monthly</p>
        </div>
      </div>
      
    </div>
  )
}

export default page
