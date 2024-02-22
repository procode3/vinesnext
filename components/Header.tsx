import { Bell } from 'lucide-react';

interface HeaderProps {
  notificationCount: number;
  session: any
}
export default async function Header({ notificationCount, session }: HeaderProps) {
  return (
    <div className='flex w-full h-[100px] justify-between items-center py-5' >
      <div>
        <h2 className='font-bold text-3xl'>Welcome back, {session?.user?.name}!</h2>
        <p className='text-gray-500'>Take a look at you dashboard </p>
      </div>
      <div className="w-[45px] h-[45px] relative cursor-pointer hover:scale-110 transition-transform">
        <Bell color="#000000" strokeWidth={0.75} />
        <div className='absolute top-0 right-2 z-2  bg-red-700 text-xs text-white rounded-full w-1/3 h-1/3 flex items-center text-center justify-center '>{notificationCount}</div>
      </div>

    </div >
  )
}
