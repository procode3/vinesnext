"use client"

import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

import { Toaster } from "@/components/ui/toaster"
import { useState, useEffect, useCallback } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import Navbar from './components/navbar/navbar'
import Sidenav from './components/sidenav/sidenav'
import { createTheme } from '@mui/material/styles';


const inter = Poppins({ weight: '400', subsets: ['latin'] })

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
      <body className={`${inter.className} flex flex-col h-full`}>
        <SessionProvider session={session}>
          <ThemeProvider theme={theme}>
            <div className="sticky top-0 z-50">
              <Navbar toggleSidenav={toggleSidenav} />
            </div>
            <div className="flex flex-col w-full  bg-slate-100 min-h-screen relative  xl:pl-[250px]">
              {isSidenavVisible && <Sidenav />}
              <div className="flex w-full justify-center py-4 px-4 md:px-12">{children}</div>
              <Toaster />
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
