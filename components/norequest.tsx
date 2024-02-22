import React from 'react';
import Image from 'next/image';

export default function Norequest() {
    return (
        <div className='flex gap-4 w-full h-full items-center text-white'>
            <div className='flex flex-col gap-4'>
                <h2 className='text-yellow-300 text-bold font-bold text-3xl'>OOPs! No direct requests yet!</h2>
                <p className='text-sm text-muted font-extralight'>When you have a direct request, this is where it will appear. </p>
            </div>
            <Image
                alt="No Requests illustration"
                src="/images/norequest2.png"
                width={300}
                height={300} />

        </div>
    )
}

