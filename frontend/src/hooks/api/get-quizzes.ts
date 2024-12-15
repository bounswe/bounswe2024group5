import { useQuery } from '@tanstack/react-query';
import { Quiz } from '../../types/question';
import { useContext } from 'react';
import HostContext from '../../HostContext';

interface QuizParams {
	username?: string;
	minDifficulty?: number;
	maxDifficulty?: number;
}

export const useFetchQuizzes = (params: QuizParams = {}) => {
	const TOKEN = localStorage.getItem('token');
	const hostUrl = useContext(HostContext);
	const { username, minDifficulty, maxDifficulty } = params;

	const context = useQuery({
		queryKey: ['quizzes', { username, minDifficulty, maxDifficulty }],
		queryFn: async () => {
			const queryParams = new URLSearchParams();

			if (username) {
				queryParams.append('username', username);
			}

			if (minDifficulty !== undefined) {
				queryParams.append('minDifficulty', minDifficulty.toString());
			}

			if (maxDifficulty !== undefined) {
				queryParams.append('maxDifficulty', maxDifficulty.toString());
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