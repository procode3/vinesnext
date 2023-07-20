"use client"
import React from 'react'
import { ChangeEvent, useState, useEffect } from 'react';
import { v4 } from 'uuid'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import SubjectCombobox from "@/app/(dashboard)/components/form/subjectCombobox"
import { toast } from "@/registry/new-york/ui/use-toast"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import WriterCombobox from "@/app/(dashboard)/components/form/writersCombobox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import MinimizeRoundedIcon from '@mui/icons-material/MinimizeRounded';
// import ActionTabs from "@/app/admin/createorder/AcademicLevel"
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


interface order {
  id: string,
  name: string,
  orderType: string,
  clientDeadline: string,
  writerDeadline: string,
  pages: string,
  subject: string,
  topic: string,
  detailedInstructions: string,
  files: any,
  academicLevel: string[],
  writerLevel: string,
  amount: number,
  writerFee: number,
  writerId: string,
  assignedBy: string,
  writerRating: number,
  clientID: string,
  orderNumber: string,
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
    id: "graduate",
    label: "Graduate",
  },
  {
    id: "postgraduate",
    label: "Post Graduate",
  },
] as const

const formSchema = z.object({
  id: z.string().min(2,).max(50),
  name: z.string().min(2).max(50),
  orderType: z.string().min(2, {
    message: "Please choose atleast one odertype",
  }).max(50),
  clientDeadline: z.string().min(2, { message: "Required" }).max(50),
  writerDeadline: z.string().min(2, { message: "Required" }).max(50),
  pages: z.string(),
  subject: z.string().min(2, {
    message: "Please choose atleast one option subject",
  }).max(50),
  topic: z.string().min(2, { message: "Required topic" }).max(50),
  detailedInstructions: z.string().min(0).max(50),
  files: z.string(),
  academicLevel: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  writerLevel: z.string(),
  amount: z.number(),
  writerFee: z.number(),
  writerId: z.string(),
  assignedBy: z.string(),
  writerRating: z.number(),
  clientID: z.string(),
  orderNumber: z.string().min(2).max(50),
})

function CreateOrder() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: v4(),
      name: "",
      orderType: "",
      clientDeadline: "",
      writerDeadline: "",
      pages: "0.5",
      subject: "",
      topic: "",
      detailedInstructions: "",
      files: "",
      academicLevel: [],
      writerLevel: "",
      amount: 50,
      writerFee: 50,
      writerId: "",
      assignedBy: "",
      writerRating: 5,
      clientID: "",
      orderNumber: "",
    },
  })
  const [value, setValue] = React.useState('1');


  const handleActionChange = (event: any, newValue: string) => {
    setValue(newValue);
  }
  const clients = [
    { "id": 1, "name": "Client 1" },
    { "id": 2, "name": "Client 2" },
    { "id": 3, "name": "Client 3" },
    { "id": 4, "name": "Client 4" },
    { "id": 5, "name": "Client 5" },
    { "id": 6, "name": "Client 6" },
    { "id": 7, "name": "Client 7" },
    { "id": 8, "name": "Client 8" },
    { "id": 9, "name": "Client 9" },
    { "id": 10, "name": "Client 10" }
  ]

  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };
  const writers = [{ value: 'erick', label: 'erick' }]


  let files = fileList ? [...fileList] : [];

  const removeFileHandler = (index: number) => {
    const updatedFiles = [...files] as any;
    updatedFiles.splice(index, 1); // Remove the element at the given index
    setFileList(updatedFiles); // Update the state with the modified array
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    
  }

  return (
    <div className=''>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >
          <div className="flex flex-col items-center justify-center pt-8">
            <p className=" font-bold">Creating an Order</p>
          </div>

          <div className=' grid grid-cols-3  place-content-between gap-10 border-3 border-solid p-8   text-sm'>
            <div className=" flex flex-col  w-full  ">
              <div className='w-full p-2  flex flex-col gap-y-4 '>
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
                          <FormLabel className="[&:has([data-state=checked])>div]:bg-[#0C7076] [&:has([data-state=checked])>div]:text-white">
                            <FormControl>
                              <RadioGroupItem value="writing" className="sr-only" />
                            </FormControl>
                            <div className="items-center rounded-md border-2 border-muted cursor-pointer p-1 hover:border-accent">
                              <span className="block w-full p-2 text-center font-normal">
                                Writing
                              </span>

                            </div>

                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormLabel className="[&:has([data-state=checked])>div]:bg-[#0C7076] [&:has([data-state=checked])>div]:text-white">
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
                          <FormLabel className="[&:has([data-state=checked])>div]:bg-[#0C7076] [&:has([data-state=checked])>div]:text-white">
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
                <FormField
                  control={form.control}
                  name="clientDeadline"

                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deadline:{`10 days to go`}</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" placeholder="" {...field} />
                      </FormControl>
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
                  name="academicLevel"
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
                            name="academicLevel"
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
                                  <FormLabel className={field.value?.includes(item.id) ? "font-normal cursor-pointer " : "font-normal opacity-70 cursor-pointer "} >
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
              </div>
            </div>
            <div className=" flex flex-col w-full ">
              <div className='w-full p-2 flex flex-col space-y-3 '>
                <FormField
                  control={form.control}
                  name="detailedInstructions"

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
                  name="files"

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
            <div className=" w-full p-2 flex flex-col space-y-4">

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
                            <WriterCombobox />
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
                name="orderNumber"

                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Number</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Order Number" {...field} />
                    </FormControl>
                  </FormItem>

                )}
              />
              <FormField
                control={form.control}
                name="name"

                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Name</FormLabel>
                    <FormControl>
                      <Input type="text" aria-readonly='true' placeholder="Order Name" {...field} />
                    </FormControl>
                  </FormItem>

                )}
              />

            </div>
          </div>
          <div className="flex place-content-end p-8">
            <Button type="submit"  >Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateOrder