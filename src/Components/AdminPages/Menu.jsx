import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import CreateMedia from "../AdminComponents/Media/CreateMedia";
import MediaDelete from "../AdminComponents/Media/MediaDelete";
import MenuCreate from "../AdminComponents/Menu/MenuCreate";
import MenuEdit from "../AdminComponents/Menu/MenuEdit";
import MenuDelete from "../AdminComponents/Menu/MenuDelete";
import { NavLink } from "react-router-dom";

export default function Menu() {
    const [createModal, setCreateModal] = useState(false);
    const [Id, setId] = useState([])
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/menu/getAll', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setData(response?.data?.object);
        } catch (error) {
            console.log(error);
            if (error?.status === 401) {
                localStorage.clear()
                window.location.href = '/login'
            }
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
                    <h1 className="text-2xl font-bold">Menyu
                    </h1>
                    <button
                        onClick={() => setCreateModal(true)}
                        className="bg-MainColor text-white px-4 py-2 rounded-lg shadow-lg border-2 border-MainColor duration-500 hover:text-MainColor hover:bg-transparent">
                        Yaratish
                    </button>
                </div>
                <div className="bg-white w-full rounded-lg shadow-lg overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left text-sm md:text-base">
                                <th className="p-3">№</th>
                                <th className="p-3">Nomi</th>
                                <th className="p-3">Sahifalar</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((i, index) => (
                                <tr key={i.menu?.id} className="border-t hover:bg-gray-100 text-sm md:text-base">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">
                                        {i?.menu?.name}
                                    </td>
                                    <td className="p-3">
                                        <NavLink to={`/admin/menu/${i?.menu?.id}/${i?.menu?.name}`}>
                                            <button className="bg-MainColor w-[80px] text-[25px] text-[white] rounded-[5px] flex items-center justify-center py-[5px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4m-8-2l8-8m0 0v5m0-5h-5"></path></svg>
                                            </button>
                                        </NavLink>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-[5px]">
                                            <button
                                                onClick={() => { setId(i?.menu?.id); setEditModal(true) }}
                                                className="bg-yellow-500 text-white px-2 py-2 rounded-md text-xs hover:bg-yellow-700">
                                                <svg className="text-[20px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"></path></svg>
                                            </button>
                                            <button
                                                onClick={() => { setId(i?.menu?.id); setDeleteModal(true) }}

                                                className="bg-red-500 text-white px-2 py-2 rounded-md text-xs hover:bg-red-700">
                                                <svg className="text-[20px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <MenuDelete refresh={fetchData} isOpen={deleteModal} onClose={() => setDeleteModal(false)} data={Id} />
            <MenuEdit refresh={fetchData} isOpen={editModal} onClose={() => setEditModal(false)} data={Id} />
            <MenuCreate refresh={fetchData} isOpen={createModal} onClose={() => setCreateModal(false)} />
        </>
    );
}