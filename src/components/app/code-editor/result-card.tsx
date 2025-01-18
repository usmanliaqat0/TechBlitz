import { Alert, AlertDescription } from '@/components/ui/alert';

import { ChevronRight } from 'lucide-react';

interface ResultProps {
  result: {
    passed: boolean;
    input: any[];
    expected: any;
    received: any;
    error?: string;
  };
  index: number;
}

export default function ResultCard({ result, index }: ResultProps) {
  const isPassed = result.passed;

  return (
    <div className="group">
      <Alert
        variant="default"
        className={`
          border-l-4 transition-all duration-200 bg-black-75 border-black-50
          ${
            isPassed
              ? 'border-l-green-500 hover:border-l-green-600'
              : 'border-l-red-500 hover:border-l-red-600'
          }
        `}
      >
        <AlertDescription>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center">
              <ChevronRight
                className={`h-4 w-4 mr-2 transition-transform group-hover:translate-x-1
                  ${isPassed ? 'text-green-600' : 'text-red-600'}`}
              />
              <span
                className={`font-medium ${
                  isPassed ? 'text-green-700' : 'text-red-700'
                }`}
              >
                Test Case {index + 1}
              </span>
              <span
                className={`ml-3 px-2 py-0.5 text-sm rounded-full
                ${
                  isPassed
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {isPassed ? 'Passed' : 'Failed'}
              </span>
            </div>

            {result.error && (
              <div className="ml-6 space-y-2 text-sm">
                <div className="flex flex-col space-y-1">
                  <span className="font-medium text-white">Error:</span>
                  <code className="px-2 py-1 bg-black-50 rounded">
                    {result.error}
                  </code>
                </div>
              </div>
            )}

            <div className="ml-6 space-y-2 text-sm">
              <div className="flex flex-col space-y-1">
                <span className="font-medium text-white">Input:</span>
                <code className="px-2 py-1 bg-black-50 rounded">
                  ({result.input.join(', ')})
                </code>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <span className="font-medium text-white">Expected:</span>
                  <code className="px-2 py-1 bg-black-50 rounded">
                    {result.expected}
                  </code>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="font-medium text-white">Received:</span>
                  <code className={`px-2 py-1 rounded bg-black-50`}>
                    {result.received}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
