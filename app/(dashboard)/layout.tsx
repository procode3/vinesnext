"use client"

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

import { Toaster } from "@/components/ui/toaster"
import { Fragment, useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import Navbar from './components/navbar/navbar'
import Sidenav from './components/sidenav/sidenav'
import { createTheme } from '@mui/material/styles';


const inter = Inter({ weight: '400', subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Writers√ine',
//   description: 'Writers√ine',
// }
interface IProps {
  children: React.ReactNode
  session: any
}
export default function RootLayout({
  children, session
}: IProps) {
  const [isSidenavVisible, setIsSidenavVisible] = useState(true);


  const toggleSidenav = () => {
    const isLargeScreen = window.innerWidth >= 1280;
    setIsSidenavVisible(isLargeScreen ? true : !isSidenavVisible);
  };

  useEffect(() => {
    window.addEventListener('resize', toggleSidenav);
    return () => {
      window.removeEventListener('resize', toggleSidenav);
    };
  }, []);





  const theme = createTheme();
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        <SessionProvider session={session}>
          <ThemeProvider theme={theme}>
            <Navbar toggleSidenav={toggleSidenav} />
            <div className="flex flex-col w-full px-4 py-2  bg-white relative  xl:pl-[200px]">
              {isSidenavVisible && <Sidenav />}
              <div className="flex w-full justify-center">{children}</div>
              <Toaster />
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
