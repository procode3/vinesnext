'use client'
import React from 'react';
import Link from 'next/link';
import Countdown from './Countdown';

export default function Inprogresscard({ order }: any) {
    console.log(order)
     return (
                <div key={order.id} className='flex flex-col justify-center gap-1 w-[95%] bg-gray-200 from-zinc-200 py-6 backdrop-blur-2xl group rounded-lg border p-3 h-full max-h-16 ' >
                    <div className='flex flex-col justify-center'>
                        <Link href={`/orders/${order.id}`}>
                            <p className='whitespace-nowrap underline text-sm'>Order {order.name}</p>
                        </Link>
                        
                    </div>

                    <div className='flex flex-col w-full whitespace-nowrap truncate'>
                        <h2 className='text-sm'>{order.topic}</h2>
                    </div>
                    <Countdown writerDeadline={order.writerDeadline}/>
                </div>
                
    );
}