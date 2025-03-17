import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";

export default function SuperiorsDetail() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await axios.get(`/api/person/id/${id}`);
                setData(response.data.object);
            } catch (error) {
                console.error("Error fetching person:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPerson();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <ReactLoading type="spinningBubbles" color="#1466B3" height={100} width={100} />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center text-center py-10">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75h.007v.007H9.75V9.75zm4.5 0h.007v.007h-.007V9.75zm-4.5 4.5h.007v.007H9.75v-.007zm4.5 0h.007v.007h-.007v-.007z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25a6.75 6.75 0 0113.5 0M3 8.25v7.5a2.25 2.25 0 002.25 2.25h13.5a2.25 2.25 0 002.25-2.25v-7.5" />
                </svg>
                <p className="mt-4 text-gray-600 text-lg">Ma'lumot yo'q</p>
            </div>
        )
    }

    return (
        <section className="mt-[10px]">
            <div className="Container">
                <div className="Rh_wrapper bg-white p-6 shadow-lg rounded-lg  gap-6 w-full flex  ">
                    {data?.photoUrl && (
                        <img src={data.photoUrl} alt={data.fullName} className="w-60 h-60 rounded-lg object-cover border" />
                    )}
                    <div className="w-full">
                        <p className="text-lg font-semibold">Telefon: <span className="font-normal">{data?.phoneNumber || "Noma'lum"}</span></p>
                        <p className="text-lg font-semibold">Qabul vaqti: <span className="font-normal">{data?.receptionDateTimes || "Noma'lum"}</span></p>
                        <p className="text-lg font-semibold">Kategoriya: <span className="font-normal">{data?.category || "Noma'lum"}</span></p>
                        {data?.partyName && <p className="text-lg font-semibold">Partiya: <span className="font-normal">{data.partyName}</span></p>}
                        {data?.position && <p className="text-lg font-semibold">Lavozim: <span className="font-normal">{data.position}</span></p>}
                    </div>
                </div>
                <div className="bg-white p-2 sm:p-6 shadow-lg rounded-lg w-full mt-6">
                    <h2 className="text-xl font-bold mb-2">Biografiya</h2>
                    <p className="text-base leading-relaxed">{data?.biography || "Ma'lumot mavjud emas"}</p>
                </div>
                <div className="bg-white p-2 sm:p-6 shadow-lg rounded-lg w-full mt-6">
                    <h2 className="text-xl font-bold mb-2">Majburiyat</h2>
                    <p className="text-base leading-relaxed">{data?.obligation || "Ma'lumot mavjud emas"}</p>
                </div>
                <div className="bg-white p-2 sm:p-6 shadow-lg rounded-lg w-full mt-6">
                    <h2 className="text-xl font-bold mb-2">Faoliyat</h2>
                    <p className="text-base leading-relaxed">{data?.activity || "Ma'lumot mavjud emas"}</p>
                </div>
            </div>
        </section>
    );
}
