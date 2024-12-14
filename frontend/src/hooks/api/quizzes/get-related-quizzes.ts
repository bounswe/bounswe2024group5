import { useQuery } from '@tanstack/react-query';
import type { Quiz } from '../../../types/question';
import { useContext } from 'react';
import HostContext from '../../../HostContext';


export const useGetRecommendedQuizzes = (id: number) => {
	const TOKEN = localStorage.getItem('token');
	const hostUrl = useContext(HostContext);

	return useQuery({
		queryKey: ['recommendedQuizzes', id],
		queryFn: async () => {
			if (!TOKEN) {
				throw new Error('No authentication token found');
			}

			const response = await fetch(`${hostUrl}/api/quizzes/${id}/recommended`, {
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
				throw new Error('Failed to fetch recommended quizzes');
			}

			const data = (await response.json()) as Quiz[]

			return data
		}
	});
};