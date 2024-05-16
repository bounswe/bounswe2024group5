function ResultPreview({ result }) {
    return (
        <div className="flex items-center px-4 py-2 border-b border-gray-200 last:border-b-0">
            <img
                src={result.imageURL}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-4" // Round image styling
            />
            <span>{result.name}</span>
        </div>
    );
}

export default ResultPreview;