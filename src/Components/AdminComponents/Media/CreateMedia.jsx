import { useState } from "react";
import Input from "../../UI/Inputs/Input";
import Swal from 'sweetalert2';
import axios from "axios";
import NormalModal from "../../UI/Modals/NormalModal";

export default function CreateMedia({ isOpen, onClose, refresh }) {
    const [image, setImage] = useState(null);
    const [mediaType, setMediaType] = useState(null)
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState('')

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file); 
        }
    };


    const handleCreate = async () => {
        setLoading(true)
        try {
            const formData = new FormData();

            formData.append("mediaType", mediaType);
            formData.append("mediaUrl", url);
            if (image) {
                formData.append("file", image);
            }

            await axios.post(`/media/create`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
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
            setMediaType("");
            setUrl("");
            setImage(null);
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
                    <h1 className="text-[25px] font-bold">Ijtimoiy tarmoq yaratish</h1>
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
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            inputText={"Havola"} placeholder={"...."} />
                    </div>
                    <div className="flex items-end justify-between gap-[10px] my-[10px] w-full">
                        <label className="w-full">
                            <span className="text-[black] block text-[13px] cursor-pointer">
                                Media type
                            </span>
                            <select
                                value={mediaType || ""}
                                onChange={(e) => {
                                    setMediaType(e.target.value);
                                }}
                                className="py-[5px] w-full px-[10px] rounded-[5px] outline-MainColor border-[2px] border-black text-[black] bg-[white]"
                            >
                                <option value="" disabled>...</option>
                                <option value="TEXT">So'z</option>
                                <option value="MEDIA">Ijtimoiy tarmoq</option>
                                <option value="YOUTUBE_URL">Yotube</option>
                            </select>


                        </label>
                        <div className="w-full">
                            <input
                                type="file"
                                accept="image/*"
                                id="imageUpload"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                            <label
                                htmlFor="imageUpload"
                                className="bg-MainColor w-full text-white px-4 py-[5px] rounded-lg shadow-lg border-2 border-MainColor duration-500 hover:text-MainColor hover:bg-transparent cursor-pointer flex items-center justify-center"
                            >
                                Foto
                            </label>
                        </div>
                    </div>
                    <button
                        disabled={loading}
                        onClick={handleCreate}
                        className={`w-full px-4 py-2 rounded-lg shadow-lg border-2 duration-500 ${loading ? 'bg-gray-400 border-gray-400 text-white cursor-not-allowed' : 'bg-MainColor border-MainColor text-white hover:text-MainColor hover:bg-transparent'}`}>
                        {loading ? 'Yaratilmoqda...' : 'Yaratish'}
                    </button>
                </div>
            </div>
        </NormalModal>
    );
}
