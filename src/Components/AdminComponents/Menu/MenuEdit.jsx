import { useEffect, useState } from "react";
import Input from "../../UI/Inputs/Input";
import Swal from 'sweetalert2';
import axios from "axios";
import NormalModal from "../../UI/Modals/NormalModal";

export default function MenuEdit({ isOpen, onClose, refresh, data }) {
    const [nameKirl, setNameKiril] = useState('')
    const [nameRu, setNameRu] = useState('')
    const [nameUz, setNameUz] = useState('')
    const [loading, setLoading] = useState(false)


    const getByID = async () => {
        try {
            const response = await axios.get(`/menu/get/admin/${data}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            setNameUz(response?.data?.object?.nameUZ)
            setNameRu(response?.data?.object?.nameRU)
            setNameKiril(response?.data?.object?.nameKIRIL)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (isOpen) {
            getByID()
        }
    }, [isOpen])

    const handleEdit = async () => {
        setLoading(true)
        try {
            const newData = {
                nameKIRIL: nameKirl,
                nameRU: nameRu,
                nameUZ: nameUz,
            }

            await axios.put(`/menu/update/${data}`, newData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
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
            refresh()
            onClose()

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
        <NormalModal isOpen={isOpen} onClose={onClose}>
            <div className="p-[20px]">
                <div className="flex items-center justify-between">
                    <h1 className="text-[25px] font-bold">Menu o'zgartirish</h1>
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
                    </div>
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-full">
                        <Input
                            value={nameKirl}
                            onChange={(e) => setNameKiril(e.target.value)}
                            inputText={"Nomi (Kiril)"} placeholder={"...."} />
                    </div>
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-full">
                        <Input
                            value={nameUz}
                            onChange={(e) => setNameUz(e.target.value)}
                            inputText={"Nomi (Uzb)"} placeholder={"...."} />
                    </div>
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-full">
                        <Input
                            value={nameRu}
                            onChange={(e) => setNameRu(e.target.value)}
                            inputText={"Nomi (Russ)"} placeholder={"...."} />
                    </div>
                    <button
                        disabled={loading}
                        onClick={handleEdit}
                        className={`w-full px-4 py-2 mt-[20px] rounded-lg shadow-lg border-2 duration-500 ${loading ? 'bg-gray-400 border-gray-400 text-white cursor-not-allowed' : 'bg-MainColor border-MainColor text-white hover:text-MainColor hover:bg-transparent'}`}>
                        {loading ? 'Tangilanmoqda...' : 'Saqlash'}
                    </button>
                </div>
            </div>
        </NormalModal>
    );
}
