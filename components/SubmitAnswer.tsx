'use client'
import { Button } from "@/components/ui/button";
import { useState, useEffect, ChangeEvent, useRef} from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import FileCombobox from "@/components/form/fileCombobox";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"


const formSchema = z.object({
	description: z.string().min(0).max(1024),
	clientFiles: z.array(z.string()).nullable(),
	fileType: z.array(z.string()).nullable(),
});

export default function SubmitAnswer() {
	const [fileList, setFileList] = useState<FileList | null>(null);
	const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: "",
			clientFiles: ["null"],
			fileType: ["null"],
		},
	});
    
    function onSubmit(values: z.infer<typeof formSchema>, e: any) {
		console.log(values);
	}
    let files = fileList ? [...fileList] : [];

    const updateFiletype = (file: any, value: any) => {
		file.fileType = value;
		console.log(file);
	};
    
    const removeFileHandler = (index: number) => {
		const updatedFiles = [...files] as any;
		updatedFiles.splice(index, 1);
		setFileList(updatedFiles);
	};

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFileList(e.target.files);
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">Submit Answer</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[800px] max-h-screen overflow-scroll">
				<DialogHeader>
					<DialogTitle>Submit Answer</DialogTitle>
					<DialogDescription>
						Make changes to your order here. Click save when you are done.
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col-center  w-full  justify-center">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className=" text-black w-full"
						>
							<div className="flex flex-col justify-between w-full  rounded">
								<div className=" ">
									<FormField
										control={form.control}
										name="description"
										render={({ field }) => (
											<FormItem className="flex flex-col  w-full  gap-y-2 h-[30vh] ">
												<FormLabel>Detailed Comments</FormLabel>
												<FormControl>
													<Textarea {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
								</div>

								<div className="flex  w-full py-1 text-xs space-x-2 justify-center items-center">
									<FormField
										control={form.control}
										name="clientFiles"
										render={({ field }) => (
											<FormItem className="flex flex-col gap-y-2 py-3 w-full">
												<FormLabel>Upload attachments</FormLabel>
												<FormControl>
													<Input
														type="file"
														onChange={handleFileChange}
														multiple
														placeholder="Select file(s)..."
													/>
												</FormControl>
												<ul className="max-h-[35vh] overflow-scroll">
													{files.map((file, i) => (
														<li
															key={i}
															className="flex justify-between gap-x-4  my-1 hover:bg-slate-150  rounded border-b w-full "
														>
															<div className="flex justify-between border-[1px] w-full rounded">
																<div className="flex  px-2 py-1 text-xs justify-center items-center space-x-4 rounded ">
																	<svg
																		width="15"
																		height="15"
																		viewBox="0 0 15 15"
																		fill="none"
																		xmlns="http://www.w3.org/2000/svg"
																	>
																		<path
																			d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z"
																			fill="currentColor"
																			fillRule="evenodd"
																			clipRule="evenodd"
																		></path>
																	</svg>
																	<div className="flex flex-col w-full ">
																		<p className="w-full whitespace-nowrap text-ellipsis">
																			{" "}
																			{file.name}
																		</p>
																		<p>
																			Size:{" "}
																			{file.size < 1024
																				? file.size + " b"
																				: file.size < 1048576
																				? (file.size / 1024).toFixed(2) + " kb"
																				: file.size < 1073741824
																				? (file.size / 1048576).toFixed(2) +
																				  " mb"
																				: (file.size / 1073741824).toFixed(2) +
																				  " gb"}
																		</p>
																	</div>
																</div>

																<div className="flex px-2 py-1 text-xs space-x-2 justify-center items-center">
																	
																	{/* <p>Today, 11:58 PM</p> */}

																	<div className="whitespace-nowrap">
																		<Controller
																			control={form.control}
																			name={`fileType.${i}`} // Use dynamic field names based on the index
																			defaultValue="" // Set the initial value for each field
																			render={({ field }) => (
																				<FormControl>
																					<FileCombobox
																						value={field.value}
																						setValue={(value: any) => {
																							field.onChange(value);
																							updateFiletype(file, value);
																						}}
																					/>
																				</FormControl>
																			)}
																		/>
																	</div>
																	
																	<svg
																		onClick={() => removeFileHandler(i)}
																		className="cursor-pointer"
																		width="15"
																		height="15"
																		viewBox="0 0 15 15"
																		fill="none"
																		xmlns="http://www.w3.org/2000/svg"
																	>
																		<path
																			d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
																			fill="currentColor"
																			fillRule="evenodd"
																			clipRule="evenodd"
																		></path>
																	</svg>
																</div>
															</div>
														</li>
													))}
												</ul>
											</FormItem>
										)}
									/>
								</div>
								
								<div className="flex items-center py-3 gap-1">
									<Checkbox id="terms1" onChange={(e) => setIsChecked1((e.target as HTMLInputElement).checked)} />

									<label
									htmlFor="terms1"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
									I have ensured that the content is original and free from plagiarism
									</label>
								</div>
								<div className="flex items-center py-3 gap-1">
									<Checkbox id="terms2" onChange={(e) => setIsChecked2((e.target as HTMLInputElement).checked)} />

									<label
									htmlFor="terms2"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
									I have checked grammar and syntax for clarity and coherence.
									</label>
								</div>
								<div className="flex items-center py-3 gap-1">
									<Checkbox id="terms3" onChange={(e) => setIsChecked3((e.target as HTMLInputElement).checked)} />

									<label
									htmlFor="terms3"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
									I have rigorously fact-checked and cited all sources for accuracy and reliability.
									</label>
								</div>
								<Button type="submit" disabled={!(isChecked1 && isChecked2 && isChecked3)}>
									Save changes
								</Button>
							</div>
						</form>
					</Form>
				</div>

				<DialogFooter></DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
