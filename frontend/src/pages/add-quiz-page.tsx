import { useState } from "react";
import { Question } from "../types/question";
import { div } from "framer-motion/client";
import { Link } from "react-router-dom";

function QuestionView({question, options, id, answer}: Question) {
    return (
        <>
        <div className="pb-4">
            <h3 className="text-left">{question}</h3>
            {options.map(option => <div className="text-left">{option}</div>)}
        </div>
        </>
    );
}

export const AddQuizPage = () => {

    const exampleQuestion = {
        id: 1,
        question: "1. How do you say Fast in Turkish?",
        options: ["A) Hızlı", "B) Tatlı", "C) Normal", "D) Yoğun"],
        answer: "Tatlı"
    };

    const [dialogOpen, setDialogOpen] = useState<Boolean>(false);
    const [searchString, setSearchString] = useState<string>("");
    const [word, setWord] = useState<string | undefined>(undefined);
    const [questions, setQuestions] = useState<Question[]>([exampleQuestion]);

    const openDialog = () => {
        setDialogOpen(true);
    }

    const closeDialog = () => {
        setDialogOpen(false);
    }

    return (
      <div className="px-8">
        <div className="flex pb-4">
            <div className="w-[140px] h-[140px] bg-slate-300 flex items-center justify-center text-[#777] cursor-pointer">+ Photo</div>
            <div className="flex flex-col px-4 w-full">
                <div className="flex items-start mb-2">
                    <input type="text" placeholder="Quiz Name" className="w-[400px] text-2xl font-medium text-black placeholder:text-[#777] outline-none border-b-2 border-b-black"/>
                </div>
                <textarea placeholder="Quiz Description" className="outline-none bg-slate-300 resize-none p-2 placeholder:text-[#777] h-[96px]"></textarea>
            </div>
        </div>
        <div>
            <div className="text-left text-2xl border-b-2 border-b-black mb-2">Questions</div>
            <button onClick={openDialog} className="bg-slate-300 px-2 py-1 rounded-sm">Add Question</button>
            {questions.map(q => {return <QuestionView question={q.question} options={q.options} id={q.id} answer={q.answer}></QuestionView>})}
        </div>
        <Link to="/">Submit Quiz</Link>
        {
            dialogOpen &&
        <div onClick={closeDialog} className="w-screen h-screen bg-[#fff1] backdrop-blur-sm absolute top-0 left-0 flex items-center justify-center">
            <div onClick={ (e) => {e.stopPropagation()}} className="bg-white w-[800px] h-[600px] rounded-2xl shadow-md border border-[#aaa] py-4">
                <div className="flex items-center justify-center gap-4 pb-4">
                    <label htmlFor="question-type">Choose Question Type: </label>
                    <select name="question-type">
                        <option value="1">{"Eng -> Tr"}</option>
                        <option value="1">{"Tr -> Eng"}</option>
                        <option value="1">{"Meaning"}</option>
                    </select>
                </div>
                <div className="flex flex-col items-center relative pb-4">
                    <input type="text" value={searchString} onChange={e => {setSearchString(e.target.value)}} placeholder="Search Word" className="w-[400px] border-b border-b-black outline-none px-2 py-1"/>
                    { searchString &&
                    <div className="w-[400px] h-fit border border-black absolute top-8 pl-2">
                        <div onClick={() => {setWord(searchString);setSearchString("");}} className="text-left py-1 border-b border-b-[#777] cursor-pointer">
                            <span>Fast - </span><span className="text-[#777]"> Meaning of Fast</span>
                        </div>
                        <div onClick={() => {setWord(searchString);setSearchString("")}} className="text-left py-1 border-b border-b-[#777] cursor-pointer">
                            <span>Fast - </span><span className="text-[#777]"> Meaning of Fast</span>
                        </div>
                        <div onClick={() => {setWord(searchString);setSearchString("")}} className="text-left py-1 border-b border-b-[#777] cursor-pointer">
                            <span>Fast - </span><span className="text-[#777]"> Meaning of Fast</span>
                        </div>
                        <div onClick={() => {setWord(searchString);setSearchString("")}} className="text-left py-1 border-b border-b-[#777] cursor-pointer">
                            <span>Fast - </span><span className="text-[#777]"> Meaning of Fast</span>
                        </div>
                    </div>
                    }
                </div>
                { word && 
                <div className="w-full flex justify-center">
                    <div className="w-[400px] flex flex-col items-start">
                        <p className="text-left text-xl pb-2">Question Preview</p>
                        <p className="text-left font-medium">How do you say Fast in Turkish?</p>
                        <p className="text-left">{"A) Hızlı"}</p>
                        <p className="text-left">{"B) Normal"}</p>
                        <p className="text-left">{"C) Tatlı"}</p>
                        <p className="text-left">{"D) Yoğun"}</p>
                        <button onClick={() => {setWord("");setSearchString("");closeDialog();setQuestions([...questions, exampleQuestion])}}>Submit Question</button>
                    </div>
                </div>
                }
            </div>
        </div>
        }
      </div>
    );
  };
  