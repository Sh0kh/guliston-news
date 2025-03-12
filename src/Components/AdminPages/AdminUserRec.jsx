import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import RekvizitsCreate from "../AdminComponents/Rekvizit/RekvizitsCreate";
import RekvizitsDelete from "../AdminComponents/Rekvizit/RekvizitsDelete";
import RekvizitsEdit from "../AdminComponents/Rekvizit/RekvizitsEdit";
import UserRecCreate from "../AdminComponents/UserRec/UserRecCreate";
import UserRecDelete from "../AdminComponents/UserRec/UserRecDelete";
import UserRecEdit from "../AdminComponents/UserRec/UserRecEdit";

export default function AdminUserRec() {
    const [createModal, setCreateModal] = useState(false);
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState(null)

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/organization/getByCategory?category=FUQAROLAR_QABULI', {
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
                    <h1 className="text-2xl font-bold">Fuqarolarni qabul qilish tartibi
                    </h1>
                    {data?.length > 0 ? ('') : (
                        <button
                            onClick={() => setCreateModal(true)}
                            className="bg-MainColor text-white px-4 py-2 rounded-lg shadow-lg border-2 border-MainColor duration-500 hover:text-MainColor hover:bg-transparent">
                            Yaratish
                        </button>
                    )}
                </div>
                {data?.length > 0 ? (
                    data?.map((i, index) => (
                        <div key={index} className="bg-white w-full p-[20px] mb-[10px] rounded-lg shadow-lg overflow-hidden">
                            <div className="flex items-center justify-end gap-[10px]">
                                <button
                                    onClick={() => { setEditData(i?.id); setDeleteModal(true) }}
                                    className="bg-red-500 text-white px-2 py-2 rounded-md text-xs hover:bg-red-700">
                                    <svg className="text-[20px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path></svg>
                                </button>
                                <button
                                    onClick={() => { setEditData(i); setEditModal(true) }}
                                    className="bg-yellow-500 text-white px-2 py-2 rounded-md text-xs hover:bg-yellow-700">
                                    <svg className="text-[20px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1q-.15.15-.15.36M20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"></path></svg>
                                </button>
                            </div>
                            <h1>
                                {i?.title}
                            </h1>
                            <div
                                className="mt-2"
                                dangerouslySetInnerHTML={{ __html: i?.context }}
                            />
                        </div>
                    ))
                ) : (
                    <div className="w-full h-[400px] flex items-center justify-center">
                        <h1>
                            Ma'lumot y'oq
                        </h1>
                    </div>
                )}
            </div>
            <UserRecDelete refresh={fetchData} isOpen={deleteModal} onClose={() => setDeleteModal(false)} data={editData} />
            <UserRecCreate refresh={fetchData} isOpen={createModal} onClose={() => setCreateModal(false)} />
            <UserRecEdit refresh={fetchData} isOpen={editModal} onClose={() => setEditModal(false)} data={editData} />
        </>
    );
}