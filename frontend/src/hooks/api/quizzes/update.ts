import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import HostContext from "../../../HostContext";
import { Quiz } from "../../../types/question";

export const useUpdateQuiz = () => {
    
    const TOKEN = localStorage.getItem("token");
    const hostUrl = useContext(HostContext);

    return useMutation({
        mutationFn: async (quiz: Quiz) => {
            

            if (!TOKEN) {
                throw new Error("No authentication token found");
            }

            const response = await fetch(`${hostUrl}/api/quizzes/${quiz.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: quiz.title,
                    description: quiz.description,
                    image: quiz.image,
                }),
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("Quiz not found");
                }
                if (response.status === 401) {
                    throw new Error("Unauthorized access");
                }
                throw new Error("Failed to update quiz");
            }
        }
    });
};