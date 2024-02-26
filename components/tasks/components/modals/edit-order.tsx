"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

import { formSchema as orderFormSchema } from '@/app/(dashboard)/admin/createorder/schema'
import { OrderForm as Order } from '@/app/(dashboard)/admin/createorder/interfaces'
import React from 'react'


type OrderFormValues = z.infer<typeof orderFormSchema>

// This can come from your database or API.


export function EditOrderForm({ order }: any) {
    const { name, orderType, clientDeadline, writerDeadline, pages, words, subject, topic, description, writerFee, amountReceived, educationLevel, writerLevel, orderStatus, userId, clientFiles, writerId, assignedById, clientId, citationStyle, sources, spacing, fileType } = order
    const defaultValues: Partial<OrderFormValues> = {
        name: name,
        orderType: orderType,
        clientDeadline: clientDeadline,
        writerDeadline: writerDeadline,
        pages: pages,
        words: words,
        subject: subject,
        topic,
        description,
        writerFee,
        amountReceived,
        educationLevel,
        writerLevel, // Add this line for the missing writerLevel field
        orderStatus,
        userId,
        clientFiles,
        writerId, // Add this line for the missing writerId field
        assignedById,
        clientId,
        citationStyle,
        sources,
        spacing,
    }

    const form = useForm<OrderFormValues>({
        resolver: zodResolver(orderFormSchema),
        defaultValues,
        mode: "onChange",
    })


    const { fields, append } = useFieldArray({
        clientFiles: [],
        control: form.control,
    })



    console.log(order)

    function onSubmit(data: OrderFormValues) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-4  h-full overflow-auto">
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Topic</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                Change the topic of the order
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 justify-between w-full">
                    <FormField
                        control={form.control}
                        name="words"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Words</FormLabel>
                                <FormControl>
                                    <Input placeholder="word count..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    Change the total number of words
                                </FormDescription>

                                {/* <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                                </SelectContent>
                            </Select> 
                            <FormDescription>
                                You can manage verified email addresses in your{" "}
                                <Link href="/examples/forms">email settings</Link>.
                            </FormDescription>
                            <FormMessage />*/}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pages"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pages</FormLabel>
                                <FormControl>
                                    <Input placeholder="page count..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    Change the total number of pages
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Order description and other details
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    {fields.map((field, index) => (
                        <FormField
                            control={form.control}
                            key={field.id}
                            name={`clientFiles.${index}.value`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                                        URLs
                                    </FormLabel>
                                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                                        Add links to your website, blog, or social media profiles.
                                    </FormDescription>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => append({ value: "" })}
                    >
                        Add URL
                    </Button>
                </div>
                <Button type="submit">Update Order</Button>
            </form>
        </Form>
    )
}