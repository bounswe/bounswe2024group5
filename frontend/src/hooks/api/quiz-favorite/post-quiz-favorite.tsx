import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import HostContext from "../../../HostContext";
import { QuizFavoriteResponse } from "./get-quiz-favorite";

export const usePostQuizFavorite = () => {
    const queryClient = useQueryClient();
    const hostUrl = useContext(HostContext)

    return useMutation({
        mutationFn: async ( quizId: number | undefined ) => {
            if (!quizId) return;
            const TOKEN = localStorage.getItem('token');
            const response = await fetch(`${hostUrl}/api/favorite-quiz`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quizId }),
            });

            if (!response.ok) {
                throw new Error('Failed to favorite quiz.');
            }

            return response.json();
        },
        onSuccess: (newFavorite) => {
            queryClient.invalidateQueries({ queryKey: ['quiz-favorites']});
            queryClient.setQueryData<QuizFavoriteResponse[]>(['quiz-favorites'], (old) => [...(old || []), newFavorite])
        }
    })
}