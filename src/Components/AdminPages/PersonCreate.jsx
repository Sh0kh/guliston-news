import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Uz from "../AdminComponents/AdminPerson/uz"
import Ru from "../AdminComponents/AdminPerson/ru"
import Oz from "../AdminComponents/AdminPerson/kiril"
import Swal from 'sweetalert2';
import Input from "../UI/Inputs/Input"


export default function PersonCreate() {
    const navigate = useNavigate()
    const [lang, setLang] = useState('Uzb')
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        obligationRU: "",
        receptionDateTimes: "",
        biographyLatin: "",
        activityKIRIL: "",
        activityRU: "",
        fullName: "",
        biographyRU: "",
        activityLATIN: "",
        phoneNumber: "",
        obligationKIRIL: "",
        partyName: "",
        position: "",
        category: "",
        obligationLATIN: "",
        biographyKIRIL: "",
        order: 0,
        file: null,
    });




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    };



    const create = async () => {
        setLoading(true)
        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                if (formData[key]) {
                    data.append(key, formData[key]);
                }
            });

            await axios.post(`/api/person/create`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "multipart/form-data", // Важно для загрузки файлов
                },
            })
            setFormData({
                obligationRU: "",
                receptionDateTimes: "",
                biographyLatin: "",
                activityKIRIL: "",
                activityRU: "",
                fullName: "",
                biographyRU: "",
                activityLATIN: "",
                phoneNumber: "",
                obligationKIRIL: "",
                partyName: "",
                position: "",
                category: "",
                obligationLATIN: "",
                biographyKIRIL: "",
                order: 0,
                file: null,
            });

            Swal.fire({
                title: 'Muvaffaqiyatli!',
                icon: 'success',
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Error.',
                icon: 'error',
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className=" mt-[80px] pb-[50px] ">
            <div className="Admin__header__wrapper flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Yaratish
                </h1>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-MainColor text-white px-4 py-2 rounded-lg shadow-lg border-2 border-MainColor duration-500 hover:text-MainColor hover:bg-transparent">
                    Ortga
                </button>
            </div>
            <div className="bg-white mt-[1  0px] p-[10px] shadow-lg rounded-[10px]">
                <div className="flex items-center gap-[10px]">
                    {["Uzb", "Russ", "Kiril"]?.map((i, index) => (
                        <button
                            onClick={() => setLang(i)}
                            className={`py-[5px] px-[8px] duration-500 border-[2px] border-MainColor shadow-xl rounded-[10px] ${lang === i ? "bg-transparent text-MainColor" : 'bg-MainColor text-[white]'}  `}
                            key={index}>
                            {i}
                        </button>
                    ))}
                </div>
            </div>
            <div className="bg-white mt-[10px] p-[10px] shadow-lg rounded-[10px]">
                <div className="mb-[10px]">
                    <Input
                        name='fullName'
                        value={formData.fullName}
                        onChange={handleChange}
                        inputText={"F.I.O"} placeholder={"...."} />
                </div>
                <div className="mb-[10px]">
                    <Input
                        name='phoneNumber'
                        type={'number'}
                        value={formData?.phoneNumber}
                        onChange={handleChange}
                        inputText={"Telefon raqam"} placeholder={"...."} />
                </div>
                <div className="mb-[10px]">
                    <Input
                        name='partyName'
                        value={formData?.partyName}
                        onChange={handleChange}
                        inputText={"Partiya nomi"} placeholder={"...."} />
                </div>
                <div className="mb-[10px]">
                    <Input
                        name='position'
                        value={formData?.position}
                        onChange={handleChange}
                        inputText={"Pozitsiya"} placeholder={"...."} />
                </div>
                <div className="mb-[10px]">
                    <Input
                        name='receptionDateTimes'
                        type={'text'}
                        value={formData?.receptionDateTimes}
                        onChange={handleChange}
                        inputText={"Qabul kunlari"} placeholder={"...."} />
                </div>
                <div className="mb-[10px]">
                    <Input
                        name='order'
                        type={'number'}
                        value={formData?.order}
                        onChange={handleChange}
                        inputText={"Ketma ketlik raqami"} placeholder={"...."} />
                </div>
                <label className="w-full block mb-[10px]">
                    <span className="text-[black] block text-[13px] cursor-pointer">
                        Kategory
                    </span>
                    <select
                        name="category"
                        value={formData?.category || ""}
                        onChange={(e) => {
                            setFormData((prev) => ({ ...prev, category: e.target.value }));
                        }}
                        className="py-[5px] w-full px-[10px] rounded-[5px] outline-MainColor border-[2px] border-black text-[black] bg-[white]"
                    >
                        <option value="" disabled>...</option>
                        <option value="RAHBARIYAT">Rahbariyat</option>
                        <option value="APPARAT_XODIMLARI">Apparat xodimlari</option>
                    </select>
                </label>
                <div className="w-full">
                    <input
                        type="file"
                        accept="image/*"
                        id="imageUpload"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="imageUpload"
                        className="bg-MainColor w-full text-white px-4 py-[5px] rounded-lg shadow-lg border-2 border-MainColor duration-500 hover:text-MainColor hover:bg-transparent cursor-pointer flex items-center justify-center"
                    >
                        Foto
                    </label>
                </div>
            </div>
            {lang === 'Uzb' ? <Uz value={formData} onChange={setFormData} /> : lang === 'Russ' ? <Ru value={formData} onChange={setFormData} /> : lang === 'Kiril' ? <Oz value={formData} onChange={setFormData} /> : ''}
            <div
                className="bg-white mt-[10px] p-[10px] shadow-lg rounded-[10px]">
                <button
                    onClick={!loading ? create : undefined}
                    disabled={loading}
                    className={`py-[5px] px-[8px] text-white bg-MainColor duration-500 border-[2px] border-MainColor shadow-xl rounded-[10px] w-full 
                     ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-transparent hover:text-MainColor"}
                    `}
                >
                    {loading ? "Yaratilmoqda..." : "Yaratish"}
                </button>

            </div>

        </div >
    )
}