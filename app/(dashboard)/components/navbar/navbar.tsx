
import React from 'react'
import { signOut, signIn, useSession } from 'next-auth/react'
import { User, getUsers, getAvatarName } from '../../data/users/users'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LogoutIcon from '@mui/icons-material/Logout';
import DehazeRoundedIcon from '@mui/icons-material/DehazeRounded';
import { Button } from "@/components/ui/button"
require('dotenv').config();



export default function Navbar() {
  const host = process.env.HOST;
  const { data: session }: any = useSession();
  const path = `http://${host}/api/auth/signin`


  return (
    <div className=' flex justify-between text-m mb-4 px-12 py-2 min-h-[40px] ticky rounded-l spacex-2 items-center bg-white/75
    shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-black'>
      <DehazeRoundedIcon />
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

            <Button variant="default" onClick={() => signIn()}>Sign In</Button>

          )
        }
      </div>


    </div>
  )
}
