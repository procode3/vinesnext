"use client"

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from "@/components/ui/toaster"
import { Fragment } from 'react'

import Navbar from './components/navbar/navbar'
import Sidenav from './components/sidenav/sidenav'

const inter = Inter({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Writers√ine',
  description: 'Writers√ine',
}
interface IProps {
  children: React.ReactNode
  session: any
}
export default function RootLayout({
  children, session
}: IProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
        <SessionProvider session={session}>
          <Sidenav />
          <div className='flex flex-col  w-full px-4 py-2  bg-white'>
            <Navbar />
            <div className="flex justify-center">
              {children}
            </div>

            <Toaster />
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
