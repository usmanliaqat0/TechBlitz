import { QuestionWithoutAnswers } from '@/types/Questions';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import TagDisplay from '@/components/app/questions/previous/tag-display';
import { getQuestionStats } from '@/utils/data/questions/get-question-stats';
import Link from 'next/link';
import Chip from '@/components/ui/chip';
import { getUserAnswer } from '@/utils/data/answers/get-user-answer';
import { CheckCircle } from 'lucide-react';

export default async function QuestionCard(opts: {
  questionData: QuestionWithoutAnswers;
  showSubmissions?: boolean;
  numberOfTags?: number;
  showcaseTag?: string;
  identifier: 'slug' | 'uid';
}) {
  const {
    questionData,
    showSubmissions = true,
    numberOfTags = 3,
    showcaseTag,
    identifier = 'slug',
  } = opts;

  // get question stats and user answered at the same time
  const [questionStats, userAnswered] = await Promise.all([
    getQuestionStats(identifier, questionData[identifier] || ''),
    getUserAnswer({ questionUid: questionData.uid }),
  ]);

  // if identifier is uid, this is a custom question
  const href =
    identifier === 'uid'
      ? `/question/custom/${questionData[identifier]}`
      : `/question/${questionData[identifier]}`;

  return (
    <Link
      href={href}
      key={questionData.uid}
      className="flex flex-col space-y-5 items-start bg-black-75 border border-black-50 hover:border-accent duration-300 p-5 rounded-lg group w-full relative overflow-hidden"
    >
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex w-full justify-between items-center">
          <h6 className="text-base text-wrap text-start line-clamp-2 flex-grow">
            {questionData?.question}
          </h6>
          {userAnswered && (
            <div className="flex-shrink-0 ml-2">
              <CheckCircle className="size-5 text-green-500" />
            </div>
          )}
        </div>
        {showSubmissions && (
          <div className="text-start text-[10px]">
            <p className="font-ubuntu text-sm">
              Submissions:{' '}
              <span className="font-medium">
                {questionStats?.totalSubmissions}
              </span>
            </p>
          </div>
        )}
      </div>
      <div className="mt-5 w-full flex justify-between items-end z-10 relative">
        <div className="flex gap-4 items-end">
          {questionData?.tags?.length && questionData?.tags?.length > 0 && (
            <div className="space-y-0.5 text-start">
              <div className="flex items-center gap-1">
                <TagDisplay
                  tags={questionData?.tags || []}
                  numberOfTags={numberOfTags}
                  showcaseTag={showcaseTag}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-x-3">
          {questionData?.difficulty && (
            <Chip
              text={capitalise(questionData.difficulty)}
              color={getQuestionDifficultyColor(questionData.difficulty).bg}
              textColor={
                getQuestionDifficultyColor(questionData.difficulty).text
              }
              border={
                getQuestionDifficultyColor(questionData.difficulty).border
              }
              small
            />
          )}
          {questionData?.questionDate && questionData?.dailyQuestion && (
            <Chip
              color="bg-black-100"
              text={questionData.questionDate}
              border="border-black-50"
            />
          )}
        </div>
      </div>
    </Link>
  );
}