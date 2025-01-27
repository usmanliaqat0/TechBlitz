import dynamic from 'next/dynamic';
import SidebarLayoutTrigger from '@/components/global/navigation/sidebar-layout-trigger';
import LoadingSpinner from '@/components/ui/loading';

const CurrentStreak = dynamic(() => import('@/components/ui/current-streak'), {
  loading: () => <LoadingSpinner />,
});

const Feedback = dynamic(() => import('@/components/ui/feedback-button'), {
  loading: () => <LoadingSpinner />,
});

export default function DashboardHeader() {
  return (
    <div className="flex w-full justify-between max-w-7xl px-6 mx-auto">
      <div className="flex items-center">
        <SidebarLayoutTrigger />
      </div>
      <div className="flex items-center gap-3">
        <CurrentStreak />
        <Feedback />
      </div>
    </div>
  );
}
