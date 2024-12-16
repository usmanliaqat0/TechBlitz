import CallToActionBlock from '@/components/marketing/global/call-to-action-block';
import FAQsBlock from '@/components/marketing/global/faqs';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | techblitz',
  description: 'Got a question? We have an answer.'
};

const faqs = [
  {
    question: 'What is techblitz?',
    answer:
      'techblitz is an online platform that helps developers of all abilities to learn and grow. We offer a range of tools and resources to help you become a better developer, including questions, roadmaps, tutorials, and more.'
  },
  {
    question: 'Is techblitz open source?',
    answer: (
      <>
        Yes! techblitz is open source. You can find our source{' '}
        <a
          href="https://git.new/blitz"
          target="_blank"
          className="text-accent"
        >
          here
        </a>
        .
      </>
    )
  },
  {
    question: 'Is techblitz free to use?',
    answer:
      'Yes, techblitz will be free to use. You will be able to sign up for a free account and start using our software right away.'
  },
  {
    question: 'What will you be adding to techblitz in the future?',
    answer: (
      <>
        We are always working on new features and improvements to techblitz. You
        can find our roadmap{' '}
        <a
          href="/roadmap"
          className="text-accent"
        >
          here
        </a>
        . Feel free to reach out to us with any feature requests or suggestions
        you may have.
      </>
    )
  },
  {
    question: 'What are the benefits of using techblitz?',
    answer:
      'We offer short-form questions on various topics to help you learn and grow.'
  },
  {
    question: 'How do I get started with techblitz?',
    answer: (
      <>
        To get started with techblitz, simply sign up for a free account. You
        can sign up{' '}
        <Link
          href="/signup"
          className="text-accent"
        >
          here
        </Link>
        .
      </>
    )
  },
  {
    question: 'Can I contribute to techblitz?',
    answer: (
      <>
        Yes! You can contribute to techblitz by submitting a pull request on our{' '}
        <a
          href="https://git.new/blitz"
          target="_blank"
          className="text-accent"
        >
          GitHub repository
        </a>
        .
      </>
    )
  },
  {
    question: 'Can I get a refund?',
    answer: 'Yes, you can get a refund within 14 days of your purchase. '
  },
  {
    question:
      'My question is not listed here. How can I get in touch with you?',
    answer: (
      <>
        If you have any other questions, feel free to reach out to us at{' '}
        <a
          href="mailto:team@techblitz.dev"
          className="text-accent"
        >
          team@techblitz.dev
        </a>
        .
      </>
    )
  },
  {
    question: 'Do you offer a student discount?',
    answer: (
      <>
        Yes, we offer a 50% discount for students. To claim your discount,
        please email us at{' '}
        <a
          href="mailto:team@techblitz.dev"
          className="text-accent"
        >
          team@techblitz.dev
        </a>{' '}
        using your student email address.
      </>
    )
  }
];

export default function FAQsPage() {
  return (
    <div className="pt-32 pb-24 md:pb-20 md:pt-32 xl:pt-40 xl:pb-32">
      <FAQsBlock faqs={faqs} />
      <CallToActionBlock title="The smarter way to stay on top of tech" />
    </div>
  );
}
