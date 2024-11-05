import { useState } from "react";
import { IconX } from "@tabler/icons-react";

const TagComponent = ({ word, removeSelf }: { word: string, removeSelf: () => void }) => {

    return (
        <>
            <div className="w-fit flex items-center gap-4 bg-violet-400 text-white pl-4 pr-1 py-1 rounded-full">
                <span>
                    {word}
                </span>
                <span onClick={removeSelf} className="bg-violet-200 rounded-full flex justify-center items-center w-fit h-fit p-1 cursor-pointer">
                    <IconX size={16}/>
                </span>
            </div>
        </>
    );
}

export const CreateaPostComponent = ({ close } : { close: () => void }) => {

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [tagInput, setTagInput] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput) {
            setTags([...tags, tagInput])
            setTagInput("");
        }
    }

    const removeTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag))
    }

    const sendPost = () => {
        if (title === "") {
            alert("Please enter a title for this post.")
            return
        }
        if (content === "") {
            alert("Please enter the content of this post.")
            return
        }
        if (tags.length === 0) {
            alert("Please enter at least one tag. This is necessary to help other users who might also be confused about this word find this post easier.")
            return
        }
        alert("Your post has been sent.")
        close()
    }

    return (
        <>
            <div className="w-full max-w-2xl bg-violet-200 p-4 flex flex-col gap-4 rounded-xl">
                <div>
                    <input type="text" placeholder="Enter title." value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-violet-100 rounded-lg p-2 outline-none border-2 border-transparent focus:border-violet-600 text-xl font-medium"/>
                </div>
                <div>
                    <textarea placeholder="Enter content." value={content} onChange={e => setContent(e.target.value)} className="w-full min-h-48 bg-violet-100 rounded-lg p-2 outline-none border-2 border-transparent focus:border-violet-600"></textarea>
                </div>
                <div>
                    <input type="text" placeholder="Which words are relevant to this post?" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleKeyDown} className="w-full bg-violet-100 rounded-lg p-2 outline-none border-2 border-transparent focus:border-violet-600"/>
                    <div className="flex flex-wrap gap-1 py-3">
                        {tags.map(tag => <TagComponent word={tag} removeSelf={() => {removeTag(tag)}}/>)}
                    </div>
                </div>
                <div className="flex justify-between">
                    <button onClick={close} className="bg-violet-600 text-white p-2 px-8 rounded-lg">Discard</button>
                    <button onClick={sendPost} className="bg-violet-600 text-white p-2 px-8 rounded-lg">Send Post</button>
                </div>
            </div>
        </>
    );
}