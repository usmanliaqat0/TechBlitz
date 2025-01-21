'use client';

import { useQuestionSingle } from '@/components/app/questions/single/layout/question-single-context';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { use, useTransition } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle, LinkIcon, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { formatSeconds } from '@/utils/time';
import { AnswerDifficulty } from '@prisma/client';
import { updateAnswerDifficultyByQuestionUid } from '@/actions/answers/answer';
import LoadingSpinner from '@/components/ui/loading';

export default function CodeEditorQuestionSubmitted() {
  const {
    result,
    correctAnswer,
    relatedQuestions,
    totalSeconds,
    generateAiAnswerHelp,
    user,
    tokensUsed,
    question,
  } = useQuestionSingle();

  const [isPending, setTransition] = useTransition();

  // resolve the related q's here - only if they are not null
  const relatedQuestionData = relatedQuestions ? use(relatedQuestions) : [];

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Question link copied to clipboard!');
  };

  const handleDifficultySelect = async (value: string) => {
    await updateAnswerDifficultyByQuestionUid(
      question?.uid || '',
      value.toUpperCase() as AnswerDifficulty
    );
    toast.success(
      'Question difficulty updated, we will now serve more personalized questions to you.'
    );
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8 flex flex-col gap-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col gap-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex w-full justify-between items-center">
          <h1 className="text-3xl font-bold">
            {correctAnswer === 'correct' ? (
              <div className="flex items-center gap-x-2">
                <CheckCircle className="size-7 text-green-500" />
                All test cases passed.
              </div>
            ) : correctAnswer === 'incorrect' ? (
              <div className="flex items-center gap-x-2">
                <XCircle className="size-7 text-red-500" />
                Some test cases failed, let's review:
              </div>
            ) : (
              <div className="flex items-center gap-x-2">
                <LoadingSpinner />
                Loading...
              </div>
            )}
          </h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="default" onClick={() => copyLink()}>
                  <LinkIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col gap-y-2">
          {result?.passed && (
            <p className="text-sm text-gray-400">
              in {formatSeconds(totalSeconds || 0)} seconds
            </p>
          )}
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col gap-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex flex-col gap-y-2">
          {/** ai explain answer (on button click) */}
          <h2 className="text-xl font-bold">Explain this answer</h2>
          <p className="text-sm text-gray-400">
            Don't understand this answer? Click the button below to get an
            explanation.
          </p>
          <p className="text-sm text-white">
            You have {user?.userLevel === 'PREMIUM' ? 'unlimited' : tokensUsed}{' '}
            tokens remaining <br />
            {user?.userLevel === 'FREE' && (
              <span className="text-xs text-gray-400">
                (Free users get 20 tokens,{' '}
                <Link
                  href="https://dub.sh/upgrade-techblitz"
                  className="text-accent underline"
                >
                  upgrade to Premium
                </Link>{' '}
                to get unlimited tokens!)
              </span>
            )}
          </p>
          <Button
            variant="secondary"
            onClick={() => {
              setTransition(() => {
                generateAiAnswerHelp();
              });
            }}
            disabled={isPending}
            className="hidden lg:flex"
            wrapperClassName="w-fit"
          >
            {isPending ? 'Generating...' : 'Explain Answer'}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setTransition(() => {
                generateAiAnswerHelp(true);
              });
            }}
            className="flex lg:hidden"
          >
            {isPending ? 'Generating...' : 'Explain Answer'}
          </Button>
        </div>

        {/** how difficult was this question? */}
        <div className="flex flex-col gap-y-2 mt-3">
          <h2 className="text-xl font-bold">
            How difficult was this question?
          </h2>
          <p className="text-sm text-gray-400">
            Rate this question based on how difficult it was to solve. This will
            help us improve the personalization of questions served to you.
          </p>
          <div className="flex flex-col gap-y-2">
            <Select onValueChange={handleDifficultySelect}>
              <SelectTrigger className="w-40 border border-black-50">
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/** show related questions */}
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-xl font-bold">Related Questions</h2>
            <p className="text-sm text-gray-400">
              {correctAnswer === 'correct' && relatedQuestionData.length > 0
                ? 'Here are some questions that are similar to this one.'
                : relatedQuestionData.length === 0
                  ? 'No related questions found.'
                  : 'Here are some questions that will help you understand this concept better.'}
            </p>
          </div>
          {relatedQuestionData.length > 0 && (
            <motion.div
              className="flex flex-col divide-y divide-black-50 border border-black-50 rounded-xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {relatedQuestionData.map((question) => (
                <Link
                  key={question.slug}
                  href={`/question/${question.slug}`}
                  className={cn(
                    'px-4 py-3 w-full flex justify-between items-center group bg-black-75 transition-colors'
                  )}
                >
                  <p className="text-sm text-white">{question.question}</p>
                  <ArrowRight className="size-4 mr-1 group-hover:mr-0 duration-300 flex-shrink-0" />
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}