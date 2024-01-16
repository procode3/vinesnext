"use client"
import React from 'react'
import { ChangeEvent, useState, useEffect, Fragment } from 'react';
import { useSession } from 'next-auth/react'
import { v4 } from 'uuid'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import SubjectCombobox from "@/app/(dashboard)/components/form/subjectCombobox"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import UsersCombobox from "@/app/(dashboard)/components/form/usersCombobox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"


import { httpCreateOrder, httpGetClients, httpGetWriters } from '../../hooks/requests';


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,      
} from "@/components/ui/form"



import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


interface order {
  name: string,
  orderType: string,
  clientDeadline: string,
  writerDeadline: string,
  pages: string,
  cpp: string,
  subject: string,
  topic: string,
  instructions: string,
  clientFiles?: string,
  educationLevel: string[] | string,
  writerLevel: string,
  amount: number,
  writerFee: number,
  writerId: string,
  assignedBy?: string,
  writerRating: number,
  clientId?: string,
  orderNumber: string,
  orderStatus: string,
}

const items = [
  {
    id: "highschool",
    label: "High School",
  },
  {
    id: "college",
    label: "College",
  },
  {
    id: "university",
    label: "University",
  },
  {
    id: "masters",
    label: "Master's",
  },
  {
    id: "phd",
    label: "Post Graduate",
  },
] as const

const formSchema = z.object({
  // id: z.string().min(2,).max(50),
  name: z.string().min(2).max(50),
  orderType: z.string().min(2, {
    message: "Please choose atleast one ordertype",
  }).max(50),
  clientDeadline: z.string().min(2, { message: "Required" }).max(50),
  writerDeadline: z.string().min(2, { message: "Required" }).max(50),
  pages: z.string(),
  cpp: z.string(),
  subject: z.string().min(2, {
    message: "Please choose atleast one option subject",
  }).max(50),
  topic: z.string().min(2, { message: "Required topic" }).max(50),
  instructions: z.string().min(0).max(1024),
  clientFiles: z.array(z.string()).nullable(),
  educationLevel: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  writerLevel: z.string(),
  amount: z.number(),
  writerFee: z.number(),
  writerId: z.string().nullable(),
  assignedBy: z.string().nullable(),
  writerRating: z.number(),
  clientId: z.string(),
  orderNumber: z.string().min(2).max(50),
  orderStatus: z.string(),
}).superRefine(({writerDeadline, clientDeadline}, ctx) => {
  if(writerDeadline > clientDeadline){
    ctx.addIssue({
      message: "Writer deadline must be sooner than or equal to the client deadline.",
      code: 'custom',
      path: ['writerDeadline']
    })
  }
});

function CreateOrder() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // id: v4(),
      name: "",
      orderType: "",
      clientDeadline: "",
      writerDeadline: "",
      pages: "0.5",
      cpp: "300",
      subject: "",
      topic: "",
      instructions: "",
      clientFiles: null,
      educationLevel: [],
      writerLevel: "",
      amount: 50,
      writerFee: 50,
      writerId: "4",
      assignedBy: null,
      writerRating: 5,
      clientId: "",
      orderNumber: "",
      orderStatus: "new",
    },
  });

  const { data: session }: any = useSession();

  const [orderName, setOrderName] = useState('');
  const [isloading, setIsloading] = useState(false);
  const { toast } = useToast()

  const handleOrderNumberChange = (event: any) => {

    const prefixName = form.getValues('clientId');
    const orderNumber = event.target!.value;
    const generatedOrderName = `GW${orderNumber}`;
    setOrderName(generatedOrderName);
    form.setValue("name", generatedOrderName);

  };


  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };



  let files = fileList ? [...fileList] : [];
  console.log(files);

  const removeFileHandler = (index: number) => {
    const updatedFiles = [...files] as any;
    updatedFiles.splice(index, 1); // Remove the element at the given index
    setFileList(updatedFiles); // Update the state with the modified array
  };

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {

    try {
      setIsloading(true);
      e.preventDefault();

      values.educationLevel = values.educationLevel[0] as any;

      console.log(values);
      const res = await httpCreateOrder(values, session, toast, files);
      if (res) {
        form.reset();
      }
    } catch (error) {
      console.error('Order creation error:', error);
    } finally {
      setIsloading(false);
    }

    console.log(values);
  }

  return (
    <div className='w-screen'>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='p-4 text-black'>
          <div className="flex flex-col items-center justify-center p-4 mb-4">
            <p className=" font-bold text-xl">Create a New Order</p>
          </div>

          <div className=' flex flex-col px-0 sm:px-36 lg:px-0 lg:flex-row place-content-between mx-auto border-3 border-solid text-sm gap-[20px] w-full'>
            <div className=" flex flex-col  items-center  w-full bg-white rounded ">
              <div className="flex "><HorizontalRuleIcon /> Order Details</div>

              <div className='w-full xl:w-[350px] p-6  flex flex-col gap-y-[22px] shadow-lg border'>

                <FormField
                  control={form.control}
                  name="orderType"

                  render={({ field }) => (

                    <FormItem>
                      <FormLabel>Order Type</FormLabel>

                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid max-w-md grid-cols-3 gap-2 pt-2"
                      >
                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:bg-orange-600 [&:has([data-state=checked])>div]:text-white">
                            <FormControl>
                              <RadioGroupItem value="writing" className="sr-only" />
                            </FormControl>
                            <div className="items-center rounded-md border-2 border-muted cursor-pointer p-1 hover:border-accent">
                              <span className="md:w-8 block w-full p-2 text-center font-normal">
                                Writing
                              </span>

                            </div>

                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:bg-orange-600 [&:has([data-state=checked])>div]:text-white">
                            <FormControl>
                              <RadioGroupItem value="editing" className="sr-only" />
                            </FormControl>
                            <div className="items-center rounded-md border-2 border-muted bg-popover p-1 cursor-pointer hover:bg-accent hover:text-accent-foreground">
                              <span className="block w-full p-2 text-center font-normal">
                                Editing
                              </span>

                            </div>
                          </FormLabel>
                        </FormItem>

                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:bg-orange-600 [&:has([data-state=checked])>div]:text-white">
                            <FormControl>
                              <RadioGroupItem value="other" className="sr-only" />
                            </FormControl>
                            <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent cursor-pointer hover:text-accent-foreground">
                              <span className="block w-full p-2 text-center font-normal">
                                Other
                              </span>

                            </div>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Separator />
                <FormField
                  control={form.control}
                  name="clientDeadline"

                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deadline:{`10 days to go`}</FormLabel>
                      <FormControl>
                        <Input type="datetime-local"  {...field} />
                      </FormControl>
                      <FormMessage />

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
                        <Input type="number"  {...field} />
                      </FormControl>
                    </FormItem>

                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"

                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-y-2'>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>

                        <SubjectCombobox value={field.value} setValue={field.onChange} />
                      </FormControl>
                    </FormItem>

                  )}
                />
                <FormField
                  control={form.control}
                  name="educationLevel"
                  render={() => (
                    <FormItem >
                      <div className="mb-4">
                        <FormLabel className="text-base">Academic Level</FormLabel>

                      </div>
                      <div className="grid grid-cols-3  gap-2">
                        {items.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="educationLevel"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-2 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked: any) => {
                                        return checked
                                          ? field.onChange([item.id])
                                          : field.onChange(
                                            field.value?.filter(
                                              (value: any) => value !== item.id
                                            )


                                          )
                                      }}



                                    />
                                  </FormControl>
                                  <FormLabel className={field.value?.includes(item.id) ? "font-normal cursor-pointer " : "font-normal  cursor-pointer "} >
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
              </div>
            </div>
            <div className=" flex flex-col w-full items-center bg-white ">
              <div className="flex"><HorizontalRuleIcon /> Instructions and Attachments</div>
              <div className='w-full xl:w-[350px] p-6 flex flex-col space-y-3 border shadow-lg'>
                <FormField
                  control={form.control}
                  name="topic"

                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-y-2'>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter topic..." {...field} />
                      </FormControl>
                    </FormItem>

                  )}
                />
                <FormField
                  control={form.control}
                  name="instructions"

                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-y-2'>
                      <FormLabel>Detailed Instructions</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                    </FormItem>

                  )}
                />
                <FormField
                  control={form.control}
                  name="clientFiles"

                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-y-2'>
                      <FormLabel>Upload attachments</FormLabel>
                      <FormControl>
                        <Input type="file" onChange={handleFileChange} multiple placeholder="Select file(s)..." />

                      </FormControl>
                      <ul>
                        {files.map((file, i) => (
                          <li key={i} className='flex justify-between gap-x-4 p-1 my-1 hover:bg-slate-150  rounded border-b'>

                            <p className='truncate hover:underline hover:cursor-pointer opacity-70 hover:opacity-80'>
                              {file.name}
                            </p>
                            <CloseRoundedIcon className='cursor-pointer opacity-85' onClick={() => removeFileHandler(i)} />
                          </li>
                        ))}
                      </ul>
                    </FormItem>

                  )}
                />
              </div>
            </div>
            <div className="flex flex-col w-full items-center bg-white">
              <div className="flex opacity-80"><HorizontalRuleIcon /> Writer Details</div>
              <div className=" w-full xl:w-[350px] p-6 flex flex-col bg-white space-y-4 shadow-lg border">

                <FormField
                  control={form.control}
                  name="writerDeadline"

                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Writer Deadline:{`10 days to go`}</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" placeholder="" {...field} />
                      </FormControl>
                    </FormItem>

                  )}
                />


                <FormField
                  control={form.control}
                  name="writerId"

                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choose Action</FormLabel>

                      <FormControl>
                        <Tabs defaultValue="isAvailable" className="max-w-md ">
                          <TabsList className="grid w-full grid-cols-3 ">
                            <TabsTrigger value="isAvailable">Make Available</TabsTrigger>
                            <TabsTrigger value="writer">Assign Writer</TabsTrigger>
                            <TabsTrigger value="new">Add to New</TabsTrigger>
                          </TabsList>
                          <TabsContent value="isAvailable">
                            <FormField
                              control={form.control}
                              name="writerLevel"

                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Writer Proficiency</FormLabel>
                                  <FormControl>
                                    <RadioGroup defaultValue="intermidiate" className='grid grid-cols-2'>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="beginner" id="r1" />
                                        <Label htmlFor="r1">Beginner</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="intermidiate" id="r2" />
                                        <Label htmlFor="r2">Intermidiate</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="pro" id="r3" />
                                        <Label htmlFor="r3">Pro</Label>
                                      </div>

                                    </RadioGroup>
                                  </FormControl>
                                </FormItem>

                              )}
                            />
                          </TabsContent>
                          <TabsContent value="writer">
                            <div >

                              <UsersCombobox httpHook={httpGetWriters} form={form} formField={`writerId`} />
                            </div>
                          </TabsContent>
                          <TabsContent value="new">
                            <div >
                              <p className='opacity-80 py-3'>Add to New order list</p>

                            </div>
                          </TabsContent>
                        </Tabs>

                      </FormControl>


                    </FormItem>

                  )}


                />

                <FormField
                  control={form.control}
                  name="clientId"

                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Select Client</FormLabel>
                      <FormControl>
                        <Fragment >
                          <UsersCombobox httpHook={httpGetClients} form={form} formField={`clientId`} />
                        </Fragment>
                      </FormControl>
                    </FormItem>

                  )}
                />
                <FormField
                  control={form.control}
                  name="cpp"

                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPP</FormLabel>
                      <FormControl>
                        <Input type="text"  {...field} />
                      </FormControl>
                    </FormItem>

                  )}
                />

                <FormField
                  control={form.control}
                  name="orderNumber"

                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Number</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Order Number" {...field} onChange={(e) => {
                          field.onChange(e);
                          handleOrderNumberChange(e);
                        }} />
                      </FormControl>
                    </FormItem>

                  )}
                />
                <FormField
                  control={form.control}
                  name="name"

                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='italic '>Order Name: {orderName}</FormLabel>
                      <FormControl>
                        <Input type="hidden" readOnly={true} value={orderName} placeholder="Order Name" />
                      </FormControl>
                    </FormItem>

                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex place-content-center py-4 mt-3 px-12 md:px-0">
            <Button variant='default' type="submit"> {
              isloading ? 'Loading...' : 'Submit'
            }</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateOrder