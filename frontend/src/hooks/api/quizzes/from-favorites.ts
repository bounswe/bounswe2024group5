import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Quiz } from '../../../types/question';
import { useContext } from 'react';
import HostContext from '../../../HostContext';

type FromFavoritesType = {
    title: string,
    count: number
};

export const useCreateQuizFromFavorites = () => {
	const queryClient = useQueryClient();
	const hostUrl = useContext(HostContext)

	return useMutation({
		mutationFn: async ( { title, count } : FromFavoritesType): Promise<Quiz> => {

			const TOKEN = localStorage.getItem('token');
			const response = await fetch(`${hostUrl}/api/quizzes/from-favorites`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title, count }), 
			});

			if (!response.ok) {
				throw new Error('Failed to create quiz from favorites.');
			}

			return response.json();
		},
		onSuccess: (newQuiz) => {
			queryClient.invalidateQueries({ queryKey: ['quizzes'] });
			queryClient.setQueryData<Quiz[]>(['quizzes'], (old) => [...(old || []), newQuiz]);
		},
	});
};