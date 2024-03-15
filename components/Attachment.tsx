"use client";
import Image from "next/image";
import React from "react";

export default function Attachments({ file }: any) {
	const fileType = file.name.split(".").pop();

	let iconSrc;
	switch (fileType) {
		case "docx":
			iconSrc = "/images/docx.svg";
			break;
		case "pdf":
			iconSrc = "/images/pdf.svg";
			break;
		case "jpg" || "jpeg" || "png":
			iconSrc = "/images/img.svg";
			break;

		default:
			iconSrc = "/images/default.svg";
	}

	const handleDownload = async () => {
		const response = await fetch(file.url);
		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = file.name;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
	};
	return (
		<div className="flex flex-row justify-center items-center  w-full gap-1">
			<div className="flex justify-between border-[1px]  w-full rounded">
				<div className="flex  p-3 text-xs justify-start gap-5 items-center w-full rounded ">
					<div className="relative w-[30px] h-[30px]">
						<Image
							fill={true}
							src={iconSrc}
							alt="file icon"
						/>
					</div>
					<div className="flex flex-col w-full">
						<p>{file.name}</p>
						<p>Size: 2 KB</p>
					</div>
				</div>

				<div className="flex px-2 py-1 text-xs space-x-2 justify-center items-center">
					<p>{new Date(file.updatedAt).toLocaleString()}</p>
					<div className="bg-purple-300 px-2 py-1 font-semibold text-xs rounded ">
						{file.type}
					</div>
					<button onClick={handleDownload}>
						<svg
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
								fill="currentColor"
								fill-rule="evenodd"
								clip-rule="evenodd"
							></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
