"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
} from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeftSquare, Frame } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { httpUpdateStatus } from '@/app/(dashboard)/hooks/requests';
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
	orderStatus: z.string().min(2, {
		message: "Order status error",
	}),
})

interface OrderHeaderProps {
	session: any,
	order: any
}

export default function OrderHeader({ session, order }: OrderHeaderProps) {
	const [isloading, setIsloading] = useState(false);

	const [isFetching, setIsFetching] = useState(false);
	const [isTaking, setIsTaking] = useState(false);
	const initialOrderStatus = useRef(order.orderStatus.toLowerCase());

	const { toast } = useToast()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			orderStatus: `${order?.orderStatus}`,
		},
	})
	const router = useRouter();

	const orderStatus = form.watch("orderStatus")



	useEffect(() => {
		// Check if the form value has changed
		if (orderStatus.toLowerCase() !== initialOrderStatus.current.toLowerCase()) {
			const fetchOrder = async () => {
				// Check if a fetch request is already ongoing
				if (isFetching) return;

				// Set isFetching to true to indicate a fetch request is ongoing
				setIsFetching(true);

				try {
					// Your fetch logic here
					const response = await fetch(`/api/v1/orders/status/${order.id}`, {
						method: 'POST',
						body: JSON.stringify({ status: orderStatus.toUpperCase() }),
						headers: {
							'Content-Type': 'application/json'
						}
					});
					const data = await response.json();
					// Handle response data
				} catch (error) {
					console.error('Error:', error);
				} finally {
					// Reset isFetching to false when the request is completed
					setIsFetching(false);
				}
			};

			// Call the fetchOrder function when orderStatus changes
			fetchOrder();
		}

		// Update the initialOrderStatus ref with the current orderStatus value
		initialOrderStatus.current = orderStatus;
	}, [orderStatus]);

	const takeOrder = (writerId, orderId) => {

		console.log('Start taking order', isTaking);
		if (isTaking) {
			try {
				fetch(`http://localhost:3000/api/v1/orders/takez/${orderId}`, {
					method: 'POST',
					body: JSON.stringify({ writerId }),
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(res => {
					setIsTaking(false)
					const data = res.json().then(res => console.log(res))
				})
			} catch (error) {
				setIsTaking(false)
				console.error(error)
			}
		}

		console.log('Done taking order', isTaking)

		return
	}


	return (
		<div className=" h-[20vh] flex flex-col justify-evenly  rounded-lg">
			<div className="py-2">
				<div className="flex flex-row justify-between items-center space-y-0 ">
					{order ? (
						<div className="flex items-center gap-2">

							<ChevronLeftSquare
								size={28}
								strokeWidth={1}
								className="cursor-pointer"
								onClick={() => router.back()}
							/>
							<span className="text-[24px] ">Order {order?.name}</span>
						</div>
					) : (
						<div className="flex flex-col gap-2">
							<Skeleton className="w-[100px] h-[20px] bg-red-200 rounded-full" />
						</div>


					)}
					<div className="text-md ">
						{session?.user?.userType === "WRITER" && session?.user?.id !== order?.writerId && (
							<Button
								className="flex items-center backdrop-blur-md  hover:text-white border-black justify-center border "
								variant="default"
								disabled={isTaking}
								onClick={() => { setIsTaking(true); takeOrder(session?.user?.id, order.id) }}

							>
								<Frame className="mr-2 h-4 w-4" />
								<span className=" xl:inline" >Take</span>
							</Button>
						)}
						{session?.user?.userType === "ADMIN" && (
							<Form {...form}>
								<form className="space-y-8">
									<FormField
										control={form.control}
										name="orderStatus"
										render={({ field }) => (
											<FormItem>
												<FormLabel></FormLabel>
												<FormControl>
													{isFetching ? (
														// Show loader when fetching is true
														<div>Loading...</div>
													) : (
														<Select onValueChange={field.onChange} value={orderStatus}>
															<SelectTrigger className="w-[150px] h-[40px] bg-slate-900 border-none text-white p-3">
																<SelectValue
																	className="text-whitebg-white p-2"
																	placeholder={order?.orderStatus.charAt(0).toUpperCase() + order?.orderStatus.substr(1).toLowerCase()}
																/>
															</SelectTrigger>
															<SelectContent>
																<SelectGroup className="bg-white ">
																	<SelectItem value="NEW" >New</SelectItem>
																	<SelectItem value="AVAILABLE" >Available</SelectItem>
																	<SelectItem value="UNCONFIRMED" >Unconfirmed</SelectItem>
																	<SelectItem value="INPROGRESS" >In Progress</SelectItem>
																	<SelectItem value="COMPLETED" >Completed</SelectItem>
																	<SelectItem value="CANCELLED" >Cancelled</SelectItem>
																	<SelectItem value="REVISION" >Revision</SelectItem>
																	<SelectItem value="DISPUTE" >Dispute</SelectItem>
																	<SelectItem value="REFUNDED" >Refunded</SelectItem>
																	<SelectItem value="EDITING" >Editing</SelectItem>
																	<SelectItem value="ACCEPTED" >Accepted</SelectItem>
																</SelectGroup>
															</SelectContent>
														</Select>
													)}
												</FormControl>
												<FormDescription />
												<FormMessage />
											</FormItem>
										)}
									/>
								</form>
							</Form>

						)}
					</div>
				</div>
			</div>
			<div className="flex flex-col space-y-4 bg-white p-5 rounded">
				<span className="text-base ">{order?.topic} </span>
				<div className="flex flex-row justify-between items-center space-y-0 text-xs">

					<div>
						<Badge className=" lowercase">
							{order?.orderStatus}
						</Badge>
					</div>
					<Separator orientation="vertical" />
					<span>
						{order && typeof order.writerDeadline === 'string'
							? new Date(order.writerDeadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
							: 'Invalid date'
						}
					</span>

					<Separator orientation="vertical" />

					<Countdown writerDeadline={order?.writerDeadline} />
					<Separator orientation="vertical" />

					<div >
						Total: Ksh.{" "}
						<span className="text-green-600 font-bold">{`500`}</span>
					</div>
				</div>
			</div>
		</div>
	);
}


