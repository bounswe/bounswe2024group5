import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import HostContext from "../../../HostContext";
import { QuestionFavoriteResponse } from "./post-question-favorite";

export const useDeleteQuestionFavorite = () => {
    const queryClient = useQueryClient();
    const hostUrl = useContext(HostContext);

    return useMutation({
        mutationFn: async (questionId: number | undefined) => {
            if (!questionId) {
                return -1;
            }

            const TOKEN = localStorage.getItem('token');
            const response = await fetch(`${hostUrl}/api/favorite-question/${questionId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete favorite question.');
            }

            return questionId;
        },
        onSuccess: (questionId: number) => {
            queryClient.invalidateQueries({ queryKey: ['question-favorites'] });
            queryClient.setQueryData<QuestionFavoriteResponse[]>(['question-favorites'], (old) => old?.filter(questionFavorite => questionFavorite.questionId !== questionId));
        }
    });
}