
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import HostContext from "../../../HostContext";

type QuizAttempt = {
	id: number;
	userId: number;
	quizId: number;
	score: number;
	completed: boolean;
	completedAt: string;
	updatedAt: string;
}



type CreateQuizAttemptPayload = {
	quizId: number;
};

export const useCreateQuizAttempt = () => {
	const queryClient = useQueryClient();
	const hostUrl = useContext(HostContext);

	return useMutation({
		mutationFn: async (payload: CreateQuizAttemptPayload) => {
			const TOKEN = sessionStorage.getItem('token');
			const response = await fetch(`${hostUrl}/api/quiz-attempts`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error('Failed to create quiz attempt');
			}

			const data = await response.json();
			console.log(data)
			return data as QuizAttempt
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['quiz-attempts'] });
		},
	});
};