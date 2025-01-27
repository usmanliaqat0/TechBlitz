import { Question } from '@/types/Questions';
import { prisma } from '@/lib/prisma';
import { getTagsFromQuestion } from './tags/get-tags-from-question';

export const getYesterdaysQuestion = async (): Promise<Question | null> => {
  try {
    // Get yesterday's date at midnight UTC
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const yesterdayISOString = yesterday.toISOString().split('T')[0];

    // Find a question where `questionDate` is yesterday
    const res = await prisma.questions.findFirst({
      where: {
        questionDate: yesterdayISOString,
      },
      include: {
        answers: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!res) {
      console.error('No question found for yesterday');
      return null;
    }

    // Get the tags from the question
    const question = getTagsFromQuestion(res) as unknown as Question;

    return question;
  } catch (error) {
    console.error("Failed to get yesterday's question:", error);
    return null;
  }
};
