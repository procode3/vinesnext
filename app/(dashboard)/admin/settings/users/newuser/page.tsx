"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"


const formSchema = z.object({
  username: z.string().min(2, { message: 'Username must be at least 3 characters'}),
  firstName: z.string().nonempty({ message: 'First name is required' }),
  lastName: z.string().nonempty({ message: 'Last name is required' }),
  phone: z.string().transform(data => Number(data)),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  role: z.enum(['client','admin', 'manager', 'writer']).optional(),
  avatar: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });


function CreateUser() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      phone: undefined,
      email:"",
      password:"",
      confirmPassword:"",
      role: undefined,
      avatar:"",
    },
    shouldUnregister: true,
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    form.reset()
  }
  return (
    <div className="flex flex-col gap-4 w-full sm:w-2/3 my-0 p-5">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center p-2 mb-2">
        <p className=" font-bold text-xl">Register a new user</p>
      </div>
      <div className="flex flex-col gap-6">
      <div className="flex items-center gap-5">
        <FormField
        name="firstName"
        control={form.control}
        render={({field}) => (
          <FormItem className="flex flex-col w-full">
            <FormLabel className="text-xs">firstname</FormLabel>
            <FormControl>
                <Input className="bg-slate-100 placeholder-text-xs" placeholder="james" {...field} />
              </FormControl>              
              <FormMessage className="text-xs m-0" />

          </FormItem>
        )}
      />

      <FormField
        name="lastName"
        control={form.control}
        render={({field}) => (
          <FormItem className="flex flex-col w-full">
            <FormLabel className="text-xs">lastname</FormLabel>
            <FormControl>
                <Input className="bg-slate-100 text-xs" placeholder="bond" {...field} />
              </FormControl>              
              <FormMessage className="text-xs m-0" />

          </FormItem>
        )}
      />
      </div>
      <div className="flex justify-centeritems-center gap-[20px]">
         <FormField
        name="username"
        control={form.control}
        render={({field}) => (
          <FormItem className="flex flex-col w-full">
            <FormLabel className="text-xs">username</FormLabel>
            <FormControl>
                <Input className="bg-slate-100 text-xs" placeholder="jamesbond" {...field} />
              </FormControl>
              <FormMessage className="text-xs m-0" />

          </FormItem>
        )}
      />


      

      <FormField
        name="phone"
        control={form.control}
        render={({field}) => (
          <FormItem className="flex flex-col w-full">
            <FormLabel className="text-xs">phone number</FormLabel>
            <FormControl>
              <Input className="bg-slate-100 text-xs" placeholder='+0123456789' {...field} />
              </FormControl>              
              <FormMessage className="text-xs m-0" />

          </FormItem>
        )}
      />

      </div>
     
       <FormField
        name="email"
        control={form.control}
        render={({field}) => (
          <FormItem className="flex flex-col w-full">
            <FormLabel className="text-xs">email address</FormLabel>
            <FormControl>
              <Input className="bg-slate-100 text-xs" placeholder="email address" {...field} />
              </FormControl>              
              <FormMessage className="text-xs m-0" />

          </FormItem>
        )}
      />
        <div className="flex items-center gap-5">
           <FormField
        name="password"
        control={form.control}
        render={({field}) => (
          <FormItem className="flex flex-col w-full">
            <FormLabel className="text-xs">password</FormLabel>
            <FormControl>
              <Input className="bg-slate-100 text-xs" type="password" placeholder="Enter password" {...field} />
              </FormControl>              
              <FormMessage className="text-xs m-0" />

          </FormItem>
        )}
      />

      <FormField
        name="confirmPassword"
        control={form.control}
        render={({field}) => (
          <FormItem className="flex flex-col w-full">
            <FormLabel className="text-xs">confirm password</FormLabel>
            <FormControl>
              <Input className="bg-slate-100 text-xs" type="password" placeholder="confirm password" {...field} />
              </FormControl>              
              <FormMessage className="text-xs m-0" />

          </FormItem>
        )}
      />
        </div>
        

      

    <FormField
        name="role"
        control={form.control}
        render={({field}) => (
          <FormItem className="flex flex-col w-full">
            <FormLabel className="text-xs">set user role</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px] bg-white opacity-100 border-gray-200">
                  <SelectValue placeholder="user's role" />
                </SelectTrigger>
                <SelectContent className="bg-white opacity-100 z-10">
                  <SelectItem value="client">client</SelectItem>
                  <SelectItem value="admin">admin</SelectItem>
                  <SelectItem value="writer">writer</SelectItem>
                  <SelectItem value="manager">manager</SelectItem>
                </SelectContent>
              </Select>
              </FormControl>              
              <FormMessage className="text-xs m-0" />
          </FormItem>
        )}
      />

      </div>
      <div className="py-4">      
      <Button variant="default" type="submit" >Create User</Button>
      </div>
      </form>
    </Form>
    </div>
  )
}

export default CreateUser;