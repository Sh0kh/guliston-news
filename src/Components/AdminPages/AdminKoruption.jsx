import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';

import OpenDataCreate from "../AdminComponents/OpenData/OpenDataCreate";
import OpenDataUpdate from "../AdminComponents/OpenData/OpenDataUpdate";
import OpenDataDelete from "../AdminComponents/OpenData/OpenDataDelete";
import KoruptionCreate from "../AdminComponents/Koruption/KoruptionCreate";
import KoruptionEdit from "../AdminComponents/Koruption/KoruptionEdit";

export default function AdminKoruption() {
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [Id, setId] = useState([])
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false)
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/file/data/getAll/KORRUPSIYAGA_QARSHI_KURASHISH', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setData(response?.data?.object);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen w-full'>
                <ReactLoading type="spinningBubbles" color='#1466B3' height={100} width={100} />
            </div>
        );
    }

    return (
        <>
            <div className="pt-[75px] pb-[50px]">
                <div className="Admin__header__wrapper flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Korrupsiyaga qarshi kurashish</h1>
                    <button
                        onClick={() => setCreateModal(true)}
                        className="bg-MainColor text-white px-4 py-2 rounded-lg shadow-lg border-2 border-MainColor duration-500 hover:text-MainColor hover:bg-transparent">
                        Ma'lumot yaratish
                    </button>
                </div>
                <div className="bg-white w-full rounded-lg shadow-lg overflow-hidden">
                    {data?.length > 0 ? (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-left text-sm md:text-base">
                                    <th className="p-3 text-center">№</th>
                                    <th className="p-3 text-center">Sarlavha</th>
                                    <th className="p-3 text-center">Fayl</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((i, index) => (
                                    <tr key={i.id} className="border-t hover:bg-gray-100 text-sm md:text-base">
                                        <td className="p-3 text-center">{index + 1}</td>
                                        <td className="p-3 text-center">{i.title}</td>
                                        <td className="p-3 text-center">
                                            <button
                                                className="inline-flex items-center text-[30px] justify-center px-[20px] py-[5px] rounded-[5px] bg-MainColor text-white"
                                                onClick={async () => {
                                                    const url = i?.mediaUrl;
                                                    if (!url) return;
                                                    try {
                                                        const response = await fetch(url);
                                                        const blob = await response.blob();
                                                        const link = document.createElement("a");
                                                        link.href = URL.createObjectURL(blob);
                                                        link.download = url.split("/").pop();
                                                        document.body.appendChild(link);
                                                        link.click();
                                                        document.body.removeChild(link);
                                                    } catch (error) {
                                                        console.error("Ошибка загрузки файла:", error);
                                                    }
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.575q-.2 0-.375-.062T11.3 15.3l-3.6-3.6q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L11 12.15V5q0-.425.288-.712T12 4t.713.288T13 5v7.15l1.875-1.875q.3-.3.713-.288t.712.313q.275.3.288.7t-.288.7l-3.6 3.6q-.15.15-.325.213t-.375.062M6 20q-.825 0-1.412-.587T4 18v-2q0-.425.288-.712T5 15t.713.288T6 16v2h12v-2q0-.425.288-.712T19 15t.713.288T20 16v2q0 .825-.587 1.413T18 20z"></path></svg>
                                            </button>
                                        </td>

                                        <td className="p-3">
                                            <div className="flex items-center justify-center gap-[5px]">
                                                <button
                                                    onClick={() => { setId(i?.id); setEditModal(true) }}
                                                    className="bg-yellow-500 text-white px-2 py-2 rounded-md text-xs hover:bg-yellow-700">
                                                    <svg className="text-[20px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"></path></svg>
                                                </button>
                                                <button
                                                    onClick={() => { setId(i?.id); setDeleteModal(true) }}
                                                    className="bg-red-500 text-white px-2 py-2 rounded-md text-xs hover:bg-red-700">
                                                    <svg className="text-[20px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex items-center justify-center h-[400px]">
                            <h1>
                                Ma'lumot yo'q
                            </h1>
                        </div>
                    )}
                </div>
            </div>
            <OpenDataDelete refresh={() => fetchData()} isOpen={deleteModal} onClose={() => setDeleteModal(false)} data={Id} />
            <KoruptionCreate refresh={() => fetchData()} isOpen={createModal} onClose={() => setCreateModal(false)} />
            <KoruptionEdit refresh={() => fetchData()} isOpen={editModal} onClose={() => setEditModal(false)} ID={Id} />

        </>
    );
}