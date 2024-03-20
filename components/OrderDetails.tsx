import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";


interface OrderHeaderProps {
	order: any
}

export default function OrderDetails({ order }: OrderHeaderProps) {

	return (

		<Card className="bg-white my-3">
			<CardHeader className="flex flex-row justify-between items-center space-y-0 ">
				<CardTitle className="text-[20px] font-normal">Order Details:</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col md:flex-row px-20">
					<div className="flex flex-col w-full md:w-1/2">
						<div className="flex justify-between items-center">
							<div className="p-2 font-semibold text-[14px] ">Subject:</div>
							<div className="p-2 font-light text-[14px]">
								{`${order?.subject.charAt(0).toUpperCase() + order?.subject.slice(1).toLowerCase()}`}
							</div>
						</div>


						<div className="flex justify-between items-center">
							<div className="p-2 font-semibold text-[14px] ">Pages:</div>
							<div className="p-2 font-light text-[14px] ">{order?.pages}</div>
						</div>

						<div className="flex justify-between items-center">
							<div className="p-2 font-semibold text-[14px] ">Order Type:</div>
							<div className="p-2 font-light text-[14px] ">
								{`${order?.orderType.charAt(0).toUpperCase() + order?.orderType.slice(1).toLowerCase()}`}
							</div>
						</div>

						<div className="flex justify-between items-center">
							<div className="p-2 font-semibold text-[14px] ">Sources:</div>
							<div className="p-2 font-light text-[14px] ">
								{order?.sources}
							</div>
						</div><div className="flex justify-between items-center">
							<div className="p-2 font-semibold text-[14px] ">Language Style:</div>
							<div className="p-2 font-light text-[14px] ">
								English(US)
							</div>
						</div>


						<div className="flex justify-between items-center">
							<div className="p-2 font-semibold text-[14px] ">
								Education Level:
							</div>
							<div className="p-2 font-light text-[14px] ">
								{`${order?.educationLevel.charAt(0).toUpperCase() + order?.educationLevel.slice(1).toLowerCase()}`}
							</div>
						</div>

						<div className="flex justify-between items-center">
							<div className="p-2 font-semibold text-[14px] ">Words:</div>
							<div className="p-2 font-light text-[14px] ">
								{order?.words}
							</div>
						</div>

						<div className="flex justify-between items-center">
							<div className="p-2 font-semibold text-[14px] ">Citation Style:</div>
							<div className="p-2 font-light text-[14px] ">
								{order?.citationStyle}
							</div>
						</div>

						<div className="flex justify-between items-center">
							<div className="p-2 font-semibold text-[14px] ">Spacing:</div>
							<div className="p-2 font-light text-[14px] ">
								{`${order?.spacing.charAt(0).toUpperCase() + order?.spacing.slice(1).toLowerCase()}`}
							</div>
						</div>

					</div>
					<Separator orientation="vertical" />
					<div className="flex flex-col w-full md:w-1/2">

						<div className="w-full">
							<div className="p-2 font-semibold text-[14px] ">Description:</div>
							<div className="p-2 font-light text-[14px] ">
								{order?.description}
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}


