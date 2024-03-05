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

export default function OrderDetails({  order }: OrderHeaderProps) {
	console.log
	return (

		<Card className="bg-white my-3">
			<CardHeader className="flex flex-row justify-between items-center space-y-0 ">
				<CardTitle 	className="text-">Order Details:</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col md:flex-row px-20">
					<div className="flex flex-col w-full md:w-1/2">
					<div className="flex justify-between items-center">
						<div className="p-2 font-semibold text-xs ">Subject:</div>
						<div className="p-2 font-light text-xs">
							{`${order?.subject.charAt(0).toUpperCase() + order?.subject.slice(1).toLowerCase()}`}
						</div>
					</div>


					<div className="flex justify-between items-center">
						<div className="p-2 font-semibold text-xs ">Pages:</div>
						<div className="p-2 font-light text-xs ">{order?.pages}</div>
					</div>

					<div className="flex justify-between items-center">
						<div className="p-2 font-semibold text-xs ">Order Type:</div>
						<div className="p-2 font-light text-xs ">
							{`${order?.orderType.charAt(0).toUpperCase() + order?.orderType.slice(1).toLowerCase()}`}
						</div>
					</div>

					<div className="flex justify-between items-center">
						<div className="p-2 font-semibold text-xs ">Sources:</div>
						<div className="p-2 font-light text-xs ">
							{order?.sources}
						</div>
					</div><div className="flex justify-between items-center">
						<div className="p-2 font-semibold text-xs ">Language Style:</div>
						<div className="p-2 font-light text-xs ">
							English(US)
						</div>
					</div>
					

					<div className="flex justify-between items-center">
						<div className="p-2 font-semibold text-xs ">
							Education Level:
						</div>
						<div className="p-2 font-light text-xs ">
							{`${order?.educationLevel.charAt(0).toUpperCase() + order?.educationLevel.slice(1).toLowerCase()}`}
						</div>
					</div>

					<div className="flex justify-between items-center">
						<div className="p-2 font-semibold text-xs ">Words:</div>
						<div className="p-2 font-light text-xs ">
							{order?.words}
						</div>
					</div>

					<div className="flex justify-between items-center">
						<div className="p-2 font-semibold text-xs ">Citation Style:</div>
						<div className="p-2 font-light text-xs ">
							{order?.citationStyle}
						</div>
					</div>

					<div className="flex justify-between items-center">
						<div className="p-2 font-semibold text-xs ">Spacing:</div>
						<div className="p-2 font-light text-xs ">
							{`${order?.spacing.charAt(0).toUpperCase() + order?.spacing.slice(1).toLowerCase()}`}
						</div>
					</div>

				</div>
				<Separator orientation="vertical" />
				<div className="flex flex-col w-full md:w-1/2">
					
					<div className="w-full">
						<div className="p-2 font-semibold text-xs ">Description:</div>
						<div className="p-2 font-light text-xs ">
							{order?.description}
						</div>
					</div>
				</div>
				</div>
			</CardContent>
		</Card>
	);
}


