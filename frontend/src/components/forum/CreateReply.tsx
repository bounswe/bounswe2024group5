import { useState } from "react";

export const CreateReplyComponent = ({ close, send } : { close: () => void, send: (payload: {content: string}) => void }) => {

    const [content, setContent] = useState<string>("");

    return (
        <>
            <div className="w-full max-w-2xl h-fit bg-violet-200 text-left rounded-xl overflow-hidden shadow-md ">
                <div className="py-4 pb-2 px-4">
                    <textarea value={content} onChange={(e) => {setContent(e.target.value)}} placeholder="Enter your reply here." className="w-full h-16 leading-none bg-violet-100 outline-none rounded-md p-2"/>
                </div>
                <div className="px-4 pb-3 flex justify-between">
                    <button onClick={close} className="bg-violet-600 text-white p-2 px-8 rounded-lg">Discard</button>
                    <button onClick={() => {send({content: content})}} className="bg-violet-600 text-white p-2 px-8 rounded-lg">Send</button>
                </div>
            </div>
        </>
    );
}