'use client'
import { Button } from "@/registry/new-york/ui/button"
import { useState, useEffect } from "react"
import Image from 'next/image'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/registry/new-york/ui/card"
import { httpGetOrder } from '@/app/(dashboard)/hooks/requests'


interface order {
    name: string,
    orderType: string,
    clientDeadline: string,
    writerDeadline: string,
    pages: string,
    cpp: string,
    subject: string,
    topic: string,
    instructions: string,
    clientFiles?: string,
    educationLevel: string[] | string,
    writerLevel: string,
    amount: number,
    writerFee: number,
    writerId: string,
    assignedBy?: string,
    writerRating: number,
    clientId?: string,
    orderNumber: string,
    orderStatus: string,
}

export default function Page({ params }: { params: { orderId: string } }) {
    const [order, setOrder] = useState<any>({});
    useEffect(() => {
        httpGetOrder(params.orderId)
            .then((data) => {
                setOrder(data.data.attributes)
                console.log(data.data.attributes)
            })
    }, [params.orderId])

    return (
        <div className='pt-4 w-4/5 text-black space-y-4'>
            <Card>
                <CardHeader className='flex flex-row justify-between items-center space-y-0 '>
                    <CardTitle>
                        <span className='bg-slate-200 rounded py-2 px-4 '>Available</span>
                        <span className='text-sm text-slate-600 px-2'><span className='font-light'>Order ID:</span> {params.orderId}</span>
                    </CardTitle>
                    <CardDescription>
                        Total: Ksh. <span className='text-green-600 font-bold'>{`500`}</span>
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader className='flex flex-row justify-between items-center space-y-0 '>
                    <CardTitle>
                        Order Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-row justify-between items-center space-y-0 border-inherit '>
                        <div className='flex flex-col  place-items-end space-y-1 w-60 font-light text-sm'>
                            <p> Order Number</p>
                            <p>Order Name</p>
                            <p> Topic</p>
                            <p> Subject</p>
                            <p> Pages</p>
                            <p> Deadline</p>
                            <p> Order Type</p>
                            <p> Writer Level</p>
                            <p> Education Level</p>
                            <p> Amount</p>
                            <p> Writer Fee</p>
                            <p> Writer Rating</p>


                        </div>
                        <div className='flex flex-col  place-items-start space-y-1 w-full px-4 font-light text-sm '>
                            <p> Order Number</p>
                            <p>Order Name</p>
                            <p> Topic</p>
                            <p> Subject</p>
                            <p> Pages</p>
                            <p> Deadline</p>
                            <p> Order Type</p>
                            <p> Writer Level</p>
                            <p> Education Level</p>
                            <p> Amount</p>
                            <p> Writer Fee</p>
                            <p> Writer Rating</p>
                        </div>

                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex flex-row justify-between items-center space-y-0 '>
                    <CardTitle>
                        Attachments
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-row justify-center items-center space-y-2 w-11/12'>
                        <div className='flex justify-between border-[1px] w-full rounded'>
                            <div className="flex  px-2 py-1 text-xs justify-center items-center space-x-4 rounded ">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                <div className='flex flex-col w-28'>
                                    <p>File name</p>
                                    <p>Size: {`20.5Kb`}</p>
                                </div>
                            </div>

                            <div className="flex px-2 py-1 text-xs space-x-2 justify-center items-center">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                <p>Today, 11:58 PM</p>
                                <div className='bg-purple-300 px-1 rounded '>{`Instructions`}</div>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                            </div>

                        </div>


                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className='flex flex-row justify-between items-center space-y-0 '>
                    <CardTitle>
                        Submisions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col justify-center space-y-2 w-11/12'>
                        <div className='flex justify-between border-[1px] w-full rounded'>
                            <div className="flex  px-2 py-1 text-xs justify-center items-center space-x-4 rounded ">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                <div className='flex flex-col w-28'>
                                    <p>File name</p>
                                    <p>Size: {`20.5Kb`}</p>
                                </div>
                            </div>

                            <div className="flex px-2 py-1 text-xs space-x-2 justify-center items-center">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                <p>Today, 11:58 PM</p>
                                <div className='bg-orange-300 px-1 rounded '>{`Revision`}</div>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                            </div>

                        </div>
                        <Button className='place-items-end'>Add Submission</Button>


                    </div>
                </CardContent>
            </Card>


        </div>

    )
}