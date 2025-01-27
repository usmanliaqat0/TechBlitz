import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';

const RoadmapsCard = dynamic(
  () => import('@/components/app/roadmaps/[uid]/roadmaps-card'),
  {
    ssr: false,
    loading: () => (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <RoadmapsCardSkeleton key={index} />
        ))}
      </>
    ),
  }
);

import RoadmapOnboarding from '@/components/app/roadmaps/empty/onboarding';
import Hero from '@/components/global/hero';

const CreateRoadmapButton = dynamic(
  () => import('@/components/app/roadmaps/create-roadmap-button'),
  {
    ssr: false,
  }
);

import { fetchUserRoadmaps } from '@/utils/data/roadmap/fetch-user-roadmaps';
import { useUserServer } from '@/hooks/use-user-server';
import RoadmapsCardSkeleton from '@/components/app/roadmaps/[uid]/roadmaps-card-loading';
import UpgradeLayout from '@/components/global/upgrade-layout';

export default async function RoadmapPage() {
  // middleware should catch this, but just in case
  const user = await useUserServer();
  if (!user) return redirect('/login');
  if (user.userLevel === 'FREE') {
    return (
      <UpgradeLayout
        title="Personalized Coding Roadmaps"
        description="In order to create personalized coding roadmaps, you need to upgrade to Premium."
      />
    );
  }
  // fetch the user's roadmaps
  const userRoadmaps = await fetchUserRoadmaps(user.uid);

  // if we do not have any roadmaps, we render the 'onboarding'
  // component to guide the user on how to create their first roadmap
  if (!userRoadmaps.length) {
    return <RoadmapOnboarding />;
  }

  // order the roadmaps by the createdAt date
  userRoadmaps.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <>
      <Hero
        heading="Roadmaps"
        subheading="Here you can view all of your roadmaps and their progress, as well as create new ones."
      />
      <div className="flex flex-col lg:flex-row gap-16 mt-5 md:container">
        <div className="w-full lg:w-[55%] relative">
          {userRoadmaps.map((roadmap) => (
            <RoadmapsCard
              key={roadmap.uid}
              roadmap={{
                ...roadmap,
                DefaultRoadmapQuestionsUsersAnswers: [],
              }}
            />
          ))}
        </div>

        {/** create new roadmap cta */}
        <aside className="order-first md:order-last w-full lg:w-[45%] relative">
          <div className="sticky top-10 space-y-10 w-1/2">
            <CreateRoadmapButton />
          </div>
        </aside>
      </div>
    </>
  );
}
