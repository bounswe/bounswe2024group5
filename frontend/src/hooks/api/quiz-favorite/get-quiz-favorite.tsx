import { useContext } from "react";
import HostContext from "../../../HostContext";
import { useQuery } from "@tanstack/react-query";
import { Quiz } from "../../../types/question";

export type QuizFavoriteResponse = {
    id: number,
    quiz: Quiz,
    createdAt: string,
    updatedAt: string,
}

export const useFetchQuizFavorites = () => {
    const TOKEN = sessionStorage.getItem('token');
    const hostUrl = useContext(HostContext);

    return useQuery({
        queryKey: ['quiz-favorites'],
        queryFn: async () => {
            const response = await fetch(`${hostUrl}/api/favorite-quiz`, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch quiz favorites.');
            }

            const body = await response.json();
            console.log("Favorite quizzes: ", body);
            return body as QuizFavoriteResponse[];
        }
    });
}