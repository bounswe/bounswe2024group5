import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import HostContext from "../../../HostContext";
import type { QuestionAnswer } from "./list"; // Reusing the type from your existing file

export const useGetQuestionAnswer = (id: number) => {
	const hostUrl = useContext(HostContext);

	return useQuery({
		queryKey: ['question-answer', id],
		queryFn: async () => {
			const TOKEN = localStorage.getItem('token');

			const response = await fetch(
				`${hostUrl}/api/question-answers/${id}`,
				{
					headers: {
						'Authorization': `Bearer ${TOKEN}`,
					},
				}
			);

			if (response.status === 404) {
				throw new Error('Question answer not found');
			}

			if (response.status === 403) {
				throw new Error('You are not authorized to access this answer');
			}

			if (!response.ok) {
				throw new Error('Failed to fetch question answer');
			}

			const data = await response.json();
			return data as QuestionAnswer;
		},
		retry: false, // Don't retry on 403/404 errors
	});
};