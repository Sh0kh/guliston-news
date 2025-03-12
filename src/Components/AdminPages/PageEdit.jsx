import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Uz from "../AdminComponents/PageCreate/Uz"
import Ru from "../AdminComponents/PageCreate/Ru"
import Oz from "../AdminComponents/PageCreate/Oz"
import Swal from 'sweetalert2';


export default function PageEdit() {
    const { ID } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [lang, setLang] = useState('Uzb')
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState(null)

    const [uzData, setUzData] = useState({
        name: "",
        context: ''
    })
    const [ozData, setOzData] = useState({
        name: "",
        context: ''
    })
    const [ruData, setRuData] = useState({
        name: "",
        context: ''
    })

    const fetchData = async () => {
        try {
            const response = await axios.get(`/data/get/admin/${ID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            setUzData({name:response?.data?.object?.titleUZ, context:response?.data?.object?.contextUZ})
            setOzData({name:response?.data?.object?.titleKIRIL, context:response?.data?.object?.contextKIRIL})
            setRuData({name:response?.data?.object?.titleRU, context:response?.data?.object?.contextRU})
            setId(response?.data?.object?.menuId)
        } catch (error) {
            console.log(error)
            if (error?.status === 401) {
                navigate('/login')
                localStorage.clear()
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    const Edit = async () => {
        setLoading(true)
        try {

            const newsData = {
                contextKIRIL: ozData?.context,
                contextRU: ruData?.context,
                contextUZ: uzData?.context,
                menuId: id,
                titleKIRIL: ozData?.name,
                titleRU: ruData?.name,
                titleUZ: uzData?.name

            }
            await axios.put(`/data/update/${ID}`, newsData, {
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
                <h1 className="text-2xl font-bold">Malumot o'zgartirish
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

            <div

                className="bg-white mt-[10px] p-[10px] shadow-lg rounded-[10px]">
                <button
                    onClick={!loading ? Edit : undefined} // Блокируем нажатие
                    disabled={loading}
                    className={`py-[5px] px-[8px] text-white bg-MainColor duration-500 border-[2px] border-MainColor shadow-xl rounded-[10px] w-full 
        ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-transparent hover:text-MainColor"}
    `}
                >
                    {loading ? "O'zgartirilmoqda..." : "Saqlash"}
                </button>

            </div>

        </div>
    )
}