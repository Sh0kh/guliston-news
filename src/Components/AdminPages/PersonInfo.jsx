import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from 'react-loading';

export default function PersonInfo() {
    const { ID } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/person/id/${ID}`);
            setData(response?.data?.object);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [ID]);

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen w-full'>
                <ReactLoading type="spinningBubbles" color='#1466B3' height={100} width={100} />
            </div>
        );
    }
    return (
        <div className="mt-[80px] pb-[50px] w-full min-h-screen flex flex-col items-center">
            <div className="w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">{data?.fullName}</h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-MainColor text-white px-4 py-2 rounded-lg shadow-lg border-2 border-MainColor duration-500 hover:text-MainColor hover:bg-transparent">
                        Ortga
                    </button>
                </div>
                <div className="bg-white p-6 shadow-lg rounded-lg flex gap-6 w-full">
                    {data?.photoUrl && (
                        <img src={data.photoUrl} alt={data.fullName} className="w-40 h-40 rounded-lg object-cover border" />
                    )}
                    <div className="w-full">
                        <p className="text-lg font-semibold">Telefon: <span className="font-normal">{data?.phoneNumber || "Noma'lum"}</span></p>
                        <p className="text-lg font-semibold">Qabul vaqti: <span className="font-normal">{data?.receptionDateTimes || "Noma'lum"}</span></p>
                        <p className="text-lg font-semibold">Kategoriya: <span className="font-normal">{data?.category || "Noma'lum"}</span></p>
                        {data?.partyName && <p className="text-lg font-semibold">Partiya: <span className="font-normal">{data.partyName}</span></p>}
                        {data?.position && <p className="text-lg font-semibold">Lavozim: <span className="font-normal">{data.position}</span></p>}
                    </div>
                </div>
                <div className="bg-white p-6 shadow-lg rounded-lg w-full mt-6">
                    <h2 className="text-xl font-bold mb-2">Biografiya</h2>
                    <p className="text-base leading-relaxed">{data?.biography || "Ma'lumot mavjud emas"}</p>
                </div>
                <div className="bg-white p-6 shadow-lg rounded-lg w-full mt-6">
                    <h2 className="text-xl font-bold mb-2">Majburiyat</h2>
                    <p className="text-base leading-relaxed">{data?.obligation || "Ma'lumot mavjud emas"}</p>
                </div>
                <div className="bg-white p-6 shadow-lg rounded-lg w-full mt-6">
                    <h2 className="text-xl font-bold mb-2">Faoliyat</h2>
                    <p className="text-base leading-relaxed">{data?.activity || "Ma'lumot mavjud emas"}</p>
                </div>
            </div>
        </div>
    );
}