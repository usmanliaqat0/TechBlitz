import { useState } from 'react';

import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookIcon, BookOpen, FileIcon, FileText } from 'lucide-react';
import QuestionHintTrigger from '@/components/app/questions/question-hint-trigger';
import BookmarkQuestion from '@/components/app/questions/single/bookmark';
import Chip from '@/components/ui/chip';
import { getQuestionDifficultyColor, capitalise } from '@/utils';
import { useRoadmapQuestion } from './roadmap-question-context';
import RoadmapAnswerQuestionForm from '@/components/app/roadmaps/questions/roadmap-answer-form';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Lightbulb } from 'lucide-react';

export default function RoadmapQuestionTabs() {
  const { roadmapQuestion, roadmapUid, user, showHint, setShowHint } =
    useRoadmapQuestion();

  const [activeTab, setActiveTab] = useState<
    'description' | 'resources' | 'stats'
  >('description');

  const renderAnswerForm = () => (
    <RoadmapAnswerQuestionForm
      question={roadmapQuestion}
      userData={user}
      roadmapUid={roadmapUid}
    />
  );

  return (
    <>
      <TabsList className="p-4 grid lg:hidden h-auto w-full place-items-center grid-cols-3 gap-5 text-white rounded-lg bg-transparent">
        <TabsTrigger
          value="description"
          onClick={() => setActiveTab('description')}
          className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline border-0 w-fit px-0"
        >
          <div className="mr-2 hidden md:block">
            {activeTab === 'description' ? (
              <FileText className="size-4" />
            ) : (
              <FileIcon className="size-4" />
            )}
          </div>
          Description
        </TabsTrigger>
        <TabsTrigger
          value="resources"
          onClick={() => setActiveTab('resources')}
          className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline border-0 w-fit px-0"
        >
          <div className="mr-2 hidden md:block">
            {activeTab === 'resources' ? (
              <BookOpen className="size-4" />
            ) : (
              <BookIcon className="size-4" />
            )}
          </div>
          Resources
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="pt-2 lg:pt-4">
        <div className="flex flex-col gap-4 p-4 pt-0">
          <div className="flex w-full justify-between gap-5 mb-5">
            <div className="flex w-full gap-2 items-center">
              <Chip
                color={
                  getQuestionDifficultyColor(roadmapQuestion.difficulty).bg
                }
                text={capitalise(roadmapQuestion.difficulty)}
                textColor={
                  getQuestionDifficultyColor(roadmapQuestion.difficulty).text
                }
                border={
                  getQuestionDifficultyColor(roadmapQuestion.difficulty).border
                }
              />
            </div>
            <div className="flex items-center">
              <QuestionHintTrigger
                showHint={showHint}
                setShowHint={setShowHint}
              />
              <BookmarkQuestion question={roadmapQuestion} />
            </div>
          </div>
          {showHint && roadmapQuestion.hint && (
            <div className="bg-black-50 rounded-lg p-4 mt-2">
              <div className="flex items-center gap-x-2 mb-2">
                <Lightbulb className="size-4" />
                <p className="text-sm font-medium">Hint</p>
              </div>
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                  ul: ({ children }) => (
                    <ul className="list-disc px-4 flex flex-col gap-3">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal px-4 flex flex-col gap-3">
                      {children}
                    </ol>
                  ),
                }}
              >
                {roadmapQuestion.hint}
              </Markdown>
            </div>
          )}
          {roadmapQuestion?.question && (
            <div className="flex w-full gap-10 justify-between">
              <h3 className="font-onest font-light text-lg md:text-2xl">
                {roadmapQuestion.question}
              </h3>
            </div>
          )}
          {renderAnswerForm()}
        </div>
      </TabsContent>
    </>
  );
}
