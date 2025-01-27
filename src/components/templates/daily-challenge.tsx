import React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components';

interface EmailTemplateProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
  difficulty: string;
}

export const DailyChallengeEmailTemplate: React.FC<EmailTemplateProps> = ({
  title,
  description,
  tags,
  link,
  difficulty,
}) => {
  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.section}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="111"
              height="26"
              viewBox="0 0 111 26"
              fill="none"
              style={styles.logo}
            >
              <g clipPath="url(#clip0_85_7)">
                <rect width="111" height="26" fill="black" />
                <path
                  d="M6.74696 23.4774C5.38696 23.4774 4.41096 23.1094 3.81896 22.3734C3.24296 21.6214 2.95496 20.5734 2.95496 19.2294V12.8934H0.938963V10.6854H2.95496V7.01337H5.42696V10.6854H9.29096V12.8934H5.42696V18.8214C5.42696 19.2694 5.46696 19.6774 5.54696 20.0454C5.64296 20.4134 5.81896 20.7014 6.07496 20.9094C6.33096 21.1174 6.69896 21.2294 7.17896 21.2454C7.54696 21.2454 7.86696 21.1814 8.13896 21.0534C8.42696 20.9254 8.65896 20.7814 8.83496 20.6214L9.79496 22.4694C9.49096 22.7094 9.17096 22.9094 8.83496 23.0694C8.51496 23.2134 8.17896 23.3174 7.82696 23.3814C7.47496 23.4454 7.11496 23.4774 6.74696 23.4774ZM17.6255 23.4774C16.2975 23.4774 15.1855 23.2054 14.2895 22.6614C13.3935 22.1174 12.7135 21.3654 12.2495 20.4054C11.8015 19.4294 11.5775 18.3094 11.5775 17.0454C11.5775 15.7654 11.8095 14.6374 12.2735 13.6614C12.7535 12.6854 13.4415 11.9174 14.3375 11.3574C15.2495 10.7974 16.3455 10.5174 17.6255 10.5174C18.6015 10.5174 19.4495 10.7014 20.1695 11.0694C20.8895 11.4214 21.4815 11.9014 21.9455 12.5094C22.4255 13.1174 22.7775 13.7974 23.0015 14.5494C23.2255 15.2854 23.3215 16.0534 23.2895 16.8534C23.2895 17.0294 23.2815 17.1974 23.2655 17.3574C23.2495 17.5174 23.2335 17.6854 23.2175 17.8614H14.0735C14.1215 18.5014 14.2815 19.0854 14.5535 19.6134C14.8415 20.1414 15.2415 20.5654 15.7535 20.8854C16.2655 21.1894 16.8975 21.3414 17.6495 21.3414C18.0655 21.3414 18.4655 21.2934 18.8495 21.1974C19.2495 21.0854 19.6015 20.9174 19.9055 20.6934C20.2255 20.4534 20.4495 20.1494 20.5775 19.7814H23.0735C22.8655 20.6294 22.4895 21.3334 21.9455 21.8934C21.4175 22.4374 20.7695 22.8374 20.0015 23.0934C19.2495 23.3494 18.4575 23.4774 17.6255 23.4774ZM14.1215 15.8934H20.8415C20.8255 15.2694 20.6815 14.7174 20.4095 14.2374C20.1375 13.7414 19.7615 13.3574 19.2815 13.0854C18.8015 12.7974 18.2255 12.6534 17.5535 12.6534C16.8175 12.6534 16.2015 12.8054 15.7055 13.1094C15.2255 13.4134 14.8495 13.8134 14.5775 14.3094C14.3215 14.7894 14.1695 15.3174 14.1215 15.8934ZM32.0491 23.4774C30.7211 23.4774 29.6091 23.2054 28.7131 22.6614C27.8331 22.1174 27.1691 21.3654 26.7211 20.4054C26.2891 19.4294 26.0731 18.3094 26.0731 17.0454C26.0731 15.7974 26.2971 14.6854 26.7451 13.7094C27.2091 12.7174 27.8971 11.9414 28.8091 11.3814C29.7371 10.8054 30.8811 10.5174 32.2411 10.5174C33.1691 10.5174 33.9931 10.6774 34.7131 10.9974C35.4331 11.3014 36.0171 11.7574 36.4651 12.3654C36.9291 12.9574 37.2331 13.7014 37.3771 14.5974H34.9051C34.6971 13.9414 34.3451 13.4694 33.8491 13.1814C33.3691 12.8934 32.8011 12.7494 32.1451 12.7494C31.2651 12.7494 30.5611 12.9574 30.0331 13.3734C29.5211 13.7894 29.1451 14.3254 28.9051 14.9814C28.6651 15.6374 28.5451 16.3254 28.5451 17.0454C28.5451 17.7974 28.6651 18.4934 28.9051 19.1334C29.1611 19.7734 29.5451 20.2934 30.0571 20.6934C30.5851 21.0774 31.2731 21.2694 32.1211 21.2694C32.7611 21.2694 33.3531 21.1334 33.8971 20.8614C34.4411 20.5734 34.7931 20.0934 34.9531 19.4214H37.4972C37.3532 20.3494 37.0172 21.1174 36.4891 21.7254C35.9611 22.3174 35.3051 22.7574 34.5211 23.0454C33.7531 23.3334 32.9291 23.4774 32.0491 23.4774ZM40.3691 23.3334V6.36537H42.8411V12.4614C43.1771 12.0294 43.5611 11.6694 43.9931 11.3814C44.4411 11.0934 44.9211 10.8774 45.4331 10.7334C45.9451 10.5894 46.4571 10.5174 46.9691 10.5174C48.1851 10.5174 49.1371 10.7814 49.8251 11.3094C50.5131 11.8214 51.0011 12.5174 51.2891 13.3974C51.5771 14.2774 51.7211 15.2694 51.7211 16.3734V23.3334H49.2251V16.9494C49.2251 16.4374 49.1851 15.9334 49.1051 15.4374C49.0411 14.9414 48.9131 14.4934 48.7211 14.0934C48.5291 13.6774 48.2331 13.3494 47.8331 13.1094C47.4491 12.8534 46.9291 12.7254 46.2731 12.7254C45.6491 12.7254 45.1131 12.8614 44.6651 13.1334C44.2331 13.4054 43.8811 13.7734 43.6091 14.2374C43.3531 14.6854 43.1611 15.1814 43.0331 15.7254C42.9051 16.2534 42.8411 16.7814 42.8411 17.3094V23.3334H40.3691ZM61.53 23.4774C61.002 23.4774 60.498 23.4214 60.018 23.3094C59.554 23.1974 59.114 23.0214 58.698 22.7814C58.298 22.5254 57.938 22.2134 57.618 21.8454L57.546 23.3334H55.146V6.36537H57.618V12.3894C58.066 11.7814 58.666 11.3174 59.418 10.9974C60.17 10.6774 60.946 10.5174 61.746 10.5174C63.01 10.5174 64.05 10.8054 64.866 11.3814C65.682 11.9414 66.282 12.7094 66.666 13.6854C67.066 14.6454 67.266 15.7414 67.266 16.9734C67.266 18.1894 67.058 19.2934 66.642 20.2854C66.226 21.2614 65.594 22.0374 64.746 22.6134C63.914 23.1894 62.842 23.4774 61.53 23.4774ZM61.266 21.2934C62.146 21.2934 62.842 21.0934 63.354 20.6934C63.866 20.2934 64.234 19.7654 64.458 19.1094C64.682 18.4534 64.794 17.7494 64.794 16.9974C64.794 16.2134 64.674 15.5014 64.434 14.8614C64.21 14.2214 63.834 13.7094 63.306 13.3254C62.794 12.9414 62.106 12.7494 61.242 12.7494C60.458 12.7494 59.794 12.9654 59.25 13.3974C58.706 13.8134 58.29 14.3494 58.002 15.0054C57.73 15.6614 57.594 16.3414 57.594 17.0454C57.594 17.7814 57.714 18.4774 57.954 19.1334C58.21 19.7734 58.61 20.2934 59.154 20.6934C59.698 21.0934 60.402 21.2934 61.266 21.2934ZM70.2978 23.3334V6.36537H72.7698V23.3334H70.2978ZM76.3091 23.3334V10.6854H78.7811V23.3334H76.3091ZM77.5331 9.00537C77.0531 9.00537 76.6611 8.86137 76.3571 8.57337C76.0691 8.26937 75.9251 7.88537 75.9251 7.42137C75.9251 6.95737 76.0771 6.58137 76.3811 6.29337C76.6851 5.98937 77.0691 5.83737 77.5331 5.83737C77.9651 5.83737 78.3411 5.98937 78.6611 6.29337C78.9971 6.58137 79.1651 6.95737 79.1651 7.42137C79.1651 7.88537 79.0051 8.26937 78.6851 8.57337C78.3811 8.86137 77.9971 9.00537 77.5331 9.00537ZM87.6483 23.3334C86.6563 23.3334 85.8483 23.1974 85.2243 22.9254C84.6003 22.6374 84.1363 22.1894 83.8323 21.5814C83.5443 20.9734 83.4003 20.1814 83.4003 19.2054V12.8934H81.4083V10.6854H83.4003V7.03737H85.8723V10.6854H89.0643V12.8934H85.8723V18.8934C85.8723 19.6454 86.0083 20.2134 86.2803 20.5974C86.5523 20.9654 87.1203 21.1494 87.9843 21.1494H88.9683V23.3334H87.6483ZM91.1797 23.3334V21.3414L98.3077 12.8934H91.1797V10.6854H101.476V12.6534L94.2997 21.1494H101.476V23.3334H91.1797Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_85_7">
                  <rect width="111" height="26" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <Text style={styles.title}>{title}</Text>
            <Hr style={styles.hr} />
            <Text style={styles.description}>{description}</Text>
            {difficulty && (
              <Text style={styles.difficulty}>
                Difficulty:{' '}
                <span style={{ color: getDifficultyColor(difficulty) }}>
                  {difficulty}
                </span>
              </Text>
            )}
            <Text style={styles.tagLabel}>Today's challenge involves:</Text>
            {tags?.length > 0 && (
              <Section style={styles.tagContainer}>
                {tags?.map((tag, index) => (
                  <Text
                    key={index}
                    style={{ ...styles.tag, margin: '4px 4px' }}
                  >
                    {tag}
                  </Text>
                ))}
              </Section>
            )}
            <Hr style={styles.hr} />
            <Link href={link} style={styles.button}>
              Take the Challenge
            </Link>
            <Text style={styles.footer}>
              Stay consistent, keep coding, and watch your skills grow!
            </Text>
            <Section style={styles.footer}>
              <Link href="https://x.com/techblitz_dev" style={styles.listItem}>
                <svg
                  data-testid="geist-icon"
                  height="24"
                  strokeLinejoin="round"
                  viewBox="0 0 16 16"
                  width="24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.60022 2H5.80022L8.78759 6.16842L12.4002 2H14.0002L9.5118 7.17895L14.4002 14H10.2002L7.21285 9.83158L3.60022 14H2.00022L6.48864 8.82105L1.60022 2ZM10.8166 12.8L3.93657 3.2H5.18387L12.0639 12.8H10.8166Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Link>
              <Link href="https://git.new/techblitz" style={styles.listItem}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                  />
                </svg>
              </Link>
              <Text style={styles.footerText}>
                © 2025 TechBlitz. All rights reserved.
              </Text>
              <Text style={styles.footerText}>
                Want to stop receiving these emails?{' '}
                <Link
                  href={`${process.env.NEXT_PUBLIC_URL}/settings/profile`}
                  style={styles.listItem}
                >
                  Manage your email preferences
                </Link>
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Helper function to get color based on difficulty
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return '#4CAF50';
    case 'medium':
      return '#FFC107';
    case 'hard':
      return '#F44336';
    default:
      return '#5A5FCD';
  }
};

// default content
// @ts-ignore
DailyChallengeEmailTemplate.PreviewProps = {
  title: 'Your daily challenge is ready!',
  description:
    "Sharpen your coding skills with today's exciting challenge. Are you up for it?",
  tags: ['JavaScript', 'Algorithms', 'Problem Solving', 'React'],
  link: 'https://example.com/daily-challenge',
  difficulty: 'Medium',
} as EmailTemplateProps;

const styles = {
  body: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    fontFamily:
      "'Onest', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
  container: {
    margin: '0 auto',
    padding: '20px 0 48px',
  },
  section: {
    backgroundColor: '#000000',
    borderRadius: '8px',
    padding: '48px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    margin: '0 auto 24px',
    display: 'block',
  },
  preheader: {
    color: '#888888',
    fontSize: '14px',
    fontStyle: 'italic',
    textAlign: 'center' as const,
    margin: '0 0 24px',
  },
  difficulty: {
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    margin: '0 0 20px',
    lineHeight: '1.5',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    margin: '0 0 24px',
    lineHeight: '1.3',
    color: '#FFFFFF',
  },
  description: {
    fontSize: '18px',
    lineHeight: '1.6',
    margin: '0 0 24px',
    textAlign: 'center' as const,
  },
  hr: {
    borderColor: '#333333',
    margin: '24px 0',
  },
  tagLabel: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 16px',
    textAlign: 'center' as const,
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    gap: '4px',
    margin: '0 0 24px',
    alignItems: 'center',
    textAlign: 'center' as const,
  },
  tag: {
    backgroundColor: '#111111',
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '6px 12px',
    borderRadius: '8px',
    display: 'inline-block',
    border: '1px solid #2d2d2d',
  },
  button: {
    backgroundColor: '#5A5FCD',
    borderRadius: '8px',
    color: '#ffffff',
    display: 'block',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '16px 24px',
    textAlign: 'center' as const,
    textDecoration: 'none',
    marginTop: '32px',
    transition: 'background-color 0.3s ease',
  },
  footer: {
    fontSize: '16px',
    color: '#888888',
    textAlign: 'center' as const,
    marginTop: '32px',
    fontStyle: 'italic',
  },
  footerText: {
    fontSize: '12px',
    color: '#888888',
    textAlign: 'center' as const,
  },
  listItem: {
    color: '#888888',
    textAlign: 'center' as const,
  },
};

export default DailyChallengeEmailTemplate;
