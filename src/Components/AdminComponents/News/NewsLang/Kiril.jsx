import Input from "../../../UI/Inputs/Input";
import TextArea from "../../../UI/TextArea/TextArea";
import RichBox from "../../../UI/TextEditor/RichBox";


export default function Kiril({ value, onChange, FileArr }) {
    return (
        <div className="bg-white mt-[10px] p-[10px] shadow-lg rounded-[10px]">
            <Input
                inputText="Sarlavha"
                placeholder="..."
                value={value.name}
                onChange={(e) => onChange({ ...value, name: e.target.value })}
            />
            <div className="mt-[20px]">
                <TextArea
                    value={value.info}
                    onChange={(e) => onChange({ ...value, info: e.target.value })}
                    inputText={"Malumot"} placeholder={"...."} />
            </div>
            <div className="mt-[20px]">
                <RichBox
                    FileArr={FileArr}
                    value={value.context}  // Привязываем значение
                    onChange={(newValue) => onChange({ ...value, context: newValue })} // Обновляем состояние
                />
            </div>
        </div>
    );
}
