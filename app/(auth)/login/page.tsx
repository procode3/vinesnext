"use client"

require('dotenv').config();
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Noto_Serif_Display } from 'next/font/google'
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

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
    <div className="flex w-full h-full ">
    <div className="hidden md:flex w-1/2 h-[90vh] bg-slate-500 filter bg-cover items-center
     justify-center rounded-3xl p-10 m-10">
      
      <div className="relative h-2/3 w-full">
         <Image
          src="/images/writervector.svg"
          fill={true}
          alt="Picture of the writer"
        />
      </div>
    </div>
    <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center relative p-10  md:p-0 ">
        <div  className='flex justify-center w-full py-5 text-xl text-center font-semibold text-slate-900 absolute top-20'>
        Writers√ine
      </div>
      <div className="flex flex-col items-center justify-center my-10 gap-2">
        <h1 className={`text-3xl md:text-5xl font-bold ${noto.className}`}>Welcome Back</h1>
        <p className="text-xs text-gray-500 text-center">Enter username and password to access your account.</p>
      </div>
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
                  <Input type='password' placeholder="Enter Password."className="focus:bg-slate-100"  {...field} />
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
    </div>
      
  </div>
  )
}
