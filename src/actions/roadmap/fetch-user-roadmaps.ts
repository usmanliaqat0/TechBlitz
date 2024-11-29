'use server';
import { prisma } from '@/utils/prisma';
import { revalidateTag } from 'next/cache';

export const fetchUserRoadmaps = async (userUid: string) => {
  revalidateTag('roadmaps');

  return await prisma.userRoadmaps.findMany({
    where: {
      userUid,
    },
    include: {
      DefaultRoadmapQuestionsUsersAnswers: true,
      questions: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};