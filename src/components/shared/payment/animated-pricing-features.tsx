'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@radix-ui/react-icons';
import { Skeleton } from '@/components/ui/skeleton';

interface Feature {
  name: string;
}

interface AnimatedPricingFeaturesProps {
  features: Feature[];
  productId: string;
  loading?: boolean;
  isFree?: boolean;
}

export default function AnimatedPricingFeatures({
  features,
  productId,
  loading = false,
  isFree = false,
}: AnimatedPricingFeaturesProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-y-3 py-5 min-h-80">
        {!isFree && (
          <div className="text-sm text-white font-medium font-onest text-start">
            Everything in the free, plus:
          </div>
        )}
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-x-2 items-center">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="flex flex-col gap-y-3 py-3"
    >
      {!isFree && (
        <div className="text-sm text-white font-medium font-onest text-start">
          Everything in the free, plus:
        </div>
      )}
      {features.map((feature, index) => (
        <motion.div
          key={`${productId}-${feature.name}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="flex gap-x-2 items-center"
        >
          <div className="bg-accent p-0.5 rounded-full">
            <CheckIcon className="size-3" />
          </div>
          <span className="text-sm text-start font-onest">{feature.name}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
