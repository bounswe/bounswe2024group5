import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import HostContext from "../../../HostContext";
import type { Question } from "../../../types/question";

type UseCorrectAnswersParams = {
	word: string;
	questionType: Question['questionType'];
	enabled?: boolean;
}

type UseWrongAnswersParams = {
	word: string;
	questionType: Question['questionType'];
	correctAnswer: string;
	enabled?: boolean;
}

export const useCorrectAnswers = ({ word, questionType, enabled = true }: UseCorrectAnswersParams) => {
	const hostUrl = useContext(HostContext);

	return useQuery({
		queryKey: ['correct-answers', word, questionType],
		queryFn: async () => {
			const TOKEN = localStorage.getItem('token');
			const params = new URLSearchParams({
				word,
				questionType,
			});

			const response = await fetch(
				`${hostUrl}/api/get-correct-answers?${params}`,
				{
					headers: {
						'Authorization': `Bearer ${TOKEN}`,
					},
				}
			);

			if (!response.ok) {
				if (response.status === 400) {
					throw new Error('Invalid parameters provided');
				}
				throw new Error('Failed to fetch correct answers');
			}

			const data = await response.json();
			return data as string[];
		},
		enabled: enabled && Boolean(word) && Boolean(questionType),
	});
};

export const useWrongAnswers = ({ word, questionType, correctAnswer, enabled = true }: UseWrongAnswersParams) => {
	const hostUrl = useContext(HostContext);

	return useQuery({
		queryKey: ['wrong-answers', word, questionType, correctAnswer],
		queryFn: async () => {
			const TOKEN = localStorage.getItem('token');
			const params = new URLSearchParams({
				word,
				questionType,
				correctAnswer,
			});

			const response = await fetch(
				`${hostUrl}/api/get-wrong-answers?${params}`,
				{
					headers: {
						'Authorization': `Bearer ${TOKEN}`,
					},
				}
			);

			if (!response.ok) {
				if (response.status === 400) {
					throw new Error('Invalid parameters provided');
				}
				throw new Error('Failed to fetch wrong answers');
			}

			const data = await response.json();
			return data as string[];
		},
		enabled: enabled && Boolean(word) && Boolean(questionType) && Boolean(correctAnswer),
	});
};