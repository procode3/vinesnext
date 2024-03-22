'use client'
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Ping from "@/components/ping";

export default function Confirmcard({ orders }: { orders: any[] }) {
    console.log(orders)
     return (
        <div className='flex flex-col gap-3 h-[40vh] overflow-y-scroll'>
            {orders.map(order => (
                <div key={order.id} className='flex items-center gap-1 w-[90%] bg-gray-200 from-zinc-200 py-6 backdrop-blur-2xl group rounded-lg border p-3 h-full max-h-16 ' >
                    <div className='flex flex-col'>
                        <Link href={`/orders/${order.id}`}>
                            <p className='whitespace-nowrap underline text-sm'>Order {order.name}</p>
                        </Link>
                        <p className='whitespace-nowrap text-xs text-muted-foreground'>Feb 12th 9:30pm</p>
                    </div>

                    <div className='flex flex-col w-full whitespace-nowrap truncate'>
                        <h2 className='text-sm'>{order.topic}</h2>
                        <div className='flex items-center text-green-600 w-full truncate text-xs'>
                            <Ping />
                            <p>Confirm before working</p>
                        </div>
                    </div>
                    <Button variant={`outline`}>Confirm</Button>
                </div>
                
            ))}
        </div>
    );
}