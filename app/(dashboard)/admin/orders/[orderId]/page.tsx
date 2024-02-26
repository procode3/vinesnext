"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { httpGetOrder } from "@/app/(dashboard)/hooks/requests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import Submission from "@/components/Submission";
import Countdown from "@/components/Countdown";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Attachments from "@/components/Attachment";
import { Skeleton } from "@/components/ui/skeleton"
import SubmitAnswer from "@/components/SubmitAnswer";
import RequestRevision from "@/components/RequestRevision";
import AcceptAnswer from "@/components/AcceptAnswer";


function Dashboard({ params }: { params: { orderId: string } }) {
	const [order, setOrder] = useState<any>({});
	const [isloading, setIsloading] = useState(false);
	const { data: session } = useSession();

	console.log(session?.user);


	useEffect(() => {

    httpGetOrder(params.orderId).then((data) => {
        setOrder(data?.data);
        console.log(data.data);
    }); 
}, [params.orderId]);

	return (
		<div className="w-full text-black px-2">
			<div className="bg-green-900 h-[30vh]   rounded-md ">
				<div className="">
					<CardHeader className="flex flex-row justify-between items-center space-y-0 ">
						{order ? (
						<CardTitle className="flex flex-col gap-2">
							<span className="text-[24px] text-white">{order?.topic}</span>
							<span className="text-sm text-gray-100">{order?.name} </span>
						</CardTitle>
						 ) : (
						<Skeleton className="w-[100px] h-[20px] rounded-full" />

						)}
						<CardDescription className="text-md">
							{session?.user?.userType === "ADMIN" && (
								<Button
									className=""
									variant="default"
								>
									Take
								</Button>
							)}
							{session?.user?.userType === "ADMI" && (
								<Select>
									<SelectTrigger className="w-[150px] h-[40px] bg-slate-900 border-none text-white p-3">
										<SelectValue
											className="text-whitebg-white p-2"
											placeholder="Move To"
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectGroup className="bg-white ">
											<SelectLabel>Status</SelectLabel>
											<SelectItem value="available">Available</SelectItem>
											<SelectItem value="in_progress">In Progress</SelectItem>
											<SelectItem value="revision">Revision</SelectItem>
											<SelectItem value="disputed">Disputed</SelectItem>
											<SelectItem value="completed">Completed</SelectItem>
											<SelectItem value="refunded">Refunded</SelectItem>
										</SelectGroup>

									</SelectContent>
								</Select>
							)}
						</CardDescription>
					</CardHeader>
				</div>
				<div className="">
					<CardHeader className="flex flex-row justify-between items-center space-y-0 ">
						<CardTitle>
							<p className="bg-green-200 rounded p-2 text-sm lowercase">
								{order.orderStatus}
							</p>
						</CardTitle>
                        <Countdown writerDeadline={order?.writerDeadline}/>

						<CardDescription className="text-md text-gray-100">
							Total: Ksh.{" "}
							<span className="text-green-600 font-bold">{`500`}</span>
						</CardDescription>
					</CardHeader>
				</div>
			</div>

			<Tabs
				defaultValue="account"
				className="w-full"
			>
				<TabsList>
					<TabsTrigger value="account">Order Details:</TabsTrigger>
					<TabsTrigger value="password">Manage</TabsTrigger>
				</TabsList>
				<TabsContent value="account">
					<Card className="bg-white">
						<CardHeader className="flex flex-row justify-between items-center space-y-0 ">
							<CardTitle>Order Details:</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 md:grid-cols-3 w-full">
								<div>
									<div className="p-2 font-semibold text-sm">Subject:</div>
									<div className="p-2 font-light text-md capitalize">
										{order.subject}
									</div>
								</div>

								<div>
									<div className="p-2 font-semibold text-sm">Pages:</div>
									<div className="p-2 font-light text-md c">{order.pages}</div>
								</div>

								<div>
									<div className="p-2 font-semibold text-sm">Order Type:</div>
									<div className="p-2 font-light text-md c">
										{order.orderType}
									</div>
								</div>

								<div>
									<div className="p-2 font-semibold text-sm">Sources:</div>
									<div className="p-2 font-light text-md c">
										{order.sources}
									</div>
								</div>

								<div>
									<div className="p-2 font-semibold text-sm">
										Education Level:
									</div>
									<div className="p-2 font-light text-md c">
										{order.educationLevel}
									</div>
								</div>

								<div>
									<div className="p-2 font-semibold text-sm">Spacing:</div>
									<div className="p-2 font-light text-md c">
										{order.spacing}
									</div>
								</div>

								<div className="col-span-2 md:col-span-3">
									<div className="p-2 font-semibold text-sm">Description:</div>
									<div className="p-2 font-light text-md c">
										{order.description}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className="">
						<CardHeader className="flex flex-row justify-between items-center space-y-0 ">
							<CardTitle>Attachments</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col   gap-2">
							{order?.File?.map((file: any, index: any) => (
								<Attachments
									key={index}
									file={file}
								/>
							))}
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="password">
					<div className="w-full flex flex-col md:flex-row gap-5">
						<Card className="w-full">
							<CardHeader className="flex flex-row justify-between items-center space-y-0 ">
								<CardTitle>Submisions</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col justify-center space-y-2 w-full">
									<Submission />
									<Submission />
									<Submission />
									<Submission />
									<div className="w-full p-5 flex justify-evenly">
										{session?.user?.userType == "ADMIN" ? <SubmitAnswer/> : null}
										{session?.user?.userType == "ADMIN" ? <RequestRevision/> : null}
										{session?.user?.userType == "ADMIN" ? <AcceptAnswer/>: null}
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	); 
}

export default Dashboard;
