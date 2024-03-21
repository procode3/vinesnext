'use client'
import Image from "next/image";
import React from "react";

export default function NoSubmissions(){
    return (
        <div className='flex flex-col items-center justify-between'>
            <div className='relative w-[200px] h-[200px]'>
                <Image
                src='/images/submit.svg'
                alt='submit order'
                fill={true}
                />
            </div>
            <p className='text-sm text-gray-500'>No submissions yet!!</p>
        </div>
    )
}