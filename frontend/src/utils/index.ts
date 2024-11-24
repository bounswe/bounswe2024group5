import { Question } from "../types/question";

export const questionTemplate = ({ word, type }: { word: Question['word'], type: Question['questionType'] }) => {
	if (type === "english_to_turkish") {
		return `How do you say ${word} in Turkish?`;
	} else if (type === "turkish_to_english") {
		return `How do you say ${word} in English?`;
	} else {
		return `What is the meaning of ${word}?`;
	}
}

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

export const timePassed = (timeString: string) => {
	return dayjs(timeString).fromNow()
}