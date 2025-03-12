import TextArea from "../../UI/TextArea/TextArea";


export default function Uz({ value, onChange }) {
    return (
        <div className="bg-white mt-[10px] p-[10px] shadow-lg rounded-[10px]">

            <div className="mt-[20px]">
                <TextArea
                    name="obligationRU"
                    value={value?.obligationRU}
                    onChange={(e) => onChange({ ...value, obligationRU: e.target.value })}
                    inputText={"Majburiyat"}
                    placeholder={"...."}
                />

            </div>
            <div className="mt-[20px]">
                <TextArea
                    name='activityRU'
                    value={value?.activityRU}
                    onChange={(e) => onChange({ ...value, activityRU: e.target.value })}
                    inputText={"Faoliyat"} placeholder={"...."} />
            </div>
            <div className="mt-[20px]">
                <TextArea
                    name='biographyRU'
                    value={value?.biographyRU}
                    onChange={(e) => onChange({ ...value, biographyRU: e.target.value })}
                    inputText={"Malumot"} placeholder={"...."} />
            </div>
        </div>
    );
}
