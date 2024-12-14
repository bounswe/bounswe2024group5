import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import HostContext from "../../../HostContext";
import type { Question } from "../../../types/question";



type AnswerSuggestions = {
	correctAnswerSuggestions: string[];
	wrongAnswerSuggestions: string[];
}

type UseAnswerSuggestionsParams = {
	word: string;
	questionType: Question['questionType']
	enabled?: boolean;
}

export const useAnswerSuggestions = ({ word, questionType, enabled = true }: UseAnswerSuggestionsParams) => {
	const hostUrl = useContext(HostContext);

	return useQuery({
		queryKey: ['answer-suggestions', word, questionType],
		queryFn: async () => {
			const TOKEN = localStorage.getItem('token');
			const params = new URLSearchParams({
				word,
				questionType,
			});

			const response = await fetch(
				`${hostUrl}/api/answer-suggestion?${params}`,
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
				throw new Error('Failed to fetch answer suggestions');
			}

			const data = await response.json();
			return data as AnswerSuggestions;
		},
		enabled: enabled && Boolean(word) && Boolean(questionType),
	});
};