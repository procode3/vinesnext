
import { ReactNode } from 'react';
import NextTopLoader from 'nextjs-toploader';
import AuthProvider from '../../context/AuthProvider';

type LayoutProps = {
  children: ReactNode;
  session: any
};

function LoginLayout({ children, session }: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <div className='bg-white w-screen h-[90vh] flex flex-col items-center justify-center gap-4'>
      <NextTopLoader />
      <AuthProvider session={session}>
        {children}
      </AuthProvider>
    </div>

  )
}

export default LoginLayout;