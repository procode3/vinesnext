"use client"

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar/navbar'
import Sidenav from './components/sidenav/sidenav'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Writers√ine',
  description: 'Powered by next13',
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
      <body className={inter.className}>
        <SessionProvider session={session}>
        <Navbar />
        <div className='flex'>
          <Sidenav />
          {children}
        </div>
        </SessionProvider>
      </body>
    </html>
  )
}
