import { useEffect, useState } from "react";
import NewsCreate from "../AdminComponents/News/NewsCreate";
import axios from "axios";
import ReactLoading from 'react-loading';
import NewsEdit from "../AdminComponents/News/NewsEdit";
import NewsDelete from "../AdminComponents/News/NewsDelete";
import PartyCreate from "../AdminComponents/Partiya/PartyCreate";
import PartyEdit from "../AdminComponents/Partiya/PartyEdit";
import PartyDelete from "../AdminComponents/Partiya/PartyDelete";

export default function Partiya() {
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [Id, setId] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false)
    const [loading, setLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [editData, setEditData] = useState([])
    const itemsPerPage = 10;
    const [category, setCategory] = useState("DEPUTATLAR_TARKIBI");


    const fetchData = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get('/party/findAll', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                params: {
                    category: category,
                    page: page - 1,
                    size: itemsPerPage
                }
            });
            setData(response?.data?.object?.content);
            setTotalElements(response?.data?.object?.totalElements || 0);
            setTotalPages(response?.data?.object?.totalPages || 0);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, category]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };


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
                    <h1 className="text-2xl font-bold">Partiya</h1>
                    <button
                        onClick={() => setCreateModal(true)}
                        className="bg-MainColor text-white px-4 py-2 rounded-lg shadow-lg border-2 border-MainColor duration-500 hover:text-MainColor hover:bg-transparent">
                        Yaratish
                    </button>
                </div>
                <div className="Admin__header__wrapper mb-[10px]">
                    <label className="w-[300px]">
                        <span className="text-[black] block text-[13px] cursor-pointer">Kategoriya</span>
                        <select
                            value={category || ""}
                            onChange={(e) => setCategory(e.target.value)}
                            className="py-[5px] w-full px-[10px] rounded-[5px] outline-MainColor border-[2px] border-black text-[black] bg-[white]"
                        >
                            <option value="DEPUTATLAR_TARKIBI">Deputatlar tarkibi</option>
                            <option value="DOIMIY_KOMISSIYA_AZOLARI">Doimiy komissiya azolari</option>
                            <option value="KOMMISIYA_KOMAKLASHUVI">Kommissiya yordam berishi</option>
                            <option value="KOTIBIYAT_MUDIRLARI">Kotibiyat mudirlari</option>
                            <option value="SENAT_AZOLARI">Senat a'zolari</option>
                        </select>
                    </label>
                </div>
                <div className="bg-white w-full rounded-lg shadow-lg overflow-hidden">
                    {data?.length > 0 ? (
                        <div>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="text-left text-sm md:text-base">
                                        <th className="p-3">№</th>
                                        <th className="p-3">F.I.O</th>
                                        <th className="p-3">Viloyat</th>
                                        <th className="p-3">Tuman nomi</th>
                                        <th className="p-3">Buyurtma soni</th>
                                        <th className="p-3">Partiya nomi</th>
                                        <th className="p-3">A'zo pozitsiyasi</th>
                                        <th className="p-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((news, index) => (
                                        <tr key={news.id} className="border-t hover:bg-gray-100 text-sm md:text-base">
                                            <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td className="p-3">
                                                {news?.fullName}
                                            </td>
                                            <td className="p-3 truncate max-w-[150px]">{news.province}</td>
                                            <td className="p-3">{news?.countyName}</td>
                                            <td className="p-3">
                                                {news?.order}
                                            </td>
                                            <td className="p-3">
                                                {news?.partyName}
                                            </td>
                                            <td className="p-3">
                                                {news?.memberPosition}
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-[5px]">
                                                    <button
                                                        onClick={() => { setId(news?.id); setDeleteModal(true) }}

                                                        className="bg-red-500 text-white px-2 py-2 rounded-md text-xs hover:bg-red-700">
                                                        <svg className="text-[20px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path></svg>
                                                    </button>
                                                    <button
                                                        onClick={() => { setEditData(news); setEditModal(true) }}
                                                        className="bg-yellow-500 text-white px-2 py-2 rounded-md text-xs hover:bg-yellow-700">
                                                        <svg className="text-[20px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"></path></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-center items-center gap-2 p-3 bg-gray-100">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={`px-3 py-1 rounded-md text-sm ${currentPage === 1 ? "bg-gray-300" : "bg-MainColor text-white hover:bg-blue-600"}`}
                                >
                                    &laquo;
                                </button>
                                {Array.from({ length: totalPages }, (_, index) => index + 1).slice(
                                    Math.max(0, currentPage - 3),
                                    Math.min(totalPages, currentPage + 2)
                                ).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-1 rounded-md text-sm ${currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={`px-3 py-1 rounded-md text-sm ${currentPage === totalPages || totalPages === 0 ? "bg-gray-300" : "bg-MainColor text-white hover:bg-blue-600"}`}
                                >
                                    &raquo;
                                </button>

                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-[400px] flex items-center justify-center">
                            <h1>
                                Ma'lumot y'oq
                            </h1>
                        </div>
                    )}

                </div>
            </div>
            <PartyDelete refresh={() => fetchData(currentPage)} isOpen={deleteModal} onClose={() => setDeleteModal(false)} data={Id} />
            <PartyCreate refresh={() => fetchData(currentPage)} isOpen={createModal} onClose={() => setCreateModal(false)} />
            <PartyEdit refresh={() => fetchData(currentPage)} isOpen={editModal} onClose={() => setEditModal(false)} data={editData} />
        </>
    );
}