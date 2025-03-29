'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, Cpu } from 'lucide-react';
import ChatBot from '@/components/ui/icons/chat-bot';

interface CountdownProps {
  aiTime: number;
  isVisible: boolean;
  isSubmitted: boolean;
  wasCorrect?: boolean;
}

export default function Countdown({ aiTime, isVisible, isSubmitted, wasCorrect }: CountdownProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime] = useState(Date.now());
  const [beatAI, setBeatAI] = useState<boolean | null>(null);

  // Update elapsed time every 100ms
  useEffect(() => {
    if (!isVisible || isSubmitted) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const seconds = (now - startTime) / 1000;
      setElapsedTime(seconds);
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, isVisible, isSubmitted]);

  // Determine if user beat AI when submitted
  useEffect(() => {
    if (isSubmitted && wasCorrect !== undefined) {
      setBeatAI(wasCorrect && elapsedTime < aiTime);
    }
  }, [isSubmitted, wasCorrect, elapsedTime, aiTime]);

  if (!isVisible) return null;

  // Calculate progress percentage (how much of AI's time has elapsed)
  const progressPercentage = Math.min((elapsedTime / aiTime) * 100, 100);

  // Determine progress bar class based on time comparison and submission state
  const getProgressColorClass = () => {
    if (isSubmitted) {
      return beatAI ? 'bg-green-500' : 'bg-red-500';
    }

    // Not submitted yet
    if (progressPercentage < 70) return 'bg-green-500';
    if (progressPercentage < 90) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  // Format message based on state
  const getMessage = () => {
    if (isSubmitted) {
      if (beatAI) {
        return `You beat AI by ${(aiTime - elapsedTime).toFixed(1)} seconds!`;
      }
      if (wasCorrect) {
        return `AI was faster by ${(elapsedTime - aiTime).toFixed(1)} seconds`;
      }
      return 'Incorrect answer';
    }

    // Not submitted yet
    const timeLeft = aiTime - elapsedTime;
    if (timeLeft > 0) {
      return `${timeLeft.toFixed(1)} seconds to beat AI`;
    }
    return 'Better luck next time!';
  };

  return (
    <motion.div
      className="absolute top-4 right-4 bg-background border border-black-50 rounded-md px-5 py-3 shadow-md z-30 transition-all duration-200"
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 0, opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-2 gap-16">
        <div className="flex items-center gap-1">
          <ChatBot className="size-4" />
          <span className="font-medium">Time to beat</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <span>{aiTime.toFixed(1)}s</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-2 overflow-hidden">
        <motion.div
          className={`h-2.5 rounded-full ${getProgressColorClass()}`}
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <div className="flex justify-between items-center gap-4">
        <span className="text-sm font-medium font-onest">{getMessage()}</span>
      </div>
    </motion.div>
  );
}
