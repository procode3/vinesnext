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

 interface OrderHeaderProps{
    session: any,
    order: any
 }

export default function OrderHeader({ session, order }: OrderHeaderProps) {
	console.log(session?.user);



	return (
			<div className="bg-green-900 h-[30vh] flex flex-col justify-evenly p-5 rounded-lg ">
				<div className="">
					<div className="flex flex-row justify-between items-center space-y-0 ">
						{order ? (
						<div className="flex flex-col gap-2">
							<span className="text-[24px] text-white">{order?.topic}</span>
							<span className="text-sm text-gray-100">{order?.name} </span>
						</div>
						 ) : (
						 <div className="flex flex-col gap-2">
							<Skeleton className="w-[100px] h-[20px] bg-red-200 rounded-full" />
						</div>
						

						)}
						<div className="text-md">
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
						</div>
					</div>
				</div>
				<div className="">
					<div className="flex flex-row justify-between items-center space-y-0 ">
						<div>
							<p className="bg-green-200 rounded p-2 text-sm lowercase">
								{order?.orderStatus}
							</p>
						</div>
                        <Countdown writerDeadline={order?.writerDeadline}/>

						<div className="text-md text-gray-100">
							Total: Ksh.{" "}
							<span className="text-green-600 font-bold">{`500`}</span>
						</div>
					</div>
				</div>
			</div>
	); 
}


