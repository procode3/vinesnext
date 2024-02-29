interface PersonalInfomationProps{
    session: any
}

export default function PersonalInfomation({session}: PersonalInfomationProps) {
const fullName: any = session?.user?.name;
const [firstName, lastName] = fullName.split(" ");
console.log(session)
  return ( 
    <>     
      <div className="personal-info py-4 flex flex-col gap-5 border p-4 rounded-xl border-gray-100">
        <h1 className="font-semibold text-md sm:text-lg">Personal information</h1>
        <div className="flex w-full">
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm">First Name</h1>
            <h1 className="text-sm ">{firstName}</h1>
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm">Last Name</h1>
            <h1 className="text-sm">{lastName}</h1>
          </div>
        </div>
        <div className="flex w-full flex-col sm:flex-row gap-4">
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm">Email address</h1>
            <h1 className="text-sm">{session?.user?.email}</h1>
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm">Phone</h1>
            <h1 className="text-sm">+1234567890123</h1>
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm">Role</h1>
            <h1 className="text-sm">{session?.user?.userType}</h1>
          </div>

        </div>
      </div>
      <div className="personal-info py-4 flex flex-col gap-5 border p-4 rounded-xl border-gray-100">
        <h1 className="font-semibold text-sm">Billing Address</h1>
        <div className="flex w-full">
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm">Country</h1>
            <h1 className="text-sm">Wakanda</h1>
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm">City/State</h1>
            <h1 className="text-sm">Village</h1>
          </div>
        </div>
        <div className="flex w-full flex-col sm:flex-row gap-4">
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm">Paypal</h1>
            <h1 className="text-sm">{session?.user?.email}</h1>
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <h1 className="font-semibold text-sm">Account number</h1>
            <h1 className="text-sm">1234****1123</h1>
          </div>
        </div>
      </div>
      </>
  )
}
