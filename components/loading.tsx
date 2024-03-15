'use client'
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        // <div className="w-screen h-screen flex items-center justify-center z-100 opacity-100">            
        //         <div className="relative h-[30px] w-[30px]">
        //           <Image
        //             src="/images/loaderimage.svg"
        //             fill={true}
        //             alt="Picture of the author"
        //             />
        //         </div>
        // </div>
          <div className="flex flex-col p-10 w-full gap-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="h-[250px] w-full rounded-xl" />
      <Skeleton className="h-[250px] w-full rounded-xl" />

    </div>
    )
}