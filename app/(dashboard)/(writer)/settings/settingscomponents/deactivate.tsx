'use client'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Heading } from "@/components/ui/heading";
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
 
const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),  
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match"
    });
  }
});


function DeactivateAccount() {
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email:"",
        password:"",
        confirmPassword:"",
    },
})

function onSubmit(values: z.infer<typeof formSchema>){
    console.log(values)
    form.reset()
}
  return (
    <div className="w-full flex items-center justify-center py-4">
        <div className="w-full  bg-white p-4 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center p-2 mb-2 gap-2">
        <Heading title="Deactivate Account" description='' />
        <p className="text-center text-sm text-gray-600 leading-normal tracking-wide">This action will shut down your account temporarily. Your account will reactivate when you sign in again.</p>
      </div>
      <div className="flex flex-col gap-6">
      
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
     

      </div>
    <div className="flex justify-between py-4">
      <Button type="submit" variant='destructive' className="px-4">Deactivate Account</Button>
    </div>
    </form>      
    </Form>
    </div>
    </div>
  )
}

export default DeactivateAccount
