'use server';
import { createClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import type { UserLevel } from '@/types/User';

export const userAuth = async (userRole: UserLevel | UserLevel[]) => {
  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.getUser();
  const userId = user?.user?.id;

  if (error || !user || !userId) {
    return false;
  }

  // get the user's role from the db
  const dbUser = await prisma.users.findUnique({
    where: {
      uid: userId,
    },
  });

  if (!dbUser) {
    return false;
  }

  // check if the user's role matches the required role
  if (typeof userRole === 'string' && dbUser.userLevel !== userRole) {
    return false;
  }

  if (Array.isArray(userRole) && userRole.includes(dbUser.userLevel)) {
    return false;
  }

  return true;
};
