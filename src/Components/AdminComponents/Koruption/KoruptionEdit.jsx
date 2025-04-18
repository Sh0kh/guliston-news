import { useEffect, useState } from "react";
import Input from "../../UI/Inputs/Input";
import Swal from 'sweetalert2';
import axios from "axios";
import NormalModal from "../../UI/Modals/NormalModal";

export default function KoruptionEdit({ isOpen, onClose, refresh, ID }) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        titleKIRIL: '',
        titleUZ: '',
        titleRU: '',
        file: null,
        category: 'KORRUPSIYAGA_QARSHI_KURASHISH'
    });


    const fetchData = async () => {
        try {
            const response = await axios.get(`/file/data/get/${ID}`)
            setFormData({
                titleKIRIL: response?.data?.object?.titleKIRIL,
                titleUZ: response?.data?.object?.titleUZ,
                titleRU: response?.data?.object?.titleRU,
                category: 'KORRUPSIYAGA_QARSHI_KURASHISH'
            })
        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        if (isOpen) {
            fetchData()
        }
    }, [isOpen])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    };

    const handleSubmit = async () => {
        setLoading(true)
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        });

        try {
            await axios.put(`/file/data/update/${ID}`, formData, {
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
                titleKIRIL: '',
                titleUZ: '',
                titleRU: '',
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
        <NormalModal isOpen={isOpen} onClose={onClose}>
            <div className="p-[20px] overflow-y-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-[25px] font-bold">Ma'lumot yangilash</h1>
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
                    <div className="flex items-center justify-between gap-[10px] 10px w-full">
                        <Input
                            name='titleUZ'
                            value={formData.titleUZ}
                            onChange={handleChange}
                            inputText={"Sarlavha (Uz)"} placeholder={"...."} />
                    </div>
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-full">
                        <Input
                            name='titleKIRIL'
                            value={formData.titleKIRIL}
                            onChange={handleChange}
                            inputText={"Sarlavha (Kiril)"} placeholder={"...."} />
                    </div>
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-full">
                        <Input
                            name='titleRU'
                            value={formData.titleRU}
                            onChange={handleChange}
                            inputText={"Sarlavha (Ru)"} placeholder={"...."} />
                    </div>
                    <div className="w-full mt-[10px]">
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
                            File
                        </label>
                    </div>
                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className={`w-full px-4 py-2 mt-[10px] rounded-lg shadow-lg border-2 duration-500 ${loading ? 'bg-gray-400 border-gray-400 text-white cursor-not-allowed' : 'bg-MainColor border-MainColor text-white hover:text-MainColor hover:bg-transparent'}`}>
                        {loading ? 'Yangilanmoqda...' : 'Yangilash'}
                    </button>
                </div>
            </div>
        </NormalModal>
    );
}
