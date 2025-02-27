import { getQuestion } from '@/utils/data/questions/get';
import { Separator } from '@/components/ui/separator';
import NoDailyQuestion from '@/components/shared/no-daily-question';
import { getQuestionStats } from '@/utils/data/questions/get-question-stats';
import { useUserServer } from '@/hooks/use-user-server';
import QuestionCard from '@/components/app/questions/single/layout/question-card';
import { getRandomQuestion } from '@/utils/data/questions/get-random';
import ExpandedCodeModal from '@/components/app/questions/single/layout/expanded-code-modal';
import ResizableLayout from '@/components/ui/resizable-layout';
import AiQuestionHelp from '@/components/app/questions/single/layout/ai-question-help';
import ChangeCodeTheme from '@/components/app/questions/single/layout/change-code-theme';
import CodeDisplayWrapper from '@/components/app/questions/single/layout/code-display-wrapper';
import CodeEditor from '@/components/app/questions/code-editor/editor';
import TestCaseSection from '@/components/app/questions/code-editor/test-case-section';
import PremiumContentWrapper from '@/components/app/shared/question/premium-content-wrapper';
import TourStartModal from '@/components/app/shared/question/tour-start-modal';

export default async function TodaysQuestionPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const user = await useUserServer();

  const [question, totalSubmissions, nextQuestion] = await Promise.all([
    getQuestion('slug', slug),
    getQuestionStats('slug', slug),
    getRandomQuestion({
      identifier: 'slug',
      currentQuestionSlug: slug,
    }),
  ]);

  if (!question) {
    return <NoDailyQuestion textAlign="center" />;
  }

  const questionPromise = getQuestion('slug', slug);

  const leftContent = (
    <div className="flex flex-col gap-y-4 p-3 lg:pr-1.5 h-full">
      <QuestionCard
        questionPromise={questionPromise}
        totalSubmissions={totalSubmissions}
        user={user}
        nextQuestion={nextQuestion}
        identifier="slug"
      />
    </div>
  );

  const rightContent = (
    <div
      className={`hidden lg:flex flex-col gap-4 p-3 lg:pl-1.5 h-full ${
        question?.testCases?.length ? 'lg:pb-1.5' : 'lg:pb-3'
      }`}
    >
      <div
        id="code-snippet"
        className="bg-black-75 border border-black-50 rounded-xl relative h-full overflow-y-auto scrollable-element"
      >
        <div className="px-4 py-[18px] text-sm flex w-full items-center justify-end bg-black-25 gap-x-3">
          <AiQuestionHelp question={question} user={user} questionType="regular" />
          <ChangeCodeTheme user={user} />
          {question.codeSnippet && <ExpandedCodeModal code={question.codeSnippet} />}
        </div>
        <Separator className="bg-black-50" />
        {question?.questionType === 'CODING_CHALLENGE' ? <CodeEditor /> : <CodeDisplayWrapper />}
      </div>
    </div>
  );

  const rightBottomContent = question?.testCases?.length ? <TestCaseSection /> : null;

  return (
    <PremiumContentWrapper>
      <TourStartModal user={user} />
      <ResizableLayout
        leftContent={leftContent}
        rightTopContent={rightContent}
        rightBottomContent={rightBottomContent}
        initialLeftWidth={50}
        initialRightTopHeight={question?.testCases?.length ? 70 : 100}
      />
    </PremiumContentWrapper>
  );
}
