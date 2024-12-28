import { useDeleteQuizFavorite } from "./delete-quiz-favorite";
import { useFetchQuizFavorites } from "./get-quiz-favorite";
import { usePostQuizFavorite } from "./post-quiz-favorite";

export const useQuizFavorite = () => {
    const { data: favoriteQuizzes } = useFetchQuizFavorites();
    const { mutateAsync: postQuizFavorite } = usePostQuizFavorite();
    const { mutateAsync: deleteQuizFavorite } = useDeleteQuizFavorite();
    
    const isQuizFavorite = (quizId: number | undefined) => {
        return favoriteQuizzes?.filter(favoriteQuizzes => favoriteQuizzes?.quizId === quizId).length == 1;
    }
    
    const handleLikeClick = (quizId: number | undefined) => {
        if (!quizId) return;
        if (!isQuizFavorite(quizId)) {
        postQuizFavorite(quizId);
        } else {
        deleteQuizFavorite(quizId);
        }
    };
    
    return { isQuizFavorite, handleLikeClick };
}