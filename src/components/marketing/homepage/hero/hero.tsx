import SignupForm from '@/components/marketing/global/waitlist-form';
import Link from 'next/link';
import AnimatedSpan from '@/components/ui/animated-span';
import { ArrowRight } from 'lucide-react';

export default function HomepageHero() {
  const animatedSpanContent = (
    <div className="flex items-center group">
      <span className="hidden md:block">
        Celebrating 250+ users - a special thank you
      </span>
      <span className="block md:hidden">
        Celebrating 250+ users - a special thank you
      </span>
      <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-all duration-300" />
    </div>
  );

  return (
    <section
      id="#waitlist-form"
      className="pb-16 pt-28 md:pb-20 md:pt-32 xl:pb-40 xl:pt-56 grid grid-cols-12 gap-4 lg:gap-16 items-center"
    >
      <div className="flex flex-col gap-y-4 col-span-full items-center text-center">
        <Link href="/blog/250-users-on-techblitz">
          <AnimatedSpan content={animatedSpanContent} />
        </Link>
        <h1 className="mt-3 text-5xl lg:text-[68px] !font-onest !font-medium tracking-tight max-w-5xl text-gradient from-white to-white/75 py-1.5">
          Learning to code <br /> made easy
        </h1>
        <p className="font-onest max-w-4xl text-gray-400 text-lg">
          Replace boring coding exercises with industry-standard coding
          challenges. <br /> Your dream career in tech is just a click away.
        </p>
        <div className="mt-3">
          <SignupForm />
        </div>
      </div>
    </section>
  );
}
