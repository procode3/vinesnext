"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import * as z from "zod"

import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
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
  username: z.string().min(2, { message: 'Username must be at least 3 characters' }),
  firstName: z.string().nonempty({ message: 'First name is required' }),
  lastName: z.string().nonempty({ message: 'Last name is required' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  role: z.enum(['superadmin', 'admin', 'manager', 'writer', 'client']).optional(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match"
    });
  }
});


function CreateUser() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      phone: undefined,
      email: "",
      password: "",
      confirmPassword: "",
      role: undefined,
    },
    shouldUnregister: true,
    mode: "onChange",
    reValidateMode: "onChange",
  })
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast()


  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const { username, firstName, lastName, phone, email, password, role } = data;
    const values = {
      name: firstName + ' ' + lastName,
      email,
      password,
      phone,
      userType: role?.toLocaleUpperCase(),
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
            description: "User Creation Failed. Error: " + data?.message || "Unknown Error",
          })
        }
      })
      .catch(err => {

      })

  }
  return (
    <div className="flex flex-col gap-4 w-full sm:w-2/3 lg:w-1/2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-center p-2 mb-2">
            <p className=" font-bold text-xl">Register a new user</p>
          </div>
          <div className="flex flex-col gap-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input placeholder="jamesbond" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />

                </FormItem>
              )}
            />

            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>firstname</FormLabel>
                  <FormControl>
                    <Input placeholder="james" {...field} />
                  </FormControl>
                  <FormMessage />

                </FormItem>
              )}
            />

            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>lastname</FormLabel>
                  <FormControl>
                    <Input placeholder="bond" {...field} />
                  </FormControl>
                  <FormMessage />

                </FormItem>
              )}
            />

            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>phone number</FormLabel>
                  <FormControl>
                    <Input placeholder='+0123456789' {...field} />
                  </FormControl>
                  <FormMessage />

                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>email address</FormLabel>
                  <FormControl>
                    <Input placeholder="email address" {...field} />
                  </FormControl>
                  <FormMessage />

                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />

                </FormItem>
              )}
            />

            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="confirm password" {...field} />
                  </FormControl>
                  <FormMessage />

                </FormItem>
              )}
            />

            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>set user role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px] bg-white opacity-100 border-gray-200">
                        <SelectValue placeholder="user's role" />
                      </SelectTrigger>
                      <SelectContent className="bg-white opacity-100 z-10" >
                        <SelectItem value="superadmin">Superadmin</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="writer">Writer</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


          </div>
          <div className="py-4">
            <Button variant="default" type="submit" disabled={isLoading} >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

              Create User</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateUser;