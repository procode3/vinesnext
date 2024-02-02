'use client'
import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@mui/material/styles'
import Sidenav from './components/sidenav/sidenav'
import { createTheme } from '@mui/material/styles';
import Script from 'next/script'
import Unauthorized from './components/Unauthorized'
import NextTopLoader from 'nextjs-toploader';
import AuthProvider from '../context/AuthProvider';

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
  
  const theme = createTheme();
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-full `}>
        <SessionProvider session={session}>
          <ThemeProvider theme={theme}>
          {/* <AuthProvider> */}
            <div className="flex  w-full min-h-screen relative pl-[70px] xl:pl-[260px] ">
               <NextTopLoader />
                <Sidenav />
              <div className="flex w-full justify-center py-4 px-4 md:px-10">
                {children}
                </div>
              <Toaster />
            </div>
            {/* </AuthProvider> */}
          </ThemeProvider>
        </SessionProvider>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.js" />
      </body>
    </html>
  )
}
