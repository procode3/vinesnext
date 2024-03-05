"use client"
import React from 'react'
import { ChangeEvent, useState, useEffect, Fragment } from 'react';
import { signIn, useSession } from 'next-auth/react'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import FileCombobox from "@/components/form/fileCombobox"
import SubjectCombobox from "@/components/form/subjectCombobox"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import UsersCombobox from "@/components/form/usersCombobox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { httpCreateOrder, httpGetClients, httpGetWriters } from '../../hooks/requests';
import { formSchema } from './schema';
import { OrderForm as Order } from './interfaces'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



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

const formItems = [
  { value: "writing", label: "Writing" },
  { value: "editing", label: "Editing" },
  { value: "other", label: "Other" },
];



function CreateOrder() {
  const { data: session }: any = useSession();
  const [orderName, setOrderName] = useState('');
  const [step, setStep] = useState(1);
  const [isloading, setIsloading] = useState(false);
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      orderType: '',
      clientDeadline: '',
      writerDeadline: '',
      pages: '1',
      words: 1500,
      subject: '',
      topic: '',
      description: '',
      writerFee: 100.0,
      amountReceived: 50.0,
      educationLevel: ['UNDERGRADUATE'],
      writerLevel: '', // Add this line for the missing writerLevel field
      orderStatus: 'INPROGRESS',
      userId: session?.user?.id,
      clientFiles: [],
      writerId: '', // Add this line for the missing writerId field
      assignedById: '',
      clientId: '',
      citationStyle: 'APA7',
      sources: 0,
      spacing: 'DOUBLE',
    },
  });




  const handleOrderNumberChange = (event: any) => {

    const prefixName = form.getValues('clientId');
    const orderNumber = event.target!.value;
    const generatedOrderName = `GW${orderNumber}`;
    setOrderName(generatedOrderName);
    form.setValue("name", generatedOrderName);

  };


  const [fileList, setFileList] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {

    const selectedFiles: File[] = e.target.files ? Array.from(e.target.files) : [];
    console.log(selectedFiles);
    setFileList(selectedFiles);
  };



  let files = fileList ? fileList : [];


  const updateFiletype = (file: any, value: any) => {
    file.fileType = value;
  }


  const removeFileHandler = (index: number) => {
    const updatedFiles = [...files] as any;
    updatedFiles.splice(index, 1);
    setFileList(updatedFiles);
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {

    try {
      setIsloading(true);
      e.preventDefault();


      values.educationLevel = values.educationLevel[0] as any;
      console.log("Session userID", session, session?.user, session?.user?.id);
      values.userId = session?.user?.id;


      const res = await httpCreateOrder(values, session, toast, files);
      if (res) {
        form.reset();
      }
    } catch (error) {
      console.error('Order creation error:', error);
    } finally {
      setIsloading(false);
    }


  }

  if (typeof window !== 'undefined') {
    if (!session) {
      signIn()
      return null
    }
  }

  return (
    <div className='w-full'>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=' text-black'>
          <div className="flex flex-col items-center justify-center p-4 mb-4">
            <p className=" font-bold text-xl">Create a New Order</p>
          </div>

          <div className=' flex flex-wrap justify-evenly text-md gap-[10px] w-full  '>
            {step === 1 && (
              <div className="first flex flex-col justify-between  w-full lg:w-2/3 p-10 h-full  bg-white rounded ">
                <h3 className="font-semibold text-lg mb-5">Order Details</h3>
                <div className='w-full lg:w-full  flex flex-col gap-y-[22px]'>
                  <FormField
                    control={form.control}
                    name="orderType"

                    render={({ field }) => (

                      <FormItem>
                        <FormLabel className="font-semibold">Order Type</FormLabel>

                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid max-w-md grid-cols-3 gap-2 "
                        >
                          {formItems.map((item) => (
                            <FormItem key={item.value}>
                              <FormLabel className="[&:has([data-state=checked])>div]:bg-orange-600 [&:has([data-state=checked])>div]:text-white">
                                <FormControl>
                                  <RadioGroupItem value={item.value} className="sr-only" />
                                </FormControl>
                                <div className="items-center rounded-md border-2 border-muted cursor-pointer p-1 hover:border-accent">
                                  <span className="md:w-8 block w-full p-2 text-center font-normal">
                                    {item.label}
                                  </span>
                                </div>
                              </FormLabel>
                            </FormItem>
                          ))}
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
                        <FormLabel className="font-semibold">Deadline:{`10 days to go`}</FormLabel>
                        <FormControl>
                          <Input type="datetime-local"  {...field} />
                        </FormControl>
                        <FormMessage />

                      </FormItem>

                    )}
                  />
                  <div className='flex gap-5 w-full'>

                    <FormField
                      control={form.control}
                      name="subject"

                      render={({ field }) => (
                        <FormItem className='flex flex-col gap-y-2
                      
                      '>
                          <FormLabel className="font-semibold">Subject</FormLabel>
                          <FormControl>
                            <SubjectCombobox value={field.value} setValue={field.onChange} />
                          </FormControl>
                        </FormItem>

                      )}
                    />
                    <FormField
                      control={form.control}
                      name="citationStyle"

                      render={({ field }) => (
                        <FormItem className='flex flex-col gap-y-2
                      
                      '>
                          <FormLabel className="font-semibold">Style</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="w-[180px] h-full bg-white opacity-100 border-gray-200">
                                <SelectValue placeholder="APA7" />
                              </SelectTrigger>
                              <SelectContent className="bg-white opacity-100 z-10">
                                <SelectItem value="APA7">APA7</SelectItem>
                                <SelectItem value="APA8">APA8</SelectItem>
                                <SelectItem value="MLA">MLA</SelectItem>
                                <SelectItem value="Chicago">Chicago</SelectItem>
                                <SelectItem value="Harvard">Harvard</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>

                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sources"

                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Sources</FormLabel>
                          <FormControl>
                            <Input min={0} type="number" placeholder='number of sources' {...field} />
                          </FormControl>
                        </FormItem>

                      )}
                    />
                  </div>

                  <div className='flex gap-5 w-full'>
                    <FormField
                      control={form.control}
                      name="words"

                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Words</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder='number of words' {...field} />
                          </FormControl>
                        </FormItem>

                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pages"

                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Pages</FormLabel>
                          <FormControl>
                            <Input min={1} type="number" placeholder='number of pages' {...field} />
                          </FormControl>
                        </FormItem>

                      )}
                    />
                    <FormField
                      control={form.control}
                      name="spacing"

                      render={({ field }) => (
                        <FormItem className='flex flex-col gap-y-2
                      
                      '>
                          <FormLabel className="font-semibold">spacing</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="w-[180px] h-full bg-white opacity-100 border-gray-200">
                                <SelectValue placeholder="DOUBLE" />
                              </SelectTrigger>
                              <SelectContent className="bg-white opacity-100 z-10">
                                <SelectItem value="double">DOUBLE</SelectItem>
                                <SelectItem value="single">SINGLE</SelectItem>
                                <SelectItem value="oneandhalf">1.5</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>

                      )}
                    />
                  </div>


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
                <div className="w-full flex justify-center items-center">
                  <Button onClick={nextStep} variant='secondary' className="m-3">Next</Button>
                </div>
              </div>

            )}




            {step === 2 && (

              <div className=" second flex flex-col  justify-between   h-full w-full lg:w-2/3  bg-white rounded overflow-hidden p-10 ">
                <h3 className="font-semibold text-lg mb-5">Description and Attachments</h3>
                <div className='w-full  flex flex-col justify-between space-y-3 '>
                  <FormField
                    control={form.control}
                    name="topic"

                    render={({ field }) => (
                      <FormItem className='flex flex-col gap-y-2'>
                        <FormLabel className="font-semibold">Topic</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Enter topic..." {...field} />
                        </FormControl>
                      </FormItem>

                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"

                    render={({ field }) => (
                      <FormItem className='flex flex-col gap-y-2 h-[30vh]'>
                        <FormLabel className="font-semibold">Detailed Description</FormLabel>
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
                      <FormItem className='flex flex-col gap-y-2 '>
                        <FormLabel className="font-semibold">Upload attachments</FormLabel>
                        <FormControl>
                          <Input type="file" onChange={handleFileChange} multiple placeholder="Select file(s)..." />

                        </FormControl>
                        <ul className="max-h-[35vh] overflow-scroll">
                          {Array.isArray(files) && files.map((file, i) => (

                            <li key={i} className='flex justify-between gap-x-4  my-1 hover:bg-slate-150  rounded border-b w-full '>
                              <div className='flex justify-between border-[1px] w-full rounded'>
                                <div className="flex  px-2 py-1 text-xs justify-center items-center space-x-4 rounded ">
                                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                  <div className='flex flex-col w-full '>
                                    <p className='w-2/3  text-ellipsis'> {file.name}</p>
                                    <p>Size: {(file.size < 1024 ? file.size + ' b' : file.size < 1048576 ? (file.size / 1024).toFixed(2) + ' kb' : file.size < 1073741824 ? (file.size / 1048576).toFixed(2) + ' mb' : (file.size / 1073741824).toFixed(2) + ' gb')}</p>

                                  </div>
                                </div>

                                <div className="flex px-2 py-1 text-xs space-x-2 justify-center items-center">
                                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                  <p className='whitespace-nowrap'>Today, 11:58 PM</p>

                                  <div className='whitespace-nowrap'>

                                    <Controller
                                      control={form.control}
                                      name={`fileType.${i}`} // Use dynamic field names based on the index
                                      defaultValue="" // Set the initial value for each field
                                      render={({ field }) => (
                                        <FormControl>
                                          <FileCombobox value={field.value} setValue={(value: any) => { field.onChange(value); updateFiletype(file, value); }} />
                                        </FormControl>
                                      )}
                                    />
                                  </div>
                                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                  <svg onClick={() => removeFileHandler(i)} className='cursor-pointer' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                </div>

                              </div>
                            </li>
                          ))}
                        </ul>
                      </FormItem>

                    )}
                  />

                </div>
                <div className="w-full  flex justify-evenly ">
                  <Button onClick={prevStep} variant='secondary' className="m-3">Prev</Button>
                  <Button onClick={nextStep} variant='secondary' className="m-3">Next</Button>
                </div>

              </div>


            )}




            {step === 3 && (
              <div className=" third flex flex-col justify-center h-full w-full lg:w-2/3 bg-white rounded p-10 ">
                <h3 className="font-semibold text-lg mb-5"> Writer Details</h3>
                <div className=" w-full flex flex-col   bg-white space-y-4">

                  <FormField
                    control={form.control}
                    name="writerDeadline"

                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Writer Deadline:{`10 days to go`}</FormLabel>
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
                        <FormLabel className="font-semibold">Choose Action</FormLabel>

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
                                    <FormLabel className="font-semibold">Writer Proficiency</FormLabel>
                                    <FormControl>
                                      <RadioGroup defaultValue="intermidiate" className='grid grid-cols-3'>
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
                        <FormLabel className="font-semibold">Select Client</FormLabel>
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
                    name="writerFee"

                    render={({ field }) => (
                      <FormItem className='flex flex-col gap-y-2'>
                        <FormLabel className="font-semibold">CPP</FormLabel>
                        <FormControl>
                          <Input type="number"  {...field} />
                        </FormControl>
                      </FormItem>

                    )}
                  />

                  <FormField
                    control={form.control}
                    name="orderNumber"

                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Order Number</FormLabel>
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
                <div className="w-full flex justify-evenly items-center">
                  <Button onClick={prevStep} variant='secondary' className="m-3">Prev</Button>
                  <Button variant='default' type="submit">
                    {isloading ? 'Loading...' : 'Submit'}
                  </Button>
                </div>
              </div>
            )}





          </div>

        </form>
      </Form>
    </div>
  )
}

export default CreateOrder