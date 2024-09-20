import { getUserFromDb, getUserFromSession } from '@/actions/user/get-user';
import AdminButton from '@/components/admin-button';
import TodayTaskList from '@/components/dashboard/today-task-list';
import { Separator } from '@/components/ui/separator';

export default async function Dashboard() {
  // get our current user
  const { data: user } = await getUserFromSession();
  if (!user || !user.user?.id) return;
  // get the user from the db
  const userData = await getUserFromDb(user.user.id);

  return (
    <div className="container text-white flex flex-col gap-y-4">
      <div className="flex w-full justify-between">
        <h1 className="font-bold text-3xl font-inter">Dashboard</h1>
        {userData?.userLevel === 'ADMIN' && <AdminButton />}
      </div>
      <Separator />
      <TodayTaskList />
    </div>
  );
}
