import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Submission from "@/components/Submission";

import SubmitAnswer from "@/components/SubmitAnswer";
import RequestRevision from "@/components/RequestRevision";
import AcceptAnswer from "@/components/AcceptAnswer";
import NoSubmissions from "./NoSubmissions";

interface OrderSubmissionsProps {
	session: any,
	submissions: any,
	order: any
}

export default function OrderSubmissions({ session, submissions, order }: OrderSubmissionsProps) {

	return (
		<div className="w-full flex flex-col md:flex-row gap-5">
			<Card className="w-full">
				<CardHeader className="flex flex-row justify-between items-center space-y-0 ">
					<CardTitle className=''>Submisions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col justify-center space-y-2 w-full">
						{submissions ? submissions.map((submission, index) => (
							<Submission key={index} submission={submission}/>
						)) : <NoSubmissions/>}
						<div className="w-full p-5 flex justify-evenly">
							{session?.user?.userType == "WRITER" || "ADMIN" ? <SubmitAnswer order={order} session={session} /> : null}
							{session?.user?.userType == "CLIENT" ? <RequestRevision /> : null}
							{session?.user?.userType == "CLIENT" ? <AcceptAnswer /> : null}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>

	);
}


