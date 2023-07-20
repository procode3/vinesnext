
import React from 'react'
import { signOut, signIn, useSession } from 'next-auth/react'
import { User, getUsers, getAvatarName } from '../../data/users/users'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material'


export default function Navbar() {

  const { data: session }: any = useSession();


  return (
    <div className='text-white flex justify-between text-m px-12 py-4 min-h-[66px] spacex-2 items-center bg-[#0C7076]'>
      <h2 className='text-2xl'>Writers<span className='text-2xl text-[#001C30] '>√ine</span></h2>
      <div className="flex space-x-4 items-center my-auto py-0  " >
        {
          session?.user ? (

            <>
              <h2>Hello {session.user.user.username} </h2>

              <Avatar>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h2>Balance: ksh. 1500</h2>

              <LogoutIcon onClick={() => signOut()} />
            </>
          ) : (

            <Button variant="contained" onClick={() => signIn()}>Sign In</Button>

          )
        }
      </div>


    </div>
  )
}
