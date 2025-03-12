import dynamic from 'next/dynamic';

import HomepageHero from '@/components/marketing/homepage/hero/hero';

const FeaturesBentoGrid = dynamic(
  () => import('@/components/marketing/homepage/features/features-bento-grid'),
  { ssr: false }
);

import PersonalizedBlock from '@/components/marketing/homepage/personalized/block';
import ComparisonBlock from '@/components/marketing/homepage/comparison/comparison-block';
import OpenSourceBlock from '@/components/marketing/global/open-source/open-source-block';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';

import { Metadata } from 'next';
import { getBaseUrl } from '@/utils';
import { WebPageJsonLd } from '@/types/Seo';
import Testimonials from '@/components/marketing/homepage/testimonials';
import MarketingContentGrid, {
  MarketingContentGridProps,
} from '@/components/marketing/global/blocks/content-grid';

import QuestionMarquee from '@/components/marketing/global/blocks/question-marquee';
import HomepageUserStats from '@/components/marketing/global/blocks/homepage-user-stats';
import { QUESTIONS_COUNT } from '@/utils/constants';
import { getUserCount } from '@/utils/data/user/get-user-count';
import ChatBot from '@/components/ui/icons/chat-bot';
import ArcheryTarget from '@/components/ui/icons/target';
import Calendar from '@/components/ui/icons/calendar';
import MirrorTabletPhone3 from '@/components/ui/icons/mirror-tablet-phone-3';
import CreditCardIcon from '@/components/ui/icons/credit-card';
import GraduationCap from '@/components/ui/icons/graduation-cap';

const title = 'Learn to Code with Interactive Challenges | TechBlitz';
const description =
  'Master programming through interactive coding challenges, personalized practice, and instant AI feedback. Perfect for beginners learning JavaScript, web development, and more. Start coding for free.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    // Primary keywords
    'learn to code',
    'coding for beginners',
    'interactive coding',
    'programming practice',
    // Secondary keywords
    'javascript tutorials',
    'web development',
    'coding challenges',
    'programming exercises',
    // Long-tail keywords
    'learn programming online free',
    'interactive coding platform',
    'beginner friendly coding',
    'practice coding online',
  ],
  openGraph: {
    title,
    description,
    type: 'website',
    url: getBaseUrl(),
    siteName: 'TechBlitz',
    images: [
      {
        url: 'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/Screenshot%202025-01-11%20at%2002.24.28.png',
        width: 1200,
        height: 630,
        alt: 'TechBlitz - Interactive Coding Platform for Beginners',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [
      {
        url: 'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/Screenshot%202025-01-11%20at%2002.24.28.png',
        width: 1200,
        height: 630,
        alt: 'TechBlitz - Interactive Coding Platform for Beginners',
      },
    ],
    creator: '@techblitz',
    site: '@techblitz',
  },
  alternates: {
    canonical: getBaseUrl(),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function Page() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: getBaseUrl(),
    headline: title,
    description,
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/Screenshot%202025-01-11%20at%2002.24.28.png',
    author: {
      '@type': 'Organization',
      name: 'TechBlitz',
      url: getBaseUrl(),
    },
    dateModified: new Date().toISOString(),
    datePublished: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getBaseUrl(),
    },
    keywords:
      'learn to code, coding for beginners, interactive coding, programming practice, javascript tutorials, web development, coding challenges, programming exercises, learn programming online free, interactive coding platform, beginner friendly coding, practice coding online',
    publisher: {
      '@type': 'Organization',
      name: 'TechBlitz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://techblitz.dev/favicon.ico',
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: getBaseUrl(),
        },
      ],
    },
  };

  const contentGridItems: MarketingContentGridProps[] = [
    {
      title: 'Never miss a day',
      description:
        'We send you a personalized coding challenge every day to keep you on track. Getting your daily coding fix in as little as 3 minutes per day.',
      icon: (
        <Calendar
          fill="#334155"
          secondaryfill="#f1f5f9"
          strokewidth={1}
          width="1.5em"
          height="1.5em"
        />
      ),
    },
    {
      title: 'Perfect for Beginners',
      description:
        'Start your coding journey with beginner-friendly challenges. Our step-by-step guidance and clear explanations make learning to code easy and enjoyable.',
      icon: <GraduationCap width="1.5em" height="1.5em" />,
    },
    {
      title: 'Code Anywhere',
      description:
        'Learn and practice coding on any device with our mobile-optimized platform. Perfect for learning on the go.',
      icon: (
        <MirrorTabletPhone3 width="1.5em" height="1.5em" fill="#3b82f6" secondaryfill="#ef4444" />
      ),
    },
    {
      title: 'Instant Feedback',
      description:
        'Get instant feedback on your code with our AI-powered coding assistant. Perfect for learning to code and improving your skills.',
      icon: <ChatBot className="size-6" />,
    },
    {
      title: 'Stay on Track',
      description:
        'Set yourself study goals and get notified when you need to code. Perfect for staying on track and improving your skills.',
      icon: <ArcheryTarget width="1.5em" height="1.5em" />,
    },
    {
      title: 'No Credit Card Required',
      description:
        'Try TechBlitz for free, no credit card required. Perfect for learning to code and improving your skills.',
      icon: <CreditCardIcon className="size-6" />,
    },
  ];

  const userCount = getUserCount();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="overflow-x-hidden container z-30">
        <HomepageHero />
        <Testimonials />
        <FeaturesBentoGrid />
        <HomepageUserStats userCountPromise={userCount} />
        <PersonalizedBlock />
        <QuestionMarquee
          header={`${QUESTIONS_COUNT}+ coding challenges`}
          subheader="Learn to code by doing. Improve your coding skills in as little as 3 minutes per day."
        />
        <ComparisonBlock />
        {/** subheading="Join aspiring developers worldwide learning to code through TechBlitz's free, interactive programming challenges. Get personalized practice, instant feedback, and step-by-step guidance on your coding journey." */}
        <MarketingContentGrid
          title='"With TechBlitz, learning to code has never been easier"'
          subheading="- You, 17/03/2025"
          items={contentGridItems}
        />
        <OpenSourceBlock />
        <CallToActionBlock
          title="Land the job you've always dreamed of"
          description="Ready to unlock your full potential? Try TechBlitz for free, no credit card required."
        />
      </div>
    </>
  );
}
