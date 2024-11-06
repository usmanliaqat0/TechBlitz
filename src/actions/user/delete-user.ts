'use server';
import { createClient as createServerClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { prisma } from '@/utils/prisma';

export const deleteUser = async (opts: {
  userUid: string
}) => {
  const { userUid } = opts
  if(!userUid) {
    throw new Error('User UID is required')
  }
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  // Wrap all Prisma operations in a transaction
  await prisma.$transaction(async (tx) => {
    // delete the user from the database
    await tx.users.delete({
      where: {
        uid: userUid
      }
    });

    // delete the user from supabase auth
    const { error } = await supabase.auth.admin.deleteUser(
      userUid
    );

    if(error) {
      throw new Error(error.message)
    }

    // sign out the user
    await supabase.auth.signOut();
  });
}