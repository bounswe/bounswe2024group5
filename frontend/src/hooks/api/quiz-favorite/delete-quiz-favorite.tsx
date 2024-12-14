import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import HostContext from "../../../HostContext";

export const useDeleteQuizFavorite = () => {
    const queryClient = useQueryClient();
    const hostUrl = useContext(HostContext);

    return useMutation({
        mutationFn: async (quizId: number | undefined) => {
            if (!quizId) {
                return -1;
            }

            const TOKEN = localStorage.getItem('token');
            const response = await fetch(`${hostUrl}/api/favorite-quiz/${quizId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete favorite quiz.');
            }

            return quizId;
        },
        onSuccess: (quizId: number) => {
            queryClient.invalidateQueries({ queryKey: ['quiz-favorites'] });
            queryClient.setQueryData<number[]>(['quiz-favorites'], (old) => old?.filter(id => id !== quizId));
        }
    });
}