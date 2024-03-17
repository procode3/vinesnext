import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';  // Added import for Link

export default function OrderUnavailable() {
    return (
        <div className='h-full w-full flex flex-col-reverse md:flex-row items-center justify-evenly p-10'>
            <div className="z-10 flex flex-col gap-2">
                <p className='text-6xl text-slate-700 font-bold'>Oops!</p>
                <p className='text-md '>Order is unavailable</p>
                <Link href="/orders">  
                        <Button variant='default'>Back to Orders</Button>                    
                </Link>
            </div>
            <div className='relative h-full w-full md:w-1/2'>
                {/* Option a */}
                {/* <Image
                    src='/images/empty.svg'
                    alt='order not found error page'
                    fill={true}
                /> */}
            </div>
            {/* Option b */}
            <Image
                    src='/images/fluid.svg'
                    alt='order not found error page'
                    fill={true}
                />
        </div>
    );
}
