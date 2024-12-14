import { useContext } from "react";
import HostContext from "../../../HostContext";
import { useQuery } from "@tanstack/react-query";
import { QuestionFavoriteResponse } from "./post-question-favorite";

export const useFetchQuestionFavorites = () => {
    const TOKEN = sessionStorage.getItem('token');
    const hostUrl = useContext(HostContext);

    return useQuery({
        queryKey: ['question-favorites'],
        queryFn: async () => {
            const response = await fetch(`${hostUrl}/api/favorite-question`, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch question favorites.');
            }

            const body = await response.json();
            console.log("favorites", body);
            return body as QuestionFavoriteResponse[];
        }
    });
}