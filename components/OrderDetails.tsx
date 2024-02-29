import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";


 interface OrderHeaderProps{
    session: any,
    order: any
 }

export default function OrderDetails({ session, order }: OrderHeaderProps) {
	console.log(session?.user);
	return (
		
					<Card className="bg-white">
						<CardHeader className="flex flex-row justify-between items-center space-y-0 ">
							<CardTitle>Order Details:</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 md:grid-cols-4 w-full">
								<div>
									<div className="p-2 font-semibold text-sm">Subject:</div>
									<div className="p-2 font-light text-smapitalize">
										{order?.subject}
									</div>
								</div>

								<div>
									<div className="p-2 font-semibold text-sm">Pages:</div>
									<div className="p-2 font-light text-sm">{order?.pages}</div>
								</div>

								<div>
									<div className="p-2 font-semibold text-sm">Order Type:</div>
									<div className="p-2 font-light text-sm">
										{order?.orderType}
									</div>
								</div>

								<div>
									<div className="p-2 font-semibold text-sm">Sources:</div>
									<div className="p-2 font-light text-sm">
										{order?.sources}
									</div>
								</div>

								<div>
									<div className="p-2 font-semibold text-sm">
										Education Level:
									</div>
									<div className="p-2 font-light text-sm">
										{order?.educationLevel}
									</div>
								</div>

								<div>
									<div className="p-2 font-semibold text-sm">Words:</div>
									<div className="p-2 font-light text-sm">
										{order?.words}
									</div>
								</div>

								<div>
									<div className="p-2 font-semibold text-sm">Citation Style:</div>
									<div className="p-2 font-light text-sm">
										{order?.citationStyle}
									</div>
								</div>

								<div>
									<div className="p-2 font-semibold text-sm">Spacing:</div>
									<div className="p-2 font-light text-sm">
										{order?.spacing}
									</div>
								</div>

								<div className="col-span-2 md:col-span-4">
									<div className="p-2 font-semibold text-sm">Description:</div>
									<div className="p-2 font-light text-sm">
										{order?.description}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
	); 
}


