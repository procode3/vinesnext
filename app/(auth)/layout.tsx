"use client"

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

import { Toaster } from "@/components/ui/toaster"
import { Fragment, useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'



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
        <div className="flex w-full justify-center">{children}</div>
        <Toaster />
      </body>
    </html>
  )
}
