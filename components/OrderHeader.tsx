'use client'
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
import { useRouter } from 'next/navigation';



interface OrderHeaderProps {
	session: any,
	order: any
}

export default function OrderHeader({ session, order }: OrderHeaderProps) {

const router = useRouter();


	return (
		<div className=" h-[20vh] flex flex-col justify-evenly  rounded-lg ">
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
						{session?.user?.userType === "WRITER" && (
							<Button
								className="flex items-center backdrop-blur-md  hover:text-white border-black justify-center border "
								variant="default"
							>
								<Frame className="mr-2 h-4 w-4" />
								<span className="hidden xl:inline" >Take</span>
							</Button>
						)}
						{session?.user?.userType === "ADMIN" && (
							<Select>
								<SelectTrigger className="w-[150px] h-[40px] bg-slate-900 border-none text-white p-3">
									<SelectValue
										className="text-whitebg-white p-2"
										placeholder="Move To"
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectGroup className="bg-white ">
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
						? new Date(order.writerDeadline).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric' })
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


