import { useQuery } from '@tanstack/react-query'
import { Quiz } from '../../types/question'

export const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuZXd1c2VyIiwiaWF0IjoxNzI5NTI1NjY2LCJleHAiOjE3Mjk2MTIwNjZ9.gMGU3HrdYE7oQ6jukRBRBbir1JPZwk6NH374AMjeSog"
export const useFetchQuizzes = () => {
	const context = useQuery({
		queryKey: ['quizzes'],
		queryFn: async () => {
			console.log("FETCHING QUIZZES")
			const body = await fetch('http://localhost:80/api/quizzes', {
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'application/json'
				}
			});
			const data = (await body.json()) as { quizzes: Quiz[] }


			data.quizzes.forEach((quiz) => {
				quiz.questions.forEach((question) => {
					question.options = question.wrongAnswers.concat(
						question.correctAnswer
					).sort(() => Math.random() - 0.5);
				})
			})

			return data.quizzes


		}
	})

	return context
}