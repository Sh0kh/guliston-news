import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Uz from "../AdminComponents/News/NewsLang/Uz"
import Ru from "../AdminComponents/News/NewsLang/Ru"
import Oz from "../AdminComponents/News/NewsLang/Kiril"
import Swal from 'sweetalert2';
import Input from "../UI/Inputs/Input"


export default function AdminNewsEdit() {
    const { ID } = useParams()
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const [lang, setLang] = useState('Uzb')
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('')
    const [mediaType, setMediaType] = useState(null)




    const [uzData, setUzData] = useState({
        name: "",
        context: '',
        info: ''
    })
    const [ozData, setOzData] = useState({
        name: "",
        context: '',
        info: ''
    })
    const [ruData, setRuData] = useState({
        name: "",
        context: '',
        info: ''
    })

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`/article/admin/find/${ID}`)
            setMediaType(response?.data?.object?.mediaType);
            setShow(response?.data?.object?.show)
            console.log(response?.data?.object?.show)
            setOzData({
                name: response?.data?.object?.titleKIRIL,
                info: response?.data?.object?.descriptionKIRIL,
                context: response?.data?.object?.contextKIRIL
            });

            setUzData({
                name: response?.data?.object?.titleUZ,
                info: response?.data?.object?.descriptionUZ,
                context: response?.data?.object?.contextUZ
            });

            setRuData({
                name: response?.data?.object?.titleRU,
                info: response?.data?.object?.descriptionRU,
                context: response?.data?.object?.contextRU
            });
            setUrl(response?.data?.object?.contentURL)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])

    const create = async () => {
        setLoading(true)
        try {            
            const formData = new FormData();
            formData.append("titleUZ", uzData.name);
            formData.append("descriptionUZ", uzData.info);
            formData.append("titleKIRIL", ozData.name);
            formData.append("descriptionKIRIL", ozData.info);
            formData.append("titleRU", ruData.name);
            formData.append("descriptionRU", ruData.info);
            formData.append("mediaType", mediaType);
            formData.append("contentURL", url);
            formData.append("show", show);
            formData.append("contextUZ", uzData.context);
            formData.append("contextKIRIL", uzData.context);
            formData.append("contextRU", uzData.context);
            if (image) {
                formData.append("file", image);
            }

            await axios.put(`/article/update/${ID}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

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
                <h1 className="text-2xl font-bold">Yangilik o'zgartirish
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
            {lang === 'Uzb' ? <Uz value={uzData} onChange={setUzData} /> : lang === 'Russ' ? <Ru value={ruData} onChange={setRuData} /> : lang === 'Kiril' ? <Oz value={ozData} onChange={setOzData} /> : ''}
            <div className="bg-white mt-[10px] p-[10px] shadow-lg rounded-[10px]">
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

                <label className="w-full mt-[10px] block">
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

            <div
                className="bg-white mt-[10px] p-[10px] shadow-lg rounded-[10px]">
                <button
                    onClick={!loading ? create : undefined}
                    disabled={loading}
                    className={`py-[5px] px-[8px] text-white bg-MainColor duration-500 border-[2px] border-MainColor shadow-xl rounded-[10px] w-full 
                     ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-transparent hover:text-MainColor"}
                    `}
                >
                    {loading ? "Yangilanmoqda..." : "O'zgartirish"}
                </button>

            </div>

        </div >
    )
}