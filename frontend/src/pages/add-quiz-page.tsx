import { div } from "framer-motion/client";
import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";

type Question = {
    id: number,
    word: string,
    options: string[],
    type: string
}

type Quiz = {
    name: string,
    description: string,
    questions: Question[]
}

const QuestionSentence: React.FC<{ type: string, word: string }> = ({ type, word }) => {
    const divClasses = "text-left py-2";
    const spanClasses = "font-medium";
    if (type === "1") return <><div className={divClasses}>How do you say <span className={spanClasses}>{word}</span> in English?</div></>
    else if (type === "2") return <><div className={divClasses}>How do you say <span className={spanClasses}>{word}</span> in Turkish?</div></>
    else if (type === "3") return <><div className={divClasses}>What is the meaning of <span className={spanClasses}>{word}</span>?</div></>
    else return <><div className={divClasses}></div></>
}

const QuestionView: React.FC<{ question: Question, quiz: Quiz, setQuiz: Dispatch<SetStateAction<Quiz>> }> = ({ question, quiz, setQuiz }) => {

    const optionNames = ["A) ", "B) ", "C) ", "D) "];

    const setWord = (newWord: string) => {
        const newQuestions = quiz.questions.map(q => {
            return q.id === question.id ? {...q, word: newWord} : q;
        })
        setQuiz({...quiz, questions: newQuestions})
    }

    const setOption = (optionIndex: number, newOption: string) => {
        const newOptions = [...question.options];
        newOptions[optionIndex] = newOption;
        const newQuestions = quiz.questions.map(q => {
            return q.id === question.id ? {...q, options: newOptions} : q;
        })
        setQuiz({...quiz, questions: newQuestions})
    }

    const setType = (newType: string) => {
        const newQuestions = quiz.questions.map(q => {
            return q.id === question.id ? {...q, type: newType} : q;
        })
        setQuiz({...quiz, questions: newQuestions})
    }

    return (
        <>
            <div className="w-[600px] rounded-lg overflow-hidden border border-1 border-slate-300">
                <div className="flex bg-slate-300 justify-between px-4 py-2">
                    <div className="bg-transparent">
                        <input placeholder="Enter Word" className="bg-transparent outline-none border-b border-b-black w-[300px]" type="text" value={question.word} onChange={(e) => {setWord(e.target.value)}}/>
                    </div>
                    <div className="bg-transparent">
                        <select onChange={(e) => {setType(e.target.value)}} name="question-type" id={"question-type" + question.id.toString()} className="outline-none bg-transparent appearance-none border border-slate-500 px-8">
                            <option value="1">{"Eng -> Tr"}</option>
                            <option value="2">{"Tr -> Eng"}</option>
                            <option value="3">{"Meaning"}</option>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
                        </select>
                    </div>
                </div>
                <div className="px-4 pb-4">
                    <QuestionSentence type={question.type} word={question.word}></QuestionSentence>
                    <div className="text-left flex flex-col gap-1">
                        { optionNames.map((optionName, index) => {return (
                            <div>
                                <span>{optionName}</span>
                                <input onChange={(e) => {setOption(index, e.target.value)}} className="outline-none w-[300px] border-b border-black" type="text" value={question.options[index]}/>
                            </div>
                            ) })}
                    </div>
                </div>
            </div>
        </>
    );
}

export const AddQuizPage = () => {

    const exampleQuestion = {
        id: 1,
        word: "Fast",
        options: ["Hızlı", "Normal", "Tatlı", "Yoğun"],
        type: "1"
    }

    function addEmptyQuestion() {
        const newQuestions = [...quiz.questions]
        newQuestions.push({
            id: Math.floor(Math.random() * 10000),
            word: "",
            options: ["", "", "", ""],
            type: "1"
        })
        setQuiz({...quiz, questions: newQuestions})
    }

    const [quiz, setQuiz] = useState<Quiz>({
        name: "",
        description: "",
        questions: [exampleQuestion]
    })

    return (
      <div className="px-8">
        <div className="flex pb-4">
            <div className="w-[140px] h-[140px] bg-slate-300 flex items-center justify-center text-[#777] cursor-pointer">+ Photo</div>
            <div className="flex flex-col px-4 flex-grow h-[140px]">
                <div className="flex items-start mb-2">
                    <input onChange={e => {setQuiz({...quiz, name: e.target.value})}} type="text" placeholder="Quiz Name" className="w-[444px] text-2xl font-medium text-black placeholder:text-[#777] outline-none bg-slate-300 px-2 py-2 rounded-sm"/>
                </div>
                <div className="flex-grow flex items-start">
                    <textarea onChange={e => {setQuiz({...quiz, description: e.target.value})}} placeholder="Quiz Description" className="outline-none bg-slate-300 resize-none p-2 placeholder:text-[#777] h-full w-full rounded-sm"></textarea>
                </div>
            </div>
        </div>
        <div>
            <div className="text-left text-2xl border-b-2 border-b-black mb-4">Questions</div>
            <div className="flex flex-col gap-4">
                {quiz.questions.map(question => {return <QuestionView question={question} quiz={quiz} setQuiz={setQuiz}></QuestionView>})}
            </div>
        </div>
        <div className="flex gap-4">
            <button onClick={addEmptyQuestion} className="bg-slate-300 px-4 py-2 rounded-sm mt-4 mb-6">Add Question</button>
            <button onClick={() => {alert("Quiz submitted.")}} className="bg-slate-300 px-4 py-2 rounded-sm mt-4 mb-6">Submit Quiz</button>
        </div>
        {false && <Link to="/">Submit Quiz</Link>}
      </div>
    );
  };
  