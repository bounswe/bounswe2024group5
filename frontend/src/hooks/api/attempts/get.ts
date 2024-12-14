import { useQuery } from "@tanstack/react-query";
import HostContext from "../../../HostContext";
import { useContext } from "react";
import type { QuizAttempt } from "./list";

export const useGetQuizAttempt = (id: number) => {
	const hostUrl = useContext(HostContext);

	return useQuery({
		queryKey: ['quiz-attempt', id],
		queryFn: async () => {
			const TOKEN = localStorage.getItem('token');

			const response = await fetch(
				`${hostUrl}/api/quiz-attempts/${id}`,
				{
					headers: {
						'Authorization': `Bearer ${TOKEN}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error('Failed to fetch quiz attempt');
			}

			const data = await response.json();
			return data as QuizAttempt;
		},
		enabled: !!id || id !== -1, // Only run the query if we have an ID
	});
};