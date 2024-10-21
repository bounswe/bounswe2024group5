import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Quiz } from '../../types/question';
import { TOKEN } from './get-quizzes';

type CreateQuizPayload = Omit<Quiz, 'id' | 'username' | 'createdAt' | 'updatedAt'>;

const createQuiz = async (quizData: CreateQuizPayload): Promise<Quiz> => {
	const response = await fetch('http://localhost:80/api/quizzes', {
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
};

export const useCreateQuiz = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createQuiz,
		onSuccess: (newQuiz) => {
			queryClient.invalidateQueries({ queryKey: ['quizzes'] });
			queryClient.setQueryData<Quiz[]>(['quizzes'], (old) => [...(old || []), newQuiz]);
		},
	});
};