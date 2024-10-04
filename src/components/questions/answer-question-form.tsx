'use client';
import { useCallback, useState } from 'react';
import { answerQuestion } from '@/actions/answers/answer';
// components
import { Button } from '../ui/button';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
// zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { answerQuestionSchema } from '@/lib/zod/schemas/answer-question-schema';
// types
import type { Question } from '@/types/Questions';
import type { User } from '@supabase/supabase-js';
import AnswerQuestionModal from './answer-question-modal';

type SchemaProps = z.infer<typeof answerQuestionSchema>;
type AnswerQuestionFormProps = {
  userData: User;
  uid: string;
  question: Question;
};

export default function AnswerQuestionForm({
  userData,
  uid,
  question,
}: AnswerQuestionFormProps) {
  const [correctAnswer, setCorrectAnswer] = useState<
    'init' | 'incorrect' | 'correct'
  >('init');
  const [openAnswerModal, setOpenAnswerModal] = useState(false);

  const buttonText = useCallback(() => {
    if (correctAnswer === 'init') {
      return 'Submit';
    }
    return correctAnswer === 'correct' ? 'Correct!' : 'Incorrect!';
  }, [correctAnswer]);

  /** FORM */
  const form = useForm<SchemaProps>({
    resolver: zodResolver(answerQuestionSchema),
    defaultValues: {
      answer: '',
    },
  });

  const handleAnswerQuestion = async (values: SchemaProps) => {
    if (!userData) {
      console.error('User is not logged in');
      return;
    }
    const isCorrect = await answerQuestion({
      questionUid: uid,
      answerUid: values.answer,
      userId: userData.id,
    });

    setCorrectAnswer(isCorrect ? 'correct' : 'incorrect');
    setOpenAnswerModal(true);
  };

  return (
    <>
      <Form {...form}>
        <form
          className="font-satoshi flex flex-col gap-y-4"
          onSubmit={form.handleSubmit(handleAnswerQuestion)}
        >
          <h1 className="font-semibold font-inter text-3xl">
            {question.question}
          </h1>
          <div className="flex flex-col gap-y-2">
            {question.answers.map((answer) => (
              <FormField
                control={form.control}
                name="answer"
                key={answer.uid}
                render={({ field }) => (
                  <FormControl>
                    <label className="flex items-center gap-x-2">
                      <input
                        {...field}
                        type="radio"
                        name="answer"
                        value={answer.uid}
                        checked={field.value === answer.uid}
                        onChange={() => {
                          field.onChange(answer.uid);
                        }}
                      />
                      <span>{answer.answer}</span>
                    </label>
                  </FormControl>
                )}
              />
            ))}
          </div>
          <Dialog>
            <DialogTrigger>
              <Button type="submit" variant="default">
                {buttonText()}
              </Button>
              <AnswerQuestionModal
                question={question}
                user={userData}
                correct={correctAnswer}
                isOpen={openAnswerModal}
              />
            </DialogTrigger>
          </Dialog>
        </form>
      </Form>
    </>
  );
}
