import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import Attachments from "@/components/Attachment";
import NoAttachments from "./NoAttachments";

interface OrderAttachmentProps {
	file: any
}

export default function Dashboard({ file }: OrderAttachmentProps) {

	return (

		<Card className="">
			<CardHeader className="flex flex-row justify-between items-center space-y-0 ">
				<CardTitle className='text-[20px] font-normal'>Attachments</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col   gap-2">
				{file ? file.map((file: any, index: any) => (
					<Attachments
						key={index}
						file={file}
					/>
				)) : <NoAttachments/>}
			</CardContent>
		</Card>
	);
}


