'use client';
import { useRef } from 'react';

import Chip from '@/components/ui/chip';
import { Separator } from '@/components/ui/separator';

import { capitalise, getQuestionDifficultyColor } from '@/utils';

import { UserRecord } from '@/types/User';
import { RoadmapUserQuestions } from '@/types/Roadmap';
import { Button } from '@/components/ui/button';
import RoadmapAnswerQuestionForm from '../questions/roadmap-answer-form';
import { Check, X } from 'lucide-react';

export default function RoadmapQuestionCard(opts: {
  user: UserRecord;
  question: RoadmapUserQuestions;
  roadmapUid: string;
}) {
  const { user, question, roadmapUid } = opts;

  const answerFormRef = useRef<{
    submitForm: () => void;
    resetForm: () => void;
  }>(null);

  return (
    <div className="col-span-full lg:col-span-6 h-fit bg-black-75 border border-black-50 duration-300 rounded-xl overflow-hidden">
      <div className="p-4 w-full flex justify-between bg-black-25 items-center">
        <Chip
          color={getQuestionDifficultyColor(question.difficulty).bg}
          text={capitalise(question.difficulty)}
          textColor={getQuestionDifficultyColor(question.difficulty).text}
          border={getQuestionDifficultyColor(question.difficulty).border}
        />
        <a href="#code-snippet" className="text-xs block md:hidden">
          (Tap to see code snippet)
        </a>
        <div className="flex items-center gap-x-1">
          {/** display if the user has already answered the question or not */}
          {question?.completed && (
            <>
              {question?.userCorrect ? (
                <Check className="size-4 text-green-500" />
              ) : (
                <X className="size-4 text-destructive" />
              )}
              <div className="flex items-center gap-2">
                <p className="text-sm">Answered</p>
              </div>
            </>
          )}
        </div>
      </div>
      <Separator className="bg-black-50" />
      <div className="h-fit bg-black-100">
        {question?.question && (
          <div className="pt-4 px-4">
            <h3 className="font-inter font-light">{question.question}</h3>
          </div>
        )}
        <RoadmapAnswerQuestionForm
          ref={answerFormRef}
          question={question}
          userData={user}
          roadmapUid={roadmapUid}
        />
      </div>
      <Separator className="bg-black-50" />
      <div className="p-4 w-full flex justify-end items-center bg-black-25">
        <div className="flex items-center gap-4 self-end">
          <Button
            variant="destructive"
            onClick={() => answerFormRef.current?.resetForm()}
          >
            Reset
          </Button>
          <Button
            variant="accent"
            onClick={() => answerFormRef.current?.submitForm()}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
