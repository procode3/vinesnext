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

interface OrderSubmissionsProps {
	session: any,
}

export default function OrderSubmissions({ session }: OrderSubmissionsProps) {

	return (
		<div className="w-full flex flex-col md:flex-row gap-5">
			<Card className="w-full">
				<CardHeader className="flex flex-row justify-between items-center space-y-0 ">
					<CardTitle className=''>Submisions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col justify-center space-y-2 w-full">
						<Submission />
						<Submission />
						<Submission />
						<Submission />
						<div className="w-full p-5 flex justify-evenly">
							{session?.user?.userType == "WRITER" || "ADMIN" ? <SubmitAnswer /> : null}
							{session?.user?.userType == "CLIENT" ? <RequestRevision /> : null}
							{session?.user?.userType == "CLIENT" ? <AcceptAnswer /> : null}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>

	);
}


