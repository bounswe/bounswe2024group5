import React from 'react';
import { Quiz } from '../../types/question';
import { useGetRecommendedQuizzes } from '../../hooks/api/quizzes/get-related-quizzes';
import { IconBulb } from '@tabler/icons-react';
import { CompactQuizCard } from '../list-quizzes/compact-quiz-card';

export const RecommendedQuizzes: React.FC<{ quizId: number }> = ({ quizId }) => {
	const { data: recommendedQuizzes, isLoading, error } = useGetRecommendedQuizzes(quizId);
  
	if (isLoading || error || !recommendedQuizzes?.length) {
	  return null;
	}
  
	return (
	  <div className="p-6 bg-emerald-50 rounded-xl">
		<div className="flex items-center gap-2 mb-4">
		  <IconBulb className="w-5 h-5 text-purple-600" />
		  <h2 className="text-xl font-bold text-purple-900">
			Recommended Quizzes
		  </h2>
		</div>
  
		<div className="flex flex-col gap-2">
		  {recommendedQuizzes.map((quiz: Quiz) => (
			<CompactQuizCard 
			  key={quiz.id} 
			  quiz={quiz}
			/>
		  ))}
		</div>
	  </div>
	);
  };
  