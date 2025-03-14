// components
import { createOrFetchUserRoadmap } from '@/actions/roadmap/create-or-fetch-user-roadmap';
import { fetchRoadmapQuestionViaOrder } from '@/utils/data/roadmap/questions/fetch-roadmap-question-via-order';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useUserServer } from '@/hooks/use-user-server';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import NoDailyQuestion from '@/components/shared/no-daily-question';

export default async function RoadmapOnboardingModal() {
  const user = await useUserServer();
  if (!user) {
    return redirect('/login');
  }

  // get the first 'default' roadmap question
  const firstQuestion = await fetchRoadmapQuestionViaOrder(1);

  const handleButtonClick = async () => {
    'use server';
    try {
      // create a new roadmap record for the user
      const roadmap = await createOrFetchUserRoadmap();

      // redirect the user to the new page
      if ('uid' in roadmap) {
        redirect(`/roadmap/${roadmap.uid}/onboarding/1`);
      } else {
        toast.error('Failed to create roadmap');
      }
    } catch (error) {
      console.error('Failed to create roadmap:', error);
      toast.error('Failed to create roadmap: ' + error);
    }
  };

  return (
    <Dialog open>
      <DialogContent className="bg-black-75 md:max-w-xl" showCloseButton={false}>
        {!firstQuestion || !firstQuestion.uid ? (
          <NoDailyQuestion />
        ) : (
          <>
            <DialogTitle className="text-3xl">Welcome to roadmaps</DialogTitle>
            <DialogDescription className="flex flex-col gap-y-1 mt-3 text-white font-satoshi">
              <p>
                Roadmaps are personalised learning paths, curated for your needs in order to grow as
                a developer.
              </p>
              <p>
                We just need to know a little bit more about you to get started. This will help us
                to create a roadmap that is tailored to you.
              </p>
            </DialogDescription>
          </>
        )}
        <DialogFooter>
          <form
            className="flex items-center gap-x-1 mt-5 w-full justify-end"
            action={handleButtonClick}
          >
            <Button className="h-full" href="/dashboard" variant="default">
              Back to dashboard
            </Button>
            <Button type="submit" className="h-full" variant="accent">
              Let's get started!
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
