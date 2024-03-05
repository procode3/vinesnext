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
  username: z.string().min(2, { message: 'Username must be at least 3 characters'}),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  phone: z.string().transform(data => Number(data)),
  email: z.string().email({ message: 'Invalid email address' }),
});


function EditProfile() {
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email:"",
        username:"",
        firstName:"",
        lastName:"",
        phone:undefined,
    },
})

function onSubmit(values: z.infer<typeof formSchema>){
    console.log(values)
    form.reset()
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
        name="username"
        control={form.control}
        render={({field}) => (
          <FormItem className="flex flex-col">
            <FormLabel>User Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Prof_writer" {...field} />
              </FormControl>              
              <FormMessage />

          </FormItem>
        )}
      />
      
      <FormField
        name="firstName"
        control={form.control}
        render={({field}) => (
          <FormItem className="flex flex-col">
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g. James" {...field} />
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
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="Bond" {...field} />
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
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="1234567890" {...field} />
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
            <FormLabel>Email Addresss</FormLabel>
            <FormControl>
              <Input  placeholder="bondjames007@gmail.com" {...field} />
              </FormControl>              
              <FormMessage />

          </FormItem>
        )}
      /> 
    </div>
    
      <Button type="submit" variant='default' className="px-4 mt-4">Save Changes</Button>
    
    </form>      
    </Form>
    </div>
    </div>
  )
}

export default EditProfile
