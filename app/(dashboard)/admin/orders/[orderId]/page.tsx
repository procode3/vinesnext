"use client";
import { useState, useEffect } from "react";
import { httpGetOrder } from "@/app/(dashboard)/hooks/requests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import OrderHeader from "@/components/OrderHeader";
import OrderDetails from "@/components/OrderDetails";
import OrderAttachments from "@/components/OrderAttachments";
import OrderSubmissions from "@/components/OrderSubmissions";


function Dashboard({ params }: { params: { orderId: string } }) {
	const [order, setOrder] = useState<any>({});
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
			<OrderHeader session={session} order={order}/>
			<Tabs
				defaultValue="details"
				className="w-full"
			>
				<TabsList>
					<TabsTrigger value="details">Order Details:</TabsTrigger>
					<TabsTrigger value="manage">Manage</TabsTrigger>
				</TabsList>
				<TabsContent value="details">
					<OrderDetails session={session} order={order}/>
					<OrderAttachments file={order?.File}/>
				</TabsContent>
				<TabsContent value="manage">
					<OrderSubmissions session={session} />
				</TabsContent>
			</Tabs>
		</div>
	); 
}

export default Dashboard;
