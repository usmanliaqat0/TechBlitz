'use client';
import { useState, forwardRef, useImperativeHandle } from 'react';
// components
import { Form, FormControl, FormField } from '@/components/ui/form';
import QuestionHintAccordion from '@/components/questions/single/question-hint';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Check, CheckCircle2Icon, XCircleIcon } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading';
import { Button } from '@/components/ui/button';

// zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { answerQuestionSchema } from '@/lib/zod/schemas/answer-question-schema';

// types
import type { UserRecord } from '@/types/User';
import { DefaultRoadmapQuestions, RoadmapUserQuestions } from '@/types/Roadmap';

import { cn } from '@/utils/cn';
import { answerDefaultRoadmapQuestion } from '@/actions/roadmap/questions/default/answer-roadmap-question';
import { useRouter } from 'next/navigation';

type SchemaProps = z.infer<typeof answerQuestionSchema>;
type AnswerQuestionFormProps = {
  userData: UserRecord;
  question: DefaultRoadmapQuestions | RoadmapUserQuestions;
  roadmapUid: string;
};

const OnboardingRoadmapAnswerQuestionForm = forwardRef(
  function AnswerQuestionForm(
    { userData, question, roadmapUid }: AnswerQuestionFormProps,
    ref: React.Ref<{ submitForm: () => void }>
  ) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [newUserData, setNewUserData] = useState<{
      correct: boolean;
      message?: string;
    } | null>(null);
    const [redirecting, setRedirecting] = useState(false);
    const [nextQuestionIndex, setNextQuestionIndex] = useState<number | null>(
      null
    );

    const form = useForm<SchemaProps>({
      resolver: zodResolver(answerQuestionSchema),
      defaultValues: {
        answer: ''
      }
    });

    // Expose the `submitForm` method to the parent via ref
    useImperativeHandle(ref, () => ({
      submitForm: () => {
        form.handleSubmit(async (values) => {
          console.log('Submitting form with values:', values);
          await handleAnswerQuestion(values);
        })();
      }
    }));

    const handleAnswerQuestion = async (values: SchemaProps) => {
      if (!userData) {
        console.error('User is not logged in');
        return;
      }

      setLoading(true);

      try {
        const opts: any = {
          questionUid: question?.uid,
          answerUid: values.answer,
          roadmapUid,
          userUid: userData.uid,
          currentQuestionIndex: question?.order
        };

        const answer = await answerDefaultRoadmapQuestion(opts);

        // Set user data to show correct/incorrect state
        setNewUserData({
          correct: answer.correctAnswer || false
        });

        // Set next question index or null if last question
        setNextQuestionIndex(
          answer.isLastQuestion ? null : (answer?.currentQuestionIndex || 0) + 1
        );
      } catch (error) {
        console.error('Error submitting answer:', error);
        toast.error('Error submitting answer');
      }

      setLoading(false);
    };

    const handleNextQuestion = () => {
      if (redirecting) return;
      setRedirecting(true);

      // If no next question, redirect to generate page
      if (nextQuestionIndex === null) {
        router.push(`/roadmap/${roadmapUid}/onboarding/generate`);
        return;
      }

      // Redirect to next question
      router.push(`/roadmap/${roadmapUid}/onboarding/${nextQuestionIndex}`);
    };

    return (
      <Form {...form}>
        <form
          className="flex flex-col relative"
          onSubmit={form.handleSubmit(handleAnswerQuestion)}
        >
          {loading && (
            <div className="h-[25rem] absolute flex justify-center items-center w-full z-50">
              <div className="gap-y-3 flex flex-col items-center">
                <LoadingSpinner />
                <p className="text-sm">Submitting</p>
              </div>
            </div>
          )}

          {newUserData && !loading ? (
            <div className="flex flex-col items-center justify-center h-[25rem] p-6 text-center">
              <div className="bg-black-25 border border-black-50 rounded-xl p-8 shadow-lg text-center max-w-md w-full">
                {newUserData.correct ? (
                  <div className="flex flex-col gap-y-4 items-center">
                    <CheckCircle2Icon className="mx-auto text-green-500 size-16" />
                    <h3 className="text-2xl font-semibold text-green-600">
                      Correct!
                    </h3>
                    <p className="text-sm">
                      {newUserData.message ||
                        "Great job! You've answered the question correctly."}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-y-4 items-center">
                    <XCircleIcon className="mx-auto text-red-500 size-16" />
                    <h3 className="text-2xl font-semibold text-red-600">
                      Incorrect
                    </h3>
                    <p className="text-sm">
                      {newUserData.message ||
                        "Don't worry, learning is a process. Keep trying!"}
                    </p>
                  </div>
                )}
                <div className="flex justify-center items-center gap-x-3 mt-4">
                  <Button
                    href="/dashboard"
                    variant="secondary"
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="accent"
                    onClick={() => handleNextQuestion()}
                    type="button"
                  >
                    {redirecting ? <LoadingSpinner /> : 'Next Question'}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                'grid grid-cols-12 gap-4 p-4',
                loading ? 'opacity-10 pointer-events-none' : ''
              )}
            >
              {question?.answers?.map((answer) => (
                <div
                  key={answer.uid}
                  className="col-span-full"
                >
                  <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                      <FormControl>
                        <Label
                          htmlFor={answer.uid}
                          className={cn(
                            'p-4 rounded-xl min-h-20 w-full h-full flex items-center gap-x-2 cursor-pointer transition-colors border border-black-50',
                            field.value === answer.uid
                              ? 'bg-black-50'
                              : 'bg-black hover:bg-black-75'
                          )}
                          onClick={() => field.onChange(answer.uid)}
                        >
                          <input
                            type="radio"
                            id={answer.uid}
                            className="hidden"
                            name="answer"
                            value={answer.uid}
                            checked={field.value === answer.uid}
                            onChange={() => {}}
                          />
                          <div
                            className={cn(
                              'size-5 rounded-md border border-black-50 flex items-center justify-center flex-shrink-0',
                              field.value === answer.uid
                                ? 'bg-accent text-white'
                                : ''
                            )}
                          >
                            {field.value === answer.uid && (
                              <Check className="size-3 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm">{answer.answer}</p>
                        </Label>
                      </FormControl>
                    )}
                  />
                </div>
              ))}
            </div>
          )}

          <Separator className="bg-black-50" />

          <div className="w-full space-y-4 px-4">
            {question.hint && <QuestionHintAccordion hint={question.hint} />}
          </div>
        </form>
      </Form>
    );
  }
);

export default OnboardingRoadmapAnswerQuestionForm;