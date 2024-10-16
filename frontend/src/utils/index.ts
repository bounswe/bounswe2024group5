import { Question } from "../types/question";

export const questionTemplate = ({ word, type }: { word: Question['word'], type: Question['type'] }) => {
	if (type === "en-tr") {
		return `How do you say ${word} in Turkish?`;
	} else if (type === "tr-en") {
		return `How do you say ${word} in English?`;
	} else {
		return `What is the meaning of ${word}?`;
	}
}