import { useEffect, useState } from "react";
import Input from "../../UI/Inputs/Input";
import BigModal from "../../UI/Modals/BigModal";
import Swal from 'sweetalert2';
import TextArea from "../../UI/TextArea/TextArea";
import axios from "axios";

export default function PersonEdit({ isOpen, onClose, refresh, ID }) {
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

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/person/admin/find/${ID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
            if (response.data.success && response.data.object) {
                const fetchedData = response.data.object;
    
                setFormData({
                    obligationRU: fetchedData.obligationRU || "",
                    receptionDateTimes: fetchedData.receptionDateTimes || "",
                    biographyLatin: fetchedData.biographyLatin || "",
                    activityKIRIL: fetchedData.activityKIRIL || "",
                    activityRU: fetchedData.activityRU || "",
                    fullName: fetchedData.fullName || "",
                    biographyRU: fetchedData.biographyRU || "",
                    activityLATIN: fetchedData.activityLATIN || "",
                    phoneNumber: fetchedData.phoneNumber || "",
                    obligationKIRIL: fetchedData.obligationKIRIL || "",
                    partyName: fetchedData.partyName || "",
                    position: fetchedData.position || "",
                    category: fetchedData.category || "",
                    obligationLATIN: fetchedData.obligationLATIN || "",
                    biographyKIRIL: fetchedData.biographyKIRIL || "",
                    order: fetchedData.order || 0,
                    file: null, // Файл нужно загружать отдельно
                });
            }
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        }
    };
    


    useEffect(() => {
        if (isOpen) {
            fetchData()
        }
    }, [isOpen])

    const handleSubmit = async () => {
        setLoading(true)
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        });


        try {
            await axios.put(`/api/person/update/${ID}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
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
            refresh();
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
            onClose();
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
            setLoading(false);
        }
    };

    return (
        <BigModal isOpen={isOpen} onClose={onClose}>
            <div className="p-[20px] overflow-y-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-[25px] font-bold">Rahbariyat o'zgartirish</h1>
                    <button onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14">
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="mt-[10px]">
                    <div className="flex items-center justify-between gap-[10px] w-full">
                        <Input
                            name='fullName'
                            value={formData.fullName}
                            onChange={handleChange}
                            inputText={"F.I.O"} placeholder={"...."} />
                        <Input
                            name='phoneNumber'
                            type={'number'}
                            value={formData?.phoneNumber}
                            onChange={handleChange}
                            inputText={"Telefon raqam"} placeholder={"...."} />
                    </div>
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-full">
                        <Input
                            name='partyName'
                            value={formData?.partyName}
                            onChange={handleChange}
                            inputText={"Partiya nomi"} placeholder={"...."} />
                        <Input
                            name='position'
                            value={formData?.position}
                            onChange={handleChange}
                            inputText={"Pozitsiya"} placeholder={"...."} />
                    </div>
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-full">
                        <Input
                            name='obligationRU'
                            value={formData?.obligationRU}
                            onChange={handleChange}
                            inputText={"Majburiyat (Ru)"} placeholder={"...."} />
                        <Input
                            name='obligationKIRIL'
                            value={formData?.obligationKIRIL}
                            onChange={handleChange}
                            inputText={"Majburiyat (Kiril)"} placeholder={"...."} />
                    </div>
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-full">
                        <Input
                            name='obligationLATIN'
                            value={formData?.obligationLATIN}
                            onChange={handleChange}
                            inputText={"Majburiyat (Lotin)"} placeholder={"...."} />
                        <Input
                            name='activityRU'
                            value={formData?.activityRU}
                            onChange={handleChange}
                            inputText={"Faoliyat  (Russ)"} placeholder={"...."} />
                    </div>
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-full">
                        <Input
                            name='activityKIRIL'
                            value={formData?.activityKIRIL}
                            onChange={handleChange}
                            inputText={"Faoliyat (Kiril)"} placeholder={"...."} />
                        <Input
                            name='activityLATIN'
                            value={formData?.activityLATIN}
                            onChange={handleChange}
                            inputText={"Faoliyat  (Lotin)"} placeholder={"...."} />
                    </div>
                    <div className="flex items-end justify-between gap-[10px] mt-[10px] w-full">
                        <label className="w-full">
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
                    <div className="mt-[10px]">
                        <Input
                            name='receptionDateTimes'
                            type={'text'}
                            value={formData?.receptionDateTimes}
                            onChange={handleChange}
                            inputText={"Qabul kunlari"} placeholder={"...."} />
                    </div>
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-full">
                        <TextArea
                            name={"biographyRU"}
                            value={formData.biographyRU}
                            onChange={handleChange}
                            inputText={"Malumot (Russ)"} placeholder={"...."} />
                        <TextArea
                            name={"biographyLatin"}
                            value={formData?.biographyLatin}
                            onChange={handleChange}
                            inputText={"Malumot (Lotin)"} placeholder={"...."} />
                    </div>
                    <div className="flex items-start justify-between gap-[10px] mt-[10px] w-[100%]">
                        <TextArea
                            name={"biographyKIRIL"}
                            value={formData?.biographyKIRIL}
                            onChange={handleChange}
                            inputText={"Malumot (Kiril)"} placeholder={"...."} />
                        <div className="w-full">
                            <Input
                                name='order'
                                type={'number'}
                                value={formData?.order}
                                onChange={handleChange}
                                inputText={"Buyurtma"} placeholder={"...."} />

                        </div>
                    </div>
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className={`w-full px-4 py-2 rounded-lg shadow-lg border-2 duration-500 ${loading ? 'bg-gray-400 border-gray-400 text-white cursor-not-allowed' : 'bg-MainColor border-MainColor text-white hover:text-MainColor hover:bg-transparent'}`}>
                        {loading ? 'Yaratilmoqda...' : 'o`zgartirish'}
                    </button>
                </div>
            </div>
        </BigModal>
    );
}
