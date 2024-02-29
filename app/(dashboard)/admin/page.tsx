
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import DashCard from "@/components/dashcard";
import Overview from "@/components/sidenav/overview/overview";
import RankingItem from "@/components/rankingItem";
import Header from '@/components/Header';
import { redirect } from "next/navigation"
import { getServerSession } from 'next-auth';
import { options } from '@/pages/api/auth/options';


const cardProps = [
  {
    title: "All Orders",
    value: "2100",
    changeValue: 21,
    changeText: "Active Orders",
    iconName: "progress",
  },
  {
    title: "Active writers",
    value: "48",
    changeValue: 18,
    changeText: "from last month",
    iconName: "activewriter",
  },
  {
    title: "In Progress",
    value: "560",
    changeValue: 2,
    changeText: "from last month",
    iconName: "progress",
  },
];

const rankingData = [
  {
    rank: 1,
    avatarSrc: "/images/avatar-cactus.svg",
    name: "John Doe",
    points: "+150"
  },
  {
    rank: 2,
    avatarSrc: "/images/sloth.svg",
    name: "Jane Smith",
    points: "+120"
  },
  {
    rank: 3,
    avatarSrc: "/images/avatar-cactus.svg",
    name: "Bob Johnson",
    points: "+100"
  },
  {
    rank: 4,
    avatarSrc: "/images/sloth.svg",
    name: "Alice Williams",
    points: "+70"
  },
  {
    rank: 5,
    avatarSrc: "/images/avatar-cactus.svg",
    name: "Charlie Brown",
    points: "+40"
  },
  {
    rank: 6,
    avatarSrc: "/images/sloth.svg",
    name: "Emma Davis",
    points: "+40"
  },
  {
    rank: 7,
    avatarSrc: "/images/avatar-cactus.svg",
    name: "Frank Miller",
    points: "+40"
  },
  {
    rank: 8,
    avatarSrc: "/images/sloth.svg",
    name: "Grace Wilson",
    points: "+40"
  },
  {
    rank: 9,
    avatarSrc: "/images/avatar-cactus.svg",
    name: "Henry Jones",
    points: "+40"
  },
  {
    rank: 10,
    avatarSrc: "/images/sloth.svg",
    name: "Isabel White",
    points: "+40"
  }
]


export default async function Dashboard() {
  const session = await getServerSession(options);

  if (!session?.user) {
    redirect("/signin")

  }
  return (
    <div className="w-full flex flex-col justify-between ">
      <Header notificationCount={5} session={session} />
      <div className="lg:max-w-5xl lg:w-full  w-full space-y-4">
        <div className="grid gap-4 grid-cols-3">
          <Card className="col-span-3 md:col-span-2 rounded-xl bg-[#1F4A57]">
            <CardHeader className='top-0 w-full'>
              <CardTitle className="leading-wide text-gray-100 tracking-tight flex items-center justify-between">
                <p className="text-lg md:text-3xl">Overview</p>
                <p className="text-lg md:text-3xl text-green-400">$4500</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 w-full h-full">
              <Overview />
            </CardContent>
          </Card>
          <div className="col-span-3 md:col-span-1 space-y-4">
            {cardProps.map((props, index) => (
              <DashCard
                key={index}
                title={props.title}
                value={props.value}
                iconUrl={`/images/${props.iconName}.svg`}
                changeValue={props.changeValue}
                changeText={props.changeText}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2">
          <Card className="col-span-2 md:col-span-1 rounded-xl">
            <CardHeader>
              <CardTitle>Writer Ranking</CardTitle>
              <CardDescription>
                Top Writers this month.
              </CardDescription>
            </CardHeader>
            <CardContent className="element-with-scroll overflow-y-scroll h-[35vh]">
              <div className="flex flex-col text-sm font-md pr-3 ">
                {rankingData.map((item) => (
                  <RankingItem
                    key={item.rank}
                    rank={item.rank}
                    avatarSrc={item.avatarSrc}
                    name={item.name}
                    points={item.points}
                  />
                ))}
              </div>
              <p className="text-center hover:text-green-600 pointer">see more...</p>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  )
}


