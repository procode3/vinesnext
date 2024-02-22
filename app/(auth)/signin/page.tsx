
import { Noto_Serif_Display } from 'next/font/google';
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { options } from "@/pages/api/auth/options"
import LoginForm from './LoginForm'


const noto = Noto_Serif_Display({ weight: '400', subsets: ['latin'] })

export default async function Signin() {
    const session = await getServerSession(options);
    if (session?.user) {
        redirect('/')
    }


    return (
        <div className="flex w-full h-full ">
            <div className="hidden md:flex w-1/2 h-[90vh] bg-slate-500 filter bg-cover items-center
     justify-center rounded-3xl p-10 m-10">

                <div className="relative h-2/3 w-full">
                    <Image
                        src="/images/writervector.svg"
                        fill={true}
                        alt="Picture of the writer"
                    />
                </div>
            </div>
            <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center relative p-10  md:p-0 ">
                <div className='flex justify-center w-full py-5 text-xl text-center font-semibold text-slate-900 absolute top-20'>
                    Writers√ine
                </div>
                <div className="flex flex-col items-center justify-center my-10 gap-2">
                    <h1 className={`text-3xl md:text-5xl font-bold ${noto.className}`}>Welcome Back</h1>
                    <p className="text-xs text-gray-500 text-center">Enter username and password to access your account.</p>
                </div>
                <LoginForm />
            </div>

        </div>
    )
}
