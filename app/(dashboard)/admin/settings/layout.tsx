import Link from "next/link"
import { ReactNode } from 'react';

type SettingsLayoutProps = {
  children: ReactNode;
};

function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className='bg-white w-screen h-full flex flex-col gap-4 px-4'>
      <h1 className="text-md md:text-[16px] font-semibold">Account settings</h1>
      <div className="main-container flex flex-col sm:flex-row">
        <div className="settings-nav flex sm:flex-col items-center sm:justify-start shadow-md w-full sm:w-48 border  p-4 dark:border-gray-600  opacity-[100%]">
          <nav className="flex sm:flex-col sm:gap-4 w-full justify-between sm:justify-normal">
            <Link href="/admin/settings/" className="text-xs md:text-[12px] px-2 py-2 text-black  hover:bg-orange-600 hover:text-white cursor-pointer transition ease-in-out duration-400 rounded">Profile</Link>
            <div className="text-xs md:text-[12px] px-2 py-2 text-black hover:bg-orange-600 hover:text-white cursor-pointer transition ease-in-out duration-400 rounded">Security</div>
            <div className="text-xs md:text-[12px] px-2 py-2 text-black hover:bg-orange-600 hover:text-white cursor-pointer transition ease-in-out duration-400 rounded">Billing</div>
            <Link href="/admin/settings/newuser" className="text-xs md:text-[12px] px-2 py-2 text-black hover:bg-orange-600 hover:text-white cursor-pointer transition ease-in-out duration-400 rounded">Register User</Link>
            <div className="text-xs md:text-[12px] px-2 py-2 text-black hover:bg-orange-600 hover:text-white cursor-pointer transition ease-in-out duration-400 rounded">Manage Users</div>
          <div>
            <p className="text-red-600 text-xs md:text-[12px] px-2 py-2  hover:bg-red-600 hover:text-white cursor-pointer transition ease-in-out duration-400 rounded">Delete Account</p>
          </div>
          </nav>
        </div>
        <div className="settings-display  flex justify-center w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default SettingsLayout