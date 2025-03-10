import dynamic from 'next/dynamic';
import SidebarLayoutTrigger from '@/components/app/navigation/sidebar-layout-trigger';
import LoadingSpinner from '@/components/ui/loading';
import UpgradeModal from '../shared/upgrade/upgrade-modal';
import UserXp from '@/components/ui/user-xp';

const CurrentStreak = dynamic(() => import('@/components/ui/current-streak'), {
  loading: () => <LoadingSpinner />,
});

export default function DashboardHeader() {
  return (
    <div className="flex w-full justify-between max-w-7xl px-6 mx-auto">
      <div className="flex items-center">
        <SidebarLayoutTrigger />
      </div>
      <div className="flex items-center gap-5">
        <CurrentStreak />
        <UserXp />
        <UpgradeModal />
      </div>
    </div>
  );
}
