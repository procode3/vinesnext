import Link from "next/link"
import { ReactNode } from 'react';


type SettingsLayoutProps = {
  children: ReactNode;
};

function LoginLayout({ children }: SettingsLayoutProps) {
  return (
    <div className='bg-white w-screen h-screen flex flex-col items-center justify-center gap-4'>           
          {children}        
    </div>
  )
}

export default LoginLayout