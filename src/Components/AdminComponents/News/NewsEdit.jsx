import { useEffect, useState } from "react";
import Input from "../../UI/Inputs/Input";
import BigModal from "../../UI/Modals/BigModal";
import Swal from 'sweetalert2';
import TextArea from "../../UI/TextArea/TextArea";
import axios from "axios";

export default function NewsEdit({ isOpen, onClose, data, refresh }) {
    const [image, setImage] = useState(null);
    const [mediaType, setMediaType] = useState('')
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)


    const [url, setUrl] = useState('')
    const [DataUz, setDataUz] = useState({
        titleUz: "",
        descriptionUz: ""
    })
    const [DataOz, setDataOz] = useState({
        titleOz: "",
        descriptionOz: ""
    })
    const [DataRu, setDataRu] = useState({
        titleRu: "",
        descriptionRu: ""
    })


    const GetByID = async () => {
        try {
            const response = await axios(`/article/admin/find/${data}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });

            setMediaType(response?.data?.object?.mediaType);
            setShow(response?.data?.object?.show)
            console.log(response?.data?.object?.show)
            setDataOz({
                titleOz: response?.data?.object?.titleKIRIL,
                descriptionOz: response?.data?.object?.descriptionKIRIL
            });

            setDataUz({
                titleUz: response?.data?.object?.titleUZ,
                descriptionUz: response?.data?.object?.descriptionUZ
            });

            setDataRu({
                titleRu: response?.data?.object?.titleRU,
                descriptionRu: response?.data?.object?.descriptionRU
            });
            setUrl(response?.data?.object?.contentURL)

        } catch (error) {
            console.log(error);
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        console.log(file);

        if (file) {
            setImage(file);
        }
    };




    useEffect(() => {
        if (isOpen) {
            GetByID()
        }
    }, [isOpen])



    const HandleEdit = async () => {
        setLoading(true)
        try {
            const formData = new FormData();

            formData.append("titleUZ", DataUz.titleUz);
            formData.append("descriptionUZ", DataUz.descriptionUz);
            formData.append("titleKIRIL", DataOz.titleOz);
            formData.append("descriptionKIRIL", DataOz.descriptionOz);
            formData.append("titleRU", DataRu.titleRu);
            formData.append("descriptionRU", DataRu.descriptionRu);
            formData.append("mediaType", mediaType);
            formData.append("contentURL", url);
            formData.append("show", show);
            if (image) {
                formData.append("file", image);
            }

            await axios.put(`/article/update/${data}`, formData, {
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
        <BigModal isOpen={isOpen} onClose={onClose}>
            <div className="p-[20px]">
                <div className="flex items-center justify-between">
                    <h1 className="text-[25px] font-bold">Yangilik o'zgartirish</h1>
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
                            value={DataUz.titleUz}
                            onChange={(e) => setDataUz({ ...DataUz, titleUz: e.target.value })}
                            inputText={"Nomi (uzb)"} placeholder={"...."} />
                        <Input
                            value={DataOz?.titleOz}
                            onChange={(e) => setDataOz({ ...DataOz, titleOz: e.target.value })}
                            inputText={"Nomi (узб)"} placeholder={"...."} />
                    </div>
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-full">
                        <Input
                            value={DataRu?.titleRu}
                            onChange={(e) => setDataRu({ ...DataRu, titleRu: e.target.value })}
                            inputText={"Nomi (Russ)"} placeholder={"...."} />
                        <Input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            inputText={"Havola"} placeholder={"...."} />
                    </div>
                    <div className="flex items-end justify-between gap-[10px] mt-[10px] w-full">
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
                                id="imageUploadd"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                            <label
                                htmlFor="imageUploadd"
                                className="bg-MainColor w-full text-white px-4 py-[5px] rounded-lg shadow-lg border-2 border-MainColor duration-500 hover:text-MainColor hover:bg-transparent cursor-pointer flex items-center justify-center"
                            >
                                Foto
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-full">
                        <TextArea
                            value={DataUz.descriptionUz}
                            onChange={(e) => setDataUz({ ...DataUz, descriptionUz: e.target.value })}
                            inputText={"Malumot (uzb)"} placeholder={"...."} />
                        <TextArea
                            value={DataOz?.descriptionOz}
                            onChange={(e) => setDataOz({ ...DataOz, descriptionOz: e.target.value })}
                            inputText={"Malumot (узб)"} placeholder={"...."} />
                    </div>
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-[100%]">
                        <TextArea
                            value={DataRu?.descriptionRu}
                            onChange={(e) => setDataRu({ ...DataRu, descriptionRu: e.target.value })}
                            inputText={"Malumot (Russ)"} placeholder={"...."} />
                        <label className="w-full">
                            <span className="block">
                                Caruselga qo'shish
                            </span>
                            <input
                                checked={show}
                                onChange={(e) => setShow(e.target.checked)}
                                className="w-[30px] h-[30px]"
                                type="checkbox"
                            />
                        </label>
                    </div>
                    <button
                        disabled={loading}
                        onClick={HandleEdit}
                        className={`w-full px-4 py-2 rounded-lg shadow-lg border-2 duration-500 ${loading ? 'bg-gray-400 border-gray-400 text-white cursor-not-allowed' : 'bg-MainColor border-MainColor text-white hover:text-MainColor hover:bg-transparent'}`}>
                        {loading ? 'Yaratilmoqda...' : 'o`zgartirish'}
                    </button>
                </div>
            </div>
        </BigModal>
    );
}
