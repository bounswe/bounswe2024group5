import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import HostContext from "../../../HostContext";

export type QuizAttempt = {
	id: number;
	userId: number;
	quizId: number;
	score: number;
	completedAt: string;
	updatedAt: string;
	completed: boolean;
}

type UpdateQuizAttemptRequest = {
	completed: boolean;
}

export const useUpdateQuizAttempt = (id: number) => {
	const queryClient = useQueryClient();
	const hostUrl = useContext(HostContext);

	return useMutation<QuizAttempt, Error, UpdateQuizAttemptRequest>({
		mutationFn: async ({ completed }): Promise<QuizAttempt> => {
			const TOKEN = sessionStorage.getItem('token');
			const response = await fetch(`${hostUrl}/api/quiz-attempts/${id}`, {
				method: 'PUT',
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ completed }),
			});

			if (!response.ok) {
				throw new Error('Failed to update quiz attempt');
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['quiz-attempts'] });
			queryClient.invalidateQueries({ queryKey: ['quiz-attempts', id] });
		},
	});
};