import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function page() {
  return (
    <div className="w-full p-4 flex flex-col gap-12">
      <div className=" flex justify-between">
      <div className="dp flex items-center gap-2 py-4">
        <div className=" w-[60px] h-[60px] md:w-[100px] md:h-[100px] flex">            
            <Image
            src="/images/avatar-cactus.svg"
            alt="avatar"
            width={100}
            height={100}
            style={{objectFit: "contain"}}
            />            
        </div>
        <div className="details flex flex-col sm:gap-2">
          <h1 className="font-semibold text-md sm:text-[12px] tracking-wide leading-normal">Prof_Writer</h1>
          <h2 className="text-gray-600 text-sm sm:text-[12px] tracking-wide leading-normal">Writer</h2>
          <h1 className="text-gray-600 text-sm sm:text-[12px] tracking-wide leading-normal">Nairobi, Kenya</h1>
        </div>
      </div>
      <div className="flex place-content-center py-4 mt-3 px-12 md:px-0">
            <Button variant='default' type="submit">Edit Profile</Button>
          </div>
      </div>
      <div className="personal-info py-4 flex flex-col gap-6 border p-4 rounded-xl border-gray-100">
        <h1 className="font-semibold text-[12px]">Personal information</h1>
        <div className="flex w-full">
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-[12px]">First Name</h1>  
            <h1>James</h1>  
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-[12px]">Last Name</h1>  
            <h1>Bond</h1>
          </div>
        </div>
        <div className="flex w-full flex-col sm:flex-row gap-4">
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-[12px]">Email address</h1>  
            <h1>bondjames007@gmail.com</h1>  
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-[12px]">Phone</h1>  
            <h1>+1234567890123</h1>
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-[12px]">Role</h1>  
            <h1>Admin</h1>  
          </div>
          
        </div>
      </div>
      <div className="personal-info py-4 flex flex-col gap-6 border p-4 rounded-xl border-gray-100">
        <h1 className="font-semibold text-[12px]">Billing Address</h1>
        <div className="flex w-full">
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-[12px]">Country</h1>  
            <h1>Wakanda</h1>  
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-[12px]">City/State</h1>  
            <h1>Village</h1>
          </div>
        </div>
        <div className="flex w-full flex-col sm:flex-row gap-4">
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-[12px]">Paypal</h1>  
            <h1>bondjames007@gmail.com</h1>  
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-[12px]">Account number</h1>  
            <h1>1234567890123</h1>
          </div>
        </div>
        
      </div>
    </div>
  )
}
