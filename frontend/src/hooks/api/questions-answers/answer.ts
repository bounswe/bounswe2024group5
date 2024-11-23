

import { useMutation, useQueryClient } from "@tanstack/react-query";
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

type CreateQuestionAnswerPayload = {
	quizAttemptId: number;
	questionId: number;
	answer: string;
};

export const useCreateQuestionAnswer = () => {
	const queryClient = useQueryClient();
	const hostUrl = useContext(HostContext);

	return useMutation({
		mutationFn: async (payload: CreateQuestionAnswerPayload): Promise<QuestionAnswer> => {
			const TOKEN = sessionStorage.getItem('token');
			const response = await fetch(`${hostUrl}/api/question-answers`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error('Failed to create question answer');
			}

			const data = await response.json();

			return data as QuestionAnswer
		},
		onSuccess: (newAnswer) => {
			queryClient.invalidateQueries({ queryKey: ['question-answers'] });
			queryClient.invalidateQueries({
				queryKey: ['question-answers', { quizAttemptId: newAnswer.quizAttemptId }]
			});
		},
	});
};