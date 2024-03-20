'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
export default function Error({
  error,
  reset,
}: {
  error?: (Error & { digest?: string }) | null
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="w-full h-full flex items-center">
      
        <div className='flex flex-col items-center w-full md:w-1/2 gap-5'>
          <h2 className='text-[100px] text-blue-950 font-bold'>404</h2>
          <p className='text-2xl text-blue-950 font-medium text-center'>Sorry, the page you are <br></br>looking for could not be found</p>
          <Button

            onClick={
              () => reset()
            }
          >
            Try again
          </Button>
        </div>
      <div className="relative h-full w-full md:w-1/2">
        <Image
        src='/images/lost.svg'
        alt="error page image 404 not found"
        fill={true}
        />
      </div>
    </div>
  )
}