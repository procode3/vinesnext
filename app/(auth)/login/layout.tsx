import Link from "next/link"
import { ReactNode } from 'react';


type SettingsLayoutProps = {
  children: ReactNode;
};

function LoginLayout({ children }: SettingsLayoutProps) {
  return (
    <div className='bg-white w-screen h-screen flex flex-col gap-4 px-4'>           
        <div className="flex container items-center justify-center w-full">
          {children}
        </div>
    </div>
  )
}

export default LoginLayout