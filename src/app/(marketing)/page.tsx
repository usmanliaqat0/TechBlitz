import dynamic from 'next/dynamic';

import HomepageHero from '@/components/marketing/homepage/hero/hero';

const FeaturesBentoGrid = dynamic(
  () => import('@/components/marketing/homepage/features/features-bento-grid'),
  { ssr: false }
);

const HomepageLargeText = dynamic(
  () => import('@/components/marketing/global/blocks/large-text'),
  { ssr: false }
);

import PersonalizedBlock from '@/components/marketing/homepage/personalized/block';
import ComparisonBlock from '@/components/marketing/homepage/comparison/comparison-block';
import OpenSourceBlock from '@/components/marketing/global/open-source/open-source-block';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';

import { Metadata } from 'next';
import { getBaseUrl } from '@/utils';
import { WebPageJsonLd } from '@/types/Seo';
import { WebPageJsonLdBreadcrumb } from '@/utils/seo';
import Testimonials from '@/components/marketing/global/blocks/testimonials';
import MarketingContentGrid, {
  MarketingContentGridProps,
} from '@/components/marketing/global/blocks/content-grid';
import { MobileIcon } from '@radix-ui/react-icons';
import { CodeIcon, Users2 } from 'lucide-react';
import QuestionMarquee from '@/components/marketing/global/blocks/question-marquee';

const title = 'Learn to code for free | TechBlitz';
const description = 'Learning to code made simple';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'learn to code for free',
    'beginner-friendly coding challenges',
    'interactive coding challenges',
    'daily programming practice',
    'personalized coding roadmap',
    'improve coding skills',
    'best platform to learn coding',
    'AI-assisted coding',
    'learn javascript',
    'free leetcode alternative',
    'mobile-friendly coding platform',
    'coding challenges for beginners',
  ],
  openGraph: {
    title,
    description,
    type: 'website',
    url: 'https://techblitz.dev',
    images: {
      url: 'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/Screenshot%202025-01-11%20at%2002.24.28.png',
      width: 800,
      height: 630,
      alt: description,
    },
  },
  twitter: {
    title,
    description,
    images: [
      {
        url: 'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/Screenshot%202025-01-11%20at%2002.24.28.png',
        width: 800,
        height: 630,
        alt: description,
      },
    ],
  },
  alternates: {
    canonical: getBaseUrl(),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page() {
  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: getBaseUrl(),
    headline: 'Learn to code for free | TechBlitz',
    description: 'Learning to code made simple',
    image:
      'https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images/Screenshot%202025-01-11%20at%2002.24.28.png',
    breadcrumb: WebPageJsonLdBreadcrumb,
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
      'learn to code for free, beginner-friendly coding lessons, interactive coding challenges, daily programming practice, personalized coding roadmap, improve coding skills, best platform to learn coding, AI-assisted coding, learn javascript',
    publisher: {
      '@type': 'Organization',
      name: 'TechBlitz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://techblitz.dev/favicon.ico',
      },
    },
  };

  const contentGridItems: MarketingContentGridProps[] = [
    {
      title: 'Interactive Coding Challenges',
      description:
        'Master programming concepts through simple, interactive coding challenges. With your AI assistant providing instant feedback and step-by-step guidance.',
      icon: <CodeIcon className="size-6" />,
    },
    {
      title: 'Beginner-Friendly Platform',
      description:
        'Perfect for beginners - start with basic challenges and gradually advance your skills. Our step-by-step approach and clear explanations makes improving coding skills easy and enjoyable.',
      icon: <Users2 className="size-6" />,
    },
    {
      title: 'Seamless mobile experience',
      description:
        'Practice on the go with our mobile-friendly coding platform. Access your dashboard from any device, anywhere.',
      icon: <MobileIcon className="size-6" />,
    },
  ];

  //const homepageHeroIframe =
  //  'https://customer-8s5ov2shcw99ezk2.cloudflarestream.com/e49b63ed5ee42085d838a50928855776/iframe?poster=https%3A%2F%2Fcustomer-8s5ov2shcw99ezk2.cloudflarestream.com%2Fe49b63ed5ee42085d838a50928855776%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="overflow-x-hidden">
        <div className="z-30">
          <div className="container">
            <HomepageHero />
            <Testimonials />
            <FeaturesBentoGrid />
            <HomepageLargeText />
            <PersonalizedBlock />
            <QuestionMarquee
              header="The best beginner-friendly coding platform"
              subheader="From your first challenge to your first job. TechBlitz assists you every step of the way."
            />
            <ComparisonBlock />
            <MarketingContentGrid
              title="Beginner-friendly coding challenges"
              subheading="Join aspiring developers worldwide learning to code through TechBlitz's free, interactive programming challenges. Get personalized practice, instant feedback, and step-by-step guidance on your coding journey."
              items={contentGridItems}
            />
            <OpenSourceBlock />
            <CallToActionBlock
              title="Get started for free"
              description="See why TechBlitz is loved by developers worldwide."
            />
          </div>
        </div>
      </div>
    </>
  );
}
