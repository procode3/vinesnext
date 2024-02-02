import Link from "next/link"
import { ReactNode } from 'react';
import NextTopLoader from 'nextjs-toploader';


type SettingsLayoutProps = {
  children: ReactNode;
};

function LoginLayout({ children }: SettingsLayoutProps) {
  return (
    <div className='bg-white w-screen h-[90vh] flex flex-col items-center justify-center gap-4'>           
          <NextTopLoader />         
          {children}        
    </div>
  )
}

export default LoginLayout;