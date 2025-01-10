import { getRandomQuestion } from '@/utils/data/questions/get-random';
import { Button } from '@/components/ui/button';
import { ShuffleIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

/**
 * Component for redirecting the user to a random question.
 *
 * @returns
 */
export default async function RandomQuestion(opts: {
  identifier: 'slug' | 'uid';
  currentQuestionSlug: string;
}) {
  const { identifier, currentQuestionSlug } = opts;

  return (
    <form
      action={async () => {
        'use server';
        const randomQuestion = await getRandomQuestion({
          identifier,
          currentQuestionSlug,
        });

        console.log('randomQuestion', randomQuestion);

        redirect(`/question/${randomQuestion}`);
      }}
    >
      <Button variant="default" size="icon">
        <ShuffleIcon size={16} />
      </Button>
    </form>
  );
}
