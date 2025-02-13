import Link from 'next/link';
import dynamic from 'next/dynamic';
import { X } from 'lucide-react';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const StarsBackground = dynamic(() => import('@/components/ui/stars-background'), {
  ssr: false,
});

import Logo from '@/components/ui/logo';
import { PricingCard } from '@/components/shared/payment/payment-card';
import { useUserServer } from '@/hooks/use-user-server';
import { getPlans } from '@/utils/constants/pricing';
import FrequencyToggle from '@/components/shared/payment/frequency-toggle';

async function updateFrequency(frequency: 'month' | 'year') {
  'use server';
  const cookieStore = cookies();
  cookieStore.set('billing_frequency', frequency);
  revalidatePath('/upgrade');
}

export default async function UpgradePage() {
  const user = await useUserServer();
  const cookieStore = cookies();
  const billingPeriod = (cookieStore.get('billing_frequency')?.value as 'month' | 'year') || 'year';

  const products = getPlans(user, true, billingPeriod).filter(
    (product) => product && product.id !== 'free'
  );

  return (
    <div className="relative">
      <StarsBackground className="-z-10" />
      <Link
        href="/dashboard"
        className="absolute top-8 left-8 z-50"
        aria-label="Go back to dashboard"
      >
        <Logo />
      </Link>
      <Link
        href="/dashboard"
        className="font-semibold top-5 right-5 absolute font-satoshi text-2xl z-[10000] hover:text-white/80 duration-300"
      >
        <X className="size-5" />
      </Link>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="w-full flex flex-col pt-32 md:py-16 container z-50 relative items-center justify-center text-center">
        <h1 className="text-gradient from-white to-white/75 text-3xl lg:text-5xl !font-onest tracking-tight py-1">
          Simple and{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/55">
            affordable{' '}
          </span>
          <br /> pricing plans
        </h1>

        <div className="flex flex-col w-full mt-6">
          <p className="text-center max-w-xl self-center">
            Upgrade your account to unlock premium features, gain access to exclusive content, and
            be the first to experience new updates.
          </p>
          <FrequencyToggle initialFrequency={billingPeriod} onFrequencyChange={updateFrequency} />
          <div className="flex flex-col lg:flex-row gap-10 justify-center mt-8 md:mt-16 px-2 md:px-10">
            {products.map(
              (product) =>
                product && (
                  <PricingCard
                    user={user}
                    key={product.id}
                    product={product}
                    isLoading={false}
                    billingPeriod={billingPeriod}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
