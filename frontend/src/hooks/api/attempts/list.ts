import { useQuery } from "@tanstack/react-query";
import HostContext from "../../../HostContext";
import { useContext } from "react";

export type QuizAttempt = {
	id: number;
	userId: number;
	quizId: number;
	score: number;
	completed: boolean;
	completedAt: string;
	updatedAt: string;
}

export type CreateQuizAttemptPayload = {
	quizId: number;
};

export const useQuizAttempts = (filters?: { isCompleted?: boolean; quizId?: number }) => {
	const hostUrl = useContext(HostContext);

	return useQuery({
		queryKey: ['quiz-attempts', filters],
		queryFn: async () => {
			const TOKEN = localStorage.getItem('token');
			const params = new URLSearchParams();

			if (filters?.isCompleted !== undefined) {
				params.append('isCompleted', filters.isCompleted.toString());
			}
			if (filters?.quizId !== undefined) {
				params.append('quizId', filters.quizId.toString());
			}

			const response = await fetch(
				`${hostUrl}/api/quiz-attempts?${params.toString()}`,
				{
					headers: {
						'Authorization': `Bearer ${TOKEN}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error('Failed to fetch quiz attempts');
			}

			const data = await response.json()
			return data as QuizAttempt[];
		},
	});
};