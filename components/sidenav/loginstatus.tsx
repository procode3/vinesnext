"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import { signIn, signOut } from "next-auth/react"
import { LogOut } from 'lucide-react';

export default function LoginStatus(session: any) {

    return (
        <div className="flex flex-col  items-center mt-auto text-gray-200 justify-center md:justify-evenly h-[70%] " >
            <Button variant="outline" className="flex bg-transparent justify-center" onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span className="hidden xl:inline">Sign Out</span>
            </Button>
        </div>
    )
}


