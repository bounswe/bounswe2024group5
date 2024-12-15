import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import HostContext from '../../../HostContext';

export const useDeleteQuiz = () => {
	const TOKEN = localStorage.getItem('token');
	const hostUrl = useContext(HostContext);
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: number) => {
			if (!TOKEN) {
				throw new Error('No authentication token found');
			}

			await fetch(`${hostUrl}/api/quizzes/${id}`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'application/json'
				}
			});
			return id;
		},
		onSuccess: (_, id) => {
			queryClient.invalidateQueries({ queryKey: ['quiz', id] });
			queryClient.invalidateQueries({ queryKey: ['quizzes'] });
		}
	});
};