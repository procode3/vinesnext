import React from 'react'
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DashCardProps{
    title: string;
    value: string;
    iconUrl: string;
    changeValue?: number;
    changeText: string;
}

export default function DashCard({title, value, iconUrl, changeValue, changeText}:DashCardProps) {
  return (
      <Card className="bg-slate-800 h-[130px] flex flex-col text-gray-200 hover:text-gray-900 hover:bg-slate-300 rounded-3xl w-full gap-1 md:gap-3">
          <CardHeader className="flex flex-row h-1/3 items-center justify-between space-y-0 pb-2 ">
            <CardTitle className="text-xs sm:text-md font-medium">
              {title}
            </CardTitle>
            <div className="w-[15px] h-[15px] relative">
              <Image
                src={iconUrl}
                alt="avatar"
                width={100}
                height={100}
                style={{objectFit: "contain"}}
                className=''
                priority
            />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col h-2/3 gap-1 md:gap-3">
            <div className="h-1/2 text-[14px] md:text-[18px] font-bold">{value}</div>
            <p className="h-1/2 text-xs md:text-md text-muted-foreground ">
              {changeValue ? <span className="text-green-500">{changeValue}%</span> : null} {changeText}
            </p>
          </CardContent>
        </Card>
    
  )
}
