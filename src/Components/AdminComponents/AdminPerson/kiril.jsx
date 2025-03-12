import TextArea from "../../UI/TextArea/TextArea";


export default function Uz({ value, onChange }) {
    return (
        <div className="bg-white mt-[10px] p-[10px] shadow-lg rounded-[10px]">

            <div className="mt-[20px]">
                <TextArea
                    name="obligationKIRIL"
                    value={value?.obligationKIRIL}
                    onChange={(e) => onChange({ ...value, obligationKIRIL: e.target.value })}
                    inputText={"Majburiyat"}
                    placeholder={"...."}
                />

            </div>
            <div className="mt-[20px]">
                <TextArea
                    name='activityKIRIL'
                    value={value?.activityKIRIL}
                    onChange={(e) => onChange({ ...value, activityKIRIL: e.target.value })}
                    inputText={"Faoliyat"} placeholder={"...."} />
            </div>
            <div className="mt-[20px]">
                <TextArea
                    name='biographyKIRIL'
                    value={value?.biographyKIRIL}
                    onChange={(e) => onChange({ ...value, biographyKIRIL: e.target.value })}
                    inputText={"Malumot"} placeholder={"...."} />
            </div>
        </div>
    );
}
