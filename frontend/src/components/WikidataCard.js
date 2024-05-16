const WikidataCard = ({ wikidata }) => {
    console.log("here", wikidata)
    return (
        <>
            <div className="bg-[#090d14] hover:bg-[#05070b] transition-colors duration-300 p-4 text-slate-200 w-[48%] flex flex-col items-center rounded-xl">
                <p className="pb-4"><span className="font-semibold text-slate-50 capitalize">{wikidata.label}: </span> {wikidata.description.charAt(0).toUpperCase() + wikidata.description.slice(1)}.</p>
                <a href={wikidata.url} target="_blank" rel="noopener noreferrer" className="hover:cursor-pointer bg-[#0D2847] hover:bg-[#0f2e51] transition-colors duration-300 px-3 py-1 rounded-lg">Read More</a>
            </div>
        </>
    );
}

export default WikidataCard;