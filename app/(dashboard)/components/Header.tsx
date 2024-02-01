import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmojiEmotionsSharpIcon from '@mui/icons-material/EmojiEmotionsSharp';
import { useSession} from 'next-auth/react'

interface HeaderProps{
    name: string;
    notificationCount: number;
}
export default function Header({name, notificationCount}: HeaderProps) {
  const { data: session } = useSession()
 
  return (
    <div className='flex w-full h-1/5 justify-between items-center py-5'>
        <div>
          <h2 className='font-bold text-3xl'>Welcome back, {session?.user?.name}!</h2>
          <p className='text-muted opacity-0.5'>Take a look at you dashboard <EmojiEmotionsSharpIcon/></p>
        </div>
        <div className="w-[35px] h-[35px] relative cursor-pointer hover:scale-110 transition-transform">
          <NotificationsIcon className="h-full w-full"/>
          <div className='absolute top-0 right-0 z-2 bg-red-500 text-xs text-white rounded-full w-1/2 h-1/2 flex text-center justify-center '>{notificationCount}</div>
        </div>

      </div>
  )
}
