function InputBox({placeholder, onChange}) {
    const inputType = (placeholder.toLowerCase() === 'password') || (placeholder.toLowerCase() === 'confirm password') ? 'password' : 'text';
    return (
        <>
            <input type={inputType} placeholder={placeholder} onChange={onChange} className="
            p-3 rounded-lg bg-[#0D2847] text-white font-sans font-medium 
            tracking-tight border-[1.5px] border-solid border-transparent outline-none 
            focus:border-[#003362] placeholder:text-[#AAA] placeholder:font-sans
            placeholder:tracking-[-0.02em] transition-all"></input>
        </>
    );
}

export default InputBox;