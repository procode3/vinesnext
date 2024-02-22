import Image from "next/image"
import Link from 'next/link'

export default function Unauthorized() {
    return (
        <div className="w-screen h-screen flex [&&&]:pl-0  pl-[70px] xl:pl-[260px]">
            <div className="w-1/2  h-full flex flex-col items-center justify-center gap-5">
                <div className="flex flex-col items-center justify-center gap-5">
                    <h1 className="text-6xl font-semibold">401! Hold Up!</h1>
                    <p>Sorry, but you are not authorized ot view this page.</p>
                </div>
                <div className="bg-slate-900 p-3 text-gray-200 rounded-5 ">
                    <Link href="../../login/" >Go to Sign In page</Link>
                </div>
            </div>
            <div className="w-1/2 h-full flex items-center justify-center relative bg-slate-200  ">
                <div className="relative h-3/4 w-full">
                    <Image
                        src="/images/writervector.svg"
                        fill={true}
                        alt="Picture of the author"
                    />
                </div>
            </div>
        </div>
    )
}