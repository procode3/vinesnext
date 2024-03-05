"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { httpGetOrders } from '../../hooks/requests';
import { Order, columns } from "./columns"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


const items = [
    {
      id: "all",
      label: "All",
    },
    {
      id: "available",
      label: "Available",
    },
    {
      id: "pending",
      label: "Pending",
    },
    {
      id: "active",
      label: "Active",
    },
    {
      id: "completed",
      label: "Completed",
    },
    {
      id: "revision",
      label: "Revision",
    },
    {
      id: "disputed",
      label: "Disputed",
    },
  ] as const;

  
const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
})


export default function FilterForm() {
    const [data, setData] = useState<Order[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            items: ["all"],
        },
    })

    useEffect(() => {
        const fetchData = async () => {
            const initialData = await httpGetOrders();
            setData(initialData?.data);
        };

        fetchData();
    }, []);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (data.items.length > 0 && !data.items.includes("all")) {
            setSelectedStatuses([...data.items]);
        } else if (data.items.includes("all")) {
            setSelectedStatuses(["available", "pending", "active", "completed", "revision", "disputed"]);
        }
    }

    const filteredOrders = data?.filter((order) =>
        selectedStatuses.length > 0 ? selectedStatuses.includes(order.status) : true
    );
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Filter</FormLabel>
                                <FormDescription>
                                    Select the orders you want to display.
                                </FormDescription>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {items.map((item) => (
                                    <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="items"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={item.id}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(item.id)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, item.id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value) => value !== item.id
                                                                        )
                                                                    )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-normal">
                                                        {item.label}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Apply</Button>
            </form>
        </Form>
    )
}

