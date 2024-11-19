

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import HostContext from "../../../HostContext";
export type QuestionAnswer = {
	id: number;
	quizAttemptId: number;
	questionId: number;
	answer: string;
	isCorrect: boolean;
	updatedAt: string;
}
export const useQuestionAnswers = (filters?: { quizAttemptId?: number; questionId?: number }) => {
	const hostUrl = useContext(HostContext);

	return useQuery({
		queryKey: ['question-answers', filters],
		queryFn: async () => {
			const TOKEN = sessionStorage.getItem('token');
			const params = new URLSearchParams();

			if (filters?.quizAttemptId !== undefined) {
				params.append('quizAttemptId', filters.quizAttemptId.toString());
			}
			if (filters?.questionId !== undefined) {
				params.append('questionId', filters.questionId.toString());
			}

			const response = await fetch(
				`${hostUrl}/api/question-answers?${params.toString()}`,
				{
					headers: {
						'Authorization': `Bearer ${TOKEN}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error('Failed to fetch question answers');
			}

			const data = await response.json()
			return data as QuestionAnswer[];
		},
	});
};