import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script'
import NextTopLoader from 'nextjs-toploader';
import Sidenav from '@/components/sidenav/sidenav'
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from '../context/AuthProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Writers√ine",
  description: "Ultimate orders management portal",
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`} >
        <AuthProvider session={session}>
          <NextTopLoader />
          <div className='flex w-screen  h-screen'>
            <Sidenav />
            <div className="flex w-full justify-center bg-slate-100 overflow-y-scroll py-12 px-4 md:px-10">
              {children}
              <Toaster />
            </div>
          </div>
          <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.js" />
        </AuthProvider>
      </body>
    </html >
  );
}
