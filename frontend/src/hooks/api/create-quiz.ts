import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Quiz } from '../../types/question';
import { useContext } from 'react';
import HostContext from '../../HostContext';

type CreateQuizPayload = Omit<Quiz, 'id' | 'username' | 'createdAt' | 'updatedAt'>;

export const useCreateQuiz = () => {
	const queryClient = useQueryClient();
	const hostUrl = useContext(HostContext)

	return useMutation({
		mutationFn: async (quizData: CreateQuizPayload): Promise<Quiz> => {

			const TOKEN = sessionStorage.getItem('token');
			const response = await fetch(`${hostUrl}/api/quizzes`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(quizData),
			});

			if (!response.ok) {
				throw new Error('Failed to create quiz');
			}

			return response.json();
		},
		onSuccess: (newQuiz) => {
			queryClient.invalidateQueries({ queryKey: ['quizzes'] });
			queryClient.setQueryData<Quiz[]>(['quizzes'], (old) => [...(old || []), newQuiz]);
		},
	});
};