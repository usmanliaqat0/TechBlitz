'use client';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '@/hooks/useUser';
import { updateUserAuth } from '@/actions/user/update-user-auth';
import { updateUserSchema } from '@/lib/zod/schemas/update-user';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/ui/loading';

type SchemaProps = z.infer<typeof updateUserSchema>;

export default function SettingsProfilePage() {
  const { user, isLoading } = useUser();
  const openDeleteAccountModal = useRef(false);

  const { mutateAsync: server_updateUserAuth, isPending } = useMutation({
    mutationFn: (values: SchemaProps) => updateUserAuth(values),
    onSuccess: () => {
      // Handle successful update (e.g., show a success message)
      toast.success(
        'Account updated successfully, please check your email for further instructions.'
      );
    },
    onError: (error) => {
      // Handle error (e.g., show an error message)
      toast.error(`Failed to update user auth: ${error}`);
    },
  });

  const form = useForm<SchemaProps>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: user?.email || '',
      password: '',
    },
  });

  const onSubmit = async (values: SchemaProps) => {
    try {
      await server_updateUserAuth(values);
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Failed to update user auth:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="text-2xl">Account Settings</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/2 space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder={user?.email} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormDescription>
                  Leave blank to keep your current password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isPending ? <LoadingSpinner /> : 'Save changes'}
          </Button>
        </form>
      </Form>
      <Button
        variant="destructive"
        onClick={() => (openDeleteAccountModal.current = true)}
        className="w-fit"
      >
        Delete account
      </Button>
    </div>
  );
}
