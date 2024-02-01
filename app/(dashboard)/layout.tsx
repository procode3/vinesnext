"use client"

import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from "@/components/ui/toaster"
import { useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import Sidenav from './components/sidenav/sidenav'
import { createTheme } from '@mui/material/styles';
import Script from 'next/script'
import Unauthorized from './components/Unauthorized'
import NextProgress from "next-progress";

const inter = DM_Sans({ weight: '400', subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Writers√ine',
//   description: 'Writers√ine',
// }
interface IProps {
  children: React.ReactNode
  session: any
}
export default function RootLayout({ children, session }: IProps) {
  const [isSidenavVisible, setIsSidenavVisible] = useState(true);

  const toggleSidenav = () => {
    const isLargeScreen = window.innerWidth >= 1400;
    setIsSidenavVisible(isLargeScreen ? true : isSidenavVisible);
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
      <body className={`${inter.className} flex flex-col h-full `}>
        <SessionProvider session={session}>
          <ThemeProvider theme={theme}>
            <div className="flex flex-col w-full  bg-gray-100 min-h-screen relative pl-[70px] xl:pl-[260px] ">
              {isSidenavVisible && <Sidenav toggleSidenav={toggleSidenav} />}
              <div className="flex w-full justify-center py-4 px-4 xl:px-10">
                <NextProgress delay={300} options={{ showSpinner: false }} />
                {children}</div>
              <Toaster />
            </div>
          </ThemeProvider>
        </SessionProvider>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.js" />
      </body>
    </html>
  )
}
