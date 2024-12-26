'use client';

import { motion } from 'framer-motion';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardBentoGridLoading() {
  const loadingItems = [
    {
      className: 'h-full text-white justify-center min-h-fit',
      height: 'h-[100px] lg:h-full',
    },
    {
      className: 'h-full text-white justify-center min-h-fit',
      height: 'h-[100px] lg:h-full',
    },
    {
      className: 'md:col-span-2 text-white',
      height: 'h-[250px] lg:h-full',
    },
    {
      className: 'md:col-span-1 md:row-span-2 text-white h-full',
      height: 'h-[100px] lg:h-full',
    },
    {
      className: 'md:col-span-3 text-white min-h-[25rem]',
      height: 'h-[400px]',
    },
  ];

  return (
    <BentoGrid className="grid-rows-[auto_auto_auto] md:grid-rows-[repeat(2,minmax(0,1fr))] h-full">
      {loadingItems.map((item, i) => (
        <BentoGridItem
          key={i}
          className={item.className}
          header={
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 0.7, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full h-full"
            >
              <div className="relative w-full h-full">
                <Skeleton className={`w-full ${item.height} bg-muted/10`} />

                {/* Content placeholder skeletons */}
                <div className="absolute inset-0 p-6 flex flex-col gap-4">
                  <Skeleton className="w-1/3 h-6 bg-muted/10" />
                  <Skeleton className="w-2/3 h-4 bg-muted/10" />
                  {i === 2 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {[...Array(3)].map((_, index) => (
                        <Skeleton
                          key={index}
                          className="w-full h-24 bg-muted/10"
                        />
                      ))}
                    </div>
                  )}
                  {i === 4 && (
                    <div className="mt-8">
                      <Skeleton className="w-full h-48 bg-muted/10" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          }
        />
      ))}
    </BentoGrid>
  );
}