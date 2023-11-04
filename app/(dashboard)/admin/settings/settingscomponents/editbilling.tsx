'use client'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
 
  automaticPayments: z.string().nonempty({ message: 'Required' }),
  accountNumber: z.string().transform(data => Number(data)),
  email: z.string().email({ message: 'Invalid email address' }),
});


function BillingInfo() {
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email:"",
        automaticPayments:"",
        accountNumber:undefined,



    },
})

function onSubmit(values: z.infer<typeof formSchema>){
    console.log(values)
}
  return (
    <div className="w-full flex items-center justify-center pb-4">
        <div className="w-full  bg-white p-4 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center p-2 mb-2 gap-2">
        
      </div>
      <div className="flex flex-col gap-6">
      
       <FormField
        name="email"
        control={form.control}
        render={({field}) => (
          <FormItem className="flex flex-col">
            <FormLabel>Paypal Addresss</FormLabel>
            <FormControl>
              <Input  placeholder="bondjames007@gmail.com" {...field} />
              </FormControl>              
              <FormMessage />

          </FormItem>
        )}
      /> 

      <FormField
        name="accountNumber"
        control={form.control}
        render={({field}) => (
          <FormItem className="flex flex-col">
            <FormLabel>Bank Account Number</FormLabel>
            <FormControl>
              <Input placeholder="1234567890" {...field} />
              </FormControl>              
              <FormMessage />

          </FormItem>
        )}
      />

     <FormField
        name="automaticPayments"
        control={form.control}
        render={({field}) => (
          <FormItem className="flex flex-col w-full">
            <FormLabel>Automatic payments period</FormLabel>
            <FormControl>
              <Select {...field}>
                <SelectTrigger className="w-[180px] bg-white opacity-100 border-gray-200">
                  <SelectValue placeholder="Monthly" />
                </SelectTrigger>
                <SelectContent className="bg-white opacity-100 z-10">
                  <SelectItem value="monthly">monthly</SelectItem>
                  <SelectItem value="weekly">weekly</SelectItem>
                  <SelectItem value="Every two weeks">Every two weeks</SelectItem>
                </SelectContent>
              </Select>
              </FormControl>              
              <FormMessage />
          </FormItem>
        )}
      />
     

      </div>
    <div className="flex justify-between py-4">
      <Button type="submit" variant='default' className="px-4">Save Changes</Button>
    </div>
    </form>      
    </Form>
    </div>
    </div>
  )
}

export default BillingInfo
