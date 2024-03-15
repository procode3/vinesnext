import { httpGetOrder } from "@/app/(dashboard)/hooks/requests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderHeader from "@/components/OrderHeader";
import OrderDetails from "@/components/OrderDetails";
import OrderAttachments from "@/components/OrderAttachments";
import OrderSubmissions from "@/components/OrderSubmissions";
import { getServerSession } from "next-auth";
import { options } from '@/pages/api/auth/options'



async function Dashboard({ params }: { params: { orderId: string } }) {

	const session = await getServerSession(options);

	const data = await httpGetOrder(params.orderId)

	if (!data) return null;
	const order = data?.data;




	return (
		<div className="w-full text-black px-2">
			<OrderHeader session={session} order={order} />
			<Tabs
				defaultValue="details"
				className="w-full"
			>
				<TabsList>
					<TabsTrigger value="details">Order Details:</TabsTrigger>
					<TabsTrigger value="manage">Manage</TabsTrigger>
				</TabsList>
				<TabsContent value="details">
					<OrderDetails order={order} />
					<OrderAttachments file={order?.File} />
				</TabsContent>
				<TabsContent value="manage">
					<OrderSubmissions session={session} />
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default Dashboard;
