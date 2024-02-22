"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import { signIn, signOut } from "next-auth/react"
import { LogOut } from 'lucide-react';

export default function LoginStatus(session: any) {

    return (
        <div className="flex flex-col  items-center mt-auto text-gray-200 justify-evenly h-[70%] " >
            <Button variant="outline" className="bg-transparent" onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
            </Button>
        </div>
    )
}


