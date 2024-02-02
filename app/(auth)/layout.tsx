"use client"

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import NextTopLoader from 'nextjs-toploader';



const inter = Inter({ weight: '400', subsets: ['latin'] })

interface IProps {
  children: React.ReactNode
}
export default function AuthLayout({
  children
}: IProps) {

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        <div className="flex w-full justify-center">
          <NextTopLoader />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  )
}
