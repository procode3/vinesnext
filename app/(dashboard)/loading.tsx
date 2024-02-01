import Image from "next/image"

export default function Loading() {
    return (
        <div className="w-screen h-screen flex items-center justify-center z-100 opacity-100">
            <div className="relative h-1/6 w-1/6 bg-black">
                <Image
                    src="/images/loaderimage.svg"
                    fill={true}
                    alt="Picture of the author"
                />
            </div>
        </div>
    )
}