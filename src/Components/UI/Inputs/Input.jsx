export default function Input({ id, type, placeholder, inputText, value, onChange, name }) {
    return (
        <label htmlFor={id} className="w-full">
            <span className="text-[black] block text-[13px] cursor-pointer">
                {inputText}
            </span>
            <input
                className="py-[5px] w-full px-[10px] rounded-[5px] outline-MainColor border-[2px] border-black text-[black] bg-[white]"
                placeholder={placeholder}
                type={type}
                id={id}
                value={value}
                name={name}
                onChange={onChange} />
        </label>
    )
}