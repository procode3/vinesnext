import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EditProfile from "@/app/(dashboard)/admin/settings/settingscomponents/editprofile";

interface SettingsHeaderProps{
    session: any
}


export default  async function SettingsHeader({session}: SettingsHeaderProps) {
const fullName: any = session?.user?.name;
const [firstName, lastName] = fullName.split(" ");
console.log(session)
  return (
    <div className=" flex justify-between">
        <div className="dp flex items-center gap-2 py-4">
          <Avatar className="w-[60px] h-[60px] md:w-[100px] md:h-[100px]">
            <AvatarImage src="/images/avatar-cactus.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="details flex flex-col sm:gap-2">
            <h1 className="font-semibold text-md sm:text-lg tracking-wide leading-normal">{session?.user?.name}</h1>
            <h2 className="text-gray-600 text-sm  tracking-wide leading-normal lowercase">{session?.user?.userType}</h2>
            <h1 className="text-gray-600 text-sm  tracking-wide leading-normal">Nairobi, Kenya</h1>
          </div>
        </div>
        <div className="flex items-center">
          <Dialog>
            <DialogTrigger className="bg-orange-600 h-[30px]  px-4 text-white">Edit profile</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit your Profile</DialogTitle>
                <DialogDescription>
                </DialogDescription>
              </DialogHeader>
              <EditProfile />
            </DialogContent>
          </Dialog>
        </div>      
    </div>
  )
}
