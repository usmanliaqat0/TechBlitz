import QuestionPageSidebar from '@/components/app/questions/layout/question-page-sidebar';
import QuestionsCarouselList from '@/components/app/questions/layout/carousel/question-carousel-list';
import Hero from '@/components/global/hero';
import { createMetadata } from '@/utils';
import { Button } from '@/components/ui/button';
import { useUserServer } from '@/hooks/use-user-server';

export async function generateMetadata() {
  return createMetadata({
    title: 'Explore Questions | TechBlitz',
    description:
      'Explore a diverse set of questions across multiple topics to enhance your knowledge.',
    keywords: [
      'javascript coding questions',
      'react coding questions',
      'web development coding questions',
      'coding challenges',
      'coding tutorials',
      'coding practice',
      'coding practice questions',
    ],
    image: {
      text: 'Explore Questions | TechBlitz',
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: '/questions/explore',
  });
}

const heroDescription = (
  <div className="flex flex-col gap-y-4 z-20 relative font-inter max-w-3xl">
    <p className="text-sm md:text-base text-gray-400">
      Curated lists of coding questions, ranging from Javascript, React, Node,
      Web Development. Perfect for your daily coding practice.
    </p>
    <div className="flex flex-col gap-y-2">
      <p className="text-gray-400">Can't find what you're looking for?</p>
      <Button href="/questions" variant="secondary">
        View all questions
      </Button>
    </div>
  </div>
);

export default async function ExploreQuestionsPage() {
  const user = await useUserServer();

  return (
    <>
      <Hero
        heading="Explore Questions"
        subheading={heroDescription}
        container={false}
      />
      <div className="flex flex-col xl:flex-row mt-5 gap-16">
        <div className="w-full lg:min-w-[55%] space-y-6">
          <QuestionsCarouselList />
        </div>
        <QuestionPageSidebar user={user} />
      </div>
    </>
  );
}