import { Separator } from '@/components/ui/separator';
import { useUserServer } from '@/hooks/use-user-server';
import { fetchRoadmapQuestionViaOrder } from '@/utils/data/roadmap/questions/fetch-roadmap-question-via-order';
import OnboardingQuestionCard from '@/components/app/roadmaps/onboarding/onboarding-question-card';
import LoadingSpinner from '@/components/ui/loading';
import ExpandedCodeModal from '@/components/app/questions/single/layout/expanded-code-modal';

import AiQuestionHelp from '@/components/app/questions/single/layout/ai-question-help';
import ChangeCodeTheme from '@/components/app/questions/single/layout/change-code-theme';
import ResizableLayout from '@/components/ui/resizable-layout';
import OnboardingCodeDisplayWrapper from '@/components/app/roadmaps/onboarding/onboarding-code-display-wrapper';

export default async function RoadmapQuestionPage({
  params,
}: {
  params: { roadmapUid: string; index: number };
}) {
  const { index } = params;

  // ensure the user is logged in
  const user = await useUserServer();
  if (!user) {
    return;
  }

  // get the question
  const question = await fetchRoadmapQuestionViaOrder(index);
  // if there is no question, redirect to a 'holding' page to generate
  // the questions for the user
  if (!question) {
    return <LoadingSpinner />;
  }

  const leftContent = (
    <div className="flex flex-col gap-y-4 p-3 lg:pr-1.5 h-full">
      <OnboardingQuestionCard question={question} />
    </div>
  );

  const rightTopContent = (
    <div className="hidden lg:flex flex-col gap-4 p-3 lg:pl-1.5 h-full">
      <div
        id="code-snippet"
        className="bg-black-75 border border-black-50 rounded-xl relative overflow-scroll h-full"
      >
        <div className="px-4 py-[18px] text-sm flex w-full items-center justify-end bg-black-25 gap-x-3">
          {/** explain question ai button */}
          <AiQuestionHelp question={question} user={user} questionType="onboarding" />
          {/** code theme selector */}
          <ChangeCodeTheme user={user} />
          {/** code snippet */}
          {question.codeSnippet && <ExpandedCodeModal code={question.codeSnippet} />}
        </div>
        <Separator className="bg-black-50" />
        <OnboardingCodeDisplayWrapper />
      </div>
    </div>
  );

  return (
    <ResizableLayout
      leftContent={leftContent}
      rightTopContent={rightTopContent}
      initialLeftWidth={50}
      rightBottomContent={null}
    />
  );
}
