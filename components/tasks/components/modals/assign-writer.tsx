"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

import * as z from "zod"

import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { httpGetWriters } from '@/app/(dashboard)/hooks/requests'




const formSchema = z.object({
    writer: z.string(),
    clientDeadline: z.string(),
    writerDeadline: z.string(),

})


export function AssignOrder(order: any) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            writer: undefined,
            clientDeadline: order?.clientDeadline,
            writerDeadline: order?.writerDeadline,
        },
    })
    const [isLoading, setIsLoading] = useState(false);
    const [writers, setWriters] = useState<any>([])

    const toast = useToast()

    useEffect(() => {
        setIsLoading(true)
        fetch(
            `/api/v1/users?role=WRITER`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { revalidate: 3600 },

        }).then(res => res.json()).then(data => {
            setWriters(data.data)
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
        })

    }, []);


    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        console.log(data);
        setIsLoading(false);
        return
        const { writer, clientDeadline, writerDeadline } = data;
        const values = {
            writer: writer,
            clientDeadline,
            writerDeadline,
        }
        const res = fetch('/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)

        }).then(res => res.json())
            .then(data => {
                if (data?.success === true) {
                    setIsLoading(false);
                    toast.toast({
                        title: "Success!!",
                        description: "User Created Successfully",
                    })

                }
                else {
                    setIsLoading(false);
                    toast.toast({
                        title: "Error!!",
                        description: "Failed to assign order to selected writer. Error: " + data?.message || "Unknown Error",
                    })
                }
            })
            .catch(err => {

            })

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">

                        <FormField
                            name="writer"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full col-span-3">
                                    <FormLabel className="">Writer</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger className=" bg-white opacity-100 border-gray-200 py-2">
                                                <SelectValue placeholder="Select a writer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}</SelectLabel>
                                                    {
                                                        writers && writers?.map((writer: any) => {
                                                            return <SelectItem key={writer.id} value={writer.id}>{writer.name}</SelectItem>
                                                        })
                                                    }


                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-xs m-0" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <FormField
                            name="clientDeadline"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full col-span-3">
                                    <FormLabel className="">Deadline</FormLabel>
                                    <FormControl>
                                        <Input className="" placeholder="james" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs m-0" />

                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <FormField
                            name="writerDeadline"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormLabel className="">Writer Deadline</FormLabel>
                                    <FormControl>
                                        <Input className="" placeholder="james" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs m-0" />

                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <Button variant="default" type="submit" disabled={isLoading} >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

                            Submit</Button>
                    </div>

                </div>
            </form>
        </Form >
    )
}
