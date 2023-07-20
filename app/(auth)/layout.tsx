"use client"

import '../(dashboard)/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { SessionProvider } from 'next-auth/react'

const inter = Inter({ weight: '400', subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Writers√ine',
//   description: 'Powered by next13',
// }
interface IProps {
  children: React.ReactNode
  session: any
}


export default function RootLayout({
  children, session
}: IProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex w-1/2 items-center justify-center  p-12`}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}
