"use client"
require('dotenv').config();
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Noto_Serif_Display } from 'next/font/google';
import { Button } from "@/components/ui/button";
import { signIn, signOut } from 'next-auth/react';
import React from 'react'
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
import { toast } from "@/components/ui/use-toast"



const noto = Noto_Serif_Display({ weight: '400', subsets: ['latin'] })
const HOST = process.env.HOST || 'localhost';
const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long.",
    }).max(32),
})

export default function LoginForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })


    async function onSubmit(data: z.infer<typeof FormSchema>) {

        const response = await signIn('credentials', {
            username: data.username,
            password: data.password,
            redirect: true,

            callbackUrl: `http://localhost:3000/`,
        });
        if (response) {
            console.log('Success')
        }
        else {
            console.log('Error Occured')
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full sm:w-3/4 ">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-800">Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter email or username." className="focus:bg-slate-100" {...field} />
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-800">Password</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder="Enter Password." className="focus:bg-slate-100"  {...field} />
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>

                </div>
                <div className="w-full  flex justify-center">
                    <Button type="submit" variant='default' className="w-full rounded-lg">Sign in</Button>
                </div>
            </form>
        </Form>
    )
}
