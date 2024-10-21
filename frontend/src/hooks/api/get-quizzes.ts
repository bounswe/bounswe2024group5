import { useQuery } from '@tanstack/react-query'
import { Quiz } from '../../types/question'

export const useFetchQuizzes = () => {
	const TOKEN = sessionStorage.getItem('token')
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