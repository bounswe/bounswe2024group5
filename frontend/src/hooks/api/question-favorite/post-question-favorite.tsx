import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import HostContext from "../../../HostContext";
import { Question } from "../../../types/question";

export type QuestionFavoriteResponse = {
    id: number,
    question: Question,
    createdAt: string,
    updatedAt: string,
}

export const usePostQuestionFavorite = () => {
    const queryClient = useQueryClient();
    const hostUrl = useContext(HostContext)

    return useMutation({
        mutationFn: async ( questionId: number | undefined ) => {
            if (!questionId) return;
            const TOKEN = sessionStorage.getItem('token');
            const response = await fetch(`${hostUrl}/api/favorite-question`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ questionId }),
            });

            if (!response.ok) {
                throw new Error('Failed to favorite question');
            }

            return response.json();
        },
        onSuccess: (newFavorite) => {
            queryClient.invalidateQueries({ queryKey: ['question-favorites']});
            queryClient.setQueryData<QuestionFavoriteResponse[]>(['question-favorites'], (old) => [...(old || []), newFavorite])
        }
    })
}