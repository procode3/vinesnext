import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import Attachments from "@/components/Attachment";

interface OrderAttachmentProps {
	file: any
}

export default function Dashboard({ file }: OrderAttachmentProps) {

	return (

		<Card className="">
			<CardHeader className="flex flex-row justify-between items-center space-y-0 ">
				<CardTitle>Attachments</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col   gap-2">
				{file?.map((file: any, index: any) => (
					<Attachments
						key={index}
						file={file}
					/>
				))}
			</CardContent>
		</Card>
	);
}


