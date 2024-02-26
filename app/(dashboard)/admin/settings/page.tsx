'use client'

import EditProfile from "./settingscomponents/editprofile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSession, signIn } from 'next-auth/react'

export default function Page() {
  const { data: session, status } = useSession()

  if (!session && status !== 'loading') {
    signIn()
    return null
  }
  return (
    <div className="container w-full p-4 flex flex-col gap-8">
      <div className=" flex justify-between">
      <div className="dp flex items-center gap-2 py-4">        
        <Avatar className="w-[60px] h-[60px] md:w-[100px] md:h-[100px]">
          <AvatarImage src="/images/avatar-cactus.svg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="details flex flex-col sm:gap-2">
          <h1 className="font-semibold text-md sm:text-[12px] tracking-wide leading-normal">Prof_Writer</h1>
          <h2 className="text-gray-600 text-sm sm:text-[12px] tracking-wide leading-normal">Writer</h2>
          <h1 className="text-gray-600 text-sm sm:text-[12px] tracking-wide leading-normal">Nairobi, Kenya</h1>
        </div>
      </div>
      <div className="flex items-center">
        <Dialog>
          <DialogTrigger className="bg-orange-600 h-[30px]  px-4 text-white">Edit profile</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit your Profile</DialogTitle>
              <DialogDescription>
              </DialogDescription>
            </DialogHeader>
            <EditProfile/>
          </DialogContent>
        </Dialog>
      </div>
          
      </div>
      <div className="personal-info py-4 flex flex-col gap-5 border p-4 rounded-xl border-gray-100">
        <h1 className="font-semibold text-md sm:text-lg">Personal information</h1>
        <div className="flex w-full">
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm sm:text-[12px]">First Name</h1>  
            <h1 className="text-sm sm:text-[12px]">James</h1>  
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm sm:text-[12px]">Last Name</h1>  
            <h1 className="text-sm sm:text-[12px]">Bond</h1>
          </div>
        </div>
        <div className="flex w-full flex-col sm:flex-row gap-4">
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm sm:text-[12px]">Email address</h1>  
            <h1 className="text-sm sm:text-[12px]">bondjames007@gmail.com</h1>  
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm sm:text-[12px]">Phone</h1>  
            <h1 className="text-sm sm:text-[12px]">+1234567890123</h1>
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm sm:text-[12px]">Role</h1>  
            <h1 className="text-sm sm:text-[12px]">Admin</h1>  
          </div>
          
        </div>
      </div>
      <div className="personal-info py-4 flex flex-col gap-5 border p-4 rounded-xl border-gray-100">
        <h1 className="font-semibold text-sm sm:text-[12px]">Billing Address</h1>
        <div className="flex w-full">
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm sm:text-[12px]">Country</h1>  
            <h1 className="text-sm sm:text-[12px]">Wakanda</h1>  
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm sm:text-[12px]">City/State</h1>  
            <h1 className="text-sm sm:text-[12px]">Village</h1>
          </div>
        </div>
        <div className="flex w-full flex-col sm:flex-row gap-4">
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm sm:text-[12px]">Paypal</h1>  
            <h1 className="text-sm sm:text-[12px]">bondjames007@gmail.com</h1>  
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm sm:text-[12px]">Account number</h1>  
            <h1 className="text-sm sm:text-[12px]">1234****1123</h1>
          </div>
        </div>
        
      </div>
    </div>
  )
}
