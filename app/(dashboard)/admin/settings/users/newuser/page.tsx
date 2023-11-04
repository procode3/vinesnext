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
  role: z.enum(['superadmin','admin', 'manager', 'writer']).optional(),
  avatar: z.string().optional(),
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
        render={({field}) => (
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
        render={({field}) => (
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
        render={({field}) => (
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
        render={({field}) => (
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
        render={({field}) => (
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
        render={({field}) => (
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
        render={({field}) => (
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
        render={({field}) => (
          <FormItem className="flex flex-col w-full">
            <FormLabel>set user role</FormLabel>
            <FormControl>
              <Select {...field}>
                <SelectTrigger className="w-[180px] bg-white opacity-100 border-gray-200">
                  <SelectValue placeholder="user's role" />
                </SelectTrigger>
                <SelectContent className="bg-white opacity-100 z-10">
                  <SelectItem value="superadmin">superadmin</SelectItem>
                  <SelectItem value="admin">admin</SelectItem>
                  <SelectItem value="manager">manager</SelectItem>
                  <SelectItem value="writer">writer</SelectItem>
                </SelectContent>
              </Select>
              </FormControl>              
              <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="avatar"
        control={form.control}
        render={({field}) => (
          <FormItem className="flex flex-col">
            <FormLabel>confirm password</FormLabel>
            <FormControl>
              <Input type="file"  {...field} />
              </FormControl>              
              <FormMessage />

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