import { useEffect, useState } from "react";
import NewsCreate from "../AdminComponents/News/NewsCreate";
import axios from "axios";
import ReactLoading from 'react-loading';
import NewsEdit from "../AdminComponents/News/NewsEdit";
import NewsDelete from "../AdminComponents/News/NewsDelete";
import { NavLink } from "react-router-dom";

export default function AdminNews() {
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [Id, setId] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false)
    const [loading, setLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;

    const fetchData = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get('/article/admin/findAll', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                params: {
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
    }, [currentPage]);

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
                    <h1 className="text-2xl font-bold">Yangiliklar</h1>
                    <NavLink to={`/admin/news/create`}>
                        <button
                            onClick={() => setCreateModal(true)}
                            className="bg-MainColor text-white px-4 py-2 rounded-lg shadow-lg border-2 border-MainColor duration-500 hover:text-MainColor hover:bg-transparent">
                            Yangilik yaratish
                        </button>
                    </NavLink>
                </div>
                <div className="bg-white w-full rounded-lg shadow-lg overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left text-sm md:text-base">
                                <th className="p-3">№</th>
                                <th className="p-3">Foto</th>
                                <th className="p-3">Title</th>
                                <th className="p-3">Info</th>
                                <th className="p-3">Url</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((news, index) => (
                                <tr key={news.id} className="border-t hover:bg-gray-100 text-sm md:text-base">
                                    <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td className="p-3">
                                        <img src={news.contentUrl} alt={news.contentUrl} className="w-[80px] h-[80px] object-cover rounded-md" />
                                    </td>
                                    <td className="p-3">{news.title}</td>
                                    <td className="p-3 truncate max-w-[150px]">{news.description}</td>
                                    <td className="p-3">
                                        <a href={news.url} className="text-MainColor hover:underline">Link</a>
                                    </td>
                                    <td className="p-3">{news.mediaType === "MEDIA" ? 'Ijtimoiy tarmoq' : news?.mediaType === 'YOUTUBE_URL' ? "Youtube" : news?.mediaType === 'TEXT' ? "Matnli" : 'Boshqa'}</td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-[5px]">
                                            <button
                                                onClick={() => { setId(news?.id); setDeleteModal(true) }}

                                                className="bg-red-500 text-white px-2 py-2 rounded-md text-xs hover:bg-red-700">
                                                <svg className="text-[20px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path></svg>
                                            </button>
                                            <NavLink to={`/admin/news/edit/${news?.id}`}>
                                                <button
                                                    onClick={() => { setId(news?.id); setEditModal(true) }}
                                                    className="bg-yellow-500 text-white px-2 py-2 rounded-md text-xs hover:bg-yellow-700">
                                                    <svg className="text-[20px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"></path></svg>
                                                </button>
                                            </NavLink>
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

                        {/* Следующая страница */}
                        <button
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`px-3 py-1 rounded-md text-sm ${currentPage === totalPages || totalPages === 0 ? "bg-gray-300" : "bg-MainColor text-white hover:bg-blue-600"}`}
                        >
                            &raquo;
                        </button>

                    </div>

                </div>
            </div>
            <NewsDelete refresh={() => fetchData(currentPage)} isOpen={deleteModal} onClose={() => setDeleteModal(false)} data={Id} />
            <NewsCreate refresh={() => fetchData(currentPage)} isOpen={createModal} onClose={() => setCreateModal(false)} />
            <NewsEdit refresh={() => fetchData(currentPage)} isOpen={editModal} onClose={() => setEditModal(false)} data={Id} />

        </>
    );
}