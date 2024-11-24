import { useQuery } from '@tanstack/react-query';
import { Quiz } from '../../types/question';
import { useContext } from 'react';
import HostContext from '../../HostContext';

interface QuizParams {
	filter?: 'own' | 'others' | 'all';
	difficulty?: 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2';
}

export const useFetchQuizzes = (params: QuizParams = {}) => {
	const TOKEN = sessionStorage.getItem('token');
	const hostUrl = useContext(HostContext);
	const { filter, difficulty } = params;

	const context = useQuery({
		queryKey: ['quizzes', { filter, difficulty }],
		queryFn: async () => {
			const queryParams = new URLSearchParams();

			if (filter) {
				queryParams.append('filter', filter);
			}

			if (difficulty) {
				queryParams.append('difficulty', difficulty);
			}

			const url = `${hostUrl}/api/quizzes${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

			if (!TOKEN) {
				throw new Error('No authentication token found');
			}

			const response = await fetch(url, {
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				if (response.status === 401) {
					throw new Error('Unauthorized access');
				}
				throw new Error('Failed to fetch quizzes');
			}

			const data = await response.json() as { quizzes: Quiz[] };

			// Randomize options for each question
			data.quizzes.forEach((quiz) => {
				quiz.questions.forEach((question) => {
					question.options = question.wrongAnswers
						.concat(question.correctAnswer)
						.sort(() => Math.random() - 0.5);
				});
			});

			return data.quizzes;
		}
	});

	return context;
};