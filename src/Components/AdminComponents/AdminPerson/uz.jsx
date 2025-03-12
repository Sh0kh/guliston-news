import TextArea from "../../UI/TextArea/TextArea";


export default function Uz({ value, onChange }) {
    return (
        <div className="bg-white mt-[10px] p-[10px] shadow-lg rounded-[10px]">

            <div className="mt-[20px]">
                <TextArea
                    name="obligationLATIN"
                    value={value?.obligationLATIN}
                    onChange={(e) => onChange({ ...value, obligationLATIN: e.target.value })}
                    inputText={"Majburiyat"}
                    placeholder={"...."}
                />

            </div>
            <div className="mt-[20px]">
                <TextArea
                    name='activityLATIN'
                    value={value?.activityLATIN}
                    onChange={(e) => onChange({ ...value, activityLATIN: e.target.value })}
                    inputText={"Faoliyat"} placeholder={"...."} />
            </div>
            <div className="mt-[20px]">
                <TextArea
                    name='biographyLatin'
                    value={value?.biographyLatin}
                    onChange={(e) => onChange({ ...value, biographyLatin: e.target.value })}
                    inputText={"Malumot"} placeholder={"...."} />
            </div>
        </div>
    );
}
