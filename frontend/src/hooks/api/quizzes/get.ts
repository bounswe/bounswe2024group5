import { useQuery } from '@tanstack/react-query';
import type { Quiz } from '../../../types/question';
import { useContext } from 'react';
import HostContext from '../../../HostContext';

type QuizResponse = {
	quiz: Quiz;
};

export const useGetQuiz = (id?: number) => {
	const TOKEN = localStorage.getItem('token');
	const hostUrl = useContext(HostContext);

	return useQuery({
		queryKey: ['quiz', id],
		queryFn: async () => {
			if (!id) {
				return {
					id: Math.floor(Math.random() * 1000),
					title: "",
					description: "",
					difficulty: 1,
					image: "none",
					questions: [],
				  };
			};

			if (!TOKEN) {
				throw new Error('No authentication token found');
			}

			const response = await fetch(`${hostUrl}/api/quizzes/${id}`, {
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				if (response.status === 404) {
					throw new Error('Quiz not found');
				}
				if (response.status === 401) {
					throw new Error('Unauthorized access');
				}
				throw new Error('Failed to fetch quiz details');
			}

			// const data = await response.json() as ;
			const data = (await response.json()) as QuizResponse;

			// Randomize options for each question
			data.quiz.questions.forEach((question) => {
				question.options = question.wrongAnswers
					.concat(question.correctAnswer)
					.sort(() => Math.random() - 0.5);
			});

			return data.quiz;
		},

	});
};
