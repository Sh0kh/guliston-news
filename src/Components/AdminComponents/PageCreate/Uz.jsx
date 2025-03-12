import Input from "../../UI/Inputs/Input";
import RichBox from "../../UI/TextEditor/RichBox";

export default function Uz({ value, onChange, FileArr }) {
    return (
        <div className="bg-white mt-[10px] p-[10px] shadow-lg rounded-[10px]">
            <Input
                inputText="Sarlavha"
                placeholder="..."
                value={value.name}  // Привязываем значение
                onChange={(e) => onChange({ ...value, name: e.target.value })} // Обновляем состояние
            />
            <div className="mt-[20px]">
                <RichBox
                    FileArr={FileArr}
                    value={value.context}
                    onChange={(newValue) => onChange({ ...value, context: newValue })} // Обновляем состояние
                />
            </div>
        </div>
    );
}
