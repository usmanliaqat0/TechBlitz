import { BreadcrumbWithCustomSeparator } from '@/components/global/breadcrumbs';
import { Separator } from '@/components/ui/separator';

const items = [
  {
    href: '/dashboard',
    label: 'Home',
  },
  {
    href: '/leaderboard',
    label: 'Leaderboard',
  },
  {
    href: '',
    label: 'Today',
  },
];

export default function LeaderboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="text-white flex flex-col gap-y-4 relative h-full">
      <div className="flex flex-col gap-y-2">
        <BreadcrumbWithCustomSeparator items={items} />
        <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
          Today&apos;s Leaderboard
        </h1>
      </div>
      <Separator />
      {children}
    </div>
  );
}