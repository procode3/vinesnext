import { getServerSession } from 'next-auth';
import { options } from '@/pages/api/auth/options';
import SettingsHeader from "@/app/(dashboard)/admin/settings/settingscomponents/SettingsHeader";
import PersonalInfomation from './settingscomponents/PersonalInfomation';

export default  async function Page() {
const session = await getServerSession(options);

console.log(session)
  return (
    <div className="w-full p-4 flex flex-col gap-8">
      <SettingsHeader session={session}/>
      <PersonalInfomation session={session}/>
    </div>
  )
}
